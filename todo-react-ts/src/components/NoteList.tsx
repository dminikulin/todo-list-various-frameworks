import React from 'react'
import { Note } from '../interfaces'
import { SingleNote } from './SingleNote'

type NoteListProps = {
    noteList: Note[] | null
}

export const NoteList: React.FC<NoteListProps> = ({ noteList }) => {
    return (
        <div className="note_list">
            {!noteList && <p>No notes so far</p>}
            {noteList && noteList.map(note => {
                return (
                    <SingleNote key={note.id} note={note} />
                )
            })}
        </div>
    )
}
