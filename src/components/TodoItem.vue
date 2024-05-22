<template>
    <li>
        <input type="checkbox" v-model="activity.completed" />
        <span :class="{ completed: activity.completed }">{{ index + 1 }}. {{ activity.description }}</span>
        <button @click="removeActivity">Hapus</button>
        <div v-if="activity.completed" class="completed-box">Sudah Selesai</div>
    </li>
</template>

<script>
    export default {
        props: {
        activity: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        },
        methods: {
        removeActivity() {
            this.$emit('remove');
        },
        },
    };
</script>

<style scoped>
.activity-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding: 15px;
    border-bottom: 1px solid #eee;
    background-color: #fff;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.activity-list li:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

input[type="checkbox"] {
    margin-right: 10px;
    cursor: pointer;
}

.activity-list li span {
    flex: 1;
    font-size: 1rem;
    color: #555;
}

.completed {
    text-decoration: line-through;
    color: #999;
}

.activity-list li button {
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.activity-list li button:hover {
    background-color: #c82333;
}

.completed-box {
    background-color: #28a745;
    padding: 5px 10px;
    border-radius: 3px;
    color: white;
    font-weight: bold;
    font-size: 0.9rem;
}
</style>
