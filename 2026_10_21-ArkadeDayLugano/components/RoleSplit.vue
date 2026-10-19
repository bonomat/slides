<script setup lang="ts">
const roles = [
  { role: 'Holds the coins', who: 'You', note: 'Your keys, your covenant' },
  { role: 'Prices', who: 'Makers', note: 'Quote and commit' },
  { role: 'Routes', who: 'Striker', note: 'Never holds funds' },
  { role: 'Settles', who: 'Arkade', note: 'Enforces every term' },
]
</script>

<template>
  <div class="wrap">
    <div class="side">
      <div class="head ok">Striker: four parties</div>
      <div class="grid4">
        <div v-for="r in roles" :key="r.who" class="card">
          <div class="role">{{ r.role }}</div>
          <div class="who">{{ r.who }}</div>
          <div class="note">{{ r.note }}</div>
        </div>
      </div>
    </div>

    <div class="vs">vs</div>

    <div class="side">
      <div class="head bad">FTX: one party</div>
      <div class="blob">
        <div class="who">FTX</div>
        <div class="pill">Venue</div>
        <div class="pill">Market maker</div>
        <div class="pill">Custodian</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap { display: grid; grid-template-columns: 2.2fr auto 1fr; gap: 1.2rem; align-items: stretch; margin-top: 1.5rem; }
.side { display: flex; flex-direction: column; gap: 0.6rem; }
.head { font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 700; }
.ok { color: #6ee7a0; }
.bad { color: #f87171; }
.grid4 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; flex: 1; }
.card { border: 1px solid #3f5a48; background: #17221b; border-radius: 10px; padding: 0.8rem 1rem; }
.role { font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; }
.who { font-size: 1.5rem; font-weight: 700; color: #e5e7eb; margin-top: 0.1rem; }
.card .who { color: #6ee7a0; }
.note { font-size: 0.9rem; color: #b8c4bc; margin-top: 0.15rem; }
.vs { align-self: center; color: #6b7d71; font-size: 1.1rem; font-style: italic; }
.blob {
  flex: 1; border: 1px solid #7f2a2a; background: #2a1416; border-radius: 10px; padding: 1rem;
  display: flex; flex-direction: column; justify-content: center; gap: 0.5rem; text-align: center;
}
.blob .who { color: #f87171; }
.pill { border: 1px solid #7f2a2a; border-radius: 999px; padding: 0.25rem 0.6rem; font-size: 0.95rem; color: #fca5a5; }
</style>
