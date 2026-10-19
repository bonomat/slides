<template>
  <div class="split">
    <div class="key owner">
      <div class="who">Owner key</div>
      <div class="where">cold, with you</div>
      <ul>
        <li>Withdraw</li>
        <li>Revoke all quotes</li>
      </ul>
    </div>

    <div class="pool">
      <div class="who">Pool covenant</div>
      <ul>
        <li>Pays out only to the owner</li>
        <li>Minimum price</li>
        <li>Maximum size per fill</li>
      </ul>
    </div>

    <div class="key mm">
      <div class="who">Quote key</div>
      <div class="where">hot, with the market maker</div>
      <ul>
        <li>Sign quotes</li>
        <li class="no">Move the funds</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.split { display: grid; grid-template-columns: 1fr 1.15fr 1fr; gap: 1rem; align-items: stretch; margin-top: 2rem; }
.key, .pool { border-radius: 10px; padding: 1.1rem 1.2rem; }
.key { border: 1px solid #3f5a48; background: #17221b; }
.pool { background: #6ee7a0; color: #0d1a12; }
.who { font-size: 1.35rem; font-weight: 700; }
.owner .who, .mm .who { color: #6ee7a0; }
.where { font-size: 0.9rem; color: #9ca3af; margin-top: 0.15rem; }
ul { margin-top: 0.8rem; padding-left: 0; list-style: none; }
li { font-size: 1.05rem; line-height: 1.6; padding-left: 1.4rem; position: relative; }
li::before { content: '✓'; position: absolute; left: 0; }
.key li::before { color: #6ee7a0; }
.pool li::before { color: #0d1a12; }
li.no { color: #f87171; }
li.no::before { content: '✗'; color: #f87171; }
</style>
