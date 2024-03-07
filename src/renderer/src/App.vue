<script setup lang="ts">
const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
 <div>金融终端</div>
</template>
