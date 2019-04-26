<template>
    <div class="container">
        <b-card v-for="name in this.resdata" :key="index">Person's Name: {{ name.personname }}</b-card>
        <b-form-input v-model="inputdata" id="input-large" size="lg" placeholder="Create a New List"></b-form-input>
        <b-button @click="createNewName(inputdata)">Submit</b-button>
    </div>
</template>

<script>
    import API from "../utils/API";
    export default {
        name: 'listOne',
        props: ["listpage"],
        data() {
            return {
                resdata: ''
            };
        },
        created() {
            console.log(this.listpage)
            API.getListNames(localStorage.getItem('jwt'), this.listpage).then(res => {
                this.resdata = res.data;
                console.log(res);
            });
        },
        methods: {
            createNewName(listname) {
                API.addNameToList(localStorage.getItem('jwt'), listname).then(res => {
                    API.getListNames(localStorage.getItem('jwt'), this.listpage).then(res => {
                        this.resdata = res.data;
                        console.log(res);
                    });
                });
            }
        }
    };


</script>

<style>
</style>
