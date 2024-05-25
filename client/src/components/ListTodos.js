import React, { useEffect, useState } from 'react'
import EditTodo from './EditTodo';

const ListTodos = ({ url }) => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      const deleteTodo = await fetch(`${url}/${id}`, 
        {
          method: "DELETE"
        }
      );

      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.log(err);
    }
  }

  const getTodos = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td>John</td>
            <td>Doe</td>
            <td>john@example.com</td>
          </tr> */}
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td><EditTodo todo={todo} url={url}/></td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ListTodos