const BASE_URL = 'https://jsonplaceholder.typicode.com';

export interface ApiClientResponse<T> {
  data: T;
  headers: {
    [key: string]: unknown;
    totalCount: string | null;
  };
}

export const apiClient = {
  get: async <T>(url: string, params?: any): Promise<ApiClientResponse<T> | null> => {
    try {
      const response = await $fetch.raw<T>(BASE_URL + url, {
        method: 'GET',
        params,
      });
      return {
        data: response._data as T,
        headers: {
          totalCount: response.headers.get('X-Total-Count'),
        },
      };
    } catch (error) {
      console.error('Error during API call:', error);
      return null;
    }
  },
};
