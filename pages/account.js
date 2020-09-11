import Profile from "../components/Account/Profile";
import SearchBar from "../components/Account/SearchBar";
import TodoForm from "../components/Account/TodoForm";
import TodoList from "../components/Account/TodoList";

function Account({user}) {
  
  return (
    <>
      <Profile {...user}/>
     
      <TodoForm user={user}/>
      <TodoList user={user} />
      
    </>
  
    );
}

export default Account;
