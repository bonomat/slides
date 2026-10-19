<script setup lang="ts">
// Wallet <-> Striker <-> Maker request/response, then settlement on Arkade.
// Each step appears on its own click.
const W = 170, H = 74, Y = 30
const wallet = 30, striker = 315, maker = 600
</script>

<template>
  <svg viewBox="0 0 800 330" class="w-full" style="max-height: 340px">
    <defs>
      <marker id="sf-g" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#6ee7a0" />
      </marker>
      <marker id="sf-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="#f59e0b" />
      </marker>
    </defs>

    <g v-for="b in [{ x: wallet, t: 'Wallet' }, { x: striker, t: 'Striker' }, { x: maker, t: 'Maker' }]" :key="b.t">
      <rect :x="b.x" :y="Y" :width="W" :height="H" rx="10" fill="#17221b" stroke="#6ee7a0" stroke-width="2.5" />
      <text :x="b.x + W / 2" :y="Y + H / 2 + 8" fill="#e5e7eb" style="font-size: 24px" font-weight="700" text-anchor="middle">{{ b.t }}</text>
    </g>

    <!-- 1: ask -->
    <g v-click="1">
      <line :x1="wallet + W + 6" :y1="Y + 22" :x2="striker - 8" :y2="Y + 22" stroke="#6ee7a0" stroke-width="2.5" marker-end="url(#sf-g)" />
      <line :x1="striker + W + 6" :y1="Y + 22" :x2="maker - 8" :y2="Y + 22" stroke="#6ee7a0" stroke-width="2.5" marker-end="url(#sf-g)" />
      <text :x="(wallet + W + striker) / 2" :y="Y + 12" fill="#6ee7a0" style="font-size: 16px" font-weight="700" text-anchor="middle">1 · ask a price</text>
    </g>

    <!-- 2: signed quote -->
    <g v-click="2">
      <line :x1="maker - 6" :y1="Y + 54" :x2="striker + W + 8" :y2="Y + 54" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#sf-a)" />
      <line :x1="striker - 6" :y1="Y + 54" :x2="wallet + W + 8" :y2="Y + 54" stroke="#f59e0b" stroke-width="2.5" marker-end="url(#sf-a)" />
      <text :x="(striker + W + maker) / 2" :y="Y + H + 18" fill="#f59e0b" style="font-size: 16px" font-weight="700" text-anchor="middle">2 · signed quote</text>
      <text :x="(striker + W + maker) / 2" :y="Y + H + 38" fill="#f59e0b" style="font-size: 14px" text-anchor="middle">price + expiry</text>
    </g>

    <!-- 3: sign and settle -->
    <g v-click="3">
      <text :x="wallet + W / 2" :y="Y + H + 30" fill="#6ee7a0" style="font-size: 16px" font-weight="700" text-anchor="middle">3 · check, sign</text>
      <line :x1="striker + W / 2" :y1="Y + H + 6" :x2="striker + W / 2" y2="232" stroke="#6ee7a0" stroke-width="2.5" marker-end="url(#sf-g)" />
      <text :x="striker + W / 2 + 12" y="190" fill="#6ee7a0" style="font-size: 16px" font-weight="700">settle</text>
      <rect x="30" y="240" width="740" height="56" rx="10" fill="#6ee7a0" />
      <text x="400" y="276" fill="#0d1a12" style="font-size: 22px" font-weight="800" text-anchor="middle" letter-spacing="2">ARKADE</text>
    </g>
  </svg>
</template>
