import React, { useState } from 'react'
import { Note } from '../interfaces'
import axios from 'axios'
import { useNotesContext } from '../App'

type SingleNoteProps = {
    note: Note
}

export const SingleNote: React.FC<SingleNoteProps> = ({note}) => {
    const {setNotes} = useNotesContext()
    const [isEditing, setEditing] = useState<boolean>(false)

    const handleUpdate = async (noteToUpdate: Note) => {
        try{
            await axios.patch(
                'http://localhost:4000/notes/' + note.id, {title: noteToUpdate.title, done: noteToUpdate.done}
            )
            setNotes(currentNotes => {
                return currentNotes!.map(n => n.id === noteToUpdate.id ? noteToUpdate : n)
            })
        }catch(error){
            console.error('Failed to mark note: ' + error)
        }
    }

    const handleDelete = async () => {
        try{
            await axios.delete('http://localhost:4000/notes/' + note.id)
            setNotes(currentNotes => {
                return currentNotes!.filter(n => n.id !== note.id)
            })
        }catch (error){
            console.error('Failed to delete note: ' + error)
        }
    }

    let editContent

    if (isEditing) {
        editContent = (
            <>
                <input type="text" value={note.title}
                    onChange={e => handleUpdate({...note, title: e.target.value})} />
                <button onClick={() => {setEditing(false)}}>Save</button>
            </>
        )
    } else {
        editContent = (
            <>
                <span>{note.title}</span>
                {note.done === false && <button onClick={() => setEditing(true)}>Edit</button>}
                {note.done === true && <button disabled onClick={() => setEditing(true)}>Edit</button>}
            </>
        )
    }

    return (
        <div key={note.id} className="single_note">
            <input type="checkbox" checked={note.done} 
                onChange={e => handleUpdate({...note, done: e.target.checked})} />
            {editContent}
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
    )
}
