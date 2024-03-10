<template>
  <div class="main-page">
    <div class="main-page__content">
      <PostsFilter @search="handleQueryChanges" @sort="handleSortBy" />
      <PostsList :posts="sortedPosts" v-if="posts" :loading="isLoading" />
    </div>
    <AppPagination
      :limit="query._limit"
      :pages-amount="pagesAmount"
      :disabled="isLoading"
      @page-change="handleQueryChanges"
      @per-page-change="handleQueryChanges"
    />
  </div>
</template>

<script setup lang="ts">
  import PostsList from '~/components/posts-list/PostsList.vue';
  import type { PostEntity } from '~/types';
  import { getPosts } from '~/api/posts';
  import { usePostsPagination } from '~/composables/usePostsPagination';
  import PostsFilter from '~/components/posts-filter/PostsFilter.vue';

  const posts = ref<PostEntity[] | null>(null);
  const isLoading = ref(false);
  const { pagesAmount, query, setQuery } = usePostsPagination();

  const fetchData = async (): Promise<void> => {
    isLoading.value = true;
    posts.value = await getPosts(query.value);
    isLoading.value = false;
  };

  const handleQueryChanges = (data: { page?: number; perPage?: string; searchValue?: string }) => {
    const calculateStart = (page: number, limit: number) => `${page * limit - limit}`;
    const newQuery = {
      ...query.value,
      _start: data.page ? calculateStart(data.page, +query.value._limit) : query.value._start,
      _limit: data.perPage || query.value._limit,
      q: data.searchValue ? data.searchValue : '',
    };

    setQuery(newQuery);
    fetchData();
  };

  const handleSortBy = (type: string) => {
    const newQuery = {
      ...query.value,
      sort: type,
    };
    setQuery(newQuery);
    fetchData();
  };
  const sortedPosts = computed(() => {
    if (!posts.value) return [];
    return [...posts.value].sort((a, b) => {
      const key = query.value.sort as keyof PostEntity;
      const aValue = a[key];
      const bValue = b[key];
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      } else {
        return String(aValue).localeCompare(String(bValue));
      }
    });
  });

  onMounted(() => {
    fetchData();
  });
</script>

<style scoped>
  .main-page {
    width: 100%;
    min-width: 100%;
  }

  .main-page__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 16px;
  }
</style>
