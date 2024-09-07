import React, { useState } from 'react'
import styles from './style.module.css'
import { ListType } from '../../types/ListType'
import { BsThreeDots } from "react-icons/bs";
import Task from '../Task/Task';
import { TaskType } from '../../types/TaskType';

// formu component yapabilir miyiz?
// toggle formu hook yapabilir miyiz?

interface Props {
  list: ListType
}

const List: React.FC<Props> = ({list}) => {

  const [newTask, setNewTask] = useState<TaskType>()

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span>{list.title}</span>
        <div className={styles.settings}>
          <BsThreeDots />
        </div>
      </div>
      <div className={styles.tasks}>
        {
          list.items!!.map((task, idx) => (
            <Task key={idx} task={task}/>
          ))
        }
      </div>
      <button className={styles.button}>
        + Add new task
      </button>
    </div>
  )
}

export default List