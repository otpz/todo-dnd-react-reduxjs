import { FormEvent, useEffect, useRef, useState } from 'react'
import styles from './style.module.css'
import { ListType } from '../../types/ListType'
import List from '../List/List'

import { BsPlusLg } from "react-icons/bs";

const MainBoard = () => {
  const formRef = useRef<HTMLFormElement>(null); // add new list form ref

  const [lists, setLists] = useState<ListType[]>([
    {id: 1, title: "ToDo", isActive: true, items: [{id:1, title: "Learn Next.js", isActive: true, listId: 1}, {id:2, title: "Learn Docker", isActive: true, listId: 1}]},
    {id: 2, title: "In Process", isActive: true, items: [{id:1, title: "Learn Redux Toolkit", isActive: true, listId: 2}]}
  ])

  const [listInputValue, setListInputValue] = useState<string>("")
  const [toggleForm, setToggleForm] = useState<boolean>(false)

  const handleToggleForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      setToggleForm(prev => !prev)
  }

  const handleClickOutside = (e: MouseEvent) => { // check where clicked
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        resetFormAndInput()
      }
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()

    setLists((prev) => {
      const newList: ListType = {
        id: prev.length + 1,
        title: listInputValue,
        isActive: true,
        createdDate: Date.now(),
        isDeleted: false,
        items: []
      }
      return [...prev, newList]
    })

    resetFormAndInput()
  }

  const resetFormAndInput = () => {
    setToggleForm(false)
    setListInputValue("")
  }

  useEffect(() => {
      if (toggleForm) {
        document.addEventListener('mousedown', handleClickOutside)
      } 
      return () => {
        document.removeEventListener('mousedown', handleClickOutside) //clear listener
      }
  }, [toggleForm])

  return (
    <div className={styles.container}>
      <div className={styles.list}>
      {
        lists.map((list, idx) => (
          <List key={idx} list={list}/>
        ))
      }
        <div className={styles.control}>
          {
            toggleForm === false ? <button onClick={handleToggleForm} className={styles.control_button}>+  Add new list</button> : 
            <form onSubmit={handleFormSubmit} ref={formRef} action="" className={styles.add_form} style={{padding: "10px"}}>
              <input value={listInputValue} onChange={(e) => setListInputValue(e.target.value)} type="text" placeholder='Enter the list name'/>
              <div className={styles.form_buttons}>
                <button className={styles.submit_button}>Add</button>
                <button className={styles.cancel_button} onClick={handleToggleForm}>
                  <BsPlusLg className={styles.cancel_icon}/>
                </button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}

export default MainBoard