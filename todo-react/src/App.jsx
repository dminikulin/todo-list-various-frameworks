import { createContext, useEffect, useState } from "react"
import NoteForm from "./components/NoteForm"
import NoteList from "./components/NoteList"
import axios from "axios"

export const NotesContext = createContext()

export default function App() {
  const [notes, setNotes] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/notes')
        setNotes(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Failed to get notes: ' + error)
        setError('Failed to get notes')
        setLoading(false)
      }
    }

    fetchNotes()

  }, [])

  return (
    <div className="main_container">
      <NotesContext.Provider value={{notes, setNotes}}>
        <div className="note_container">
          <h1>Dima's todo list</h1>
          <NoteForm />
          {error && <p>{error}</p>}
          {loading && <p>Loading...</p>}
          <NoteList notes={notes}/>
        </div>
      </NotesContext.Provider>
    </div>
  )
}