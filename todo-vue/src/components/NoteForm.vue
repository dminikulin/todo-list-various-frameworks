<template>
    <div class="add_note_block">
        <input type="text" v-model="newNote">
        <button @click="addNote">Add</button>
    </div>
</template>

<script>
import { inject, ref } from 'vue'
import axios from 'axios'

export default {
    name: 'NoteForm',
    setup() {
        let newNote = ref("")

        const notelist = inject('notes')
        const addNote = async () => {
            if (newNote.value === "") {
                alert("Can't add empty notes")
                return
            }
            const response = await axios.post('http://localhost:4000/notes', {
                title: newNote.value, done: false
            })
            notelist.value.push(response.data)
            newNote.value = ""
        }

        return {newNote, addNote}
    }
}
</script>