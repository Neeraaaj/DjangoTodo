import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {MdOutlineDeleteOutline, MdEditNote, MdOutlineCheckBox, MdOutlineCheckBoxOutlineBlank} from 'react-icons/md'


const Table = ({ todos, setTodos }) => {

    const [editTodos, setEditTodos] = useState({
        'body': ''
    })
    
    const handleDelete = async(id) => {
        try{
            await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`)
            toast.success("Todo Deleted")
            const newTodos = todos.filter(todo => todo.id !== id)
            setTodos(newTodos)
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    const handleEdit = async (id, value) => {
        try{
            const response = await axios.patch(`http://127.0.0.1:8000/api/todo/${id}/`, value)
            const newTodos = todos.map(todo => todo.id === id ? response.data : todo)
            setTodos(newTodos)
        }
        catch (err) {
            toast.error(err.message)
        }
    }

    const handleCheckBox = (id, value) => {
        handleEdit(id, {
            'completed': !value
        })
        console.log(id, value)
    }

    const handleModal = () => {
        console.log('executed')
        document.getElementById('modal').classList.toggle('hidden')
    }

    const handleChange = (e) => {
        setEditTodos(prevTodos => ({
            ...prevTodos,
            'body': e.target.value
        }))
    }

    return(
        

<div className="relative overflow-x-auto ">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-white">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Checkbox
                </th>
                <th scope="col" className="px-6 py-3">
                    To Do
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Date Created
                </th>
                <th scope="col" className="px-6 py-3">
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            {todos.map((todo, index) => {
                return(
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span onClick={() => handleCheckBox(todo.id, todo.completed)} 
                    className="inline-block cursor-pointer text-2xl">{todo.completed ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}</span>
                </th>
                <td className="px-6 py-4">
                    {todo.body}
                </td>
                <td className="py-4">
                    <span  
                    className={ `p-1.5 w-50 font-medium tracking-wider rounded-md  text-white ${todo.completed ? 'bg-green-300' : 'bg-red-300'}`}>{ todo.completed ? "Done" : "Not Completed"}</span>
                </td>
                <td className="px-6 py-4">
                    {`${new Date(todo.created).toLocaleDateString()}`}
                </td>
                <td className="px-6 py-4 text-2xl font-bold text-white grid grid-flow-col items-center mt-5">
                    <span className="inline-block cursor-pointer"><MdEditNote  onClick={() => {
                        handleModal();
                        setEditTodos(todo);
                    }}/></span>
                    <span className="inline-block cursor-pointer" ><MdOutlineDeleteOutline onClick={() => handleDelete(todo.id)} /></span>
                </td>
            </tr>
                )
            })}
        </tbody>
    </table>
    <Toaster />
    <div className="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal">
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                <div className="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <label className="font-medium text-gray-800">Edit Todo</label>
                        <input type="text" className="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3 text-black" onChange={handleChange} />
                    </div>
                    <div class="bg-gray-200 px-4 py-3 text-right">
                        <button type="button" className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2" onClick={()=> handleModal()}><i class="fas fa-times"></i> Cancel</button>
                        <button type="button" className="py-2 px-4 bg-blue-500 text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500" onClick={() => handleEdit(editTodos.id, editTodos)}><i className="fas fa-plus"></i> Edit</button>
                    </div>
            </div>
        </div>
    </div>
</div>

    )
}

export default Table