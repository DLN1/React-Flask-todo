import axios from "axios";

export default {
  get_todos() {
    return axios.get("http://localhost:5000/todos");
  },
  create_todo(data) {
    return axios.post("http://localhost:5000/todos", data);
  },
  update_todo(id, item) {
    return axios.put(`http://localhost:5000/todos/${id}`, item);
  },
  remove_todos(id) {
    console.log(id)
  return axios.delete(`http://localhost:5000/todos`);
},
};
