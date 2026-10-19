<script setup lang="ts">
const steps = [
  { name: 'Intent', desc: 'You say what you want to swap' },
  { name: 'Price', desc: 'Your app prices it from the solver\'s feed' },
  { name: 'Fund', desc: 'You fund an offer and wait' },
  { name: 'Fill', desc: 'A solver watching the stream fills it' },
]
</script>

<template>
  <div class="stack">
    <div class="row">
      <template v-for="(s, i) in steps" :key="s.name">
        <div class="box">
          <div class="name"><span class="n">{{ i + 1 }}</span>{{ s.name }}</div>
          <div class="desc">{{ s.desc }}</div>
        </div>
        <div v-if="i < steps.length - 1" class="arrow">→</div>
      </template>
    </div>
    <div class="base">Arkade</div>
  </div>
</template>

<style scoped>
.stack { margin-top: 2.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.row { display: grid; grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr; gap: 0.5rem; align-items: stretch; }
.box {
  border: 1px solid #3f5a48; background: #17221b; border-radius: 10px;
  padding: 1rem 0.9rem; text-align: center;
}
.name { font-size: 1.3rem; font-weight: 700; color: #6ee7a0; }
.n { opacity: 0.6; margin-right: 0.4rem; }
.desc { margin-top: 0.4rem; font-size: 0.95rem; color: #b8c4bc; line-height: 1.35; }
.arrow { align-self: center; color: #6ee7a0; font-size: 1.4rem; }
.base {
  background: #6ee7a0; color: #0d1a12; border-radius: 10px; padding: 0.9rem;
  text-align: center; font-size: 1.4rem; font-weight: 800; letter-spacing: 0.08em;
  text-transform: uppercase;
}
</style>
