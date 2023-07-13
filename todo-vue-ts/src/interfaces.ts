export interface Note {
    title: string,
    done: boolean,
    id: number
}

export const DB_LINK = "http://localhost:4000/notes/"