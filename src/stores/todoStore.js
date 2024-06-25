import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';

export const useTodoStore = defineStore('todo', () => {
  const activities = ref(loadActivities() || []);
  const showOnlyUncompleted = ref(false);

  const filteredActivities = computed(() => showOnlyUncompleted.value 
    ? activities.value.filter(activity => !activity.completed)
    : activities.value
  );

  function addActivity(description) {
    if (description.trim() !== '') {
      activities.value.push({ id: uuidv4(), description, completed: false });
    }
  }

  function removeActivity(id) {
    activities.value = activities.value.filter(activity => activity.id !== id);
  }

  function toggleFilter() {
    showOnlyUncompleted.value = !showOnlyUncompleted.value;
  }

  function toggleCompleted(id) {
    const todo = activities.value.find(activity => activity.id === id);
    if (todo) todo.completed = !todo.completed; 
  }

  function loadActivities() {
    try {
      const storedActivities = localStorage.getItem('activities');
      return storedActivities ? JSON.parse(storedActivities) : [];
    } catch (error) {
      console.error('Error loading activities:', error);
      return [];
    }
  }

  watch(activities, (newActivities) => {
    try {
      localStorage.setItem('activities', JSON.stringify(newActivities));
    } catch (error) {
      console.error('Error saving activities:', error);
    }
  }, { deep: true });

  return { activities, showOnlyUncompleted, filteredActivities, addActivity, removeActivity, toggleFilter, toggleCompleted };
});
