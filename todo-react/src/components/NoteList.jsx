import { useContext } from "react"
import SingleNote from "./SingleNote"
import { NotesContext } from "../App"

export default function NoteList() {

    const {notes} = useContext(NotesContext)
    console.log(notes)

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
