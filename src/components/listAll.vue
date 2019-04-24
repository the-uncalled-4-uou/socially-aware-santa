<template>
  <div class="container list-container col-6" v-if="!redirect">
    <div v-if="listItems.length > 0">
      <b-card
          v-for="listitem in listItems"
          :key="listItems.indexOf(listitem)"
          class="mt-3"
      >List Name: {{ listitem.listname }}</b-card>
    </div>
    <b-form @submit.prevent="onSubmit">
      <b-form-input
        id="input-1"
        v-model="form.listName"
        type="text"
        required
        placeholder="List Name"
        class="mt-3"
      ></b-form-input>
      <b-button type="submit" style="background-color: rgba(31, 168, 74, 1);" class="mt-3 col-12">Add List</b-button>
    </b-form>
  </div>
</template>

<script>
import API from "../utils/API";

export default {
  name: "listAll",
  data() {
    return {
      listItems: [],
      form: {
        listName: ""
      },
      redirect: true
    }
  },
  created() {

    API.getUser(localStorage.getItem('jwt')).then(res => {
      if(res.data.errors) {
        this.$router.push('/');
      }
      else {
        this.redirect = false;
      }
    });

    API.getUserLists(localStorage.getItem("jwt")).then(res => {
      if(!res.data.errors) {
        this.listItems = res.data;
      }
    });

  },
  methods: {
      onSubmit() {
          API.addUserList(localStorage.getItem("jwt"), {
              listname: this.form.listName,
          }).then(res => {
              if(!res.data.errors) {
                  this.listItems.push(res.data);
              }
          });
      },
  }
};
</script>

<style>

  .list-container {
      width: 100vw;
      height: 100vh;
  }

</style>
