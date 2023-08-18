import { For } from "solid-js"
import SingleNote from "./SingleNote"
import { useNotesContext } from "../context/NotesContext";

export default function NoteList(){
    const {notes} = useNotesContext()

    return(
        <div className="note_list">
            <For each={notes()}>{(note) => 
                <SingleNote key={note.id} note={note}/>
            }
            </For>
        </div>
    )
}