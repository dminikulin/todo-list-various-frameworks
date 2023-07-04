<template>
    <div class="main_container">
        <div class="note_container">
            <h1>Dima's todo list</h1>
            <NoteForm></NoteForm>
            <template v-if="error">
                <p>{{error}}</p>
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

<script>
import { provide, ref } from 'vue'
import axios from 'axios'
import NoteForm from './NoteForm.vue'
import NoteList from './NoteList.vue'

export default {
    name: "Todo",
    components: { NoteForm, NoteList },
    setup() {
        const notes = ref([])
        const error = ref(null)
        const loading = ref(true)

        const load = async () => {
            try{
                // console.log(loading.value)
                const data = await axios.get('http://localhost:4000/notes')
                notes.value = await data.data
                loading.value = false
            }catch(err){
                error.value = 'Failed to get notes'
                loading.value = false
                console.log('Failed to get notes: ' + err)
            }
        }

        load()

        provide('notes', notes)
        return { notes, error, loading };
    },
}
</script>