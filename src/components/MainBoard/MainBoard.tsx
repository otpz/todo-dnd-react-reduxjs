import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import styles from './style.module.css'
import List from '../List/List'
import ToggleForm from '../ToggleForm/ToggleForm'
import { ListType } from '../../types/ListType'
import { useClickOutside } from '../../hooks/useClickOutside'

import {DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core"
import {arrayMove, SortableContext} from "@dnd-kit/sortable"
import { createPortal } from 'react-dom'
import { createUniqueId } from '../../helpers/createUniqueId'

const MainBoard = () => {
  const formRef = useRef<HTMLFormElement>(null); // add new list form ref
  const [toggleForm, setToggleForm] = useState<boolean>(false)
  
  const [activeList, setActiveList] = useState<ListType | null>(null)

  useClickOutside(formRef, () => setToggleForm(false)) // close form when clicking form's outside custom hook

  const [lists, setLists] = useState<ListType[]>([
    {id: "1", title: "To Do", isActive: true, items: [{id:"1", title: "Learn Next.js", isActive: true, listId: "1"}, {id:"2", title: "Learn Docker", isActive: true, listId: "1"}]},
    {id: "2", title: "In Process", isActive: true, items: [{id:"1", title: "Learn Redux Toolkit", isActive: true, listId: "2"}]},
    {id: "3", title: "Completed", isActive: true, items: [{id:"1", title: "Learn Tailwind.css", isActive: true, listId: "3"}]}
  ])

  const listsId = useMemo(() => lists.map(list => list.id), [lists]) 

  const handleToggleForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setToggleForm(prev => !prev)
  }

  const handleFormSubmit = (e: FormEvent, inputValue: string) => {
    e.preventDefault()

    setLists((prev) => {
      const uniqueId = createUniqueId()
      const newList: ListType = {
        id: uniqueId,
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

  const onDragStart = (e: DragStartEvent) => {
    if (e.active.data.current?.type === "List"){
      setActiveList(e.active.data.current.list)
      return
    }
  }

  const onDragEnd = (e: DragEndEvent) => {
    const {active, over} = e // active and over lists
    if (!over) return

    const activeListId = active.id
    const overListId = over.id

    if (activeListId === overListId) return

    setLists(prevLists => {
      const activeListIdx = prevLists.findIndex(list => list.id === activeListId)
      const overListIdx = prevLists.findIndex(list => list.id === overListId)
      return arrayMove(prevLists, activeListIdx, overListIdx) // swapping lists. arrayMove is dnd-kit function
    })
  }

  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5 // if we drag the element by 5px, dragging gonna run
    }
  }))

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
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

      {createPortal(
        <DragOverlay>
          {activeList && (
            <List 
              list={activeList} 
              setLists={setLists}
            />
          )}
        </DragOverlay>, 
        document.body
      )}

    </DndContext>
  )
}

export default MainBoard