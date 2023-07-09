import axios from "axios"
import { useContext, useState } from "react"
import { DispatchContenxt } from "../App"

export default function SingleNote({note}) {
    const {dispatch} = useContext(DispatchContenxt)
    const [isEditing, setEditing] = useState(false)

    const handleUpdate = async (noteToUpdate) => {
        try{
            const response = await axios.patch(
                'http://localhost:4000/notes/' + note.id, {title: noteToUpdate.title, done: noteToUpdate.done}
            )
            dispatch({type: "UPDATE", payload: response.data})
        }catch(error){
            console.error('Failed to mark note: ' + error)
        }
    }

    const handleDelete = async () => {
        try{
            await axios.delete('http://localhost:4000/notes/' + note.id)
            dispatch({type: "DELETE", payload: note})
        }catch (error){
            console.error('Failed to delete note: ' + error)
        }
    }

    let content

    if (isEditing) {
        content = (
            <>
                <input type="text" value={note.title}
                    onChange={e => {handleUpdate({...note, title: e.target.value})}} 
                    onKeyDown={e => {if(e.key === "Enter") setEditing(false)}}/>
                <button onClick={() => {setEditing(false)}}>Save</button>
            </>
        )
    } else {
        content = (
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
            {content}
            <button onClick={() => handleDelete(note.id)}>Delete</button>
        </div>
    )
}
