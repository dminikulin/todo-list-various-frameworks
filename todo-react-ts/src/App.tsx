import axios from "axios"
import React, { createContext, useContext, useEffect, useState } from "react"
import { Note, NoteContext } from "./interfaces"
import { NoteForm } from "./components/NoteForm"
import { NoteList } from "./components/NoteList"

export const NotesContext = createContext<NoteContext>({
  setNotes: () => {}
})

export const useNotesContext = () => useContext(NotesContext)

export const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const response = await axios.get('http://localhost:4000/notes')
        setNotes(response.data)
        setLoading(false)
      }catch(error){
        console.error('Failed to get notes: ' + error)
        setError('Failed to get notes')
        setLoading(false)
      }
    }

    fetchNotes()
  }, [])

  return (
    <div className="main_container">
      <NotesContext.Provider value={{setNotes}}>
      <div className="note_container">
        <h1>Dima's todo list</h1>
        <NoteForm/>
          {error && <p>{error}</p>}
          {loading && <p>Loading...</p>}
          <NoteList noteList={notes}/>
      </div>
      </NotesContext.Provider>
    </div>
  )
}
