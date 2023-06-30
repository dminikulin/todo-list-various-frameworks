import React from "react"

export interface Note {
    title: string,
    done: boolean,
    id: number
}

export interface NoteContext{
    setNotes: React.Dispatch<React.SetStateAction<Note[] | null>>
}