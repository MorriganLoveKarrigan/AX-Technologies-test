<template>
  <div class="comment-item">
    <h3>#{{ comment.id }}: {{ comment.name }}</h3>
    <p>{{ comment.body }}</p>
    <div class="comment-item__user">
      <img :src="UserIcon" alt="user-icon" />
      <p><strong>Email:</strong> {{ comment.email }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { defineProps } from 'vue';
  import UserIcon from 'assets/user-icon.png';
  import type { CommentsItemProps } from '~/components/comments-item/types';

  defineProps<CommentsItemProps>();
</script>

<style lang="css" scoped>
  .comment-item {
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    background-color: #fff;
    box-shadow:
      0 12px 15px rgba(0, 0, 0, 0.1),
      0 17px 50px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    margin-bottom: 16px;
    padding: 16px;
  }

  .comment-item h3 {
    font-size: 24px;
    line-height: 36px;
    color: #303133;
    font-weight: 700;
  }

  .comment-item__user {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .comment-item__user img {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
</style>
