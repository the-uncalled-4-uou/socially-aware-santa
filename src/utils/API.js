
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
    addNameToList(jwt, listid) {
        return axios({
            method: 'post' ,
            url: 'api/lists/' + listid + '/names'
        })
    },
    addUserList(jwt, data) {
        return axios({
            method: 'post',
            url: '/api/lists',
            headers: {'x-access-token': jwt},
            data: data
        })
    }

};