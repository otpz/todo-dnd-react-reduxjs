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
                boards.filter(board => board.id === activeBoardId).map((board, idx) => (
                    <MainBoard key={idx} board={board}/>
                ))
            }
        </div>
    )
}

export default BoardRender