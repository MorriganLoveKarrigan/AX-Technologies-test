<template>
  <div class="app-pagination" v-if="pagesAmount">
    <div class="app-pagination__page">
      <button :disabled="activePage == 1 || disabled" @click="changePage(+activePage - 1)">
        {{ '<' }}
      </button>
      <template v-for="page in renderingPages">
        <button
          v-if="Number.isInteger(page)"
          :class="{ active: page == activePage }"
          :disabled="page == activePage || disabled"
          :key="page"
          @click="changePage(+page)"
        >
          {{ page }}
        </button>
        <span v-else>{{ page }}</span>
      </template>
      <button :disabled="activePage == pagesAmount || disabled" @click="changePage(+activePage + 1)">
        {{ '>' }}
      </button>
    </div>
    <div class="app-pagination__select">
      <app-select v-model="limitBy" :items="perPageOptions" @update:modelValue="handlePerPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import router from '#app/plugins/router';

  const $route = useRoute();

  const props = defineProps<{
    limit: string;
    pagesAmount: number;
    disabled?: boolean;
  }>();

  const limitBy = ref($route.query._limit || '10');

  const emit = defineEmits<{
    (e: 'pageChange', data: { page: string | number }): void;
    (e: 'perPageChange', data: { perPage: string }): void;
  }>();

  const perPageOptions = ['10', '20', '30', '40', '50'];

  const activePage = ref(Number($route.query?.page) || 1);
  const pagesArray = ref<number[]>(Array.from({ length: props.pagesAmount }, (_, i) => i + 1));

  const visibleItems = 3;
  const sideItems = Math.floor(visibleItems / 2);

  const filteredPages = (): (number | undefined)[] => {
    const centerPage = activePage.value;
    return pagesArray.value.map(page => {
      if (page === 1 || page === props.pagesAmount) return page;
      if (Math.abs(page - centerPage) <= sideItems) return page;
      return undefined;
    });
  };

  const renderingPages = computed(() => {
    const array = filteredPages();
    const result: (string | number)[] = [];
    let hasEllipsis = false;

    array.forEach((item, index) => {
      if (item === undefined) {
        if (!hasEllipsis && (index === 0 || (index > 0 && array[index - 1] !== undefined))) {
          result.push('...');
          hasEllipsis = true;
        }
      } else {
        result.push(item);
      }
    });

    return result;
  });

  const changePage = (page: number) => {
    activePage.value = page;
    emit('pageChange', { page });
  };

  const handlePerPage = (perPage: string) => {
    limitBy.value = perPage;
    emit('perPageChange', { perPage });
  };

  watch(
    () => props.pagesAmount,
    () => {
      pagesArray.value = Array.from({ length: props.pagesAmount }, (_, i) => i + 1);
      activePage.value = 1;
    }
  );
</script>

<style lang="css" scoped>
  .app-pagination {
    display: flex;
    gap: 16px;
    justify-content: center;
  }
  .app-pagination__page {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: nowrap;
  }

  .app-pagination__page button {
    padding: 6px 16px;
    border-radius: 6px;
    text-align: center;
    min-width: 24px;
    cursor: pointer;
    border: 1px solid #ddd;
    background-color: #fff;
    color: #333;
  }

  .app-pagination__page button.active {
    background-color: #f0f0f0;
    color: #000;
  }

  .app-pagination__page button:hover:not(.active) {
    background-color: #eee;
  }
</style>
