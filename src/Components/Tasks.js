import React from 'react'
import { FaPencilAlt, FaCheck } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { GetTasks } from './functions/GetTasks'

export const Tasks = () => {
  const {loading, tasksList} = GetTasks();
  return (
    <div class = "flex flex-col items-center h-[100%]">
      <div class = "font-bold text-7xl mt-[20px] text-[#2563eb]">My Tasks</div>

      <div class = "w-[80%] flex justify-end">
        <Link to = "/create"><FaPencilAlt class = "text-2xl"></FaPencilAlt></Link>
      </div>

      <div class = "w-[100%] h-[100%]">
        {loading ? <h2>Loading</h2> :<>{tasksList.length === 0 ? <h2>You Have no Tasks Good Job!</h2> :
        
          <div class = "flex flex-col items-center w-[100%] h-[100%]">
              {tasksList.map((data) => {
                return(
                  <div class = "flex w-[100%] w-[80%] mt-14 bg-[#f1f5f9] rounded-2xl shadow-lg h-[100%]">
                    <div class = "flex flex-col w-[100%] h-[100%] p-2">
                      <div class = " text-2xl font-medium">{data.title}</div>
                      <div class = "h-[50%]">{data.details}</div>
                      <div class = "text-right text-sm">Due: {data.date}</div>
                    </div>
                    <div>
                      <button class = "rounded-2xl bg-green"><FaCheck/></button>
                    </div>
                  </div>
                )
              })}

          </div>
        
        }</>}
      </div>

      <div></div>
    </div>
  )
}
