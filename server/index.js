const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());

// Routes

// create a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
})

// get all todos
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo;")

    res.json(allTodos.rows);
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
})

// get a todo
app.get('/todos/:id', async (req, res) => {
  const id = req.params.id
  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
    
    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
})

// update a todo
app.put('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const { description } = req.body;
    const updatedToto = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

    res.json("The Todo was updated!");
  } catch (err) {
    console.log(err)
    res.status(400).send(err);
  }
})

// delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.send("Todo deleted.");
  } catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
})

app.listen(5000, () => {
  console.log("server is listening on port 5000");
})