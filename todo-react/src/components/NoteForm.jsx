import axios from "axios"
import { useContext, useState } from "react"
import { DispatchContext } from "../App"

export default function NoteForm() {
  const {dispatch} = useContext(DispatchContext)
  const [newNote, setNewNote] = useState("")

  const addNote = async () => {
    try{
      if(newNote === ""){
        alert("Can't add empty notes")
        return
      }
      const response = await axios.post(
        'http://localhost:4000/notes', {title: newNote, done: false}
      )
      dispatch({type: "ADD", payload: response.data})
      setNewNote("")
    }
    catch(error){
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
