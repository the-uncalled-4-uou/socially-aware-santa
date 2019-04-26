<template>
    <div class="container">
        <b-card v-for="name in resdata" :key="resdata.indexOf(name)">Name: {{ name.personname }}
            <b-button @click="removeName(name._id)">Delete</b-button>
            <!-- Using value -->
            <b-button v-b-toggle="name._id" class="m-1">Edit</b-button>

            <!-- Element to collapse -->
            <b-collapse v-bind:id="name._id"> Give Rules:
                <div v-for="giverule in name.giverules" :key="giveruledata.indexOf(giverule)"> {{ giverule.nameid }}
                    <b-button @click="deleteGiveRule(name._id, giverule._id)">Delete</b-button>
                    <br>

                </div>
                <b-dropdown class="m-md-2" text="Add Rule">
                    <b-dropdown-item @click="addGiveRule(name._id, dropname._id)" v-for="dropname in resdata"
                                     :key="resdata.indexOf(dropname)">{{ dropname.personname }}
                    </b-dropdown-item>
                </b-dropdown>
                <br>
                <br>
                Recieve Rules:
                <div v-for="recieverule in name.receiverules" :key="recieveruledata.indexOf(recieverule)">
                    {{ recieverule.nameid }}
                    <b-button @click="deleteReceiveRule(name._id, recieverule._id)">Delete</b-button>
                </div>
                <b-dropdown class="m-md-2" text="Add Rule">
                    <b-dropdown-item @click="addRecieverule(name._id, dropname._id)" v-for="dropname in resdata"
                                     :key="resdata.indexOf(dropname)">{{ dropname.personname }}
                    </b-dropdown-item>
                </b-dropdown>
            </b-collapse>
        </b-card>
        <br>
        <b-form-input v-model="inputdata" id="input-large" size="lg"
                      placeholder="Add a Name to the list"></b-form-input>
        <br>
        <b-button @click="createNewName(inputdata)">Submit</b-button>
        <br>
        <br>

        <b-button @click="calculateList()">Generate List</b-button>
        <br>
        <br>
        <b-card>
            Matches:
            <br>
            <br>

            <div v-for="match in fulllist.matchedlist">{{ match }}</div>
        </b-card>
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
                fulllist:'',
                inputdata: '',
                giveruledata: '',
                recieveruledata: '',
                matchedlist: []
            };
        },
        created() {
            console.log(this.listpage);
            API.getListNames(localStorage.getItem('jwt'), this.listpage).then(res => {
                this.resdata = res.data;
                console.log(this.resdata)
            });
            API.getList(localStorage.getItem('jwt'), this.listpage).then(res => {
                this.fulllist = res.data
            })
        },
        methods: {
            createNewName(listname) {
                API.addNameToList(localStorage.getItem('jwt'), this.listpage, listname).then(res => {
                    API.getListNames(localStorage.getItem('jwt'), this.listpage).then(res => {
                        this.inputdata = '';
                        this.resdata = res.data;
                    });
                });
            },
            removeName(nameid) {
                API.removeNameFromList(localStorage.getItem('jwt'), this.listpage, nameid).then(res => {
                    API.getListNames(localStorage.getItem('jwt'), this.listpage).then(res => {
                        this.resdata = res.data;
                    });
                });

            },
            deleteGiveRule(nameid, ruleid) {
                API.deleteGiveRule(localStorage.getItem('jwt'), this.listpage, nameid, ruleid).then(res => {
                    API.getListNames(localStorage.getItem('jwt'), this.listpage).then(res => {
                        this.resdata = res.data;
                    });
                });
            },
            addGiveRule(nameid, rulenameid) {
                API.addGiverule(localStorage.getItem('jwt'), this.listpage, nameid, rulenameid).then(res => {
                    API.getListNames(localStorage.getItem('jwt'), this.listpage).then(res => {
                        this.resdata = res.data;
                    });
                });

            },
            deleteReceiveRule(nameid, ruleid) {
                API.apideleteReceiveRule(localStorage.getItem('jwt'), this.listpage, nameid, ruleid).then(res => {
                    API.getListNames(localStorage.getItem('jwt'), this.listpage).then(res => {
                        this.resdata = res.data;
                    });
                });
            },
            addRecieverule(nameid, rulenameid) {
                API.apiAddRecieverule(localStorage.getItem('jwt'), this.listpage, nameid, rulenameid).then(res => {
                    API.getListNames(localStorage.getItem('jwt'), this.listpage).then(res => {
                        this.resdata = res.data;
                    });
                });

            },
            shuffle(a) {
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
            },
            calculateList() {
                let leftlist = [];
                let rightlist = [];
                let finallist = [];
                for (let i = 0; i < this.resdata.length; i++) {
                    leftlist.push(this.resdata[i]._id)
                    rightlist.push(this.resdata[i]._id)
                }
                this.shuffle(rightlist)

                for (let i = 0; i < leftlist.length; i++) {
                    let currentindex = this.resdata.findIndex(x =>x._id === leftlist[i])
                    let giverulearray = this.resdata[currentindex].giverules
                    if (this.resdata[currentindex].giverules.length !== 0) {

                    }
                }

                console.log(leftlist)
                console.log(rightlist)
                console.log(finallist)
            }
        }
    };


</script>

<style>
</style>
