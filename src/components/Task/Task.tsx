import React from 'react'
import styles from './style.module.css'
import { TaskType } from '../../types/TaskType'
import { BsFillTrash3Fill } from "react-icons/bs"
import { ListType } from '../../types/ListType'

interface Props {
  task: TaskType
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>
}

const Task:React.FC<Props> = ({task, setLists}) => {

  const deleteTaskById = (taskId: number, listId: number) => {
    console.log(listId, taskId)
    setLists((prev) => 
      prev.map((list) => {
        if (list.id === listId){
          console.log(list)
          const newList: ListType = {...list, items: list.items!!.filter(task => task.id !== taskId)}
          return newList
        } else return list
      })
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{task.title}</div>
      <div className={styles.icon_box} onClick={() => deleteTaskById(task.id, task.listId)}>
        <BsFillTrash3Fill className={styles.trash}/>
      </div>
    </div>
  )
}

export default Task