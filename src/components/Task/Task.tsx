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
      <div className={styles.title}>{task.title}</div>
      <div className={styles.icon_box}>
        <BsFillTrash3Fill className={styles.trash}/>
      </div>
    </div>
  )
}

export default Task