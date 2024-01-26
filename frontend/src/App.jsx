import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './components/Table'
import TodoForm from './components/TodoForm'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async() => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/todo/');
      setTodos(response.data);
      console.log(response.data); // Log the data, not 'todos'
  } catch (err) {
      console.log(err);
  }
  } 

  const handleTodos = (newTodos) => {
    setTodos(prevTodos => [...prevTodos, newTodos])
  }

  return (
    <section className="bg-black text-white">
  <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-100 via-blue-500 to-purple-800 bg-clip-text font-extrabold text-transparent sm:text-5xl"
      >
        Todo List

        <span className="sm:block"> Increase Productivity. </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
      The problem isn’t when you have a lot to do; it’s when you have too much to do and the only way to keep the quota up is to hurry
      </p>
    </div>
  </div>
  <TodoForm onAddTodo={handleTodos}/>
  <Table todos={todos} setTodos={setTodos} />
  
</section>
  )
}

export default App
