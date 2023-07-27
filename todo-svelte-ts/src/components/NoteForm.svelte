<script lang="ts">
    import { onMount } from "svelte";
    import { DB_LINK, type Note } from "../interfaces";
    import { NotesStore } from "../store/NotesStore";
    import axios from "axios";

    let newNote: string = ""
    let notes = [] as Note[]
    onMount(() => NotesStore.subscribe((data) => {notes = data}))

    const addNote = async () => {
        if(newNote === ""){
            alert("Can't add empty notes")
            return
        }
        const response = await axios.post(DB_LINK, {
            title: newNote, done: false
        })
        NotesStore.set([...notes, response.data])
        newNote = ""
    }
</script>

<div class="add_note_block">
    <input type="text" bind:value={newNote}>
    <button on:click={() => addNote()}>Add</button>
</div>