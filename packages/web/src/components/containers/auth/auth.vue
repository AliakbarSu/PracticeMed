<template>
<div class="auth">
//     <div class="content">
//         <form @submit="submit">
//             <label class="form__label">{{login ? "Log In" : "Sign Up"}}</label>
//             <input class="form__inputs" name="email" type="text" placeholder="Enter your email" v-model="authData.email">
//             <input class="form__inputs" name="password" type="password" placeholder="Enter your password" v-model="authData.password">
//             <div class="form__actions">
//                 <button class="form__button" type="submit">{{login ? "Log In" : "Sign Up"}}</button> or <span class="alternate__text" @click="toggleMethod">{{login ? "Create Account" : "Log In"}}</span>
//             </div>
//         </form>
//     </div>
</div>
</template>

// <script>
// export default {
//     data() {
//         return {
//             login: true,
//             authData: {
//                 email: "",
//                 password: ""
//             }
//         }
//     },
//     methods: {
//         toggleMethod() {
//             this.login = !this.login
//         },
//         submit(event) {
//             event.preventDefault()
//             if(this.login) {
//                 this.$store.dispatch("authRequest", this.authData).then(() => {
//                     this.$router.push("/")
//                 })
//             }else {
//                 this.$store.dispatch("authRequestSignup", this.authData).then(() => {
//                     this.$router.push("/")
//                 })
//             }
//         }
//     }
// }
// </script>

// <style lang="scss" scoped>


// .auth {
//     height: 100vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;;
// }

// .content {
//   padding: 12px;
//   text-align: center;
//   @media(min-width: 1200px) {
//     width: 1200px;
//     margin: auto;
//   }
//   font-family: 'Roboto', sans-serif;
// }

// .form__label {
//     font-size: 2em;
//     display: block;
//     width: 80%;
//     margin: auto;
//     padding: 12px 0;
//     text-align: left;
//     color: white;
// }

// form {
//     width: 60%;
//     margin: auto;
//     background: #b2b2ff;
//     border-radius: 5px;
//     padding: 20px 0;
// }

// .form__inputs {
//     width: 80%;
//     padding: 12px;
//     margin-top: 10px;
//     border: none;
//     border-radius: 5px;
//     outline: none;
// }

// .form__actions {
//     width: 80%;
//     text-align: left;
//     margin: auto;
//     color: white;
//     margin-top: 20px;
// }

// .form__button {
//     width: 200px;
//     border: 2px solid #77bf77;
//     background-color: #77bf77;
//     color: white;
//     border-radius: 5px;
//     padding: 12px;
//     text-align: center;
//     margin-top: 10px;
//     margin-right: 20px;
//     outline: none;
//     &:hover {
//         color: #77bf77;
//         background-color: white;
//         transition: 0.3s;
//         cursor: pointer;
//     }
// }

// .alternate__text {
//     color: white;
//     margin-left: 20px;
//     &:hover {
//         color: grey;
//         transition: 0.3s;
//         cursor: pointer;
//     }
// }

// </style>