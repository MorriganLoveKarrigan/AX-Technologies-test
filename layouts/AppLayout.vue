<template>
  <div class="app-layout">
    <NuxtLayout>
      <div class="app-container">
        <AppHeader />
        <slot />
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
  import AppHeader from '~/components/app/AppHeader.vue';
</script>
<style lang="css">
  .app-layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .app-container {
    min-width: 1160px;
    padding: 0 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
