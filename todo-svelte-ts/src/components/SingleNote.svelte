<script lang="ts">
    import { onMount } from "svelte";
    import { DB_LINK, type Note } from "../interfaces";
    import { NotesStore } from "../store/NotesStore";
    import axios from "axios";

    export let note: Note;

    let isEditing: boolean = false;

    let notes = [] as Note[];
    onMount(() =>
        NotesStore.subscribe((data) => {
            notes = data;
        })
    );

    const editNote = async (noteToEdit: Note) => {
        await axios.patch(DB_LINK + noteToEdit.id, {
            title: noteToEdit.title, done: noteToEdit.done
        })
        NotesStore.set(notes.map(n => n.id === noteToEdit.id ? noteToEdit : n))
        isEditing = false
    };
    const deleteNote = async (noteToDelete: Note) => {
        await axios.delete(DB_LINK + noteToDelete.id)
        NotesStore.set(notes.filter(n => n.id !== noteToDelete.id))
    };
</script>

<div class="single_note">
    <input disabled={isEditing} type="checkbox" bind:checked={note.done} on:change={() => editNote(note)}/>
    {#if isEditing}
        <input type="text" bind:value={note.title} />
        <button on:click={() => editNote(note)}>Save</button>
    {:else}
        <span>{note.title}</span>
        <button disabled={note.done} on:click={() => isEditing = !isEditing}>Edit</button>
    {/if}
    <button on:click={() => deleteNote(note)}>Delete</button>
</div>
