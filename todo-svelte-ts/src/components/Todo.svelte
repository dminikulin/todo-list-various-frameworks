<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";
    import { DB_LINK, type Note } from "../interfaces";
    import { NotesStore } from "../store/NotesStore";
    import NoteForm from "./NoteForm.svelte";
    import NoteList from "./NoteList.svelte";

    let notes = [] as Note[]
    
    onMount(async () => {
        try {
            const response = await axios.get(DB_LINK)
            notes = response.data
            NotesStore.set(notes)
        } catch (error) {
            console.log(error.message)
        }
    })
    
</script>

<div>
    <div class="main_container">
        <div class="note_container">
            <h1>Dima's todo list</h1>
            <NoteForm></NoteForm>
            <NoteList></NoteList>
        </div>
    </div>
</div>