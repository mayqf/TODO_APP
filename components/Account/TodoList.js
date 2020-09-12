import React from "react";
import {Card, Message,Button,Container} from 'semantic-ui-react';
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import formatDate from "../../utils/formatDate";
import cookie from "js-cookie";

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
      const token = cookie.get("token");
  
      await axios.delete(url, 
        {_id: todo._id}, 
        { headers: 
          { Authorization: token}
        });
      setSuccess(true);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
      setInProgressTodos(inProgressTodos.filter(id => id !== todo._id));
    }
  }

  const handleTodoEdit = async  (todo) => {
    if (loading && inProgressTodos.includes(todo._id)) return;
    try {
      setInProgressTodos([...inProgressTodos, todo._id]);
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/todo`;
      const token = cookie.get("token");
      await axios.put(url, 
        {_id: todo._id}, 
        { headers: 
          { Authorization: token}
        });
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
    <Container>
    {error && <Message error content={error}/>}
    <Card.Group
    stackable
    itemsPerRow="2"
    fluid="true"
    >
      {todos.map(todo => {
        const isInProgress = inProgressTodos.includes(id => id === todo._id);
        return (
        <Card  key={todo._id} fluid="true" color='violet'>
          <Card.Content>
            <Card.Header>{todo.title}</Card.Header>
            <Card.Meta>{todo.category}</Card.Meta>
            <Card.Meta floated='right'>Created at {formatDate(todo.createdAt)}</Card.Meta>
            <Card.Description>
            {todo.description}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button floated='left' basic color='green' onClick={() => handleTodoEdit(todo)} disabled={isInProgress} loading={isInProgress} >
                 Edit
              </Button>
              <Button floated='right' basic color='red' onClick={() => handleTodoDelete(todo)} disabled={isInProgress} loading={isInProgress}>
                 Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      )})}
    </Card.Group>
    </Container>
  );
};


export default TodoList;

