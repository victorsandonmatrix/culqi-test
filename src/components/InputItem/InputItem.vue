<template>
  <div class="flex flex-col gap-2.5 w-full">
    <div>
      <span class="text-gray9 font-medium">{{ label }}</span
      ><span class="text-red-500"> *</span>
    </div>
    <input
      :type="type ?? 'text'"
      :value="value"
      @input="$emit('update:value', $event?.target?.value)"
      :placeholder="placeholder"
      class="pt-4 pb-4 pl-5 pr-5 text-black rounded-lg border border-gray3 outline-none focus:border-success"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  placeholder: string
  type?: 'password' | 'email'
  value: string
}>()
defineEmits(['update:value'])
</script>
