import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import styles from './style.module.css'
import List from '../List/List'
import ToggleForm from '../ToggleForm/ToggleForm'
import { ListType } from '../../types/ListType'
import { useClickOutside } from '../../hooks/useClickOutside'

import {DndContext} from "@dnd-kit/core"
import {SortableContext} from "@dnd-kit/sortable"

const MainBoard = () => {
  const formRef = useRef<HTMLFormElement>(null); // add new list form ref
  const [toggleForm, setToggleForm] = useState<boolean>(false)
  
  useClickOutside(formRef, () => setToggleForm(false)) // close form when clicking form's outside custom hook

  const [lists, setLists] = useState<ListType[]>([
    {id: 1, title: "To Do", isActive: true, items: [{id:1, title: "Learn Next.js", isActive: true, listId: 1}, {id:2, title: "Learn Docker", isActive: true, listId: 1}]},
    {id: 2, title: "In Process", isActive: true, items: [{id:1, title: "Learn Redux Toolkit", isActive: true, listId: 2}]},
    {id: 3, title: "Completed", isActive: true, items: [{id:1, title: "Learn Tailwind.css", isActive: true, listId: 3}]}
  ])

  const listsId = useMemo(() => lists.map(list => list.id), [lists]) 

  const handleToggleForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setToggleForm(prev => !prev)
  }

  const handleFormSubmit = (e: FormEvent, inputValue: string) => {
    e.preventDefault()

    setLists((prev) => {
      const newListId: number = prev.length > 0 ? prev[prev.length-1].id : 0
      const newList: ListType = {
        id: newListId + 1,
        title: inputValue,
        isActive: true,
        createdDate: Date.now(),
        isDeleted: false,
        items: []
      }
      if (!inputValue){
        return prev
      }
      return [...prev, newList]
    })
    setToggleForm(false)
  }

  useEffect(() => {
    console.log(lists)
  }, [lists])

  return (
    <DndContext>
      <div className={styles.container}>
        <div className={styles.list}>
          <SortableContext items={listsId}>
            {
              lists.map((list, idx) => (
                <List key={idx} list={list} setLists={setLists}/>
              ))
            }
          </SortableContext>
          <div className={styles.control}>
            {
              toggleForm === false ? <button onClick={handleToggleForm} className={styles.control_button}>+  Add new list</button> : 
              <ToggleForm handleFormSubmit={handleFormSubmit} formRef={formRef} handleToggleForm={handleToggleForm}/>
            }
          </div>
        </div>
      </div>
    </DndContext>
  )
}

export default MainBoard