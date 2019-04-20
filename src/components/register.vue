<template>
  <div class="container">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-2" label="Email:" type="email" abel-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Email"
        ></b-form-input>
      </b-form-group>

            <b-form-group id="input-group-3" label="Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.password"
          required
          placeholder="Passwor"
        ></b-form-input>
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

  export default {
    // name: 'register',
    data() {
      return {
        form: {
          name: '',
          password: ''
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
        // function to add user data to database
        console.log(this.form.name, this.form.password);
        API.registerUser({
          username: this.form.name,
          password: this.form.password
        }).then(res => {
          console.log(res);
        });
      },
      // register(userData) {
      // // put function to add user data to database
      //   API.registerUser({
      //     username: this.form.name,
      //     password: this.form.password
      //   }).then(res => {
      //     console.log(res);
      //   });
      // },
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
