import { useContext } from "react"
import SingleNote from "./SingleNote"
import { DispatchContext } from "../App"

export default function NoteList() {

const {notes} = useContext(DispatchContext)

    return (
        <div className="note_list">
            {!notes && <p>No notes so far</p>}
            {notes && notes.map(note => {
                return (
                    <SingleNote key={note.id} note={note}/>
                )
            })}
        </div>
    )
}
