import React, { FormEvent, useEffect, useRef, useState } from 'react'
import styles from './style.module.css'
import { ListType } from '../../types/ListType'
import { BsThreeDots } from "react-icons/bs";
import Task from '../Task/Task';
import { TaskType } from '../../types/TaskType';
import ToggleForm from '../ToggleForm/ToggleForm';
import { useClickOutside } from '../../hooks/useClickOutside';

interface Props {
  list: ListType
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>
}

const List: React.FC<Props> = ({list, setLists}) => {

  const formRef = useRef<HTMLFormElement>(null);
  const [toggleForm, setToggleForm] = useState<boolean>(false)

  useClickOutside(formRef, () => setToggleForm(false))

  const handleToggleForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setToggleForm(prev => !prev)
  }

  const handleFormSubmit = (e: FormEvent, inputValue: string) => {
    e.preventDefault()
    setLists((prev) => 
      prev.map((mapList) => {
        if (mapList.id === list.id){
          const newTaskId: number = mapList.items!!.length
          const newTask: TaskType = {id: newTaskId+1, isActive: true, title: inputValue, listId: mapList.id, createdDate: Date.now(), isDeleted: false}
          return {...mapList, items: [...mapList.items!!, newTask]}
        }
        return mapList
      })
    )
    setToggleForm(false)
  }

  useEffect(() => {
    console.log("list updatet!", list)
  }, [list])

  
  return (
    <div className={styles.list_container}>
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
        <div className={styles.bottom_form}>
          {
            toggleForm === false ?
            <button onClick={handleToggleForm} className={styles.button}>
            + Add new task
            </button> :
            <ToggleForm handleToggleForm={handleToggleForm} handleFormSubmit={handleFormSubmit} formRef={formRef}/>
          }
        </div>
      </div>
    </div>
    
  )
}

export default List