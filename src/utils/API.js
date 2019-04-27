
import axios from "axios";

export default {

    // Log user in
    login (data) {
        return axios.post("/api/authenticate", data);
    },
    getUser(jwt) {
        return axios({
            method: 'get',
            url: '/api/users',
            headers: {'x-access-token': jwt}
        });
    },
    // Saves a new user to the database
    registerUser (userData) {
        return axios.post("/api/register", userData);
    },
    getUserLists (jwt) {
        return axios({
            method: 'get',
            url: '/api/lists',
            headers: {'x-access-token': jwt}
        });
    },
    getListNames (jwt, listid) {
        return axios({
            method: 'get',
            url: '/api/lists/' + listid + '/names',
            headers: {'x-access-token': jwt}
        })
    },
    createNewList (jwt, listname) {
        return axios({
            method: 'post',
            url: '/api/lists',
            headers: {'x-access-token': jwt},
            data: {listname: listname}
        })
    },
    deleteList (jwt, listid) {
        return axios({
            method: 'delete',
            url: '/api/lists/' + listid,
            headers: {'x-access-token': jwt},
        })
    },
    addNameToList(jwt, listid, name) {
        return axios({
            method: 'post' ,
            url: 'api/lists/' + listid + '/names',
            headers: {'x-access-token': jwt},
            data: {"personname": name}
        })
    },
    removeNameFromList(jwt, listid, nameid) {
        return axios({
            method: 'delete' ,
            url: 'api/lists/' + listid + '/names/' + nameid,
            headers: {'x-access-token': jwt}
        })
    },
    deleteGiveRule(jwt, listid, nameid, ruleid) {
        return axios ({
            method: 'delete',
            url: '/api/lists/' + listid + '/names/' + nameid + '/giverules/' + ruleid,
            headers: {'x-access-token': jwt}
        })
    },
    addGiverule(jwt, listid, nameid, rulenameid) {
        return axios ({
            method: 'post',
            url: '/api/lists/' + listid + '/names/' + nameid + '/giverules',
            headers: {'x-access-token': jwt},
            data: {nameid: rulenameid}
        })
    },
    apideleteReceiveRule(jwt, listid, nameid, ruleid) {
        return axios ({
            method: 'delete',
            url: '/api/lists/' + listid + '/names/' + nameid + '/receiverules/' + ruleid,
            headers: {'x-access-token': jwt}
        })
    },
    apiAddRecieverule(jwt, listid, nameid, rulenameid) {
        return axios ({
            method: 'post',
            url: '/api/lists/' + listid + '/names/' + nameid + '/receiverules',
            headers: {'x-access-token': jwt},
            data: {nameid: rulenameid}
        })
    },
    getList(jwt, listid) {
        return axios ({
            method: 'get',
            url: '/api/lists/' + listid,
            headers: {'x-access-token': jwt}
        })
    }

};