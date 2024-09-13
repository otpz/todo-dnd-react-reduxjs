import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import styles from './style.module.css'
import List from '../List/List'
import Task from '../Task/Task'
import ToggleForm from '../ToggleForm/ToggleForm'
import { ListType } from '../../types/ListType'
import { TaskType } from '../../types/TaskType'
import { BoardType } from '../../types/BoardType'
import { useClickOutside } from '../../hooks/useClickOutside'

import {DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors} from "@dnd-kit/core"
import {arrayMove, SortableContext} from "@dnd-kit/sortable"

import { createPortal } from 'react-dom'
import { createUniqueId } from '../../helpers/createUniqueId'
import { FaFlipboard, FaRegListAlt, FaRegStar, FaStar, FaCalendarAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { updateFavoiteById, updateTitleById } from '../../features/boards/boardsSlice'
import { RootState } from '../../app/store'

interface Props {
  board: BoardType
}

const MainBoard:React.FC<Props> = ({board}) => {
  const formRef = useRef<HTMLFormElement>(null); // add new list form ref
  const [toggleForm, setToggleForm] = useState<boolean>(false)
  const [activeList, setActiveList] = useState<ListType | null>(null)
  const [activeTask, setActiveTask] = useState<TaskType | null>(null)
  const [boardTitle, setBoardTitle] = useState<string>("")
  const [toggleEditTitle, setToggleEditTitle] = useState<boolean>(false)

  useClickOutside(formRef, () => setToggleForm(false)) // close form when clicking form's outside custom hook
  const searchInputText = useSelector((state: RootState) => state.searchInput.value)
  const dispatch = useDispatch()

  const [lists, setLists] = useState<ListType[]>([
    // {id: "202cb962ac59075b964b07152d234b70", boardId: "6b57d7aa641abf9e3befc4f3bed4aa1e", title: "To Do"},
    // {id: "920992cdde70074f393b6f8da2eec0e1", boardId: "6b57d7aa641abf9e3befc4f3bed4aa1e", title: "In Process",},
    // {id: "244961af66c224e66ed81810e6a7a9c4", boardId: "6b57d7aa641abf9e3befc4f3bed4aa1e", title: "Completed",}
  ])

  const [tasks, setTasks] = useState<TaskType[]>([
    // {id:"81dc9bdb52d04dc20036dbd8313ed055", title: "Learn Next.js", listId: "202cb962ac59075b964b07152d234b70"},
    // {id:"4297f44b13955235245b2497399d7a93", title: "Learn Docker", listId: "202cb962ac59075b964b07152d234b70"},
    // {id:"84aad89ca24745cf5444ae924778d624", title: "Learn Redux Toolkit", listId: "920992cdde70074f393b6f8da2eec0e1"},
    // {id:"45ba9d71baea885abee139ea5edf15d2", title: "Learn Tailwind.css", listId: "244961af66c224e66ed81810e6a7a9c4"}
  ])
  
  useEffect(() => {
    const listData = window.localStorage.getItem("lists")
    if (listData) setLists(JSON.parse(listData))

    const taskData = window.localStorage.getItem("tasks")
    if (taskData) setTasks(JSON.parse(taskData))
  }, [])

  // local storage for lists
  useEffect(() => {
    if (lists.length > 0){
        window.localStorage.setItem("lists", JSON.stringify(lists))
    } else {
      window.localStorage.removeItem("lists")
    }
  }, [lists])

  // local storage for tasks
  useEffect(() => {
    if (tasks.length > 0){
      window.localStorage.setItem("tasks", JSON.stringify(tasks))
    } else {
      window.localStorage.removeItem("tasks")
    }
  }, [tasks])

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
        boardId: board.id,
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

  const handleToggleBoardFavorite = () => {
    dispatch(updateFavoiteById(board.id)) // toggle the board's favorite state
  }

  const convertDate = (date: number) => {
    return new Date(date).toLocaleDateString("en-EN", {dateStyle: 'medium'});
  }

  const handleEditTitleSubmit = (e:  React.FocusEvent<HTMLInputElement, Element>) => {
    e.preventDefault()
    if (!boardTitle){
      setToggleEditTitle(false)
      return
    }
    dispatch(updateTitleById([board.id, boardTitle])) // update title
    setToggleEditTitle(false)
  }

  const handleToggleTitle = () => {
    setBoardTitle(board.title)
    setToggleEditTitle(prev => !prev)
  }

  return (
    <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
      <div className={styles.container}>
        <div className={styles.board_header}>
          <div className={styles.board_left}>
            <div className={styles.board_item} onClick={handleToggleTitle}>
              <FaFlipboard className={styles.title_icon}/>
              {!toggleEditTitle && <span className={styles.board_title}>{board.title}</span>}
              {toggleEditTitle && <input className={styles.board_title_input} autoFocus id='board_title_input' type="text" value={boardTitle} onChange={(e) => setBoardTitle(e.target.value)} onBlur={handleEditTitleSubmit} onClick={(e) => e.stopPropagation()}/>}
            </div>
            <div onClick={handleToggleBoardFavorite} className={styles.board_item}>
              {
                board.isFavorite ? <FaStar className={styles.fav_icon}/> : <FaRegStar className={styles.fav_icon}/>  
              }
            </div>
          </div>
          <div className={styles.board_right}>
            <div className={styles.board_item}>
                <FaRegListAlt className={styles.board_icon}/>
                <span className={styles.board_span}>
                   {
                    lists.filter(list => list.boardId === board.id).length
                   } List Available
                </span>
            </div>
            <div className={styles.board_item}>
                <FaCalendarAlt className={styles.board_icon}/>
                <span className={styles.board_span}>
                  Created Date: {convertDate(board.createdDate!!)}
                </span>
            </div>
          </div>
        </div>
        <div className={styles.list}>
          <SortableContext items={listsId}>
            {
              lists.filter(list => list.title.toLowerCase().includes(searchInputText.toLowerCase())).filter(list => list.boardId === board.id).map((list, idx) => (
                <List key={idx} list={list} setLists={setLists} tasks={tasks} setTasks={setTasks}/>
              ))
            }
          </SortableContext>
          <div className={styles.control}>
            {
              toggleForm === false ? <button onClick={handleToggleForm} className={styles.control_button}>+  Add new list</button> : 
              <ToggleForm handleFormSubmit={handleFormSubmit} formRef={formRef} handleToggleForm={handleToggleForm} placeholder={"Enter a list name"}/>
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