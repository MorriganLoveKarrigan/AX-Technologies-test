<template>
  <div class="post-item">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
    <button v-if="!$route.params.id" @click="handleReadMore">read more</button>
  </div>
</template>

<script setup lang="ts">
  import type { PostItemProps } from '~/components/posts-item/types';

  const $router = useRouter();
  const $route = useRoute();
  const props = defineProps<PostItemProps>();
  const handleReadMore = () => {
    $router.push({ name: 'post-id', params: { id: String(props.post.id) } });
  };
</script>

<style lang="css" scoped>
  .post-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    word-wrap: break-word;
    background-color: #fff;
    box-shadow:
      0 12px 15px rgba(0, 0, 0, 0.1),
      0 17px 50px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    margin-bottom: 16px;
    padding: 16px;
  }

  .post-item h3 {
    font-size: 24px;
    line-height: 36px;
    color: #303133;
    font-weight: 500;
  }

  .post-item button {
    padding: 6px 12px;
    border: none;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    cursor: pointer;
  }

  .post-item button:hover {
    background-color: #ddd;
    color: #333;
    -webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
</style>
