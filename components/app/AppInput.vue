<template>
  <input
    :type="props.type || 'text'"
    :placeholder="props.placeholder"
    class="text-field"
    v-model="inputValue"
    @input="emitInputValue"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps<{
    type?: 'text';
    placeholder: string;
  }>();

  const emit = defineEmits(['update:modelValue']);

  const inputValue = ref('');

  const emitInputValue = () => {
    emit('update:modelValue', inputValue.value);
  };
</script>

<style scoped lang="css">
  .text-field {
    width: 100%;
    outline: none;
    padding: 4px 16px;
    transition: all 0.4s;
    background: transparent;
    border-radius: 6px;
    border: 1px solid black;
  }
  .text-field::placeholder {
    transition: all 0.3s;
    color: #333333;
  }
  .text-field:focus::placeholder {
    opacity: 0;
  }
</style>
