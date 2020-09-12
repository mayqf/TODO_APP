import React from "react";
import {Card, Message,Button,Container} from 'semantic-ui-react';
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import formatDate from "../../utils/formatDate";
import cookie from "js-cookie";

const TodoList = ({user, todos, token, setTodos}) => {
  
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

 
  const handleTodoDelete = async  (todo) => {
    if (loading) return;
    try {
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/todo`;
      const token = cookie.get("token");
  
      await axios.delete(url, 
        { headers: 
          { Authorization: token, id: todo._id}
        });
      setTodos(todos.filter(t => t._id !== todo._id));
      setSuccess('Todo deleted successfully.');
      setTimeout(() => {
        setSuccess('');
      }, 2000);
    } catch (error) {
      catchErrors(error, setError);
      setSuccess("");
    } finally {
      setLoading(false);
    }
  }

  const handleTodoEdit = async  (todo) => {
    if (loading) return;
    try {
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/todo`;
      const token = cookie.get("token");
      await axios.put(url, 
        {_id: todo._id}, 
        { headers: 
          { Authorization: token}
        });
      setSuccess('Todo saved successfully.');
      setTimeout(() => {
        setSuccess('');
      }, 2000);
    } catch (error) {
      catchErrors(error, setError);
      setSuccess('');
    } finally {
      setLoading(false);
    }
  }

  if (!todos || todos.length === 0) {
    return <Message info content='You have not created a todo yet. Try it out!'/>
  }

  return (
    <Container>
    {error && <Message error content={error}/>}
    {success && <Message success content={success}/>}
    <Card.Group
    stackable
    itemsPerRow="2"
    fluid="true"
    >
      {todos.map(todo => {
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
              <Button floated='left' basic color='green' onClick={() => handleTodoEdit(todo)} >
                 Edit
              </Button>
              <Button floated='right' basic color='red' onClick={() => handleTodoDelete(todo)}>
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

