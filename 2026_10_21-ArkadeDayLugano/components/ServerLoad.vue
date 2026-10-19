<script setup lang="ts">
// Many clients each scan the server; the slow phone loses the race to the bot.
const SX = 400, SY = 130
const clients = [30, 70, 110, 150, 190, 230].map(y => ({ x: 50, y }))
</script>

<template>
  <svg viewBox="0 0 600 300" class="w-full" style="max-height: 300px">
    <line v-for="(c, i) in clients" :key="i" :x1="c.x + 16" :y1="c.y" :x2="SX" :y2="SY"
      stroke="#6ee7a0" stroke-opacity="0.35" stroke-width="2" />
    <line x1="64" y1="262" :x2="SX" :y2="SY + 30" stroke="#f87171" stroke-width="2.5" stroke-dasharray="6 6" />
    <line x1="336" y1="56" :x2="SX" :y2="SY - 30" stroke="#6ee7a0" stroke-width="3" />

    <circle v-for="(c, i) in clients" :key="'c' + i" :cx="c.x" :cy="c.y" r="14" fill="#17221b" stroke="#6ee7a0" stroke-width="2" />
    <circle cx="50" cy="268" r="14" fill="#2a1416" stroke="#f87171" stroke-width="2.5" />
    <text x="40" y="298" fill="#f87171" style="font-size: 16px" font-weight="700">slow phone</text>

    <circle cx="322" cy="50" r="14" fill="#6ee7a0" />
    <text x="322" y="22" fill="#6ee7a0" style="font-size: 16px" font-weight="700" text-anchor="middle">bot</text>

    <rect :x="SX" :y="SY - 50" width="170" height="100" rx="10" fill="#17221b" stroke="#6ee7a0" stroke-width="2.5" />
    <text :x="SX + 85" :y="SY - 6" fill="#e5e7eb" style="font-size: 19px" font-weight="700" text-anchor="middle">Arkade</text>
    <text :x="SX + 85" :y="SY + 18" fill="#e5e7eb" style="font-size: 19px" font-weight="700" text-anchor="middle">server</text>
  </svg>
</template>
