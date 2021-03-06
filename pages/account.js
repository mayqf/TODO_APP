import React, {useState} from 'react';
import Profile from "../components/Account/Profile";
import SearchBar from "../components/Account/SearchBar";
import TodoForm from "../components/Account/TodoForm";
import TodoList from "../components/Account/TodoList";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "./../utils/baseUrl";

function Account({user,todos}) {
  
  const [todosInView, setTodosInView] = useState(todos);

  return (
    <>
      <Profile {...user}/>
      <SearchBar user={user} todos={todosInView}/>
      <TodoForm user={user} setTodos={setTodosInView}/>
      <TodoList user={user} todos={todosInView} setTodos={setTodosInView}/>
    </>
    );
}

Account.getInitialProps = async ctx => {
  
  const { token } = parseCookies(ctx);
  if (!token) {
    return { todos: [] };
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/todo`;
  const response = await axios.get(url, payload);
  return response.data;
};

export default Account;
