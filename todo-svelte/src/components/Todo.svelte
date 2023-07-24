<script>
    import axios from "axios";
    import NoteForm from "./NoteForm.svelte";
    import NoteList from "./NoteList.svelte";
    import { onMount } from "svelte";
    import { NotesStore } from "../store/NotesStore";

    let notes = [];
    const load = async () => {
        try {
            const response = await axios.get("http://localhost:4000/notes");
            notes = response.data;
            NotesStore.set(notes)
        } catch (error) {
            console.log(error.message);
        }
    };
    onMount(() => load())
</script>

<div>
    <div class="main_container">
        <div class="note_container">
            <h1>Dima's todo list</h1>
            <NoteForm />
            <NoteList/>
        </div>
    </div>
</div>
