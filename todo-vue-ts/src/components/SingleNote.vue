<template>
    <div class="single_note">
        <input type="checkbox" :disabled="isEditing" v-model="note.done" v-on:change="editNote(note)">
        <template v-if="isEditing">
            <input type="text" v-model="note.title" @keydown.enter="isEditing = !isEditing">
            <button @click="editNote(note)">Save</button>
        </template>
        <template v-else>
            <span>{{note.title}}</span>
            <button :disabled="note.done" @click="isEditing = !isEditing">Edit</button>
        </template>
        <button @click="deleteNote(note)">Delete</button>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { inject, ref } from 'vue';
import { DB_LINK, Note } from '../interfaces';

const props = defineProps({
    note: {
        type: Object as () => Note,
        required: true
    }
})

const isEditing = ref<boolean>(false)
const notelist = inject<Note[]>('notes') as Note[]

const editNote = async (noteToUpdate: Note) => {
    await axios.patch(DB_LINK + props.note.id, {
        title: noteToUpdate.title, done: noteToUpdate.done
    })
    notelist?.value.filter((n: Note) => n.id === noteToUpdate.id ? noteToUpdate : n)
    isEditing.value = false
}

const deleteNote = async (noteToDelete:Note) => {
    await axios.delete(DB_LINK + props.note.id)
    notelist?.value.splice(noteToDelete.id-1, 1)
}
</script>
