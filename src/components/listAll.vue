<template>
    <div class="container">
        <b-card v-for="listitem in this.resdata" :key="this.resdata.indexOf(listitem)">List Name: {{ listitem.listname }}</b-card>
    </div>
</template>

<script>
    import API from "../utils/API";

    export default {
        name: 'listAll',
        data() {
            return {
                resdata:  {}
            };
        },
        created() {
            API.getUserLists(localStorage.getItem('jwt')).then(res => {
                this.resdata = res.data;
                console.log(res);
                console.log(this.resdata)
            });
        },
        methods: {}
    };
</script>

<style>
</style>
