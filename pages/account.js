import Profile from "../components/Account/Profile";
import SearchBar from "../components/Account/SearchBar";
import TodoForm from "../components/Account/TodoForm";
import TodoList from "../components/Account/TodoList";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "./../utils/baseUrl";
import catchErrors from "./../utils/catchErrors";

function Account({user,todos}) {
  
  return (
    <>
      <Profile {...user}/>
      <SearchBar user={user} todos={todos}/>
      <TodoForm user={user}/>
      <TodoList user={user} todos={todos}/>
      
    </>
  
    );
}

Account.getInitialProps = async ctx => {
  
  const { token } = parseCookies(ctx);
  console.log(token);
  if (!token) {
    return { todos: [] };
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/todo`;
  const response = await axios.get(url, payload);
  console.log(response.data)
  return response.data;
};

export default Account;
