import React, { useEffect } from 'react'
import { BoardType } from '../../types/BoardType'
import MainBoard from '../MainBoard/MainBoard'
import styles from "./style.module.css"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { updateAllBoards } from '../../features/boards/boardsSlice'

const BoardRender:React.FC = () => {

    const activeBoardId = useSelector((state: RootState) => state.activeBoard.id)
    const boards: BoardType[] = useSelector((state: RootState) => state.boards)
    const dispatch = useDispatch()

    // local storage
    useEffect(() => {
        const data = window.localStorage.getItem("boards")
        if (data) dispatch(updateAllBoards(JSON.parse(data)))
    }, [dispatch])

    useEffect(() => {
        if (boards.length > 0) {
            window.localStorage.setItem("boards", JSON.stringify(boards))
        } else {
            window.localStorage.removeItem("boards")
        }
    }, [boards])

    return (
        <div className={styles.board_render_container}>
            {
                (() => {
                    const board = boards.find(board => board.id === activeBoardId);
                    return board ? <MainBoard board={board} /> : <div className={styles.not_found}>
                        <p>You do not have any boards.</p>
                        <p>Create a new board from the menu on the left.</p>
                    </div>
                })()
            }
        </div>
    )
}

export default BoardRender