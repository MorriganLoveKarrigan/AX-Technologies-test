<template>
  <div ref="intersectionElement" class="intersection">
    <div class="line"></div>
    <slot />
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits<{
    (e: 'intersected', entries: IntersectionObserverEntry): void;
  }>();

  const intersectionElement = ref<HTMLElement | null>(null);
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && intersectionElement.value) {
      emit('intersected', entries[0]);
    }
  });

  onMounted(() => {
    if (intersectionElement.value) {
      observer.observe(intersectionElement.value);
    }
  });

  onBeforeUnmount(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<style scoped lang="css">
  .intersection {
    min-height: 2px;
    margin: 0 2rem;
    position: relative;
  }

  .line {
    position: absolute;
    top: 0;
    bottom: 0;
    background: #333333;
    animation: loader 1s ease-in-out infinite;
  }

  @keyframes loader {
    0% {
      left: 0;
      right: 100%;
    }
    50% {
      left: 0;
      right: 0;
    }
    100% {
      right: 0;
      left: 100%;
    }
  }
</style>
