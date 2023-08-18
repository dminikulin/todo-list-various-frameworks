import { NotesContextProvider } from "./context/NotesContext"
import NoteForm from "./components/NoteForm"
import NoteList from "./components/NoteList"

export default function App() {

  return (
    <div className="main_container">
      <NotesContextProvider>
        <div className="note_container">
          <h1>Dima's todo list</h1>
          <NoteForm />
          <NoteList/>
        </div>
      </NotesContextProvider>
    </div>
  )
}