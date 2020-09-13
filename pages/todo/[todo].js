import { Message } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import {parseCookies} from 'nookies';
import TodoForm from '../../components/Account/TodoForm';
import {redirectUser} from '../../utils/auth.js'

function EditTodo({ message, todo }, ctx) {

  const handleAfterEdit = () => {
    redirectUser(ctx, '/account');
  }

  return (
    <>
      {message && <Message error content={message} />}
      {todo && <TodoForm initialTodo={todo}  edit={true} onEdit={handleAfterEdit}/>}
    </>
  );
}

EditTodo.getInitialProps = async ctx => {
  const {token} = parseCookies(ctx);
  const todo = ctx.query.todo;
  if (!todo) {
    return { message: 'Todo Not found'};
  }
  const url = `${baseUrl}/api/todo`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
        id: todo
      }
    });
    const {_id, title, description, category} = response.data;
    return { todo: {_id, title, description, category}};
  } catch (err) {
    return { message: err.response.data };
  }
};

export default EditTodo;