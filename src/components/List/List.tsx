import React, { FormEvent, useRef, useState } from 'react'
import styles from './style.module.css'
import { ListType } from '../../types/ListType'
import { BsThreeDots } from "react-icons/bs";
import { GrClose, GrEdit, GrTrash } from "react-icons/gr";
import Task from '../Task/Task';
import { TaskType } from '../../types/TaskType';
import ToggleForm from '../ToggleForm/ToggleForm';
import { useClickOutside } from '../../hooks/useClickOutside';

interface Props {
  list: ListType
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>
}

const List: React.FC<Props> = ({list, setLists}) => {

  const editFormRef = useRef<HTMLFormElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const settingsRef = useRef<HTMLDivElement>(null)
  const [editInput, setEditInput] = useState<string>("")
  const [toggleForm, setToggleForm] = useState<boolean>(false)
  const [toggleSettingsMenu, setToggleSettingsMenu] = useState<boolean>(false)
  const [toggleEditList, setToggleEditList] = useState<boolean>(false)

  useClickOutside(editFormRef, () => {
    setToggleEditList(false) 
    if (editFormRef.current) {
      editFormRef.current.requestSubmit() // submit form when clicking outside
    }
  })
  useClickOutside(formRef, () => setToggleForm(false))
  useClickOutside(settingsRef, () => setToggleSettingsMenu(false))

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLists((prev) => 
      prev.map(mapList => {
        if (mapList.id === list.id){
          return {...mapList, title: editInput}
        }
        return mapList
      })
    )
  }

  const deleteList = () => {
    setLists((prev) => 
      prev.filter(prevList => prevList.id !== list.id)
    )
    setToggleSettingsMenu(false)
  }

  const handleEditListForm = (e: React.MouseEvent<HTMLButtonElement | HTMLParagraphElement, MouseEvent>) => {
    e.preventDefault()
    setEditInput(list.title)
    setToggleEditList(prev => !prev)
  }

  const handleToggleSettingsMenu = () => {
      setToggleSettingsMenu(prev => !prev)
  }

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

  return (
    <div className={styles.list_container}>
      <div className={styles.container}>
        <div className={styles.header}>
          {
            toggleEditList === false ?
            <p onClick={(e) => handleEditListForm(e)}>{list.title}</p> :
            <form onSubmit={handleEditFormSubmit} ref={editFormRef}>
              <input autoFocus id='list_title_edit_input' type="text" value={editInput} onChange={(e) => setEditInput(e.target.value)} />
            </form>
          }
          <div className={styles.settings} onClick={handleToggleSettingsMenu}>
            <BsThreeDots />
          </div>
          {toggleSettingsMenu && 
          <div ref={settingsRef} className={styles.settings_menu}>
            <div className={styles.settings_header}>
              <h4>List Settings</h4>
              <div onClick={handleToggleSettingsMenu} className={styles.settings_close_div}>
                <GrClose className={styles.settings_icon}/>
              </div>
            </div>
            <div className={styles.settings_buttons}>
              <button onClick={handleEditListForm}>Edit <GrEdit className={styles.settings_icon}/></button>
              <button onClick={deleteList}>Delete <GrTrash className={styles.settings_icon}/></button>
            </div>
          </div>}
        </div>
        <div className={styles.tasks}>
          {
            list.items!!.map((task, idx) => (
              <Task key={idx} task={task} setLists={setLists}/>
            ))
          }
        </div>
        <div className={styles.bottom_form}>
          {
            toggleForm === false ?
            <button onClick={handleToggleForm} className={styles.button}>
            + Add new task
            </button> :
            <ToggleForm formRef={formRef} handleToggleForm={handleToggleForm} handleFormSubmit={handleFormSubmit}/>
          }
        </div>
      </div>
    </div>
    
  )
}

export default List