import React, { FormEvent, useMemo, useRef, useState } from 'react'
import { ListType } from '../../types/ListType'
import { TaskType } from '../../types/TaskType';
import { BsThreeDots } from "react-icons/bs";
import { GrClose, GrEdit, GrTrash } from "react-icons/gr";
import Task from '../Task/Task';
import ToggleForm from '../ToggleForm/ToggleForm';
import { useClickOutside } from '../../hooks/useClickOutside';
import styles from './style.module.css'
import { SortableContext, useSortable } from '@dnd-kit/sortable';

import {CSS} from "@dnd-kit/utilities"
import { createUniqueId } from '../../helpers/createUniqueId';

interface Props {
  list: ListType
  tasks: TaskType[]
  
  setLists: React.Dispatch<React.SetStateAction<ListType[]>>
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
}

const List: React.FC<Props> = ({list, setLists, tasks, setTasks}) => {

  const editFormRef = useRef<HTMLFormElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const settingsRef = useRef<HTMLDivElement>(null)
  const [editInput, setEditInput] = useState<string>("")
  const [toggleForm, setToggleForm] = useState<boolean>(false)
  const [toggleSettingsMenu, setToggleSettingsMenu] = useState<boolean>(false)
  const [toggleEditList, setToggleEditList] = useState<boolean>(false)

  //for sortable context.
  const {setNodeRef, attributes, listeners, transform, transition, isDragging, active, over } = useSortable({
    id: list.id,
    data: {
      type: "List",
      list,
    },
    animateLayoutChanges: () => false,
    disabled: toggleEditList
  })

  //for animation styling
  const dndAnimationStyles = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  useClickOutside(editFormRef, () => {
    setToggleEditList(false) 
    if (editFormRef.current) {
      editFormRef.current.requestSubmit() // submit form when clicking outside
    }
  })
  useClickOutside(formRef, () => setToggleForm(false))
  useClickOutside(settingsRef, () => setToggleSettingsMenu(false))

  const tasksId = useMemo(() => tasks.map(task => task.id), [tasks])

  if (active?.data.current?.type === "Task" && over?.data.current?.type === "Task" && over?.data.current?.task.listId === list.id){
    return (
      <div ref={setNodeRef} style={dndAnimationStyles} className={styles.list_container}>
      <div className={styles.container_border}>
        <div className={styles.header} {...attributes} {...listeners}>
          <p>{list.title}</p>
          <div className={styles.settings}>
            <BsThreeDots />
          </div>
        </div>
        <div className={styles.tasks}>
          {
            tasks.filter(task => task.listId === list.id).map((task, idx) => (
              <Task key={idx} task={task} setTasks={setTasks}/>
            ))
          }
        </div>
        <div className={styles.bottom_form}>
          {
            <button className={styles.button}>
            + Add new task
            </button> 
          }
        </div>
      </div>
    </div>
    )
  }

  if (isDragging){
    return (
      <div ref={setNodeRef} style={dndAnimationStyles} className={styles.list_container}>
      <div className={styles.container_opacity}>
        <div className={styles.header} {...attributes} {...listeners}>
          <p>{list.title}</p>
          <div className={styles.settings}>
            <BsThreeDots />
          </div>
        </div>
        <div className={styles.tasks}>
          {
            tasks.filter(task => task.listId === list.id).map((task, idx) => (
              <Task key={idx} task={task} setTasks={setTasks}/>
            ))
          }
        </div>
        <div className={styles.bottom_form}>
          {
            <button className={styles.button}>
            + Add new task
            </button> 
          }
        </div>
      </div>
    </div>
    )
  }

  const handleEditFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLists((prev) => 
      prev.map(mapList => {
        if (mapList.id === list.id && editInput){
          return {...mapList, title: editInput}
        }
        return mapList
      })
    )
  }

  const deleteListById = () => {
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
    setTasks(tasks => [...tasks, {id: createUniqueId(), title: inputValue, listId: list.id, createdDate: Date.now()}])
    setToggleForm(false)
  }

  
  return (
    <div ref={setNodeRef} style={dndAnimationStyles} className={styles.list_container}>
      <div className={styles.container}>
        <div className={styles.header} {...attributes} {...listeners}>
          {
            toggleEditList === false ?
            <p onClick={(e) => handleEditListForm(e)}>{list.title}</p> :
            <form onSubmit={handleEditFormSubmit} ref={editFormRef}>
              <input autoComplete='off' autoFocus id='list_title_edit_input' type="text" value={editInput} onChange={(e) => setEditInput(e.target.value)} />
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
              <button onClick={deleteListById}>Delete <GrTrash className={styles.settings_icon}/></button>
            </div>
          </div>}
        </div>
        <div className={styles.tasks}>
          <SortableContext items={tasksId}>
            {
              tasks.filter(task => task.listId === list.id).map((task, idx) => (
                <Task key={idx} task={task} setTasks={setTasks}/>
              ))
            }
          </SortableContext>
        </div>
        <div className={styles.bottom_form}>
          {
            toggleForm === false ?
            <button onClick={handleToggleForm} className={styles.button}>
            + Add new task
            </button> :
            <ToggleForm formRef={formRef} handleToggleForm={handleToggleForm} handleFormSubmit={handleFormSubmit} placeholder={"Enter a task name"}/>
          }
        </div>
      </div>
    </div>
  )
}

export default List