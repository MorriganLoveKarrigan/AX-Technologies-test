<template>
  <label>
    <span class="title">{{ label }}</span>
    <select v-model="selectedValue" @change="changeHandler">
      <option v-for="item in processedItems" :value="item.value" :key="item.value">
        {{ item.title }}
      </option>
    </select>
  </label>
</template>

<script setup lang="ts">
  interface SelectOptions {
    title: string;
    value: string;
  }

  const props = defineProps<{
    label?: string;
    items: SelectOptions[] | string[];
    modelValue: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const processItems = (items: SelectOptions[] | string[]): SelectOptions[] => {
    return items.map(item => (typeof item === 'string' ? { title: item, value: item } : item));
  };

  const processedItems = computed(() => processItems(props.items));

  const selectedValue = ref<string>('');

  const changeHandler = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value);
  };

  watch(
    () => props.modelValue,
    value => (selectedValue.value = value),
    {
      immediate: true,
    }
  );
</script>

<style scoped lang="css">
  label {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .title {
    white-space: nowrap;
  }

  label select {
    flex-grow: 1;
    padding: 8px 16px;
    height: 100%;
    background: transparent;
    border: 1px solid black;
    border-radius: 6px;
  }

  label select option {
    background-color: white;
  }
</style>
