<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <errors :errors="errors"></errors>
      <b-form-group id="input-group-2" label="Email:" abel-for="input-2">
        <b-form-input id="input-2" v-model="form.name" type="email" required placeholder="Email"></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input id="input-3" v-model="form.password" required placeholder="Passwor" type="password"></b-form-input>
      </b-form-group>

      <b-button type="submit" style="background-color: rgba(31, 168, 74, 1);">Submit</b-button>
      <b-button type="reset" style="background-color: rgba(168, 50, 49, 1);">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import API from "../utils/API"
import Errors from "./errors";

  export default {
    components: {Errors},
    // name: 'register',
    data() {
      return {
        form: {
          name: '',
          password: ''
        },
        show: true,
        errors: ''
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        // alert(JSON.stringify(this.form))
        // function to add user data to database

        // -------- Validating user doesn't exist --------
        // API.getUser().then(response =>{
        //   console.log(response.data);
        // })
        // for (var i = 0; i < res.length; i++)
        // -------------------------------------------------

        API.registerUser({
            username: this.form.name,
            password: this.form.password
          }).then(res => {
            if(!res.data.errors) {
              // link to user page to display listall
              this.$router.push("/list-all");
            }
            else {
              this.errors = res.data.errors;
            }
        });
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>

<style>
</style>
