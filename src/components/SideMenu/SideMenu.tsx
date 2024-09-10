import { useState } from 'react'
import styles from "./style.module.css"
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'

const SideMenu = () => {

    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className={styles.container}>
            <Sidebar collapsed={collapsed} className={styles.sidebar}>
                <main className={styles.sidebar_header}>
                    <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
                        Collapse
                    </button>
                </main>
                <Menu className={styles.sidebar_menu}>
                    <MenuItem className={styles.menu_item}>Documentation</MenuItem>
                    <MenuItem className={styles.menu_item}>Calendar</MenuItem>
                    <MenuItem className={styles.menu_item}>E-commerce</MenuItem>
                    <MenuItem className={styles.menu_item}>Examples</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}

export default SideMenu