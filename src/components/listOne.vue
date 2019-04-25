<template>
    <div class="container">
        <b-card class="mt-3" v-for="name in this.resdata" :key="this.resdata.indexOf(name)">Person's Name: {{ name.personname }}</b-card>
    </div>
</template>

<script>
    import API from "../utils/API";
    export default {
        name: 'listOne',
        data() {
            return {
                resdata: ''
            };
        },
        created() {
            API.getListNames(localStorage.getItem('jwt'), '5cc093dd2a6bee137732f942').then(res => {
                this.resdata = res.data;
                console.log(res);
            });
        },
        methods: {}
    };


</script>

<style>
</style>
