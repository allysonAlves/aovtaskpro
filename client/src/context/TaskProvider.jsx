import React, { useState } from 'react'
import { getTasks } from '../service/task.service';

export const taskContext = React.createContext([]);
taskContext.displayName = 'MyContext';

const TaskProvider = ({children}) => {
  const [taskList , setTaskList] = useState([]);
  const [columns , setColumns] = useState([]);
  const [loading , setLoading] = useState(false);

  const getTaskList = () => {
    setLoading(true)

    getTasks()
    .then(({data}) => {
      setTaskList(data);
      setColumns(Object.keys(data[0] || {}));
    })
    .finally(() => {
      setLoading(false)
    })
  }

  return (
    <taskContext.Provider value={{taskList,columns, getTaskList}}>
        {children}
    </taskContext.Provider>
  )
}

export default TaskProvider