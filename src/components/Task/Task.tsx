import React, { useRef, useState } from 'react'
import styles from './style.module.css'
import { TaskType } from '../../types/TaskType'
import { BsFillTrash3Fill } from "react-icons/bs"
import { ListType } from '../../types/ListType'
import { useClickOutside } from '../../hooks/useClickOutside'
import { useSortable } from '@dnd-kit/sortable'
import {CSS} from "@dnd-kit/utilities"

interface Props {
  task: TaskType
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}

const Task:React.FC<Props> = ({task, setTasks}) => {

  const editFormRef = useRef<HTMLFormElement>(null)
  const [editInput, setEditInput] = useState<string>("")
  const [toggleEditTask, setToggleEditTask] = useState<boolean>(false)

  useClickOutside(editFormRef, () => {
    setToggleEditTask(false)
    editFormRef.current?.requestSubmit()
  })

  //for sortable context.
  const {setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    animateLayoutChanges: () => false,
    disabled: toggleEditTask
  })

  //for animation styling
  const dndAnimationStyles = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTasks(tasks => tasks.map(prevTask => prevTask.id === task.id && editInput ? { ...prevTask, title: editInput } : prevTask))
  }

  const deleteTaskById = (taskId: string, listId: string) => {
    setTasks(tasks => tasks.filter(prevTask => prevTask.id !== taskId))
  }

  const handleEditTaskForm = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setEditInput(task.title)
    setToggleEditTask(prev => !prev)
  }


  if (isDragging){
    return <div ref={setNodeRef} style={dndAnimationStyles} {...attributes} {...listeners} className={styles.container_opacity}>
      <div className={styles.title}>{task.title}</div>
      <div className={styles.icon_box}>
        <BsFillTrash3Fill className={styles.trash}/>
      </div>
    </div>
  }

  return (
    <div ref={setNodeRef} style={dndAnimationStyles} {...attributes} {...listeners} className={styles.container}>
      {
        toggleEditTask === false ?
        <p className={styles.title} onClick={handleEditTaskForm}>{task.title}</p> :
        <form onSubmit={handleEditFormSubmit} ref={editFormRef}>
          <input autoComplete='off' autoFocus id='list_title_edit_input' type="text" value={editInput} onChange={(e) => setEditInput(e.target.value)} />
        </form>
      }
      <div className={styles.icon_box} onClick={() => deleteTaskById(task.id, task.listId)}>
        <BsFillTrash3Fill className={styles.trash}/>
      </div>
    </div>
  )
}

export default Task