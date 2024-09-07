import { FormEvent, useRef, useState } from 'react'
import styles from './style.module.css'
import List from '../List/List'
import ToggleForm from '../ToggleForm/ToggleForm';

import { ListType } from '../../types/ListType'
import { useClickOutside } from '../../hooks/useClickOutside';

const MainBoard = () => {
  
  const formRef = useRef<HTMLFormElement>(null); // add new list form ref
  const [toggleForm, setToggleForm] = useState<boolean>(false)
  
  useClickOutside(formRef, () => setToggleForm(false)) // close form when clicking form's outside custom hook

  const [lists, setLists] = useState<ListType[]>([
    {id: 1, title: "To Do", isActive: true, items: [{id:1, title: "Learn Next.js", isActive: true, listId: 1}, {id:2, title: "Learn Docker", isActive: true, listId: 1}]},
    {id: 2, title: "In Process", isActive: true, items: [{id:1, title: "Learn Redux Toolkit", isActive: true, listId: 2}]},
    {id: 3, title: "Completed", isActive: true, items: [{id:1, title: "Learn Tailwind.css", isActive: true, listId: 3}]}
  ])

  const handleToggleForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setToggleForm(prev => !prev)
  }

  const handleFormSubmit = (e: FormEvent, inputValue: string) => {
    e.preventDefault()

    setLists((prev) => {
      const newList: ListType = {
        id: prev.length + 1,
        title: inputValue,
        isActive: true,
        createdDate: Date.now(),
        isDeleted: false,
        items: []
      }
      return [...prev, newList]
    })

    setToggleForm(false)
  }

  return (
    <div className={styles.container}>
      <div className={styles.list}>
      {
        lists.map((list, idx) => (
          <List key={idx} list={list} setLists={setLists}/>
        ))
      }
        <div className={styles.control}>
          {
            toggleForm === false ? <button onClick={handleToggleForm} className={styles.control_button}>+  Add new list</button> : 
            <ToggleForm handleFormSubmit={handleFormSubmit} formRef={formRef} handleToggleForm={handleToggleForm}/>
          }
        </div>
      </div>
    </div>
  )
}

export default MainBoard