import axios from "axios";
import { Show, createSignal } from "solid-js";
import { useNotesContext } from "../context/NotesContext";

export default function SingleNote(props) {
    const {notes, setNotes} = useNotesContext()
    const [isEditing, setEditing] = createSignal(false)

    const handleUpdate = async (noteToUpdate) => {
        try {
            const response = await axios.patch(
                'http://localhost:4000/notes/' + props.note.id, { title: noteToUpdate.title, done: noteToUpdate.done }
            )
            setNotes(notes().map(n => n.id === response.data.id ? response.data : n))
        } catch (error) {
            console.error('Failed to change note: ' + error)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axios.delete('http://localhost:4000/notes/' + props.note.id)
            setNotes(notes().filter(n => n.id !== props.note.id))
        } catch (error) {
            console.error('Failed to delete note: ' + error)
        }
    }

    return (
        <div key={props.note.id} className="single_note">
            <input type="checkbox" checked={props.note.done}
                onChange={e => handleUpdate({ ...props.note, done: e.target.checked })} />
            <Show when={isEditing()} fallback={
                <>
                    <span>{props.note.title}</span>
                    <Show when={props.note.done} fallback={
                        <button onClick={() => setEditing(true)}>Edit</button>
                    }>
                        <button disabled>Edit</button>
                    </Show>
                </>
            }>
                <input type="text" value={props.note.title}
                    onChange={e => handleUpdate({ ...props.note, title: e.target.value })}
                    onKeyDown={e => { if (e.key === "Enter") setEditing(false) }} />
                <button onClick={() => setEditing(false)}>Save</button>
            </Show>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )

}