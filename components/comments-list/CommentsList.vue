<template>
  <div class="comments-list">
    <div v-if="comments?.length">
      <h3>Комментарии</h3>
      <CommentsItem :class="{ 'loading': loading }" v-for="comment in comments" :key="comment.id" :comment="comment" />
    </div>
    <div v-else>Комментарии отсутствуют...</div>
  </div>
</template>

<script setup lang="ts">
  import type { CommentsListProps } from '~/components/comments-list/types';

  defineProps<CommentsListProps>();
</script>
<style lang="css">
  .comments-list {
  }
</style>
