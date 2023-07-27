<script lang="ts">
    import { onMount } from "svelte";
    import type { Note } from "../interfaces";
    import { NotesStore } from "../store/NotesStore";
    import SingleNote from "./SingleNote.svelte";

    let notes = [] as Note[]
    onMount(() => NotesStore.subscribe((data) => {notes = data}))
</script>

<div class="note_list">
    {#each notes as note}
        <SingleNote {note}/>
    {/each}
</div>