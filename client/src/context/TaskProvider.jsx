import React from 'react'

const initialTask = {
    taskList: [] 
}

export const taskContext = React.createContext(initialTask);


const TaskProvider = ({children}) => {
  return (
    <taskContext.Provider>
        {children}
    </taskContext.Provider>
  )
}

export default TaskProvider