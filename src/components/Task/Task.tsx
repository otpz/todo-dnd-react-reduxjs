import React, { useRef, useState } from 'react'
import styles from './style.module.css'
import { TaskType } from '../../types/TaskType'
import { BsFillTrash3Fill } from "react-icons/bs"
import { ListType } from '../../types/ListType'
import { useClickOutside } from '../../hooks/useClickOutside'

interface Props {
  task: TaskType
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>
}

const Task:React.FC<Props> = ({task, setLists}) => {

  const editFormRef = useRef<HTMLFormElement>(null)
  const [editInput, setEditInput] = useState<string>("")
  const [toggleEditTask, setToggleEditTask] = useState<boolean>(false)

  useClickOutside(editFormRef, () => {
    setToggleEditTask(false)
    editFormRef.current?.requestSubmit()
  })

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLists(prev => 
      prev.map(mapList => {
        if (mapList.id === task.listId) {
          const updatedItems = mapList.items?.map(item => {
            if (item.id === task.id && editInput) {
              return { ...item, title: editInput }
            }
            return item
          })
          return { ...mapList, items: updatedItems };
        }
        return mapList
      })
    );
  }

  const deleteTaskById = (taskId: number, listId: number) => {
    setLists((prev) => 
      prev.map((list) => {
        if (list.id === listId){
          const newList: ListType = {...list, items: list.items!!.filter(task => task.id !== taskId)}
          return newList
        } else return list
      })
    )
  }

  const handleEditTaskForm = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault()
    setEditInput(task.title)
    setToggleEditTask(prev => !prev)
  }

  return (
    <div className={styles.container}>
      {
        toggleEditTask === false ?
        <div className={styles.title} onClick={handleEditTaskForm}>{task.title}</div> :
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