import { createContext, useEffect, useReducer, useState } from "react"
import NoteForm from "./components/NoteForm"
import NoteList from "./components/NoteList"
import axios from "axios"
import { NotesReducer } from "./hooks/NotesReducer"

export const DispatchContext = createContext()

export default function App() {
  const [error, setError] = useState()
  const [loading, setLoading] = useState(true)
  const [notes, dispatch] = useReducer(NotesReducer, [])

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/notes')
        if(response.statusText === "OK") dispatch({type: "GET", payload: response.data})
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
      <DispatchContext.Provider value={{notes, dispatch}}>
        <div className="note_container">
          <h1>Dima's todo list</h1>
          <NoteForm />
          {error && <p>{error}</p>}
          {loading && <p>Loading...</p>}
          <NoteList/>
        </div>
      </DispatchContext.Provider>
    </div>
  )
}