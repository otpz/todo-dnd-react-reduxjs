import styles from './styles.module.css'
import SearchForm from '../SearchForm/SearchForm';

const Header = () => {
  return (
    <nav className={styles.container}>
        <div className={styles.logo}>Trello</div>
        <SearchForm/>
        <ul className={styles.nav_list}>
            <li className={styles.list_item}>
              <a href="mailto: osmantopuz98@gmail.com">Contact Me</a>
            </li>
        </ul>
    </nav>
  )
}

export default Header