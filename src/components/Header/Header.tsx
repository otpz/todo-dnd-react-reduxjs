import styles from './styles.module.css'
import SearchForm from '../SearchForm/SearchForm';
import { BsCardChecklist  } from "react-icons/bs";

const Header = () => {
  return (
    <nav className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logo_inner}>
            <BsCardChecklist className={styles.logo_icon}/>
            <span>Trello</span>
          </div>
          <SearchForm/>
        </div>
        <ul className={styles.nav_list}>
            <li className={styles.list_item}>
              <a href="mailto: osmantopuz98@gmail.com">Contact Me</a>
            </li>
        </ul>
    </nav>
  )
}

export default Header