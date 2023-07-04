<template>
    <div class="single_note">
        <input :disabled="isEditing" type="checkbox" v-model="note.done" v-on:change="editNote(note)">
        <template v-if="isEditing">
            <input type="text" v-model="note.title">
            <button @click="editNote(note)">Save</button>
        </template>
        <template v-else>
            <span>{{ note.title }}</span>
            <button :disabled="note.done" @click="isEditing = !isEditing">Edit</button>
        </template>
        <button @click="deleteNote(note)">Delete</button>
    </div>
</template>

<script>
import { inject, ref } from 'vue'
import axios from 'axios'

export default {
    name: 'SingleNote',
    props: ['note'],
    setup() {
        const isEditing = ref(false)

        const notelist = inject('notes')

        const editNote = async (noteToUpdate) => {
            await axios.patch('http://localhost:4000/notes/' + noteToUpdate.id, {
                title: noteToUpdate.title, done: noteToUpdate.done
            })
            notelist.value.filter(n => n.id === noteToUpdate.id ? noteToUpdate : n)
            isEditing.value = false
        }

        const deleteNote = async (noteToDelete) => {
            await axios.delete('http://localhost:4000/notes/' + noteToDelete.id)
            notelist.value.splice(noteToDelete.id-1, 1)
        };

        return { isEditing, editNote, deleteNote }
    }
}
</script>