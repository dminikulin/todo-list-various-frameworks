<template>
    <div class="add_note_block">
        <input type="text" v-model="newNote" @keydown.enter="addNote">
        <button @click="addNote">Add</button>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { inject, ref } from 'vue';
import { DB_LINK, Note } from '../interfaces';

let newNote = ref<string>("")
const notelist = inject<Note[]>('notes') as Note[]
const addNote = async () => {
    if(newNote.value === ""){
        alert("Can't add empty note")
        return
    }
    const response = await axios.post(DB_LINK, {
        title: newNote.value, done: false
    })
    notelist?.value.push(response.data)
    newNote.value = ""
}
</script>