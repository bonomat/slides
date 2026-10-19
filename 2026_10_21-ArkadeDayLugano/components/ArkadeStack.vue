<script setup lang="ts">
const boxes = [
  { name: 'Banco', desc: 'Offers locked in a covenant, filled by anyone' },
  { name: 'Solvers', desc: 'Fill offers from the Arkade stream' },
  { name: 'Solver registry', desc: 'Open, forkable market discovery' },
]
</script>

<template>
  <div class="stack">
    <div class="row">
      <div v-for="b in boxes" :key="b.name" class="box">
        <div class="name">{{ b.name }}</div>
        <div class="desc">{{ b.desc }}</div>
      </div>
    </div>
    <div class="base">Arkade</div>
  </div>
</template>

<style scoped>
.stack { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
.box {
  border: 1px solid #3f5a48; background: #17221b; border-radius: 10px;
  padding: 1.1rem 1rem; text-align: center;
}
.name { font-size: 1.35rem; font-weight: 700; color: #6ee7a0; }
.desc { margin-top: 0.4rem; font-size: 0.95rem; color: #b8c4bc; line-height: 1.35; }
.base {
  background: #6ee7a0; color: #0d1a12; border-radius: 10px; padding: 0.9rem;
  text-align: center; font-size: 1.4rem; font-weight: 800; letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
