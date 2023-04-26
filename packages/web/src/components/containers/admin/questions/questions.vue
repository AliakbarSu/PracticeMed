<template>
    <div class="questions__main">
      <h1 class="title">Questions Admin Dashboard</h1>
      <div v-if="loading" class="spinner-container">
          <Circle8/>
      </div>
      <div class="question__update">
            <div class="update" v-if="question.key">
                <div class="question__heading">
                    <span class="question__id--update"><strong>ID: </strong>{{question.id}}</span>
                    <span class="question__id--number"><strong>Question: </strong>{{question.number}}</span>
                </div>
                <ckeditor :editor="editor" v-model="question.question" :config="editorConfig"></ckeditor>
                <div v-for="choice in question.choices" :key="choice.id" :class="{'editor--green-borders': choice.isCorrect}">
                    <ckeditor v-model="choice.text" :editor="editor" :config="editorConfig"></ckeditor>
                </div>
                <div v-if="question.key"><Options :optionsProps="options" @optionSelected="selectOption"/></div>
                <div class="status" v-if="question.key">
                    <p class="status__items">Grammer: {{question.grammerModified ? "Yes" : "No"}}</p>
                    <p class="status__items">Context: {{question.contextModified ? "Yes" : "No"}}</p>
                    <p class="status__items">Choices: {{question.choicesModified ? "Yes" : "No"}}</p>
                </div>
                <div class="update__actions" v-if="question.key">
                    <button class="actions__action" @click="editQuestion(question.key)">Save</button>
                    <button class="actions__action actions--yellow" @click="suspend(question.key)">{{question.active ? 'Suspend' : 'Unsuspend'}}</button>
                    <button class="actions__action actions--red" @click="deleteQuestion(question.key)">Delete</button>
                    <button class="actions__action actions--orange" @click="returnBack()">Return</button>
                </div>
            </div>
      </div>
      <div class="warning__container" v-if="!questions.length && !loading">
          <h1 class="warning__text">No question to display</h1>
      </div>
      <div class="questions" v-if="questions">
            <div v-for="question in questions" :key="question.id" class="question" :class="{'question--active': isActive(question.key)}">
                <div class="question__heading">
                    <span class="question__id"><strong>ID: </strong>{{question.id}}</span>
                    <span class="question__number"><strong>Question: </strong>{{question.number}}</span>
                </div>
                <p class="question__question" v-html="question.question"></p>
                <div class="status status--nopadding">
                    <p class="status__items">Grammer: {{question.grammerModified ? "Yes" : "No"}}</p>
                    <p class="status__items">Context: {{question.contextModified ? "Yes" : "No"}}</p>
                    <p class="status__items">Choices: {{question.choicesModified ? "Yes" : "No"}}</p>
                </div>
                <div class="question__actions">
                    <button class="actions__action" @click="edit($event, question.key)">Edit</button>
                    <button class="actions__action actions--yellow" @click="suspend(question.key)">{{question.active ? 'Suspend' : 'Unsuspend'}}</button>
                    <button class="actions__action actions--red" @click="deleteQuestion(question.key)">Delete</button>
                </div>
            </div>
      </div>
    </div>
</template>

<script>
import firestore from '../../../../../firebase'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import Options from './components/checkbox/checkbox'
import Circle8 from 'vue-loading-spinner/src/components/Circle8'

export default {
    data() {
        return {
            editor: ClassicEditor,
            editorConfig: {},
            questionsArray: [],
            question: {},
            currentLocation: 0,
            options: ["Context", "Choices", "Grammer"],
            selectedOptions: [],
            loading: false,
            el: null
        }
    },
    async created() {
        this.loading = true
        try {
            const questionsDoc = await firestore.db.collection("modifiedQuestions").get()
            const questionsArray = []
            questionsDoc.forEach(snapshot => {
                questionsArray.push({...snapshot.data(), key: snapshot.id})
            })
            this.questionsArray = questionsArray.map((q, index) => ({...q, number: index + 1}))
            this.loading = false
            return Promise.resolve()
        }catch(err) {
            console.log(err)
            this.$swal.fire(
                'Error Occured',
                'Failed to fetch questions!',
                'error'
            ); 
            this.loading = false
        }
        
    },
    components: {
        // Options,
        Circle8
    },
    methods: {
        selectOption(options) {
            this.selectedOptions = options
        },
        edit(event, key) {
            if(this.isEditing) {
                this.$swal({
                    title: 'Are you sure?',
                    text: 'Your changes will be discarted',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, discart',
                    cancelButtonText: 'No, keep changes'
                }).then(({value}) => {
                    if(value) {
                        this.proceedWithEdit(event, key)
                    }
                })    
            }else {
                this.proceedWithEdit(event, key)
            }
        },
        suspend(key) {
            this.loading = true
            const question = this.questions.find(q => q.key == key)
            let changeTo = true
            if(question.active) {
                changeTo = false
            }
            firestore.db.collection("modifiedQuestions").doc(key).update({
                active: changeTo
            })
            .then(() => {
                this.questionsArray = this.questionsArray.map(q => {
                    if(q.key == key) {
                        q.active = changeTo
                    }
                    return q
                })
                this.question.active = changeTo
                this.loading = false
            })
            .catch(err => {
                console.log(err); 
                this.$swal.fire(
                    'Error Occured',
                    'Something went wrong!',
                    'error'
                ); 
                this.loading = false
            })
        },
        async deleteQuestion(key) {
            this.loading = true
            firestore.db.collection("modifiedQuestions").doc(key).delete()
            .then(() => {
                if(this.question.key == key) {
                    this.question = {}
                }
                this.questionsArray = this.questions.filter(q => q.key !== key)
                this.returnBack()
                this.loading = false
            }).catch(err => {
                console.log(err); 
                this.$swal.fire(
                    'Error Occured',
                    'Something went wrong!',
                    'error'
                ); 
                this.loading = false
            })
        },
        async editQuestion(keyId) {
            // const question = this.questions.find(q => q.key == keyId)
            this.loading = true
            firestore.db.collection("modifiedQuestions").doc(keyId).update({
                question: this.question.question,
                choices: this.question.choices,
                choicesModified: this.isModified("choices"),
                grammerModified: this.isModified("grammer"),
                contextModified: this.isModified("context")
            })
            .then(() => {
                const questionIndex = this.questions.findIndex(q => q.key == keyId)
                this.questionsArray[questionIndex].question = this.question.question
                this.questionsArray[questionIndex].choices = this.question.choices
                this.questionsArray[questionIndex].choicesModified = this.isModified("choices")
                this.questionsArray[questionIndex].contextModified = this.isModified("context")
                this.questionsArray[questionIndex].grammerModified = this.isModified("grammer")
                this.loading = false
            })
            .catch(err => {
                console.log(err); 
                this.$swal.fire(
                    'Error Occured',
                    'Something went wrong!',
                    'error'
                ); 
                this.loading = false
            })

        },
        isModified(value) {
            return this.selectedOptions.filter(op => op.value.toLowerCase() == value.toLowerCase() && op.state).length > 0
        },
        toggleEditing() {
            this.isEditing = true
        },
        proceedWithEdit(event, key) {
            this.question = this.questions.find(q => q.key == key)
            this.el = event.target
            this.scrollToTop()
        },
        scrollToTop() {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        },
        returnBack() {
            this.el.scrollIntoView({ behavior: 'smooth', block: "center" })
        },
        isActive(key) {
            return key == this.question.key
        }
    },
    computed: {
        questions() {
            return this.questionsArray
        }
    }
}
</script>

<style scoped lang="scss">


.questions__main {
    font-family: sans-serif;
}

.title {
    width: 100%;
    padding: 12px;
    text-align: center;
}

.questions {
    padding: 12px;
    font-family: sans-serif;
}

.question {
    padding: 20px;
    width: 80%;
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.question__id--update {
    padding: 12px;
    display: block;
}

.question--active {
    background: #eab75a;
}


.actions__action {
  position: relative;
  overflow: hidden;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  background: #70bf70;
  border: 1px solid #70bf70;
  color: white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  outline: none;
  &:hover {
    cursor: pointer;
    transition: 0.3s;
    background: white;
    color: #70bf70;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  &:active {
    outline: none;
  }
}


.actions__action:after {
  content: "";
  background: #f1f1f1;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.actions__action:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}


.actions--red {
  background: #f36c6c;
  border: 1px solid #f36c6c;
  &:hover {
    color: #f36c6c;
  }
}


.actions--yellow {
  background: #c5c56d;
  border: 1px solid #c5c56d;
  &:hover {
    color: #c5c56d;
  }
}

.update {
    font-family: sans-serif;
    padding: 12px;
    width: 95%;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 7%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.update__actions {
    padding: 12px;
}


.actions__action {
  position: relative;
  overflow: hidden;
  padding: 10px 20px;
  border-radius: 5px;
  margin-right: 10px;
  background: #70bf70;
  border: 1px solid #70bf70;
  color: white;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  outline: none;
  &:hover {
    cursor: pointer;
    transition: 0.3s;
    background: white;
    color: #70bf70;
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
  }
  &:active {
    outline: none;
  }
}


.actions__action:after {
  content: "";
  background: #f1f1f1;
  display: block;
  position: absolute;
  padding-top: 300%;
  padding-left: 350%;
  margin-left: -20px !important;
  margin-top: -120%;
  opacity: 0;
  transition: all 0.8s
}

.actions__action:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}


.actions--red {
  background: #f36c6c;
  border: 1px solid #f36c6c;
  &:hover {
    color: #f36c6c;
  }
}


.actions--yellow {
  background: #c5c56d;
  border: 1px solid #c5c56d;
  &:hover {
    color: #c5c56d;
  }
}

.actions--orange {
    background: #eab516;
    border: 1px solid #eab516;
    &:hover {
        color: #eab516;
    }
}

.status  {
    padding: 0 12px;
    display: flex;
}

.status--nopadding {
    padding: 0;
}

.status__items {
    margin-right: 12px;
}

.spinner-container {
    position: fixed;
    z-index: 10;
    left: 0;
    right: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    top: 0;
    bottom: 0;
    align-items: center;
    background: #7575759e;
}

.editor--green-borders {
    border: 4px solid #56f156;
}


.question__heading {
    display: flex;
    justify-content: space-between;
}

.warning__container {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.warning__text {
    font-size: 18px;
}

</style>