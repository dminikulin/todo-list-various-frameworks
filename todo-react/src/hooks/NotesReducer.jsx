export const NotesReducer = (notes, action) => {
    // console.log(notes, action)
    switch(action.type){
        case "GET": return action.payload
        case "ADD": return [...notes, action.payload]
        case "UPDATE": return notes.map(n => n.id === action.payload.id ? action.payload : n)
        case "DELETE": return notes.filter(n => n.id !== action.payload.id)
        default: throw Error("Unknown action: " + action.type)
    }
}