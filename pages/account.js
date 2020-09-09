import Profile from "../components/Account/Profile";
import SearchBar from "../components/Account/SearchBar";
import Form from "../components/Account/Form";
import TodoList from "../components/Account/Todolist";

function Account({user}) {
  
  
  return (
    <>
      <Profile {...user}/>
      <SearchBar/>
      <Form/>
      <TodoList/>
    </>
  
    );
}

export default Account;
