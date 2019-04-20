<script>
import axios from "axios";

export default {

  // Gets user info
  getUser: function () {
    // should be /api/authenticate?
    return axios.get("/api/users");
  },
  // Gets the lists with the users id
    //   getLists: function (id) {
    //     return axios.get("/api/list?/" + id);
    //   },
  // Deletes the list item with the given id
    //   deleteListItem: function (id) {
    //     return axios.delete("/api/list?/" + id);
    //   },
  // Saves a new user to the database
  registerUser: function (userData) {
    return axios.post("/api/register", userData);
  }
};
</script>