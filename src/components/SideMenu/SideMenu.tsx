import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, MenuItemStyles, } from 'react-pro-sidebar';
import { SidebarHeader } from '../SidebarHeader/SidebarHeader';
import styles from './style.module.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { RiTodoLine } from "react-icons/ri";
const themes = {
    sidebar: {
        backgroundColor: '#1D1E28',
        color: '#9FADBC',
    },
    menu: {
        menuContent: '#1D1E28',
        innerHeight: "32px",
        hover: {
            backgroundColor: '#41424A',
            color: '#9FADBC',
        },
    },
};

const SideMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);

  const menuItemStyles: MenuItemStyles = {
    root: {
        fontSize: '14px',
        fontWeight: 400,
        height: "32px"
    },
    button: {
        height: "32px",
        '&:hover': {
            backgroundColor: themes.menu.hover.backgroundColor,
            color: themes.menu.hover.color,
        },  
    },
    label: ({ open }) => ({
        fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div style={{ display: 'flex', height: '100%', overflow: "clip"}}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        backgroundColor={themes.sidebar.backgroundColor}
        rootStyles={{
            borderRight: "1px solid #47474766",
            color: themes.sidebar.color,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: "relative" }}>
          <SidebarHeader rtl={false} style={{ borderBottom: "1px solid #363738", marginBottom: "24px" }} />
          <div className={styles.collapse_button} onClick={() => setCollapsed(prev => !prev)}>
            {
              collapsed === true ? 
              <BsFillArrowRightCircleFill className={styles.no_collapsed_icon}/> :
              <BsFillArrowLeftCircleFill className={styles.collapsed_icon}/> 
            }
          </div>
          <div style={{ flex: 1, marginBottom: '32px' }}>
            <div className={styles.fontFamily} style={{ padding: '0 20px', marginBottom: '8px', fontSize: "18px", fontWeight:"bold", display: !collapsed ? "flex" : "none", flexDirection: "row", alignItems: "center"}}>
              <RiTodoLine style={{marginRight: "10px"}}/>
              <span>My Boards</span>
            </div>
            <Menu menuItemStyles={menuItemStyles}>
                <MenuItem active={true}>Main Board</MenuItem>
                <MenuItem>Second</MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default SideMenu