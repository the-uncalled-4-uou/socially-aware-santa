<template>
    <div class="container">
        <b-card v-for="listitem in this.resdata" :key="listitem.listname">List Name:
            <div @click="onListClick(listitem._id)">{{ listitem.listname }}</div>
            <b-button class="float-right" @click="deleteList(listitem._id)">Delete</b-button></b-card>
        <b-form-input v-model="inputdata" id="input-large" size="lg" placeholder="Create a New List"></b-form-input>
        <b-button @click="createNewList(inputdata)">Submit</b-button>
    </div>
</template>

<script>
    import API from "../utils/API";

    export default {
        name: 'listAll',
        data() {
            return {
                resdata: {},
                inputdata: ''
            };
        },
        created() {
            API.getUserLists(localStorage.getItem('jwt')).then(res => {
                this.resdata = res.data;
                console.log(res);
                console.log(this.resdata);
            });
        },
        methods: {
            onListClick(listid) {
                let listpage = listid;
                this.$router.push({ name: 'listone', params: { listpage } });
                //this.$router.push({path: '/list-one'})
            },
            createNewList(listname) {
                console.log(this.inputdata);
                API.createNewList(localStorage.getItem('jwt'), listname).then(res => {
                    API.getUserLists(localStorage.getItem('jwt')).then(res => {
                        this.resdata = res.data;
                        console.log(res);
                        console.log(this.resdata);
                        console.log(this.inputdata)
                        this.inputdata = '';
                    });

                });


            },
            deleteList(listid) {
                API.deleteList(localStorage.getItem('jwt'), listid).then(res => {
                    API.getUserLists(localStorage.getItem('jwt')).then(res => {
                        this.resdata = res.data;
                        console.log(res);
                        console.log(this.resdata);
                    });
                })

            }

        }
    };
</script>

<style>
</style>
