import axios from 'axios'
import React, { useRef, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import App from '../App'

const TodoForm = ({ onAddTodo }) => {

    const [newtodo, setNewTodo] = useState({
        'body': ''
    })

    const inputRef = useRef(null);

    const handleChange = (e) => {
        setNewTodo(prev => ({
            ...prev,
            'body': e.target.value
        }))
    }

    const handlePost = async() => {
        try{
            const todo = await axios.post('http://127.0.0.1:8000/api/todo/', newtodo)
            toast.success("Todo Added")
            onAddTodo(todo.data)
            inputRef.current.value = ''

        }
        catch(err){
            toast.error(err.message)
        }
    }
  return (
    <div className='flex flex-row justify-center m-3'>
        <input placeholder='Add ToDo' className='text-black max-w-4xl border-2 border-black rounded-xl shadow-xl text-center' onChange={handleChange} value={newtodo.body} ref={inputRef}/>
        <button className='bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 text-white font-medium text-2xl rounded-xl p-2 px-5' onClick={handlePost}>Add</button>
        <Toaster />
    </div>
  )
}

export default TodoForm