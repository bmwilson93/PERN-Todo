import React, { useState } from 'react'

const InputTodo = ({ url }) => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {description};
      const response = await fetch(url,
        {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify(body)
        }
      );

      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className='text-center mt-5'>Todo List</h1>
      <form className='d-flex mt-5' onSubmit={onSubmitForm}>
        <input type='text' 
          className='form-control' 
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className='btn btn-success'>Add</button>
      </form>
    </>
  )
}

export default InputTodo