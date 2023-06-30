import axios from "axios";
import React, { useState } from "react";
import { useNotesContext } from "../App";
import { Note } from "../interfaces";

export const NoteForm: React.FC = () => {
    const {setNotes} = useNotesContext()
    const [newNote, setNewNote] = useState<string>("")

    const addNote = async () => {
        try {
            if (newNote === "") {
                alert("Can't add empty notes")
                return
            }
            const response = await axios.post(
                'http://localhost:4000/notes', { title: newNote, done: false }
            )
            setNotes(currentNotes => {return [...currentNotes as Note[], response.data]})
            setNewNote("")
        } catch (error) {
            console.error('Failed to add note: ' + error)
        }
    }

    return (
        <div className="add_note_block">
            <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)} />
            <button onClick={addNote}>Add</button>
        </div>
    )
}