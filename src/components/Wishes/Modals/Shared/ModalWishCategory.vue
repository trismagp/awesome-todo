<template>
    <div class="row q-mb-sm">
        <div class="col">
            <q-select 
                outlined 
                clearable
                :value="category" 
                @input="$emit('update:category', $event)"
                :options="categories" 
                :rules="[val => !!val || 'Field is required']"
                label="Outlined" />
        </div>
    </div>
</template>

<script>
export default {
    props: ['category','categories']
}
</script>