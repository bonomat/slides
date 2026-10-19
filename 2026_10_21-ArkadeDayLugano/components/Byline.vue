<script setup lang="ts">
defineProps<{ handles?: boolean }>()
</script>

<template>
  <div class="byline">
    <span class="name">bonomat · Philipp</span>
    <span class="sep" />
    <span class="by">by</span>
    <img src="/satora.svg" alt="Satora" class="logo" />
    <template v-if="handles">
      <span class="sep" />
      <a href="https://x.com/bonomat">x.com/bonomat</a>
      <a href="https://x.com/satora_io">x.com/satora_io</a>
    </template>
  </div>
</template>

<style scoped>
.byline { display: flex; align-items: center; justify-content: center; gap: 0.9rem; font-size: 1.05rem; }
.name { font-weight: 700; }
.by { opacity: 0.6; }
.logo { height: 2.6rem; margin: 0 -0.5rem; }
.sep { width: 1px; height: 1.4rem; background: #3f5a48; }
a { opacity: 0.8; border-bottom: none !important; }
</style>
