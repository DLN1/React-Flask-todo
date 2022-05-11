import axios from "axios";

export default {
  get_todos() {
    return axios.get("https://todo-react-flask-app.herokuapp.com/todos");
  },
  create_todo(data) {
    return axios.post("https://todo-react-flask-app.herokuapp.com/todos", data);
  },
  update_todo(id, item) {
    return axios.put(`https://todo-react-flask-app.herokuapp.com/todos/${id}`, item);
  },
  remove_todos(id) {
    console.log(id)
  return axios.delete(`https://todo-react-flask-app.herokuapp.com/todos`);
},
};
