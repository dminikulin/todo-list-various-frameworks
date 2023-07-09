import axios from "axios"
import React, { createContext, useContext, useEffect, useReducer, useState } from "react"
import { NoteContext } from "./interfaces"
import { NoteForm } from "./components/NoteForm"
import { NoteList } from "./components/NoteList"
import { NotesReducer } from "./hooks/NotesReducer"

export const NoteDispatchContext = createContext<NoteContext>({
  dispatch: () => {}
})

export const useNotesDispatchContext = () => useContext(NoteDispatchContext)

export const App: React.FC = () => {
  const [notes, dispatch] = useReducer(NotesReducer, [])
  // const [notes, setNotes] = useState<Note[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const response = await axios.get('http://localhost:4000/notes')
        if(response.statusText === "OK") dispatch({type: "GET", payload: response.data})
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
      <NoteDispatchContext.Provider value={{dispatch}}>
      <div className="note_container">
        <h1>Dima's todo list</h1>
        <NoteForm/>
          {error && <p>{error}</p>}
          {loading && <p>Loading...</p>}
          <NoteList noteList={notes}/>
      </div>
      </NoteDispatchContext.Provider>
    </div>
  )
}
