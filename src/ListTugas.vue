<template>
    <div>Redirecting...</div>
  </template>
  
  <script>
  export default {
    name: 'ListTugas',
    props: {
      url: {
        type: String,
        required: true
      }
    },
    mounted() {
      window.location.href = this.url
    }
  }
  </script>
  