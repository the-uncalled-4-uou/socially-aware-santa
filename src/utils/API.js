
import axios from "axios";

export default {

<<<<<<< HEAD
  // Gets user info
  login (data) {
    return axios.post("/api/authenticate", data);
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
  addUserList(jwt, data) {
    return axios({
      method: 'post',
      url: '/api/lists',
      headers: {'x-access-token': jwt},
      data: data
    })
  }
=======
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
    }

>>>>>>> master
};