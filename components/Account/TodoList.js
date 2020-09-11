import React from "react";
import { parseCookies } from "nookies";
import {Card, Message} from 'semantic-ui-react';
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";

const TodoList = ({user, todos, token}) => {
  
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");
  const [inProgressTodos, setInProgressTodos] = React.useState([])

 
  const handleTodoDelete = async  (todo) => {
    if (loading && inProgressTodos.includes(todo._id)) return;
    try {
      setInProgressTodos([...inProgressTodos, todo._id]);
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/todo`;
      await axios.delete(url, {_id: todo._id});
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
      setInProgressTodos(inProgressTodos.filter(id => id !== todo._id));
    }
  }

  if (!todos || todos.length === 0) {
    return <Message info content='You have not created a todo yet. Try it out!'/>
  }

  return (
    <>
    {error && <Message error content={error}/>}
    <Card.Group>
      {todos.map(todo => {a
        const isInProgress = inProgressTodos.includes(id => id === todo._id);
        return (
        <Card>
          <Card.Content>
            <Card.Header>{todo.title}</Card.Header>
            <Card.Meta>{todo.user.name}</Card.Meta>
            <Card.Description>
              {todo.description}
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => handleTodoEdit(todo)} disabled={isInProgress} loading={isInProgress} >
            Edit
          </Button>
          <Button basic color='red' onClick={() => handleTodoDelete(todo)} disabled={isInProgress} loading={isInProgress}>
            Delete
          </Button>
        </div>
      </Card.Content>
        </Card>
      )})}
    </Card.Group>
    </>
  );
};

TodoList.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  if (!token) {
    return { todos: [] };
  }
  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/todo`;
  const response = await axios.get(url, payload);
  console.log(response)
  return {...response.data, token};
};


export default TodoList;

