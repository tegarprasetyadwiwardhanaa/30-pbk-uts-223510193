import { createApp } from 'vue';
import { Quasar } from 'quasar';
import App from './App.vue';
import router from './router'; 
import { createPinia } from 'pinia';
import { usePhotoAlbumStore } from './stores/photoAlbum';
import AlbumList from './components/AlbumList.vue';
import AlbumDetail from './components/AlbumDetail.vue';

const routes = [
  { path: '/', component: AlbumList },
  { path: '/albums/:id', component: AlbumDetail, props: true } 
];


const app = createApp(App);


const pinia = createPinia();




app.use(Quasar, {
  plugins: {},
});


app.use(pinia);


app.use(router);


const photoAlbumStore = usePhotoAlbumStore();


photoAlbumStore.fetchAlbums();


app.mount('#app');
