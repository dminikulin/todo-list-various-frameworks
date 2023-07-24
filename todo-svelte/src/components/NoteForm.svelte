<script>
    import { onMount } from "svelte";
    import { NotesStore } from "../store/NotesStore";
    import axios from "axios";

    let newNote = ""
    let notes = []
    onMount(() => NotesStore.subscribe((data) => {notes = data}));

    const addNote = async () => {
        if(newNote === ""){
            alert("Can't add empty notes")
            return
        }
        const response = await axios.post('http://localhost:4000/notes', {
            title: newNote, done: false
        })
        NotesStore.set([...notes, response.data])
        newNote = ""
    }
</script>

<div class="add_note_block">
    <input type="text" bind:value={newNote}/>
    <button on:click={() => addNote()}>Add</button>
</div>
