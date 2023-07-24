<script>
    import { getContext, onMount } from "svelte";
    import SingleNote from "./SingleNote.svelte";
    import { NotesStore } from "../store/NotesStore";

    let notes = [];
    onMount(() => NotesStore.subscribe((data) => {notes = data}));
    
</script>

<div class="note_list">
    {#each notes as note}
        <SingleNote {note} />
    {/each}
</div>
