<template>
      <div class="login-page vertical-center" id="login-page">
          <h1 class="title" v-if="animateForm" :class="{animated: animateForm, fadeIn: animateForm}">Socially Aware Santa</h1>
          <div class="mx-auto col-xl-5 col-lg-7 col-md-9 col-sm-12 present-container vertical-center">
              <router-link to="/register" class="register-link" v-if="animateForm" :class="{animated: animateForm, fadeIn: animateForm}">Register</router-link>
              <div class="login-form">
                  <b-form v-if="animateForm" @submit.prevent="onSubmit" :class="{animated: animateForm, fadeIn: animateForm}">
                      <b-form-group id="input-group-email" class="col-6 mx-auto" label="Email:" label-for="email">
                          <b-form-input id="email" v-model="form.email" type="email" required></b-form-input>
                      </b-form-group>
                      <b-form-group id="input-group-password" class="col-6 mx-auto" label="Password:" label-for="password">
                          <b-form-input id="password" type="password" v-model="form.password" required></b-form-input>
                      </b-form-group>
                      <div class="row">
                          <div class="col-6 mx-auto button-container">
                              <b-button type="submit" class="submit-button vertical-center">Submit</b-button>
                          </div>
                      </div>
                  </b-form>
              </div>
              <img alt="Login present" src="../assets/present.svg" :class="{animated: animatePresent, tada: animatePresent}" class="present">
          </div>
      </div>
</template>

<script>

    import 'animate.css'
    import 'particles.js'

    export default {
        name: 'login',
        data() {
            return {
                animatePresent: false,
                animateForm: false,
                form: {}
            }
        },
        created() {

            //this has an optional callback if anyone wants to use it
            particlesJS.load('login-page', '../assets/particles.json');

            setTimeout(() => {
                this.animatePresent = true;
            }, 500);

            setTimeout(() => {
                this.animateForm = true;
            }, 2000);
        }
    }

</script>

<style>

    @import url('https://fonts.googleapis.com/css?family=Noto+Sans|Pacifico');

    label {
        color: white;
    }

    input[type='password'] {
        color: #F25C5C !important;
    }

    input[type='email'] {
        font-family: 'Noto Sans', sans-serif;
    }

    .title {
        position: fixed;
        top: 5%;
        left: 1%;
        transform: rotate(-10deg);
        color: white;
        z-index: 6;
        font-size: 45px;
    }

    @media only screen and (max-width: 417px) {
        .title {
            font-size: 42px;
        }
    }

    .button-container {
        margin-top: 12px;
        padding-left: 12px;
        padding-right: 12px;
        height: 41px;
    }

    .submit-button {
        width: 95%;
        height: 36px;
        margin-top: 2.75px;
        margin-left: 2.25%;
        border-radius: 20px !important;
        background-color: white !important;
        border: none !important;
        color: #F25C5C !important;
        transition: all 200ms ease !important;
    }

    .submit-button:hover {
        height: 41px !important;
        width: calc(95% + 5px) !important;
        border-radius: 25px !important;
        margin-left: 1.5%;
        margin-top: 0 !important;
    }

    .col-6 {
        padding-left: 0 !important;
        padding-right: 0 !important;
    }

    .register-link {
        position: absolute;
        z-index: 7;
        font-size: 30px;
        top: 35%;
        left: 75%;
        transform: rotate(45deg);
        color: white !important;
    }

    .login-form {
        z-index: 5;
        width: 100%;
        height: 33%;
        position: absolute;
        top: 50%;
    }

    .present {
        z-index: 4;
        width: 100%;
        max-height: 95vh;
    }

    .present-container {
        z-index: 3;
        position: relative;
        padding: 0 !important;
    }

    /* This is used for the canvas that particles.js generates */
    .particles-js-canvas-el {
        z-index: 2;
        top: 0;
        left: 0;
        position: fixed;
        min-height: 100vh;
        min-width: 100vw;
    }

    .login-page {
        z-index: 1;
        min-width: 100vw;
        min-height: 100vh;
        background-color: #A93331;
        font-family: 'Pacifico', cursive;
    }

    .vertical-center {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
    }

</style>
