<template>
  <div class="post-page">
    <div v-if="post && !loading.post">
      <PostsItem :post="post" />
      <div ref="commentsContainer">
        <div v-if="comments && !loading.comments">
          <CommentsList :comments="slicedComments" :loading="loading.comments" />
        </div>
        <div v-else-if="!comments && loading.comments">Loading comments...</div>
        <AppIntersectionObserver v-if="canFetchMoreComments" @intersected="fetchMoreComments" ref="intersection" />
      </div>
    </div>
    <div v-else>Идет загрузка...</div>
  </div>
</template>

<script setup lang="ts">
  import { getPostById } from '~/api/posts';
  import { getPostsComments } from '~/api/comments';
  import type { CommentEntity, PostEntity } from '~/types';

  const $route = useRoute();
  const loading = ref({
    post: false,
    comments: false,
  });
  const post = ref<PostEntity | null>(null);
  const comments = ref<CommentEntity[] | null>(null);
  const displayedComments = ref<CommentEntity[]>([]);

  const canFetchMoreComments = computed(() => {
    return comments.value && slicedComments.value.length < comments.value.length && !loading.value.comments;
  });

  const currentPostId = computed(() => String($route.params.id));
  const commentsToShow = ref(2);

  const fetchPost = async () => {
    loading.value.post = true;
    post.value = await getPostById(currentPostId.value).then(response => response!.data || null);
    loading.value.post = false;
  };

  const fetchComments = async () => {
    loading.value.comments = true;
    comments.value = await getPostsComments(currentPostId.value).then(response => response!.data || null);
    loading.value.comments = false;
  };

  const fetchMoreComments = async () => {
    if (comments.value) {
      const currentDisplayed = displayedComments.value.length;
      const remainingComments = comments.value.slice(currentDisplayed);
      displayedComments.value = displayedComments.value.concat(remainingComments.slice(0, commentsToShow.value));
    }
  };

  onBeforeMount(async () => {
    await fetchPost();
    await fetchComments();
  });

  const slicedComments = computed(() => {
    return comments.value ? comments.value.slice(0, displayedComments.value.length) : [];
  });

  watch(
    comments,
    newComments => {
      if (newComments) {
        displayedComments.value = newComments.slice(0, commentsToShow.value);
      }
    },
    { immediate: true }
  );
</script>
<style lang="css">
  .post-page {
    min-width: 100%;
  }
</style>
