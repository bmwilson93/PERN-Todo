import React from 'react';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

import './App.css';


function App() {
  const url = 'http://localhost:5000/todos';
  return (
    <>
      <div className="container">
      <InputTodo url={url}></InputTodo>
      <ListTodos url={url}></ListTodos>
      </div>
    </>
  );
}

export default App;
