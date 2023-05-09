<template>

<v-container
      class="grey lighten-5 mb-6"
    >
    <v-row>
        <v-col>
            <h1>Your Billing Summary</h1>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
           <p><span>Item: </span>Australian Medical Test</p>
        </v-col>
        <v-col>
           <p><span>Price: </span>$25 USD</p>
           <button @click="payWithNewCard">Continue To Pay</button>
        </v-col>
    </v-row>

    </v-container>
  
</template>

<script>

export default {
    data() {
        return {
            defaultMethod: "",
            paymentMethods: [],
            amount: 0
        }
    },
    computed: {
    },
    methods: {
        payWithNewCard() {
            this.$store.dispatch("bookTest", {
                productId: this.$route.params.testId, 
                userId: this.$auth.user.sub, 
                userEmail: this.$auth.user.email
            } 
            ).then(url => {
                if(url) {
                    window.location.href = url
                }else {
                    alert("Something went wrong try again!")
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.payment {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content {
  padding: 12px;
  @media(min-width: 1200px) {
    width: 1200px;
    margin: auto;
    display: flex;
  }
  font-family: 'Roboto', sans-serif;
}


.p-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.p-card {
    position: relative;
    width: 250px;
    border: 4px solid #bfbfbf;
    border-radius: 5px;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}

.p-card--default {
    border: 4px solid #45bf5f;
}

.p-card__details {
    text-align: left;
    padding: 12px;
    width: 100%;
}

.p-card__controls {
    display: flex;
    justify-content: flex-end;
    display: flex;
    align-items: center;
}

.p-card__btn {
    border: none;
    outline: none;
    background: none;
    border-radius: 5px;
    padding: 4px;
    cursor: pointer;
    text-decoration: underline;
    &:hover {
        color: grey;
        transition: 0.3s;
    }
}

.p-card__image {
    position: absolute;
    top: 5px;
    right: 5px;
    height: 25px;
}

.p-card__img {
    height: 100%;
}

.p-card__strong {
    font-weight: 800;
}

.content__right, .content__left {
    width: 50%;
    padding: 20px;
}

.content__right {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
}

.spinner__container {
    display: flex;
    justify-content: center;
    width: 100%;
}

.continue__btn {
    position: relative;
    overflow: hidden;
    border: 2px solid #45bf5f;
    background-color: #45bf5f;
    padding: 12px;
    width: 200px;
    color: white;
    border-radius: 5px;
    outline: none;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    &:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
    }
}

.continue__btn:after {
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

.continue__btn:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}

.default__content {
    text-align: left;
}

.default__text {
}

</style>