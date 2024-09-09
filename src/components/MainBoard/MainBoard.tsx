import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import styles from './style.module.css'
import List from '../List/List'
import ToggleForm from '../ToggleForm/ToggleForm'
import { ListType } from '../../types/ListType'
import { TaskType } from '../../types/TaskType'
import { useClickOutside } from '../../hooks/useClickOutside'

import {DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core"
import {arrayMove, SortableContext} from "@dnd-kit/sortable"
import { createPortal } from 'react-dom'
import { createUniqueId } from '../../helpers/createUniqueId'
import Task from '../Task/Task'

const MainBoard = () => {
  const formRef = useRef<HTMLFormElement>(null); // add new list form ref
  const [toggleForm, setToggleForm] = useState<boolean>(false)
  
  const [activeList, setActiveList] = useState<ListType | null>(null)
  const [activeTask, setActiveTask] = useState<TaskType | null>(null)

  useClickOutside(formRef, () => setToggleForm(false)) // close form when clicking form's outside custom hook

  const [lists, setLists] = useState<ListType[]>([
    {id: "202cb962ac59075b964b07152d234b70", title: "To Do"},
    {id: "920992cdde70074f393b6f8da2eec0e1", title: "In Process",},
    {id: "244961af66c224e66ed81810e6a7a9c4", title: "Completed",}
  ])

  const [tasks, setTasks] = useState<TaskType[]>([
    {id:"81dc9bdb52d04dc20036dbd8313ed055", title: "Learn Next.js", listId: "202cb962ac59075b964b07152d234b70"},
    {id:"4297f44b13955235245b2497399d7a93", title: "Learn Docker", listId: "202cb962ac59075b964b07152d234b70"},
    {id:"84aad89ca24745cf5444ae924778d624", title: "Learn Redux Toolkit", listId: "920992cdde70074f393b6f8da2eec0e1"},
    {id:"45ba9d71baea885abee139ea5edf15d2", title: "Learn Tailwind.css", listId: "244961af66c224e66ed81810e6a7a9c4"}
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
        createdDate: Date.now(),
      }
      if (!inputValue){
        return prev
      }
      return [...prev, newList]
    })
    setToggleForm(false)
  }
  
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5 // if we drag the element by 5px, dragging gonna run
    }
  }))

  const onDragStart = (e: DragStartEvent) => {
    setActiveList(null)
    setActiveTask(null)

    if (e.active.data.current?.type === "List"){
      setActiveList(e.active.data.current.list)
      return
    }

    if (e.active.data.current?.type === "Task"){
      setActiveTask(e.active.data.current.task)
      return
    }
  }

  const onDragEnd = (e: DragEndEvent) => {
    const {active, over} = e // active and over lists

    if (active.data.current?.type === "Task"){
      return
    }

    if (!over) return

    const activeListId = active.id
    const overListId = over.id

    if (activeListId === overListId) return

    setLists(prevLists => {
      const activeListIdx = prevLists.findIndex(list => list.id === activeListId)
      const overListIdx = prevLists.findIndex(list => list.id === overListId)
      return arrayMove(prevLists, activeListIdx, overListIdx) // swapping lists. arrayMove is dnd-kit function
    })

    setActiveTask(null)
    setActiveList(null)
  }

  const onDragOver = (e: DragOverEvent) => {
    const {active, over} = e // active and over lists

    if (!over) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === "Task"
    const isOverATask = over.data.current?.type === "Task"
    
    // dropping a task over another task
    if (isActiveATask && isOverATask){
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex(task => task.id === activeId)
        const overIndex = tasks.findIndex(task => task.id === overId)
        tasks[activeIndex].listId = tasks[overIndex].listId
        return arrayMove(tasks, activeIndex, overIndex)
      })
    }

    // dropping a task over a list
    if (isActiveATask && !isOverATask){
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex(task => task.id === activeId)
        tasks[activeIndex].listId = over.id.toString()
        return arrayMove(tasks, activeIndex, activeIndex)
      })
    }
  }

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
      <div className={styles.container}>
        <div className={styles.list}>
          <SortableContext items={listsId}>
            {
              lists.map((list, idx) => (
                <List key={idx} list={list} setLists={setLists} tasks={tasks} setTasks={setTasks}/>
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
              tasks={tasks} 
              setTasks={setTasks}
            />
          )}
          {activeTask && (
            <Task
              task={activeTask}
              setTasks={setTasks}
            />
          )}
        </DragOverlay>, 
        document.body
      )}

    </DndContext>
  )
}

export default MainBoard