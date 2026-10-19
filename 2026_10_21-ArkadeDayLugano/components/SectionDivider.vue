<script setup lang="ts">
defineProps<{ n: string; label: string; title: string }>()
</script>

<template>
  <div class="divider">
    <div class="label"><span class="n">{{ n }}</span> {{ label }}</div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<style scoped>
.divider { text-align: left; width: 820px; max-width: 100%; padding-left: 2rem; border-left: 4px solid #6ee7a0; }
.label { font-size: 1.1rem; letter-spacing: 0.15em; text-transform: uppercase; color: #9ca3af; }
.n { color: #6ee7a0; font-weight: 700; margin-right: 0.6rem; }
.title { margin-top: 0.6rem; font-size: 3.4rem; line-height: 1.1; color: #e5e7eb; }
</style>
