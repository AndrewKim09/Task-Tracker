
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { DateTimePicker} from "@mui/x-date-pickers"
import { useState } from 'react'
import * as yup from "yup";
import {auth, db} from './firebase'
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from 'firebase/firestore'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";





export const Create = () => {
const [selectedDate, setSelectedDate] = useState(null);
const [user] = useAuthState(auth)
const [dateError, setDateError] = useState("")

const TaskSchema = yup.object().shape({
    
    title: yup
        .string()
        .required('a title is required'),
    details: yup
        .string()
        .nullable()
        .optional(),

})

const postsRef = collection(db, "tasks")

const {register, handleSubmit, formState: {errors}, setValue} = useForm({
    resolver: yupResolver(TaskSchema)
})

const onCreateTask = async (data) => {
    console.log("2")
    try {


        const dateTimeStamp = selectedDate ? new Date(selectedDate.$d) : null;


        const { title, details } = data;

        // Add the document to Firestore
        await addDoc(postsRef, {
            title,
            details,
            date: dateTimeStamp,
            username: user?.displayName,
            
        });

        window.location.reload();
    } catch (error) {
        console.error("Error:", error);
    }
};

const onSubmit = async (data, event) => {
    event.preventDefault();
    if(selectedDate && (new Date()) < selectedDate.$d){
        console.log("2")
        await handleSubmit((formData) => onCreateTask(formData))(data);

    }
    else {
        console.log(selectedDate)
        if(selectedDate == null){
            setDateError("please enter a date")
        }
        else{
            setDateError("You cant set a task for the past!")
        }
        
    }
}


  return (
    <div class = "w-[100%]">
        <form onSubmit={(event, data) => {onSubmit(data, event)}} class = "w-[100%] flex flex-col items-center ">
            <div class = "w-[100%] flex flex-col items-center">

                <div class = 'w-[100%] flex items-start mt-[5px]'>
                    <Link class = " justify-self-start" to = "/tasks"><FaArrowLeft class = 'text-2xl'></FaArrowLeft></Link>
                </div>
                    <div class = "font-bold text-7xl mt-[20px] text-[#2563eb] text-center">Add a task</div>
            </div>

            <div class = "flex flex-col w-[85%]">
                <div class = 'flex'>
                    <label id = "title">Title</label>
                    <p class = "ml-6 text-red-700">{errors.title?.message}</p>
                </div>
                <input type = "text" class = "rounded-2xl px-6 py-4" name = "title" id = "title" placeholder='What was my task?' {...register("title")}></input>
            </div>

            <div class = "flex flex-col w-[85%]">
                <div class = "flex">
                    <label id = "details">Details</label>
                </div>
                <textarea type = "text" id = "details" name = "details" placeholder='What was i supposed to do to complete my task' class = "rounded-2xl px-6 py-4 h-[300px]" {...register("details")}></textarea>
            </div>

            <div class = "flex flex-col w-[85%]">
                <div class = 'flex'>
                    <label>Time</label>
                    <p class = "ml-6 text-red-700">{dateError}</p>
                </div>

                    <DateTimePicker views={['year', 'month', 'day', 'hours', 'minutes']} onChange ={(date) => {setDateError(""); setSelectedDate(date)}} selected = {selectedDate} />

            </div>

            <button type = "submit" class = "text-[#2563eb] bg-[#3ccced] rounded-2xl px-4 py-1 mt-2">Submit</button>
        </form>

        
    </div>
  )
}
