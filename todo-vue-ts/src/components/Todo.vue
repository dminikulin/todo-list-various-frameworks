<template>
    <div class="main_container">
        <div class="note_container">
            <h1>Dima's todo list</h1>
            <NoteForm></NoteForm>
            <template v-if="error">
                <p>{{ error }}</p>
            </template>
            <template v-else-if="notes.length === 0 && !loading">
                <p>No notes so far</p>
            </template>
            <template v-else-if="loading">
                <p>Loading...</p>
            </template>
            <template v-else>
                <NoteList></NoteList>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { Note, DB_LINK } from '../interfaces'
import axios from 'axios'
import NoteForm from './NoteForm.vue';
import NoteList from './NoteList.vue';

const notes = ref<Note[]>([])
const error = ref<string>("")
const loading = ref<boolean>(true)

const load = async () => {
    try {
        const data = await axios.get(DB_LINK)
        notes.value = data.data
        loading.value = false
    } catch (err) {
        error.value = 'Failed to get notes'
        loading.value = false
        console.log('Failed to get notes: ' + err)
    }
}

load()

provide('notes', notes)

</script>