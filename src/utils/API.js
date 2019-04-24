
import axios from "axios";

export default {

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
};