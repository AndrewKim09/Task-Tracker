import { useEffect } from 'react'
import {auth, db} from "../firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react';
import { getDocs, collection, query, orderBy, where} from 'firebase/firestore';
import { reload } from 'firebase/auth';

export const GetTasks = () => {
    const [user] = useAuthState(auth);
    const tasksRef = collection(db, "tasks");
    const [loading, setLoading] = useState(true);
    const [tasksList, setTasksList] = useState([]);

    const getFormattedTasksData = (data) => {
        return data.docs.map((doc) => {
            return {
                id: doc.id,
                title: doc.data().title,
                details: doc.data().details,
                date: doc.data().date.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                })
            }
        })
    }

    const retrieveTasks = async () => {
        if (user && user.displayName) {
            const taskQuery = query(tasksRef, where("username", "==", user.displayName), orderBy("date", "asc"))
            const tasksData = await getDocs(taskQuery);
            const formattedTasksData = getFormattedTasksData(tasksData);
            setTasksList(formattedTasksData);

            setLoading(false)
        }
        
    }
    
    useEffect(() => {
        console.log(user)
        retrieveTasks();
    }, [user])
  return {
    loading,
    tasksList,
    retrieveTasks
  }
}
