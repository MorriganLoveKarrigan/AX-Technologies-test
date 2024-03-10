<template>
  <div class="posts-list">
    <div v-if="posts?.length">
      <PostsItem :class="{ 'loading': loading }" v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div v-else-if="!posts?.length">Пусто...</div>
  </div>
</template>

<script setup lang="ts">
  import type { PostListProps } from './types';

  defineProps<PostListProps>();
</script>

<style>
  .posts-list {
    width: 100%;
  }

  .loading {
    pointer-events: none;
    user-select: none;
    transition: all 0.4s;
    text-shadow: 0 0 6px #333333;
    filter: blur(8px);
  }
</style>
