import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Sidebar, Menu, MenuItem, MenuItemStyles, menuClasses, } from 'react-pro-sidebar';
import { SidebarHeader } from '../SidebarHeader/SidebarHeader';
import styles from './style.module.css'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsFillTrash3Fill, BsGithub, BsLinkedin, BsPlusLg } from "react-icons/bs";
import { RiTodoLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { BoardType } from '../../types/BoardType';
import { updateActiveBoardId } from '../../features/activeBoard/activeBoardSlice';
import { addBoard, deleteBoardById } from '../../features/boards/boardsSlice';
import { useClickOutside } from '../../hooks/useClickOutside';
import ToggleForm from '../ToggleForm/ToggleForm';
import Joyride from 'react-joyride';

const themes = {
    sidebar: {
        backgroundColor: '#1D1E28',
        color: '#9FADBC',
    },
    menu: {
        menuContent: '#1D1E28',
        // innerHeight: "32px",
        active: {
          backgroundColor: '#41424A',
          color: '#9FADBC',
        },
        hover: {
            backgroundColor: '#41424A',
            color: '#9FADBC',
        },
    },
};

const SideMenu: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [toggleSettingsMenu, setToggleSettingsMenu] = useState<boolean>(false)
  const activeBoardId = useSelector((state: RootState) => state.activeBoard.id)
  
  const menuItemStyles: MenuItemStyles = {
    root: {
        fontSize: '14px',
        fontWeight: 400,
        height: "32px",
        '&:active': {
            backgroundColor: themes.menu.hover.backgroundColor,
            color: themes.menu.hover.color,
        },
    },
    button: {
        height: "32px",
        userSelect: "none",
        [`&.${menuClasses.active}`]: {
          color: themes.menu.active.color,
          backgroundColor: themes.menu.active.backgroundColor,
          div: {
            display: "flex",
            "&:hover": {
              backgroundColor: "#6c6d70b3"
            }
          }
        },
        '&:hover': {
            backgroundColor: themes.menu.hover.backgroundColor,
            color: themes.menu.hover.color,
            div: {
              display: "flex",
              "&:hover": {
                backgroundColor: "#6c6d70b3"
              }
            }
        }, 
    },
    label: ({ open }) => ({
        fontWeight: open ? 600 : undefined,
    }),
  };

  const [{run, steps}] = useState({
    run: localStorage.getItem("active_board_id") ? false : true,
    steps: [
      {
        title: "Welcome to Trello!",
        content: <p>Let's begin! First, we can create a new board.</p>,
        locale: {skip: <strong>SKIP</strong>},
        placement: "center" as "center",
        target: "body",
      },
      {
        title: "New Board",
        content: <p>You can create a new board by clicking.</p>,
        locale: {skip: <strong>SKIP</strong>},
        target: "#add_icon_container"
      },
    ]
  })

  const settingsRef = useRef<HTMLFormElement>(null)

  const dispatch = useDispatch()
  useClickOutside(settingsRef, () => setToggleSettingsMenu(false))
  
  const boards: BoardType[] = useSelector((state: RootState) => state.boards)

  const handleDeleteBoardById = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) => {
    e.stopPropagation()
    dispatch(deleteBoardById(id))
  }

  useEffect(() => {
    const setNewActiveBoard = () => {
      const isBoardExist = boards.find(board => board.id === activeBoardId)
      !isBoardExist && dispatch(updateActiveBoardId(boards[0]?.id))   
    }
    setNewActiveBoard()
  }, [boards, dispatch, activeBoardId])

  const handleFormSubmit = (e: FormEvent, inputValue: string) => {
    e.preventDefault()
    dispatch(addBoard(inputValue))
    setToggleSettingsMenu(false)
  }

  const handleToggleForm = () => {
    setToggleSettingsMenu(false)
  }

  return (
    <div className={styles.sidebar_container}>
      <Joyride
          continuous
          run={run}
          steps={steps}
          hideCloseButton
          scrollToFirstStep
          showSkipButton
          showProgress
      />
      <div className={styles.collapse_button} onClick={() => setCollapsed(prev => !prev)}>
        {
          collapsed === true ? 
          <BsFillArrowRightCircleFill className={styles.no_collapsed_icon}/> :
          <BsFillArrowLeftCircleFill className={styles.collapsed_icon}/> 
        }
      </div>
      <Sidebar
        collapsed={collapsed}
        // toggled={toggled}
        // onBackdropClick={() => setToggled(false)}
        collapsedWidth={"20px"}
        backgroundColor={themes.sidebar.backgroundColor}
        rootStyles={{
          borderRight: "1px solid #47474766",
          color: themes.sidebar.color,
        }}
      >
        <div className={styles.sidebar_middle}>
          <SidebarHeader rtl={false} style={{ borderBottom: "1px solid #363738", marginBottom: "24px" }} />
          <div className={styles.fontFamily} style={{ padding: '0 20px', marginBottom: '8px', fontSize: "18px", fontWeight:"bold", display: !collapsed ? "flex" : "none", flexDirection: "row", alignItems: "center", position: "relative"}}>
              <div className={styles.header_left}>
                <RiTodoLine className={styles.header_icon}/>
                <span>My Boards</span>
              </div>
              <div id='add_icon_container' className={styles.add_icon_container} onClick={() => setToggleSettingsMenu(prev => !prev)}>
                <BsPlusLg className={styles.add_icon}/>
              </div>
          </div>
          <Menu menuItemStyles={menuItemStyles} className={styles.menu}>
                {
                  boards.map((board, idx) => (
                    <MenuItem 
                      key={idx}
                      onClick={() => dispatch(updateActiveBoardId(board.id))}
                      active={activeBoardId === board.id ? true : false}
                      className={styles.menu_item}
                    >
                      {board.title}
                      {
                        !collapsed && 
                        <div className={styles.delete_button} onClick={(e) => handleDeleteBoardById(e, board.id)}>
                          <BsFillTrash3Fill />
                        </div>
                      }
                    </MenuItem>
                  ))
                }
                {toggleSettingsMenu && <ToggleForm formRef={settingsRef} handleFormSubmit={handleFormSubmit} handleToggleForm={handleToggleForm} placeholder={"Enter a board name"} boardForm={true}/>}
          </Menu>
          <div className={styles.sidebar_footer} style={{display: collapsed ? "none" : "flex"}}>
            <div className={styles.footer_title}>Copyright © 
              <p style={{marginTop: "5px"}}>Built by<a className={styles.footer_link} target='_blank' rel='noreferrer' href="https://www.linkedin.com/in/otpz/">Osman Topuz</a></p>
            </div>
            <div className={styles.footer_icons}>
              <a target='_blank' rel='noreferrer' href="https://github.com/otpz"><BsGithub className={styles.footer_icon}/>
              </a>
              <a target='_blank' rel='noreferrer' href="https://www.linkedin.com/in/otpz/"><BsLinkedin className={styles.footer_icon}/>
              </a>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default SideMenu