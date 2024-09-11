import React, { useState } from 'react'
import { BoardType } from '../../types/BoardType'
import MainBoard from '../MainBoard/MainBoard'
import styles from "./style.module.css"

interface Props {
    id: string
}

const BoardRender:React.FC<Props> = ({id}) => {

    const [boards, setBoards] = useState<BoardType[]>([
        {id: "6b57d7aa641abf9e3befc4f3bed4aa1e", title: "Main Board"},
        {id: "6b57d7aa641a123e3befc4f3bed4aa1e", title: "Second Board"}
    ])

    return (
        <div className={styles.board_render_container}>
            {
                boards.filter(board => board.id === id).map((board, idx) => (
                    <MainBoard key={idx} board={board}/>
                ))
            }
        </div>
    )
}

export default BoardRender