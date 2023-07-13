<template>
    <div class="note_list">
        <template v-for="note in notelist" :key="note.id">
            <SingleNote :note="note"></SingleNote>
        </template>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Note } from '../interfaces';
import SingleNote from './SingleNote.vue';

const notelist = inject<Note[]>('notes') as Note[]

</script>