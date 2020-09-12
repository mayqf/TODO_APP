import React from "react";
import {
  Form,
  Input,
  Button,
  Segment,
  Message,
  Header,
} from "semantic-ui-react";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import cookie from "js-cookie";

const INITIAL_TODO = {
  title: "",
  description: "",
  category: "",
};


function TodoForm({initialTodo = INITIAL_TODO, edit = false, onEdit}) {
 
  const [todo, setTodo] = React.useState(initialTodo);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isTodoReady = Object.values(todo).every(el => Boolean(el));
    isTodoReady ? setDisabled(false) : setDisabled(true);
  }, [todo]);

  function handleChange(event) {
    const { name, value } = event.target;
    setTodo(prevState => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setError("");
      const url = `${baseUrl}/api/todo`;
      const token = cookie.get("token");
      const todoApi = edit ? axios.put : axios.post;
      await todoApi(url, 
        {...todo}, 
        { headers: 
          { Authorization: token}
        });
      setSuccess(true);
      setTimeout(() => {
        setSuccess('');
        onEdit && onEdit();
      }, 2000);
    } catch (error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Form
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message error header="Oops!" content={error} />
        <Message
          success
          icon="check"
          header="Success!"
          content={edit ? 'Todo has been edited.' : "New todo has been created."}
        />
        <Segment>
          <Header as="h2" block>
            {edit ? 'Edit Todo' : 'Create New Todo'}
          </Header>
          <Form.Field
            control={Input}
            name="title"
            placeholder="Title"
            value={todo.title}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="description"
            placeholder="Description"
            value={todo.description}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="category"
            placeholder="Category"
            value={todo.category}
            onChange={handleChange}
          />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
          float='right'
        />
        </Segment>
      </Form>
    </>
  );
}

TodoForm.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);
  return {token};
};

export default TodoForm;
