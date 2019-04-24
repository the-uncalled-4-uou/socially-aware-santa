<template>
  <div class="container">
    <b-card
      class="mt-3"
      v-for="listitem in this.resdata"
      :key="this.resdata.indexOf(listitem)"
    >List Name: {{ listitem.listname }}</b-card>
    <b-form @submit="onSubmit" v-if="show">
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
      resdata: "",
      form: {
        listName: ""
      },
      show: true
    };
  },
  created() {
    API.getUserLists(localStorage.getItem("jwt")).then(res => {
      this.resdata = res.data.lists;
      console.log(res);
    });
  },
  methods: {
        onSubmit(evt) {
        evt.preventDefault()
        console.log(JSON.stringify(this.form))
            API.addUserList({
                listName: this.form.listName,
            }).then(res => {
                console.log(res);
            // link to user page to display listall
            this.$router.push("/list-all");
            });
        },
  }
};
</script>

<style>
</style>
