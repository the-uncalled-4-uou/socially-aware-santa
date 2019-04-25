
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
    }
};