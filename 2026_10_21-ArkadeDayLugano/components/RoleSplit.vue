<script setup lang="ts">
const left = [
  { role: 'Holds the coins', who: 'You', note: 'Your keys, your covenant' },
  { role: 'Routes', who: 'Striker', note: 'Never holds funds' },
]
const maker = [
  { role: 'Prices', who: 'Market maker', note: 'Quote key: signs quotes' },
  { role: 'Holds the liquidity', who: 'Owner', note: 'Owner key: withdraws, revokes' },
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
      <div class="group">
        <div class="group-label">Maker</div>
        <div class="pair">
          <div v-for="p in maker" :key="p.who" class="card">
            <div class="role">{{ p.role }}</div>
            <div class="who">{{ p.who }}</div>
            <div class="note">{{ p.note }}</div>
          </div>
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
.row { display: grid; grid-template-columns: 1fr auto 1fr auto 2.2fr; gap: 0.5rem; align-items: stretch; }
.card {
  border: 1px solid #3f5a48; background: #17221b; border-radius: 10px; padding: 0.8rem 0.7rem; text-align: center;
  display: flex; flex-direction: column; justify-content: center;
}
.role { font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; }
.who { font-size: 1.3rem; font-weight: 700; color: #6ee7a0; margin-top: 0.15rem; }
.note { font-size: 0.82rem; color: #b8c4bc; margin-top: 0.2rem; }
.link { align-self: center; color: #6ee7a0; font-size: 1.5rem; }
.group { position: relative; border: 1.5px dashed #6ee7a0; border-radius: 12px; padding: 0.9rem 0.5rem 0.5rem; }
.group-label {
  position: absolute; top: -0.7rem; left: 50%; transform: translateX(-50%);
  background: #121212; padding: 0 0.6rem; font-size: 0.8rem; letter-spacing: 0.14em;
  text-transform: uppercase; color: #6ee7a0; font-weight: 700;
}
.pair { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; height: 100%; }
.base {
  background: #6ee7a0; color: #0d1a12; border-radius: 10px; padding: 1rem 1.2rem;
  display: flex; align-items: baseline; justify-content: center; gap: 1rem;
}
.base-name { font-size: 1.4rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; }
.base-note { font-size: 1rem; opacity: 0.8; }
</style>
