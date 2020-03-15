<template>
    <div class="row q-mb-sm">
        <div class="col">
            <q-input 
                outlined 
                clearable
                :value="title"
                @input="$emit('update:title', $event)" 
                ref="title"
                label="Title"
                v-select-all
                :rules="[val => !!val || 'Field is required']" />
        </div>
    </div>
</template>
<script>
import { selectAll } from "src/directives/directive-select-all";

export default {
        props: ['title'],
        directives:{
            selectAll
        }
}
</script>