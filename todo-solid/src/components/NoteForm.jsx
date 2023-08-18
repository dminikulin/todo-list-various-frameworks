import axios from "axios"
import { createSignal } from "solid-js"
import { useNotesContext } from "../context/NotesContext";

export default function NoteForm(){
    const {notes, setNotes} = useNotesContext() 
    const [newNote, setNewNote] = createSignal("")

    const addNote = async () => {
        try {
            if(newNote() === ""){
                alert("Can't add empty notes")
                return
            }
            const response = await axios.post('http://localhost:4000/notes', {title: newNote(), done: false})
            setNotes([...notes(), response.data])
            setNewNote("")
        } catch (error) {
            console.error('Failed to add note: ' + error)
        }
    }

    return(
        <div className="add_note_block">
            <input type="text" value={newNote()} onChange={e => setNewNote(e.target.value)}/>
            <button onClick={addNote}>Add</button>
        </div>
    )
}