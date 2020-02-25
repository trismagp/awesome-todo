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
                :rules="[val => !!val || 'Field is required']" />
        </div>
    </div>
</template>
<script>
export default {
        props: ['title']
}
</script>