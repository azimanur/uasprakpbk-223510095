<template>
    <q-page>
      <div class="q-pa-md">
        <Cuaca />
      </div>
    </q-page>
  </template>
  
  <script>
  import Cuaca from './Cuaca.vue'
  
  export default {
    name: 'Home',
    components: {
      Cuaca
    }
  }
  </script>
  