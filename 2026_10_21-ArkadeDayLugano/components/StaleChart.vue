<script setup lang="ts">
// Market price drifts up and away from the price fixed in the offer.
const pts: [number, number][] = [
  [40, 170], [80, 166], [110, 172], [140, 160], [170, 165], [200, 150], [230, 156],
  [260, 138], [290, 144], [320, 124], [350, 130], [380, 112], [410, 118], [440, 98],
  [470, 104], [500, 86], [530, 90], [560, 70],
]
const OFFER_Y = 170
const market = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x},${y}`).join(' ')
const gap = `${market} L560,${OFFER_Y} L40,${OFFER_Y} Z`
</script>

<template>
  <svg viewBox="0 0 680 230" class="w-full" style="max-height: 300px">
    <path :d="gap" fill="#f59e0b" fill-opacity="0.12" />
    <line x1="40" :y1="OFFER_Y" x2="560" :y2="OFFER_Y" stroke="#9ca3af" stroke-width="3" stroke-dasharray="8 6" />
    <path :d="market" fill="none" stroke="#6ee7a0" stroke-width="3.5" stroke-linejoin="round" />
    <circle cx="560" cy="70" r="6" fill="#6ee7a0" />
    <text x="572" y="66" fill="#6ee7a0" style="font-size: 17px" font-weight="700">market</text>
    <text x="572" y="176" fill="#9ca3af" style="font-size: 17px" font-weight="700">your offer</text>
    <line x1="545" y1="78" x2="545" y2="162" stroke="#f59e0b" stroke-width="2" />
    <text x="530" y="128" fill="#f59e0b" style="font-size: 17px" font-weight="700" text-anchor="end">stale</text>
    <line x1="40" y1="205" x2="560" y2="205" stroke="#3f5a48" stroke-width="1.5" />
    <text x="40" y="224" fill="#6b7d71" style="font-size: 14px">funded</text>
    <text x="560" y="224" fill="#6b7d71" style="font-size: 14px" text-anchor="end">time →</text>
  </svg>
</template>
