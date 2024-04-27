<template>
    <div>
      <h2>Daftar Kegiatan</h2>
  
      <!-- Tombol untuk Mengaktifkan/Menonaktifkan Filter -->
      <button @click="toggleFilter">
        {{ showOnlyUncompleted ? 'Tampilkan Semua' : 'Tampilkan yang Belum Selesai' }}
      </button>
  
      <!-- Daftar Kegiatan dengan Filter -->
      <ul>
        <!-- Gunakan satu v-for untuk menghindari pengulangan ganda -->
        <li
          v-for="(activity, index) in filteredActivities" 
          :key="index"
          :class="{ 'completed': activity.completed }" 
        >
          <!-- Hanya tampilkan deskripsi dan tombol hapus -->
          <input
            type="checkbox"
            v-model="activity.completed"
          />
          {{ activity.description }}
          <!-- Tombol Hapus -->
          <button @click="removeActivity(index)">Hapus</button>
        </li>
      </ul>
  
      <!-- Formulir untuk Menambah Kegiatan Baru -->
      <form @submit.prevent="addActivity">
        <input
          type="text"
          v-model="newActivity" 
          placeholder="Tambah kegiatan baru"
        />
        <button type="submit">Tambah</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  // Inisialisasi daftar kegiatan dan variabel untuk kegiatan baru
  const activities = ref([]);
  const newActivity = ref('');
  const showOnlyUncompleted = ref(false); // Status untuk filter
  
  // Tambahkan kegiatan baru
  const addActivity = () => {
    if (newActivity.value.trim() !== '') {
      activities.value.push({
        description: newActivity.value,
        completed: false, // Inisialisasi sebagai belum selesai
      });
      newActivity.value = ''; // Kosongkan input setelah ditambahkan
    }
  };
  
  // Hapus kegiatan
  const removeActivity = (index) => {
    activities.value.splice(index, 1); // Hapus kegiatan dengan `splice`
  };
  
  // Toggle filter untuk hanya menampilkan yang belum selesai
  const toggleFilter = () => {
    showOnlyUncompleted.value = !showOnlyUncompleted.value;
  };
  
  // Komputasi daftar kegiatan dengan filter
  const filteredActivities = computed(() => {
    if (showOnlyUncompleted.value) {
      return activities.value.filter(activity => !activity.completed); // Hanya yang belum selesai
    }
    return activities.value; // Semua kegiatan
  });
  </script>
  
  <style scoped>
/* Gaya untuk elemen daftar */
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0; /* Tambahkan batas di bawah setiap item */
  display: flex;
  align-items: center; /* Atur semua elemen dalam item secara vertikal */
  justify-content: space-between; /* Ruang antara elemen input dan tombol */
}

/* Gaya untuk input dan tombol */
input {
  padding: 7px; /* Sedikit lebih besar untuk tampilan yang lebih baik */
  margin-right: 10px; /* Spasi antara input dan tombol */
  border: 1px solid #ccc;
  border-radius: 4px; /* Tambahkan sudut melengkung */
}

button {
  padding: 7px 15px; /* Lebih besar untuk klik yang lebih baik */
  background-color: #007bff; /* Warna biru standar */
  color: white;
  border: none;
  border-radius: 4px; /* Tambahkan sudut melengkung */
  cursor: pointer; /* Gaya kursor saat di atas tombol */
  transition: background-color 0.3s; /* Efek transisi saat mengarahkan kursor */
}

button:hover {
  background-color: #0056b3; /* Warna yang lebih gelap saat di hover */
}

/* Gaya untuk kegiatan yang telah selesai */
.completed {
  text-decoration: line-through;
  color: grey;
}

/* Gaya tambahan untuk formulir */
form {
  margin-top: 20px; /* Beri jarak antara daftar dan formulir */
}
</style>