<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="navbar">
      <q-toolbar>
        <div class="avatar-container">
          <q-avatar size="50px">
            <q-icon name="cloud" size="md" />
          </q-avatar>
          <div class="name-and-widget">
            <q-item-label class="teks">Nur Azima</q-item-label>
            <q-item-label class="weather-text">Weather Widget</q-item-label>
          </div>
        </div>
        <q-toolbar-title></q-toolbar-title>
        <q-select
          v-model="selectedTask"
          outlined
          dense
          :options="options"
          @update:modelValue="navigate"
          color="white"
        >
          <template v-slot:prepend>
            <q-item-label v-if="showPlaceholder" class="teks">Daftar Tugas</q-item-label>
          </template>
        </q-select>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="video-background">
        <iframe
          v-if="videoUrl"
          :src="videoUrl"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          class="background-video"
        ></iframe>
      </div>

      <div class="weather-content">
        <div class="weather-info">
          <div class="input-container">
          <div class="weather-info-content ">
            <q-input
            v-model="city"
            label="Nama Kota"
            outlined
            dense
            class="short-input"
          />
          <q-btn @click="fetchWeather" label="Cari" color="primary" class="search-button"/>
          <div class="text-h6">{{ weather.name }}</div>
            <div>{{ weather.main?.temp }} °C</div>
            <div>{{ weather.weather?.[0].description }}</div>
            <div>Latitude: {{ weather.coord?.lat }}</div>
            <div>Longitude: {{ weather.coord?.lon }}</div>
        </div>
            
            
          </div>
        </div>

        

        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </div>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Cuaca',
  data() {
    return {
      selectedTask: null,
      options: [
        { label: 'Tugas1', value: '/tugas1' },
        { label: 'Tugas2', value: '/tugas2' },
        { label: 'Tugas3', value: '/tugas3' },
        { label: 'Tugas4', value: '/tugas4' },
        { label: 'Tugas5', value: '/tugas5' },
        { label: 'Tugas6', value: '/tugas6' },
        { label: 'Tugas7', value: '/tugas7' }
      ],
      city: '',
      weather: {},
      error: '',
      videoUrl: ''
    }
  },
  computed: {
    showPlaceholder() {
      return !this.selectedTask;
    }
  },
  methods: {
    navigate(value) {
      if (value && typeof value === 'string') {
        if (value.startsWith('http')) {
          window.location.href = value;
        } else {
          this.$router.push(value);
        }
      } else if (value && typeof value === 'object' && value.value) {
        const path = value.value;
        if (path.startsWith('http')) {
          window.location.href = path;
        } else {
          this.$router.push(path);
        }
      }
    },
    async fetchWeather() {
      if (!this.city.trim()) {
        this.error = 'Masukkan nama kota.';
        return;
      }

      const apiKey = 'abf968b383db14271f1eefa1b2497c08';
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
          throw new Error('City not found');
        }
        this.weather = await response.json();
        this.error = '';
        this.updateVideoUrl(); 
      } catch (error) {
        console.error(error);
        this.weather = {};
        this.error = 'Kota tidak ditemukan. Coba lagi.'; 
      }
    },
    updateVideoUrl() {
      if (this.weather.weather && this.weather.main) {
        const weatherDescription = this.weather.weather[0].main.toLowerCase();
        const temperature = this.weather.main.temp;

        if (weatherDescription.includes('rain') || (temperature >= 0 && temperature <= 9)) {
          this.videoUrl = 'https://www.youtube.com/embed/XSA5amGy9r4?autoplay=1&mute=1&loop=1&playlist=XSA5amGy9r4';
        } else if (weatherDescription.includes('clouds') || (temperature >= 10 && temperature <= 30)) {
          this.videoUrl = 'https://www.youtube.com/embed/zQv40EfabKo?autoplay=1&mute=1&loop=1&playlist=zQv40EfabKo';
        } else if (temperature > 30) {
          this.videoUrl = 'https://www.youtube.com/embed/qM3qY_kqDHw?autoplay=1&mute=1&loop=1&playlist=qM3qY_kqDHw';
        } else {
          this.videoUrl = '';
        }
      }
    }
  },
  watch: {
    city(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.videoUrl = ''; 
      }
    }
  }
}
</script>

<style scoped>

.navbar {
  background-image: url(../assets/bgnav.jpeg);
}
.text-h6 {
  font-weight: bold;
}

.weather-info {
  margin-top: 20px;
}

.weather-info-content {
  background-color: rgba(255, 255, 255, 0.274);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px; 
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px; 
}

.short-input {
  max-width: 200px;
  margin-right: 10px;
}

.search-button {
  height: 36px;
}

.q-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 16px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.background-video {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>
