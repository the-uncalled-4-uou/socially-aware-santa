<template>
    <div class="container">
        <b-card class="mt-3" v-for="listitem in this.resdata">List Name: {{ listitem.listname }}</b-card>
    </div>
</template>

<script>
    import API from "../utils/API";

    export default {
        name: 'listAll',
        data() {
            return {
                resdata: ''
            };
        },
        created() {
            API.getUserLists(localStorage.getItem('jwt')).then(res => {
                this.resdata = res.data.lists;
                console.log(res);
            });
        },
        methods: {}
    };
</script>

<style>
</style>
