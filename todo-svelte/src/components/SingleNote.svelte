<script>
    import { onMount } from "svelte";
    import { NotesStore } from "../store/NotesStore";
    import axios from "axios";

    export let note

    let isEditing = false

    let notes = []
    onMount(() => NotesStore.subscribe((data) => {notes = data}));

    const editNote = async (noteToEdit) => {
        await axios.patch('http://localhost:4000/notes/' + noteToEdit.id, {
            title: noteToEdit.title, done: noteToEdit.done
        })
        NotesStore.set(notes.map(n => n.id === noteToEdit.id ? noteToEdit : n))
        isEditing = false
    }
    const deleteNote = async (noteToDelete) => {
        await axios.delete('http://localhost:4000/notes/' + noteToDelete.id)
        NotesStore.set(notes.filter(n => n.id !== noteToDelete.id))
    }
</script>

<div class="single_note">
    <input disabled={isEditing} type="checkbox" bind:checked={note.done} on:change={() => editNote(note)}>
    {#if isEditing}
        <input type="text" bind:value={note.title}>
        <button on:click={() => editNote(note)}>Save</button>
    {:else}
        <span>{note.title}</span>
        <button disabled={note.done} on:click={() => {isEditing = !isEditing}}>Edit</button>
    {/if}
    <button on:click={() => deleteNote(note)}>Delete</button>
</div>