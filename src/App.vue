<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <div class="avatar-container">
          <q-avatar size="50px" color="primary">
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'App',
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
      ]
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
    }
  },
  mounted() {
  }
}
</script>

<style>
#q-app {
  height: 100vh;
}

.teks {
  font-size: 16px;
  color: white;
}

.avatar-container {
  display: flex;
  align-items: center;
}

.name-and-widget {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.weather-text {
  font-size: 14px;
  color: white;
}


</style>
