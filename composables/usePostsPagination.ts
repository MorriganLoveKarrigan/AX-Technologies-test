import type { Query } from '~/types';

export const usePostsPagination = () => {
  const $router = useRouter();
  const $route = useRoute();

  const query = ref<Query>({
    _start: ($route.query._start as string) || '0',
    _limit: ($route.query._limit as string) || '10',
    q: ($route.query.q as string) || '',
    sort: ($route.query.sort as string) || '',
  });
  const postsAmount = 100;
  const pagesAmount = computed(() => Math.ceil(postsAmount / +query.value._limit));
  const currentPage = ref('1');

  const setQuery = (newQuery: Query): void => {
    query.value = newQuery;
    updatePageQuery();
  };

  const updatePageQuery = (): void => {
    void $router.replace({ query: query.value });
  };

  return {
    currentPage,
    pagesAmount,
    query,
    setQuery,
  };
};
