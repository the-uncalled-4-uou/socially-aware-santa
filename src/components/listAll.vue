<template>
    <div class="container">
        <b-card class="mt-3" v-for="listitem in this.resdata">List Name: {{ listitem.listname }}</b-card>
    </div>
</template>

<script>
    import API from "../utils/API"

    export default {
        name: 'listAll',
        data() {
            return {
                form: {
                    name: '',
                    password: ''
                },
                show: true,
                resdata: ''
            }
        },
        created() {
            API.getUserLists(localStorage.getItem('jwt')).then(res => {
                this.resdata = res.data.lists
                console.log(res);
            });
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                // alert(JSON.stringify(this.form))
                // function to add user data to database
                console.log(this.form.name, this.form.password);

                // -------- Validating user doesn't exist --------
                // API.getUser().then(response =>{
                //   console.log(response.data);
                // })
                // for (var i = 0; i < res.length; i++)
                // -------------------------------------------------

                API.registerUser({
                    username: this.form.name,
                    password: this.form.password
                }).then(res => {
                    console.log(res);
                    // link to user page to display listall
                    this.$router.push("/list-all");
                });
            },
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
