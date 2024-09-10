import React from 'react'
import styles from './style.module.css'
import { AiOutlineSearch } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../app/store';
// import { setByEventValue } from '../../features/searchInput/searchInput';

const SearchForm = () => {

    // const searchInputText = useSelector((state: RootState) => state.searchInput.text)
    // const dispatch = useDispatch() 
    
    return (
        <form className={styles.search_div}>
            <AiOutlineSearch className={styles.search_icon}/>
            <input 
                // value={searchInputText} onChange={(e) => dispatch(setByEventValue(e.target.value))} 
                className={styles.search} type="search" placeholder='Search Employee by Name or Profession'
            />
        </form>
    )
}

export default SearchForm