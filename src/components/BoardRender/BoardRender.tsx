import React, { useState } from 'react'
import { BoardType } from '../../types/BoardType'
import MainBoard from '../MainBoard/MainBoard'
import styles from "./style.module.css"
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

interface Props {
    id: string
}

const BoardRender:React.FC<Props> = ({id}) => {

    const activeBoardId = useSelector((state: RootState) => state.activeBoard.id)
    const boards: BoardType[] = useSelector((state: RootState) => state.boards)

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