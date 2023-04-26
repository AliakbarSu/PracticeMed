<template>
    <div class="card">
        <p class="card__title">Amount to Pay ${{amount}}</p>
        <div v-if="info.length" class="info__panel">
            <p class="info__text">{{info}}</p>
        </div>
        <div class="inputs__container">
            <div class="card__inputs">
                <label class="card__labels">Card Number</label>
                <div class="inputs__inputs" ref="cardNumber"></div>
            </div>
            <div class="card__inputs">
                <label class="card__labels">Card Expiry</label>
                <div class="inputs__inputs" ref="cardExpiry"></div>
            </div>
            <div class="card__inputs">
                <label class="card__labels">CVC</label>
                <div class="inputs__inputs" ref="cardCvc"></div>
            </div>
        </div>
        <button v-on:click="purchase" class="pay__btn">Pay</button>
    </div>
</template>

<script>


// eslint-disable-next-line no-undef
let stripe = Stripe("pk_test_51GtrcNLtUY5ccSXUvc0YPjmcRfiymOZj0W18MvTX9suWke3wcN8DGOUdxOAKsMDeXIVoXTEwX3KfGQHymRuhXIFd00H5X78Mrw")
let elements = stripe.elements()
let cardNumber = undefined;
let cardCvc = undefined;
let cardExpiry = undefined;

export default {
  props: ["amount"],
  data() {
      return {
          info: ""
      }
  },
  mounted: function () {
    cardNumber = elements.create('cardNumber');
    cardExpiry = elements.create('cardExpiry')
    cardCvc = elements.create('cardCvc')
    cardNumber.mount(this.$refs.cardNumber);
    cardExpiry.mount(this.$refs.cardExpiry)
    cardCvc.mount(this.$refs.cardCvc)
  },
  methods: {
    purchase: function () {
        let self = this;
        this.info = ""

        stripe.createToken(cardNumber).then(function(result) {
            if (result.error) {
                self.info = result.error.message
                self.hasCardErrors = true;
                self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
                return;
            }

            console.log(result)
            self.$emit("pay", result)

        });
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
    height: 100%;
    position: relative;
    width: 100%;
    margin: auto;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 20px;
    text-align: left;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding-bottom: 90px;
}

.card__title {
    font-size: 1.5em;
    text-align: left;
}

.info__panel {
    background: #ea5a5a;
    border-radius: 5px;
    padding: 5px 0px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.info__text {
    color: white;
    padding: 5px;
    font-size: 0.9em;
    margin: 0;
    text-align: left;
}

.card__inputs {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
}

.inputs__inputs {
    width: 100%;
}

.card__labels {
    padding: 10px 0;
    display: inline-block;
    text-align: left;
}

.StripeElement {
    padding: 12px 5px;
    background: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.pay__btn {
    position: relative;
    overflow: hidden;
    margin-top: 10%;
    border: 2px solid #45bf5f;
    background-color: #45bf5f;
    padding: 12px;
    width: 200px;
    color: white;
    margin-right: 100;
    border-radius: 5px;
    outline: none;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    position: absolute;
    bottom: 20px;
    &:hover {
        transition: 0.3s;
        cursor: pointer;
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
}


.pay__btn:after {
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

.pay__btn:active:after {
  padding: 0;
  margin: 0;
  opacity: 1;
  transition: 0s
}

</style>