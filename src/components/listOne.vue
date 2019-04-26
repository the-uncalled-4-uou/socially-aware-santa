<template>
    <div class="container">
        <b-card v-for="name in resdata" :key="resdata.indexOf(name)">Person's Name: {{ name.personname }}</b-card>
        <b-form-input v-model="inputdata" id="input-large" size="lg" placeholder="Add a Name to the list"></b-form-input>
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
                resdata: '',
                inputdata: ''
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
                API.addNameToList(localStorage.getItem('jwt'), this.listpage, listname).then(res => {
                    API.getListNames(localStorage.getItem('jwt'), this.listpage).then(res => {
                        this.inputdata = ''
                        this.resdata = res.data;
                        console.log(res);
                    });
                });
            },
            removeName(namid)
        }
    };


</script>

<style>
</style>
