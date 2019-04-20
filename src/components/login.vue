<template>
      <div class="login-page vertical-center" id="login-page">
          <div class="mx-auto col-xl-5 col-lg-7 col-md-9 col-sm-12 present-container vertical-center">
              <div class="login-form">
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
                animatePresent: false
            }
        },
        created() {

            //this has an optional callback if anyone wants to use it
            particlesJS.load('login-page', '../assets/particles.json');

            setTimeout(() => {
                this.animatePresent = true;
            }, 500)
        }
    }

</script>

<style>

    .login-form {
        z-index: 5;
        width: 100%;
        height: 33%;
        position: absolute;
        top: 50%;
        background-color: white;
    }

    .present {
        z-index: 4;
        width: 100%;
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
