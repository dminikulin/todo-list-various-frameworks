import { createContext, createSignal, useContext } from "solid-js";
import axios from "axios";

export const NotesContext = createContext()

export function NotesContextProvider(props){
    const fetchNotes = async () => {
        try {
          const response = await axios.get('http://localhost:4000/notes')
          setNotes(response.data)
        } catch (error) {
          console.error('Failed to get notes: ' + error)
        }
      }
      fetchNotes()
    
      const [notes, setNotes] = createSignal()

      return (
        <NotesContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NotesContext.Provider>
      )
}

export function useNotesContext(){
    return useContext(NotesContext)
}