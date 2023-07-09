import React from "react"

export interface Note {
    title: string,
    done: boolean,
    id: number
}

type NoteActionKind = "GET" | "ADD" | "UPDATE" | "DELETE"
export interface NoteAction {
    type: NoteActionKind,
    payload: any
}

export interface NoteContext{
    dispatch: React.Dispatch<NoteAction>
}