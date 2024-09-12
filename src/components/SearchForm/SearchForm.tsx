import styles from './style.module.css'
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { setSearchInput } from '../../features/searchInput/searchInputSlice';

const SearchForm = () => {

    const searchInputText = useSelector((state: RootState) => state.searchInput.value)
    const dispatch = useDispatch() 
    
    return (
        <form className={styles.search_div}>
            <AiOutlineSearch className={styles.search_icon}/>
            <input 
                value={searchInputText} onChange={(e) => dispatch(setSearchInput(e.target.value))} 
                className={styles.search} name='search_input' type="search" placeholder='Search list by list title'
                autoComplete='off'
            />
        </form>
    )
}

export default SearchForm