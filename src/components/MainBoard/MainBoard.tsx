import { useEffect, useState } from 'react'
import styles from './style.module.css'
import { ListType } from '../../types/ListType'
import List from '../List/List'

import { BsPlusLg } from "react-icons/bs";

const MainBoard = () => {
    const [lists, setLists] = useState<ListType[]>([
      {id: 1, title: "ToDo", isActive: true, description: "ToDo List", items: [{id:1, title: "Learn Next.js", isActive: true, listId: 1}, {id:2, title: "Learn Docker", isActive: true, listId: 1}]},
      {id: 2, title: "In Process", isActive: true, description: "ToDo List", items: [{id:1, title: "Learn Redux Toolkit", isActive: true, listId: 2}]}
    ])
  
    const [toggleForm, setToggleForm] = useState<boolean>(false)
    
    const addNewList = () => {
      console.log("adding new list")
    }

    const handleToggleForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault()
      setToggleForm(prev => !prev)
    }

    useEffect(() => {
      function handleClick(e: any) {
        console.log(e);
      }

      document.body.addEventListener('click', handleClick);

      return () => {
        document.body.removeEventListener('click', handleClick);
      };

    }, []);

    return (
    <div className={styles.container}>
      <div className={styles.list}>
      {
        lists.map((list, idx) => (
          <List key={idx} list={list}/>
        ))
      }
        <div className={styles.control} onClick={addNewList}>
          {
            toggleForm === false ? <button onClick={handleToggleForm} className={styles.control_button}>+  Add new list</button> : 
            <form id='newListForm' action="" className={styles.add_form} style={{padding: "10px"}}>
              <input type="text" placeholder='Enter the list name'/>
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