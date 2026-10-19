<script setup lang="ts">
const parties = [
  { role: 'Holds the coins', who: 'You', sub: '', note: 'Your keys, your covenant' },
  { role: 'Routes', who: 'Striker', sub: '', note: 'Never holds funds' },
  { role: 'Prices', who: 'Maker', sub: 'liquidity provider', note: 'Quotes and commits' },
]
</script>

<template>
  <div class="layers">
    <div class="layer-label">Trading</div>
    <div class="row">
      <template v-for="(p, i) in parties" :key="p.who">
        <div class="card">
          <div class="role">{{ p.role }}</div>
          <div class="who">{{ p.who }}<span v-if="p.sub" class="sub"> · {{ p.sub }}</span></div>
          <div class="note">{{ p.note }}</div>
        </div>
        <div v-if="i < parties.length - 1" class="link">⟷</div>
      </template>
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
.row { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; gap: 0.6rem; align-items: stretch; }
.card { border: 1px solid #3f5a48; background: #17221b; border-radius: 10px; padding: 0.9rem 1rem; text-align: center; }
.role { font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; }
.who { font-size: 1.5rem; font-weight: 700; color: #6ee7a0; margin-top: 0.15rem; }
.sub { font-size: 0.95rem; font-weight: 400; color: #b8c4bc; }
.note { font-size: 0.9rem; color: #b8c4bc; margin-top: 0.2rem; }
.link { align-self: center; color: #6ee7a0; font-size: 1.6rem; }
.base {
  background: #6ee7a0; color: #0d1a12; border-radius: 10px; padding: 1rem 1.2rem;
  display: flex; align-items: baseline; justify-content: center; gap: 1rem;
}
.base-name { font-size: 1.4rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
.base-note { font-size: 1rem; opacity: 0.8; }
</style>
