<script setup lang="ts">
const checks = [
  'The maker signed this quote',
  'The quote hasn\'t expired',
  'You get your amount, the maker gets theirs',
  'The rest goes back into the same pool',
]
const pools = ['10,000 USD', '8,000 USD', '5,500 USD']
const sizes = ['9.5rem', '8.4rem', '7.3rem']
const fills = ['fill 2,000', 'fill 2,500']
</script>

<template>
  <div class="cov">
    <div class="rules">
      <div class="rules-head">Every spend of the pool must pass</div>
      <ul>
        <li v-for="c in checks" :key="c">{{ c }}</li>
      </ul>
    </div>

    <div class="chain">
      <template v-for="(p, i) in pools" :key="p">
        <div class="coin" :style="{ width: sizes[i], height: sizes[i] }">
          <div class="coin-label">Pool</div>
          <div class="coin-amt">{{ p }}</div>
        </div>
        <div v-if="i < fills.length" class="step">
          <div class="step-label">{{ fills[i] }}</div>
          <div class="arrow">→</div>
        </div>
      </template>
    </div>
    <div class="caption">Same script, smaller balance. One deposit, many fills.</div>
  </div>
</template>

<style scoped>
.cov { display: flex; flex-direction: column; gap: 1.1rem; margin-top: 1.5rem; }
.rules { border: 1px solid #3f5a48; background: #17221b; border-radius: 10px; padding: 0.9rem 1.3rem; }
.rules-head { font-size: 0.8rem; letter-spacing: 0.12em; text-transform: uppercase; color: #6ee7a0; font-weight: 700; }
ul { margin: 0.5rem 0 0; padding: 0; list-style: none; display: grid; grid-template-columns: 1fr 1fr; gap: 0.3rem 1.5rem; }
li { position: relative; padding-left: 1.4rem; font-size: 1.05rem; line-height: 1.5; }
li::before { content: '✓'; position: absolute; left: 0; color: #6ee7a0; }
.chain { display: flex; align-items: center; justify-content: center; gap: 0.6rem; }
.coin {
  border-radius: 999px; border: 2px solid #6ee7a0; background: #17221b;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.coin-label { font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: #9ca3af; }
.coin-amt { font-size: 1.1rem; font-weight: 700; color: #6ee7a0; }
.step { display: flex; flex-direction: column; align-items: center; color: #6ee7a0; }
.step-label { font-size: 0.85rem; color: #b8c4bc; }
.arrow { font-size: 1.6rem; line-height: 1; }
.caption { text-align: center; color: #b8c4bc; font-size: 0.95rem; }
</style>
