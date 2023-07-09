import SingleNote from "./SingleNote"

export default function NoteList({notes}) {

    return (
        <div className="note_list">
            {!notes && <p>No notes so far</p>}
            {notes && notes.map(note => {
                return (
                    <SingleNote key={note.id} note={note}/>
                )
            })}
        </div>
    )
}
