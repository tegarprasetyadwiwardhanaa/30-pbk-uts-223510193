<template>
    <form @submit.prevent="handleSubmit" class="activity-form">
        <input type="text" v-model="newActivity" placeholder="Tambah kegiatan baru" />
        <button type="submit">Tambah</button>
    </form>
</template>

<script setup>
    import { ref, defineEmits } from 'vue';

    const newActivity = ref('');
    const emits = defineEmits(['add']);

    const handleSubmit = () => {
        if (newActivity.value.trim() !== '') {
        emits('add', newActivity.value);
        newActivity.value = '';
        }
    };
</script>

<style scoped>
.activity-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}

.activity-form input[type="text"] {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 1rem;
    margin-right: 10px;
    transition: border-color 0.3s ease-in-out;
}

.activity-form input[type="text"]:focus {
    border-color: #007bff;
    outline: none;
}

.activity-form button {
    padding: 10px 20px;
    border: none;
    border-radius: 3px;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.activity-form button:hover {
    background-color: #218838;
}
</style>
