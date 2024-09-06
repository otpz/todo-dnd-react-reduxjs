import React from 'react'
import styles from './style.module.css'
import { TaskType } from '../../types/TaskType'
import { BsFillTrash3Fill } from "react-icons/bs"

interface Props {
  task: TaskType
}

const Task:React.FC<Props> = ({task}) => {
  return (
    <div className={styles.container}>
      <span>{task.title}</span>
      <div className={styles.trash}>
        <BsFillTrash3Fill className={styles.trash}/>
      </div>
    </div>
  )
}

export default Task