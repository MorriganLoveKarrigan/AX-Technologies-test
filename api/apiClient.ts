const BASE_URL = 'https://jsonplaceholder.typicode.com';
export const apiClient = {
  get: async <T>(url: string, params?: any): Promise<T | null> => {
    try {
      return await $fetch<T>(BASE_URL + url, {
        method: 'GET',
        params,
      });
    } catch (error) {
      console.error('Error during API call:', error);
      return null;
    }
  },
};
