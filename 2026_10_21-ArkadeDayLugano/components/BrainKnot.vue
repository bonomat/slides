<script setup lang="ts">
// A brain with a rope tied in a knot through it.
const rope = 'M10,128 C70,128 95,92 145,92 C195,92 205,148 162,156 C118,164 108,108 150,104 C188,100 215,132 290,128'
</script>

<template>
  <svg viewBox="0 0 300 240" class="w-full">
    <!-- brain -->
    <path
      d="M60,150 C30,150 25,110 45,95 C30,70 50,40 80,45 C90,20 130,15 145,35 C160,15 205,20 215,45 C245,40 270,65 255,95 C275,110 270,150 240,155 C245,180 215,200 190,190 C180,210 150,212 145,195 C135,212 100,210 95,190 C70,200 45,180 60,150 Z"
      fill="#f9a8d4" stroke="#db2777" stroke-width="4" stroke-linejoin="round"
    />
    <path d="M145,35 C138,80 152,140 145,195" fill="none" stroke="#db2777" stroke-width="3.5" stroke-linecap="round" />
    <g fill="none" stroke="#db2777" stroke-width="3" stroke-linecap="round">
      <path d="M78,70 C95,62 108,74 104,88" />
      <path d="M62,118 C76,104 96,112 92,128" />
      <path d="M88,166 C100,150 120,158 118,176" />
      <path d="M198,62 C212,58 226,70 220,84" />
      <path d="M232,118 C218,106 200,114 204,130" />
      <path d="M200,170 C188,156 172,162 174,178" />
    </g>

    <!-- knot: dark outline under the rope gives the crossings some depth -->
    <path :d="rope" fill="none" stroke="#0d1a12" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" />
    <path :d="rope" fill="none" stroke="#c2e821" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />

    <text x="250" y="40" fill="#c2e821" style="font-size: 34px" font-weight="800">?</text>
    <text x="30" y="58" fill="#c2e821" style="font-size: 26px" font-weight="800">?</text>
  </svg>
</template>
