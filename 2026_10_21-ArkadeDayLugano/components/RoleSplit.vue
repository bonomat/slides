<script setup lang="ts">
const left = [
  { role: 'Holds the coins', who: 'You', note: 'Your keys, your covenant' },
  { role: 'Routes', who: 'Striker', note: 'Never holds funds' },
]
const leaves = [
  { who: 'Market maker', note: 'Prices: can make offers' },
  { who: 'Coin owner', note: 'Can move the funds' },
]
</script>

<template>
  <div class="layers">
    <div class="layer-label">Trading</div>
    <div class="row">
      <template v-for="p in left" :key="p.who">
        <div class="card">
          <div class="role">{{ p.role }}</div>
          <div class="who">{{ p.who }}</div>
          <div class="note">{{ p.note }}</div>
        </div>
        <div class="link">⟷</div>
      </template>

      <div class="card">
        <div class="role">Provides liquidity</div>
        <div class="who">Maker</div>
      </div>

      <svg class="branch" viewBox="0 0 40 100" preserveAspectRatio="none">
        <path d="M0,50 C20,50 20,22 40,22" fill="none" stroke="#6ee7a0" stroke-width="2" vector-effect="non-scaling-stroke" />
        <path d="M0,50 C20,50 20,78 40,78" fill="none" stroke="#6ee7a0" stroke-width="2" vector-effect="non-scaling-stroke" />
      </svg>

      <div class="leaves">
        <div v-for="l in leaves" :key="l.who" class="leaf">
          <div class="who small">{{ l.who }}</div>
          <div class="note">{{ l.note }}</div>
        </div>
      </div>
    </div>

    <div class="layer-label">Settlement</div>
    <div class="base">
      <span class="base-name">Arkade</span>
      <span class="base-note">settles atomically · enforces every term</span>
    </div>
  </div>
</template>

<style scoped>
.layers { display: grid; grid-template-columns: auto 1fr; column-gap: 1.2rem; row-gap: 0.9rem; align-items: center; margin-top: 2rem; }
.layer-label {
  font-size: 0.8rem; letter-spacing: 0.14em; text-transform: uppercase; color: #6b7d71;
  writing-mode: vertical-rl; transform: rotate(180deg); text-align: center;
}
.row { display: grid; grid-template-columns: 1fr auto 1fr auto 0.9fr 2.2rem 1.25fr; gap: 0.5rem; align-items: stretch; }
.card {
  border: 1px solid #3f5a48; background: #17221b; border-radius: 10px; padding: 0.8rem 0.7rem; text-align: center;
  display: flex; flex-direction: column; justify-content: center;
}
.role { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; }
.who { font-size: 1.3rem; font-weight: 700; color: #6ee7a0; margin-top: 0.15rem; }
.who.small { font-size: 1.1rem; margin-top: 0; }
.note { font-size: 0.82rem; color: #b8c4bc; margin-top: 0.2rem; }
.link { align-self: center; color: #6ee7a0; font-size: 1.5rem; }
.branch { width: 100%; height: 100%; }
.leaves { display: flex; flex-direction: column; justify-content: space-between; gap: 0.5rem; }
.leaf { border: 1px dashed #6ee7a0; border-radius: 10px; padding: 0.5rem 0.7rem; text-align: center; flex: 1; display: flex; flex-direction: column; justify-content: center; }
.base {
  background: #6ee7a0; color: #0d1a12; border-radius: 10px; padding: 1rem 1.2rem;
  display: flex; align-items: baseline; justify-content: center; gap: 1rem;
}
.base-name { font-size: 1.4rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
.base-note { font-size: 1rem; opacity: 0.8; }
</style>
