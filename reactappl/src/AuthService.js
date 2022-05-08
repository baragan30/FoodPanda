import axios from "axios";
const API_URL = "http://localhost:8080/authcontroller";
class AuthService {

  loginUser(username, password) {
    let loginRequest = {
        username : username,
        password : password,
    }
    return axios.post(`${API_URL}/signin`, loginRequest)
      .then(response => {
          localStorage.setItem("user", JSON.stringify(response.data));
      })
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password
    });
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
export default new AuthService()