<template>
    <div class="note_list">
        <template v-for="note in notelist" :key="note.id">
            <SingleNote :note="note"></SingleNote>
        </template>
    </div>
</template>

<script>
import { inject } from 'vue';
import SingleNote from './SingleNote.vue';

export default {
    name: 'NoteList',
    components: { SingleNote },
    setup() {
        const notelist = inject('notes')
        return {notelist}
    }
}
</script>