<template>
    <div class="list-page">

        <h1 class="title">Socially Aware Santa</h1>
        <div>
            <div class="table">  
                <b-card class="text-center list-names" v-for="listitem in this.resdata" :key="listitem.listname">
                    <div @click="onListClick(listitem._id)">{{ listitem.listname }}</div>
                    <b-button class="float-right delete-btn" @click="deleteList(listitem._id)">✗ Delete</b-button></b-card>
                <b-form-input v-model="inputdata" id="input-large" size="lg" placeholder="Create a New List"></b-form-input>
                <b-button class="float-right submit-btn" @click="createNewList(inputdata)">Submit</b-button>
            </div>
        </div>
        <div class="logout-button">
            <div class="log-div">
                <b-button class="log-btn" @click="logout()">Logout</b-button>
            </div>
        </div>

    </div>
</template>

<script>
    import API from "../utils/API";
    import 'animate.css'

    export default {
        name: 'listAll',
        data() {
            return {
                resdata: {},
                inputdata: '',
                animateForm: true,
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

            },
            logout() {
                console.log("this")
                localStorage.setItem('jwt', '')
                this.$router.push('/');
            }

        }
    };
</script>

<style>

    .title {
        position: fixed;
        top: 5%;
        left: 1%;
        transform: rotate(-10deg);
        color: white;
        z-index: 6;
        font-size: 45px;
    }
    @media only screen and (max-width: 417px) {
        .title {
            font-size: 42px;
        }
    }
    .list-names {
        font-size: 25px;
        vertical-align: middle;
    }
    .list-page {
        z-index: 1;
        min-width: 100vw;
        min-height: 100vh;
        background-color: #A93331;
        font-family: 'Pacifico', cursive;
    }
    .table {
        position: fixed;
        top: 20%;
    }
    .logout-button {
        position: fixed;
        bottom: 5%;
        /* text-align: center; */
        width: 100%;
    }
    .log-div {
        text-align: center;
    }
    .log-btn {
        border-radius: 20px !important;
        background-color: white !important;
        border: none !important;
        color: #F25C5C !important;
    }
    .log-btn:hover {
        height: 41px !important;
        border-radius: 25px !important;
        margin-left: .5%;
        margin-top: 0 !important;
    }
    .submit-btn {
        margin-top: 1%;
        margin-right: 1%;
        border-radius: 20px !important;
        background-color: white !important;
        border: none !important;
        color: #F25C5C !important;
    }
    .submit-btn:hover {
        height: 41px !important;
        border-radius: 25px !important;
        margin-left: .5%;
        margin-top: 3 !important;
    }
    .delete-btn {
        border-radius: 20px !important;
        background-color: white !important;
        border: none !important;
        color: #F25C5C !important;
    }
    .delete-btn:hover {
        height: 41px !important;
        border-radius: 25px !important;
        margin-left: 1.5%;
        margin-top: 0 !important;
    }

</style>
