<template>
    <div class="options">
        <label v-for="option in options" :key="option.value" class="container">{{option.value}}
            <input type="checkbox" :checked="isChecked(option.state)" @change="select(option.value, option.state)">
            <span class="checkmark"></span>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        optionsProps: {
            default: () => []
        }
    },
    data() {
        return {
            options: []
        }
    },
    mounted() {
        this.options = this.optionsProps.map(op => ({value: op, state: false}))
    },
    methods: {
        select(value, state) {
            this.options = this.options.map(op => {
                if(op.value == value) {
                    op.state = !state
                }
                return op
            })
            this.$emit("optionSelected", this.options)
        },
        isChecked(state) {
            return state == true
        }
    }
}
</script>

<style scoped lang="scss">


.options {
    padding: 12px;
    display: flex;
}

/* The container */
.container {
  margin-right: 10px;
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>