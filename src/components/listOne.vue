<template>
    <div class="container">
        <b-card v-for="name in resdata" :key="resdata.indexOf(name)">Name: {{ name.personname }}
            <b-button @click="removeName(name._id)">Delete</b-button>
            <!-- Using value -->
            <b-button v-b-toggle="name._id" class="m-1">Edit</b-button>

            <!-- Element to collapse -->
            <b-collapse v-bind:id="name._id"> Give Rules:
                <div v-for="giverule in name.giverules" :key="giveruledata.indexOf(giverule)"> {{
                    friendlyname(giverule.nameid) }}
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
                    {{ friendlyname(recieverule.nameid) }}
                    <b-button @click="deleteReceiveRule(name._id, recieverule._id)">Delete</b-button>
                </div>
                <b-dropdown class="m-md-2" text="Add Rule">
                    <b-dropdown-item  @click="addRecieverule(name._id, dropname._id)" v-for="dropname in resdata"
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

            <div v-for="match in matchedlist" :key="matchedlist.indexOf(match)">{{ match.from }} gives to {{ match.to
                }}
            </div>
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
                fulllist: '',
                inputdata: '',
                giveruledata: '',
                recieveruledata: '',
                matchedlist: []
            };
        },
        created() {
            API.getListNames(localStorage.getItem('jwt'), this.listpage).then(res => {
                this.resdata = res.data;
            });
            API.getList(localStorage.getItem('jwt'), this.listpage).then(res => {
                this.fulllist = res.data;
            });
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
            checkmatch() {
                let left = [];
                let right = [];
                let matches = [];
                //this.matchedlist = []
                let namelength = this.resdata.length;
                for (var i = 0; i < this.resdata.length; i++) {
                    left.push(this.resdata[i]._id);
                    right.push(this.resdata[i]._id);
                }
                this.shuffle(left);
                this.shuffle(right);
                let loopdone = false;
                while (!loopdone) {
                    //debugger;
                    let sucessful = this.matchcheck(left[0], right[0]);
                    if (!sucessful && matches.length === namelength - 1) {
                        loopdone = true;
                        this.matchedlist = [];
                        this.checkmatch();
                        break;
                    }
                    if (sucessful) {
                        matches.push({ from: left[0], to: right[0] });
                        left.splice(0, 1);
                        right.splice(0, 1);
                        this.shuffle(left);
                        this.shuffle(right);
                    } else {
                        if (left[0] === right[0]) {
                            loopdone = true;
                            this.matchedlist = [];
                            this.checkmatch();
                            break;
                        }
                        this.shuffle(left);
                        this.shuffle(right);
                    }
                    if (matches.length === namelength) {
                        loopdone = true;
                        //this.matchedlist = matches
                        this.fixnames(matches);
                    }
                }


            },
            matchcheck(id1, id2) {
                var indexofid1 = this.resdata.findIndex(i => i._id === id1);
                var indexofid2 = this.resdata.findIndex(i => i._id === id2);
                var findindex = this.resdata[indexofid1].giverules.findIndex(i => i.nameid === id2);
                var findindex4 = this.resdata[indexofid2].receiverules.findIndex(i => i.nameid === id1);
                if (id1 === id2) {
                    return false;
                } else if (findindex > -1) {
                    return false;
                } else if (findindex4 > -1) {
                    return false;
                } else {
                    return true;
                }
            },
            calculateList() {
                this.checkmatch();
            },
            fixnames(matches) {
                var newarray = [];
                for (var i = 0; i < matches.length; i++) {
                    let fromindex = this.resdata.findIndex(j => j._id === matches[i].from);
                    let toindex = this.resdata.findIndex(j => j._id === matches[i].to);
                    let fromname = this.resdata[fromindex].personname;
                    let toname = this.resdata[toindex].personname;
                    newarray.push({ from: fromname, to: toname });
                }
                this.matchedlist = newarray;
            },
            friendlyname(nameid) {
                let nameindex = this.resdata.findIndex(j => j._id === nameid);
                let name = this.resdata[nameindex].personname;
                return name;
            }

        }
    };


</script>

<style>
</style>
