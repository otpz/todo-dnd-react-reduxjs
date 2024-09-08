import React, { FormEvent, useState } from 'react'
import styles from './style.module.css'
import { BsPlusLg } from "react-icons/bs";

interface Props {
    handleFormSubmit: (e: FormEvent, inputValue: string) => void
    handleToggleForm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    formRef: React.RefObject<HTMLFormElement>
}

const ToggleForm:React.FC<Props> = ({handleFormSubmit, handleToggleForm, formRef}) => {

    const [inputValue, setInputValue] = useState<string>("")

    return (
        <form onSubmit={(e) => handleFormSubmit(e, inputValue)} ref={formRef} className={styles.toggle_form} style={{padding: "10px"}}>
            <input required autoComplete='off' id='toggle_form_input' value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder='Enter the list name'/>
            <div className={styles.form_buttons}>
                <button className={styles.submit_button}>Add</button>
                <button className={styles.cancel_button} onClick={handleToggleForm}>
                  <BsPlusLg className={styles.cancel_icon}/>
                </button>
            </div>
        </form>
    )
}

export default ToggleForm