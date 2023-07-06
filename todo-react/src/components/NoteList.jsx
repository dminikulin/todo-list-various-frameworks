import { useContext } from "react"
import SingleNote from "./SingleNote"
import { NotesContext } from "../App"

export default function NoteList() {

    const {notes} = useContext(NotesContext)

    return (
        <div className="note_list">
            {!notes || notes.length === 0 && <p>No notes so far</p>}
            {notes && notes.map(note => {
                return (
                    <SingleNote key={note.id} note={note}/>
                )
            })}
        </div>
    )
}
