<template>
  <div class="container" v-if="listItems">
    <b-card
      class="mt-3"
      v-for="listitem in this.listItems"
      :key="this.listItems.indexOf(listitem)"
    >List Name: {{ listitem.listname }}</b-card>
    <b-form @submit.prevent="onSubmit" v-if="show">
      <b-form-input
        id="input-1"
        v-model="form.listName"
        type="text"
        required
        placeholder="List Name"
      ></b-form-input>
      <b-button type="submit" style="background-color: rgba(31, 168, 74, 1);">Add List</b-button>
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
      show: true
    };
  },
  created() {
    API.getUserLists(localStorage.getItem("jwt")).then(res => {
      this.listItems = res.data.lists;
    //   console.log(res);
    });
  },
  methods: {
      onSubmit() {
          API.addUserList(localStorage.getItem("jwt"), {
              listname: this.form.listName,
          }).then(res => {
              this.listItems.push(this.form.listName);
          });
      },
  }
};
</script>

<style>
</style>
