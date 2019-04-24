
import axios from "axios";

export default {

  // Gets user info
  login(data) {
      return axios.post("/api/authenticate", data);
  },
  // Gets the lists with the users id
    //   getLists: function (id) {
    //     return axios.get("/api/lists/" + id);
    //   },
  // Deletes the list item with the given id
    //   deleteListItem: function (id) {
    //     return axios.delete("/api/lists/" + id);
    //   },
  // Saves a new user to the database
  registerUser(userData) {
      return axios.post("/api/register", userData);
  }
}