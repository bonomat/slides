<script setup lang="ts">
// Concept: price vs strike at expiry decides the payout.
const pts: [number, number][] = [
  [20, 150], [45, 140], [70, 152], [95, 128], [120, 136], [145, 112], [170, 124],
  [195, 102], [220, 116], [245, 92], [270, 98],
]
const path = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ')
const STRIKE = 120, EXPIRY = 270
</script>

<template>
  <svg viewBox="0 0 400 250" class="w-full">
    <rect x="0" y="0" width="76" height="24" rx="12" fill="#2b2410" stroke="#f59e0b" />
    <text x="38" y="17" fill="#f59e0b" style="font-size: 13px" font-weight="700" text-anchor="middle">concept</text>

    <rect :x="20" y="40" :width="EXPIRY - 20" :height="STRIKE - 40" fill="#6ee7a0" fill-opacity="0.07" />
    <line x1="20" :y1="STRIKE" x2="300" :y2="STRIKE" stroke="#9ca3af" stroke-width="2" stroke-dasharray="7 5" />
    <line :x1="EXPIRY" y1="40" :x2="EXPIRY" y2="200" stroke="#9ca3af" stroke-width="2" stroke-dasharray="7 5" />
    <path :d="path" fill="none" stroke="#6ee7a0" stroke-width="3" stroke-linejoin="round" />
    <circle :cx="EXPIRY" cy="98" r="6" fill="#6ee7a0" />

    <text x="24" :y="STRIKE - 8" fill="#9ca3af" style="font-size: 14px">strike</text>
    <text :x="EXPIRY" y="220" fill="#9ca3af" style="font-size: 14px" text-anchor="middle">expiry</text>
    <text x="288" y="84" fill="#6ee7a0" style="font-size: 15px" font-weight="700">above:</text>
    <text x="288" y="102" fill="#6ee7a0" style="font-size: 15px">pays sats</text>
    <text x="288" y="152" fill="#f87171" style="font-size: 15px" font-weight="700">below:</text>
    <text x="288" y="170" fill="#f87171" style="font-size: 15px">pays 0</text>
  </svg>
</template>
