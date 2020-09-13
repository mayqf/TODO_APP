import User from "../../models/User";
import Todo from "../../models/Todo";
import jwt from "jsonwebtoken";
import connectDb from "../../utils/connectDb";

connectDb();

export default async (req, res) => {
  
  if (!req.headers.authorization) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found. Try to login again.');
    }

    switch (req.method) {
      case "GET":
        await getTodos(req, res, user);
        break;
      case "POST":
        await createTodo(req, res, user);
        break;
      case "PUT":
        await editTodo(req, res);
        break;
      case "DELETE":
        await deleteTodo(req, res, user);
        break;
      default:
        res.status(405).send(`Method ${req.method} not allowed`);
        break;
    }
  
  } catch(error) {
    return res.status(401).json({error: error.message});
  }
};

async function getTodos(req, res, user) {
  if (req.headers.id) {
    return getSingleTodo(req.headers.id, res)
  }
  try {
    const todos = await Todo.find({user: user._id}).populate({path: 'user', model: User});
    return res.json({todos});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

async function getSingleTodo(id, res) {
  try {
    const todo = await Todo.findOne({_id: id});
    return res.json(todo);
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

async function createTodo(req, res, user) {
  const {title, description, category} = req.body;
  
  try {
    if (!title || !description || !category) {
      return res.status(422).send("Todo missing one or more fields");
    }
    const todo = await new Todo({
      title,
      description,
      category,
      user: user._id
    }).save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).send("Server error in creating todo");
  }
}

async function editTodo(req, res) {
  const {_id, title, description, category} = req.body;
  try {
    if (!_id) {
      throw new Error('Missing input values for todo edit: _id is required.');
    }
    const todo = await Todo.findOne({_id}).populate({path: 'user', model: User});;
    if (!todo) {
      throw new Error('Todo item could not be found.');
    }
    todo.title = title;
    todo.description = description;
    todo.category = category;
    const updatedTodo = await todo.save();
    return res.json({todo: updatedTodo});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}

async function deleteTodo(req, res, user) {
  const {id} = req.headers;
  try {
    if (!id) {
      throw new Error('Missing input values for todo deletion: _id is required.');
    }
    await Todo.findOneAndDelete({_id: id, user: user._id});
    return res.status(204).json({success: true});
  } catch (error) {
    return res.status(500).json({error: error.message});
  }
}