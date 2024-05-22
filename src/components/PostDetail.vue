<template>
    <div class="post-detail">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
    </div>
</template>

<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        post: Object,
    });
</script>

<style scoped>
.post-detail {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

h3 {
    margin-bottom: 10px;
}

p {
    margin: 0;
}
</style>
