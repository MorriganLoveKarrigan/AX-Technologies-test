<template>
  <div class="posts-filter">
    <app-input placeholder="Поиск..." v-model="searchValue" @update:modelValue="handleSearchValueInput" />
    <app-select
      v-model="filterBy"
      label="Сортировать по"
      :items="selectOptions"
      @update:modelValue="handleFilterByChange"
    />
  </div>
</template>

<script setup lang="ts">
  import AppSelect from '~/components/app/AppSelect.vue';

  const $route = useRoute();

  const filterBy = ref($route.query.sort || 'title');
  const searchValue = ref('');

  const emit = defineEmits<{
    (e: 'search', data: { searchValue: string }): void;
    (e: 'sort', type: string): void;
  }>();

  const selectOptions = [
    {
      title: 'По заголовку',
      value: 'title',
    },
    {
      title: 'По описанию',
      value: 'body',
    },
  ];

  const handleSearchValueInput = debounce((newValue: string) => {
    emit('search', { searchValue: newValue });
  }, 500);

  const handleFilterByChange = (type: string) => {
    emit('sort', type);
  };
</script>

<style lang="css" scoped>
  .posts-filter {
    display: flex;
    padding: 16px;
    gap: 16px;
    background-color: #fff;
    box-shadow:
      0 12px 15px rgba(0, 0, 0, 0.1),
      0 17px 50px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
  }
</style>
