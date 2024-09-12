import React, { FormEvent, useState } from 'react'
import styles from './style.module.css'
import { BsPlusLg } from "react-icons/bs";

interface Props {
    handleFormSubmit: (e: FormEvent, inputValue: string) => void
    handleToggleForm: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    formRef: React.RefObject<HTMLFormElement>
    placeholder: string
    boardForm?: boolean 
}

const ToggleForm:React.FC<Props> = ({handleFormSubmit, handleToggleForm, formRef, placeholder, boardForm}) => {

    const [inputValue, setInputValue] = useState<string>("")

    // if form submitting from sidebar
    const style = { 
        backgroundColor: boardForm ? "transparent" : "#101204",
        fontWeight: boardForm ? "400" : "500",
        color: boardForm ? "rgb(159, 173, 188)" : "rgb(218, 223, 229)"
    }

    return (
        <form  onSubmit={(e) => handleFormSubmit(e, inputValue)} ref={formRef} className={styles.toggle_form} style={style}>
            <input style={style} autoFocus required autoComplete='off' id='toggle_form_input' value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder={placeholder}/>
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