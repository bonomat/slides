---
theme: seriph
background: '#0A0908'
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Sp/B/ark/ade
  Three ways to share a UTXO.
  BushBash Palm Cove · 26 July 2026
drawings:
  persist: false
colorSchema: dark
transition: slide-left
title: Sp/B/ark/ade
mdc: true
toc: false
---

# Sp/B/ark/ade

### *Three ways to share a UTXO.*

<div class="pt-8 opacity-80">
Bitcoin L2s without a soft fork: what they promise, what you trust
</div>

<div class="pt-12 text-sm opacity-60">
@bonomat - Philipp
</div>
<div class="pt-2 text-xs opacity-60">
BushBash Palm Cove · Sunday, 26 July 2026
</div>

<!--
Disclosure up front: I build Satora on Arkade, so I'm biased.
I'll be as unfair to everyone equally as I can manage.
-->

---
layout: center
class: text-center
---

[//]: # (Slide: Ark)

# Ark

<img src="./images/ark.png" class="ark-img" alt="Noah's Ark" />

<style>
.ark-img {
  display: block;
  margin: 24px auto 0;
  max-height: 380px;
  width: auto;
  border-radius: 8px;
}
</style>

<!--
Two of the three protocols literally descend from the Ark paper,
and Spark is what you build when you don't want to wait for the flood.
-->

---
layout: center
class: text-center
---

[//]: # (Breather 01: Lightning)

<div class="text-sm opacity-50 tracking-[0.3em] mb-8">CHAPTER 01 / 06</div>

# Lightning

<div class="text-lg opacity-70 mt-4 font-normal">
Bitcoin's first L2, and where it hurts
</div>

---
layout: two-cols
layoutClass: gap-8
---

[//]: # (Slide: Lightning in 60 seconds)

# Lightning in 60 seconds

- On-chain Bitcoin: ~**7 tps**, fees spike, every payment hits the chain. That doesn't buy coffee.
- Lightning's answer: a **payment channel**: one on-chain **2-of-2 multisig** between two parties.
- Inside it, they re-sign the balance split **off-chain**, as often as they like. Only open + close touch the chain.
- Don't have a channel to your counterparty? **Route** through others; HTLCs make every hop atomic.
- Result: instant, cheap, high-volume payments. It genuinely works: WoS, exchanges, most of retail BTC payments today.

::right::

<div class="ln-diagram-wrap">
<svg viewBox="0 0 480 280" class="ln-svg" xmlns="http://www.w3.org/2000/svg">
  <rect class="ln-node" x="20" y="40" width="100" height="46" rx="6" />
  <text class="ln-t" x="70" y="68" text-anchor="middle">Alice</text>
  <rect class="ln-node" x="360" y="40" width="100" height="46" rx="6" />
  <text class="ln-t" x="410" y="68" text-anchor="middle">Bob</text>
  <rect class="ln-chan" x="150" y="42" width="180" height="42" rx="21" />
  <text class="ln-ct" x="240" y="60" text-anchor="middle">2-of-2 multisig</text>
  <text class="ln-cs" x="240" y="75" text-anchor="middle">on-chain, once</text>
  <line class="ln-line" x1="120" y1="63" x2="150" y2="63" />
  <line class="ln-line" x1="330" y1="63" x2="360" y2="63" />
  <text class="ln-bal" x="240" y="120" text-anchor="middle">balance: 60 / 40 → 55 / 45 → 30 / 70 …</text>
  <text class="ln-off" x="240" y="140" text-anchor="middle">re-signed off-chain, forever</text>
  <rect class="ln-node dim" x="20" y="190" width="90" height="40" rx="6" />
  <text class="ln-t" x="65" y="215" text-anchor="middle">Alice</text>
  <rect class="ln-node dim" x="195" y="190" width="90" height="40" rx="6" />
  <text class="ln-t" x="240" y="215" text-anchor="middle">Carol</text>
  <rect class="ln-node dim" x="370" y="190" width="90" height="40" rx="6" />
  <text class="ln-t" x="415" y="215" text-anchor="middle">Bob</text>
  <line class="ln-line" x1="110" y1="210" x2="195" y2="210" />
  <polyline class="ln-arrow" points="190,206 195,210 190,214" />
  <line class="ln-line" x1="285" y1="210" x2="370" y2="210" />
  <polyline class="ln-arrow" points="365,206 370,210 365,214" />
  <text class="ln-htlc" x="240" y="255" text-anchor="middle">routing: HTLC → HTLC, atomic via one preimage</text>
</svg>
</div>

<style>
.ln-svg { display: block; width: 100%; max-width: 460px; margin: 20px auto 0; font-family: 'Geist', -apple-system, sans-serif; }
.ln-svg .ln-node { fill: #fff; stroke: #C0C0C0; stroke-width: 1.5; stroke-dasharray: 6 4; }
.ln-svg .ln-node.dim { opacity: 0.85; }
.ln-svg .ln-t { fill: #000; font-size: 13px; font-weight: 600; }
.ln-svg .ln-chan { fill: rgba(194,232,33,0.12); stroke: #c2e821; stroke-width: 1.5; }
.ln-svg .ln-ct { fill: #c2e821; font-size: 12px; font-weight: 600; }
.ln-svg .ln-cs { fill: rgba(255,255,255,0.6); font-size: 10px; }
.ln-svg .ln-line { stroke: #c2e821; stroke-width: 1.5; }
.ln-svg .ln-arrow { stroke: #c2e821; stroke-width: 1.5; fill: none; }
.ln-svg .ln-bal { fill: #f7931a; font-size: 13px; font-weight: 600; }
.ln-svg .ln-off { fill: rgba(255,255,255,0.6); font-size: 11px; font-style: italic; }
.ln-svg .ln-htlc { fill: rgba(255,255,255,0.6); font-size: 11px; font-style: italic; }
</style>

<!--
Keep this fast, most of the room knows Lightning. The point of the
slide is to set up the *structure* (per-pair channel, on-chain
open/close, online requirement) so the limitations slide lands.
-->

---

[//]: # (Slide: Lightning limitations)

# Where Lightning hurts

<div class="grid grid-cols-2 gap-4 pt-4">

<div class="p-4 rounded bg-white/5 border-l-4 border-[#ef4444]/60">

**💸 A channel per user**

Every participant needs an on-chain tx to enter (and exit). Onboarding the next billion = billions of channel opens. High fees make small channels uneconomic.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#ef4444]/60">

**📥 Inbound liquidity**

You can't *receive* until someone locks coins toward you. New users must buy or beg for inbound capacity.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#ef4444]/60">

**🔌 Always online**

Receiving needs your node up. Miss a revocation, and a stale-state close can cost you. Hence watchtowers.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#ef4444]/60">

**⚠️ Force-close pain**

Unhappy path = on-chain tx at the worst time, timelocked funds, fee spikes. Routing failures on big payments round it out.

</div>

</div>

<div class="pt-5 text-center text-sm opacity-80">
In practice most users ended up on <strong>custodial</strong> Lightning wallets, the very thing we were trying to avoid.
</div>

<!--
The custodial punchline is the real motivation for everything that
follows: the market voted for UX over self-custody. The new L2s try to
give both.
-->

---
layout: center
class: text-center
---

[//]: # (Breather 02: The L2 promise)

<div class="text-sm opacity-50 tracking-[0.3em] mb-8">CHAPTER 02 / 06</div>

# The New L2s

<div class="text-lg opacity-70 mt-4 font-normal">
One shared UTXO to solve everything™
</div>

---
layout: two-cols
layoutClass: gap-8
---

[//]: # (Slide: The L2 promise)

# The promise

- Flip Lightning's model: instead of a channel *per pair*, put **many users inside one shared on-chain output**.
- Ownership moves **off-chain**, coordinated by an **operator**, but every user keeps a **pre-signed unilateral exit** to L1.
- What the brochure says:
  - ⚡ instant, cheap payments, **no inbound liquidity problem**
  - 📱 **receive while offline**, no node to run
  - 🧾 no per-user on-chain footprint to get paid
  - 🔑 still **self-custodial**: exit without permission
- Spark, Bark and Arkade are three different ways to cash that cheque:

<div class="mt-3 p-4 border-l-4 border-[#c2e821] bg-[#c2e821]/10">

**How little can you trust the operator<br/>while still getting all of the above?**

</div>

::right::

<div class="pt-10">

**The axes we'll compare on:**

<div class="grid grid-cols-1 gap-3 pt-4 text-sm">

<div class="p-3 rounded bg-white/5 border-l-4 border-[#c2e821]/60">
🔐 <strong>Trust model</strong>: what exactly must be honest?
</div>

<div class="p-3 rounded bg-white/5 border-l-4 border-[#c2e821]/60">
🚪 <strong>Exit</strong>: how do you leave without permission?
</div>

<div class="p-3 rounded bg-white/5 border-l-4 border-[#c2e821]/60">
⏰ <strong>Liveness</strong>: what happens if you go offline?
</div>

<div class="p-3 rounded bg-white/5 border-l-4 border-[#f7931a]/60">
🛠 <strong>Programmability</strong>: can you build on it?
</div>

</div>

</div>

<!--
All three share the same skeleton: shared on-chain output, off-chain
ownership transfer, pre-signed escape hatch. The differences are
entirely in HOW ownership moves and WHAT you must trust meanwhile.
-->

---
layout: center
class: text-center
---

[//]: # (Breather 03: Spark)

<div class="text-sm opacity-50 tracking-[0.3em] mb-8">CHAPTER 03 / 06</div>

# Spark

<div class="text-lg opacity-70 mt-4 font-normal">
Statechains: "we deleted the old key, trust us"
</div>

---
layout: two-cols
layoutClass: gap-8
---

[//]: # (Slide: Spark: how it works)

# Spark: key handover

- Built by **Lightspark** on **statechains**: ownership of a UTXO moves by handing over *key material*, not by new transactions.
- A **federation of Spark Operators** (Lightspark, Flashnet, Breez) holds one key share; you hold the other. Address = aggregate key (FROST threshold Schnorr).
- **Your signature is always required**; operators alone can't move funds.
- Transfer = SE **tweaks its share** so `sender + SE` becomes `receiver + SE`, then **deletes the old share** and signs a new exit tx with a **lower timelock**.
- No on-chain tx per transfer. No expiry. **Receive while offline.**

::right::

<div class="spark-diagram-wrap">
<svg viewBox="0 0 480 300" class="spark-svg" xmlns="http://www.w3.org/2000/svg">
  <rect class="sp-box user" x="20" y="30" width="130" height="54" rx="6" />
  <text class="sp-t" x="85" y="53" text-anchor="middle">Alice's key</text>
  <text class="sp-s" x="85" y="71" text-anchor="middle">sk_alice</text>
  <rect class="sp-box se" x="20" y="120" width="130" height="54" rx="6" />
  <text class="sp-t" x="85" y="143" text-anchor="middle">SE key share</text>
  <text class="sp-s" x="85" y="161" text-anchor="middle">sk_se</text>
  <line class="sp-line" x1="150" y1="102" x2="220" y2="102" />
  <polyline class="sp-arrow" points="215,98 220,102 215,106" />
  <text class="sp-label" x="185" y="90" text-anchor="middle">transfer</text>
  <rect class="sp-box user" x="230" y="30" width="130" height="54" rx="6" />
  <text class="sp-t" x="295" y="53" text-anchor="middle">Bob's key</text>
  <text class="sp-s" x="295" y="71" text-anchor="middle">sk_bob</text>
  <rect class="sp-box se" x="230" y="120" width="130" height="54" rx="6" />
  <text class="sp-t" x="295" y="143" text-anchor="middle">SE key share</text>
  <text class="sp-s" x="295" y="161" text-anchor="middle">sk_se + tweak</text>
  <rect class="sp-box agg" x="105" y="215" width="170" height="54" rx="27" />
  <text class="sp-t" x="190" y="238" text-anchor="middle">same P2TR address</text>
  <text class="sp-s" x="190" y="256" text-anchor="middle">aggregate key unchanged</text>
  <line class="sp-line dim" x1="85" y1="174" x2="150" y2="215" />
  <line class="sp-line dim" x1="295" y1="174" x2="230" y2="215" />
  <text class="sp-del" x="85" y="200" text-anchor="middle">old share deleted 🗑</text>
</svg>
</div>

<div class="pt-2 text-xs opacity-70 text-center">
The coin never moves. <strong>Who can sign for it</strong> moves.
</div>

<style>
.spark-svg { display: block; width: 100%; max-width: 460px; margin: 24px auto 0; font-family: 'Geist', -apple-system, sans-serif; }
.spark-svg .sp-box { fill: #fff; stroke: #C0C0C0; stroke-width: 1.5; stroke-dasharray: 6 4; }
.spark-svg .sp-box.se { fill: rgba(194,232,33,0.12); stroke: #c2e821; stroke-dasharray: none; }
.spark-svg .sp-box.agg { fill: #a3c410; stroke: none; }
.spark-svg .sp-t { fill: #000; font-size: 13px; font-weight: 600; }
.spark-svg .sp-box.se + text.sp-t { fill: #000; }
.spark-svg .sp-s { fill: #555; font-size: 10px; }
.spark-svg .sp-line { stroke: #c2e821; stroke-width: 1.5; }
.spark-svg .sp-line.dim { stroke: rgba(194,232,33,0.4); stroke-dasharray: 4 4; }
.spark-svg .sp-arrow { stroke: #c2e821; stroke-width: 1.5; fill: none; }
.spark-svg .sp-label { fill: rgba(255,255,255,0.7); font-size: 11px; }
.spark-svg .sp-del { fill: #f7931a; font-size: 11px; font-weight: 600; }
</style>

<!--
FROST detail if asked: SO key is Shamir-shared across operators, any
threshold t-of-n reconstructs; tweaks are applied to the shares without
ever exposing the tweak itself. Exit txs use decrementing relative
timelocks so the newest owner can always confirm before older owners.
-->

---

[//]: # (Slide: Spark: trust & reality check)

# Spark: what you actually trust

<div class="grid grid-cols-2 gap-6 pt-4">

<div class="p-4 rounded bg-white/5 border-l-4 border-[#c2e821]/60">

**The good**

- Instant, free Spark→Spark transfers, **no liquidity provisioning**, no rounds, no expiry.
- Offline receive; no on-chain footprint to get paid.
- Lightning via SSPs (0.25%), no channels for the user.
- **Stablecoins live**: BTKN tokens (**USDT** and **USDB**), plus real adoption: **Wallet of Satoshi**, Theya, Blitz.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#ef4444]/60">

**The catch**

- Security = federation **actually deleted** the old key share. **Deletion is cryptographically unverifiable.**
- If a threshold of operators keeps shares and colludes with a past owner → **your coin can be double-spent**.
- Federation is 3 named companies. Liveness of the federation required for every transfer.
- Unilateral exit: beta, chain of txs, uneconomical below **~16k sats**.
- **No scripts, no contracts**. Payments only.

</div>

</div>

<div class="pt-4 text-center text-sm opacity-70">
Statechains trade <em>provable</em> finality for UX. Spark makes that trade very well, but it is the trade.
</div>

<!--
Trust is "moment in time": only needed during a transfer, and forward
security holds IF deletion happened. But no one can audit an absence of
bytes. Bitcoin Layers and Bitcoin Magazine both flag this as the core
criticism. Mainnet beta since April 2025.
-->

---
layout: center
class: text-center
---

[//]: # (Breather 04: Bark)

<div class="text-sm opacity-50 tracking-[0.3em] mb-8">CHAPTER 04 / 06</div>

# Bark

<div class="text-lg opacity-70 mt-4 font-normal">
Covenantless Ark: pre-sign everything, trust no one (mostly)
</div>

---
layout: two-cols
layoutClass: gap-8
---

[//]: # (Slide: Bark: how it works)

# Bark: pre-signed trees

- Built by **Second** (Steven Roose, ex-Blockstream). **Mainnet since June 2026** at `ark.second.tech`.
- A **VTXO** = chain of **pre-signed txs** you can broadcast any time. No covenants, no new opcodes, works on today's Bitcoin.
- Every ~1–2h the server runs a **round**: one on-chain tx funds a **quad tree** of pre-signed splits; leaves are user VTXOs. 256 users = 5 txs deep.
- Tree paths: cooperative **n-of-n MuSig2** (users + server) or timelocked recovery.
- Old-for-new swap is atomic via **hash-locked forfeits**.

::right::

<div class="bark-diagram-wrap">
<svg viewBox="0 0 480 300" class="bark-svg" xmlns="http://www.w3.org/2000/svg">
  <rect class="bk-tx" x="20" y="122" width="110" height="46" rx="4" />
  <text class="bk-txt" x="75" y="149" text-anchor="middle">Round tx</text>
  <line class="bk-line" x1="130" y1="145" x2="180" y2="70" />
  <line class="bk-line" x1="130" y1="145" x2="180" y2="220" />
  <rect class="bk-branch" x="182" y="48" width="90" height="42" rx="4" />
  <text class="bk-bt" x="227" y="73" text-anchor="middle">branch</text>
  <rect class="bk-branch" x="182" y="198" width="90" height="42" rx="4" />
  <text class="bk-bt" x="227" y="223" text-anchor="middle">branch</text>
  <line class="bk-line" x1="272" y1="69" x2="330" y2="40" />
  <line class="bk-line" x1="272" y1="69" x2="330" y2="95" />
  <line class="bk-line" x1="272" y1="219" x2="330" y2="190" />
  <line class="bk-line" x1="272" y1="219" x2="330" y2="248" />
  <circle class="bk-leaf" cx="360" cy="40" r="26" />
  <text class="bk-lt" x="360" y="44" text-anchor="middle">VTXO</text>
  <circle class="bk-leaf" cx="360" cy="95" r="26" />
  <text class="bk-lt" x="360" y="99" text-anchor="middle">VTXO</text>
  <circle class="bk-leaf" cx="360" cy="190" r="26" />
  <text class="bk-lt" x="360" y="194" text-anchor="middle">VTXO</text>
  <circle class="bk-leaf" cx="360" cy="248" r="26" />
  <text class="bk-lt" x="360" y="252" text-anchor="middle">VTXO</text>
  <text class="bk-annot" x="240" y="290" text-anchor="middle">every edge = a pre-signed tx in your pocket</text>
</svg>
</div>

<div class="pt-2 text-xs opacity-70 text-center">
Unilateral exit = broadcast your branch, wait out a <strong>~144-block CSV</strong>, leave.
</div>

<style>
.bark-svg { display: block; width: 100%; max-width: 460px; margin: 24px auto 0; font-family: 'Geist', -apple-system, sans-serif; }
.bark-svg .bk-tx { fill: #a3c410; }
.bark-svg .bk-txt { fill: #000; font-size: 13px; font-weight: 600; }
.bark-svg .bk-branch { fill: #fff; stroke: #C0C0C0; stroke-width: 1.5; stroke-dasharray: 6 4; }
.bark-svg .bk-bt { fill: #737373; font-size: 11px; font-weight: 600; }
.bark-svg .bk-leaf { fill: #fff; stroke: #C0C0C0; stroke-width: 1.5; stroke-dasharray: 6 4; }
.bark-svg .bk-lt { fill: #737373; font-size: 10px; font-weight: 600; }
.bark-svg .bk-line { stroke: #c2e821; stroke-width: 1.5; }
.bark-svg .bk-annot { fill: rgba(255,255,255,0.6); font-size: 11px; font-style: italic; }
</style>

<!--
Quad trees keep exit depth logarithmic. Rounds have 5 phases: intent →
tree signing → round tx broadcast → forfeit signing → claim. Signet demo
rounds every 30s; mainnet expected 1-2h. Written in Rust; SDK bindings
for Kotlin/Swift/RN/Flutter/Go/Python/WASM; barkd daemon with REST API.
-->

---

[//]: # (Slide: Bark: expiry, arkoor, the honest costs)

# Bark: the fine print

<div class="grid grid-cols-2 gap-6 pt-4">

<div class="p-4 rounded bg-white/5 border-l-4 border-[#c2e821]/60">

**The good**

- Board/refresh VTXOs are **trustless**: real unilateral exit, pure Bitcoin txs.
- Instant **arkoor** payments off-round; offline receive.
- Lightning both ways via server as gateway (HTLC-on-VTXO), no channels.
- Open protocol, **self-hostable server** (`captaind`), Rust, full SDK.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#ef4444]/60">

**The catch**

- VTXOs **expire (~30 days)**: miss the refresh and the server can sweep. You pay liquidity cost each refresh (~0.07%).
- Refresh needs you **online during a round** (delegation helps phones).
- **Arkoor** payments: until refreshed, receiver trusts *sender + server don't collude*. Chains of them inherit that.
- Server must front **all liquidity** for every round. Capital-heavy.

</div>

</div>

<div class="pt-4 p-3 border-l-4 border-[#f7931a] bg-[#f7931a]/10 text-sm">

**The bet:** ship covenantless today; when **CTV + CSFS** activate, rounds go non-interactive and refresh works while you sleep (Roose's *hArk* / *Erk* designs). Bark is also a lobbying vehicle for the soft fork.

</div>

<!--
Refresh cost formula: amount × (days_to_expiry/365) × opportunity rate.
LN receive has its own wrinkle: server fronts the HTLC with an
"ephemeral key" it promises to delete, and receive-HTLC VTXOs live only
~3 days. Second raised $5.1M; team of 11.
-->

---
layout: center
class: text-center
---

[//]: # (Breather 05: Arkade)

<div class="text-sm opacity-50 tracking-[0.3em] mb-8">CHAPTER 05 / 06</div>

# Arkade

<div class="text-lg opacity-70 mt-4 font-normal">
Ark + a programmable execution layer
</div>

---
layout: two-cols
layoutClass: gap-8
---

[//]: # (Slide: Arkade: how it works)

# Arkade: Ark, then keep going

- Built by **Ark Labs**. Mainnet quietly since **Aug 2025** (Baltic Honeybadger), public beta **Oct 2025**. Backed by **Tether** ($5.2M seed).
- Same Ark base as Bark: **VTXOs** in batch outputs, commitment txs, forfeits, expiry + renewal, unilateral exit (**1008-block CSV**).
- On top: a **Virtual Mempool**: a DAG of chained off-chain txs. Operator co-sign = *preconfirmation*, instantly spendable.
- **Checkpoint txs** + forfeits protect the operator; **intent delegation** renews your VTXOs while you're offline.

::right::

<div class="arkade-diagram-wrap">
  <div class="arkade-diagram">
    <svg class="lines" viewBox="0 0 700 300" preserveAspectRatio="xMidYMid meet">
      <polyline points="168,150 218,150" />
      <polyline class="arrow" points="213,146 218,150 213,154" />
      <polyline points="345,150 400,150 400,44 480,44" />
      <polyline points="345,150 400,150 400,117 480,117" />
      <polyline points="345,150 400,150 400,190 480,190" />
      <polyline points="345,150 400,150 400,263 480,263" />
      <polyline class="arrow" points="475,40 480,44 475,48" />
      <polyline class="arrow" points="475,113 480,117 475,121" />
      <polyline class="arrow" points="475,186 480,190 475,194" />
      <polyline class="arrow" points="475,259 480,263 475,267" />
    </svg>
    <div class="tx-box">Commitment tx</div>
    <div class="batch-box">Batch Output</div>
    <div class="vtxo" style="top: 8px;">VTXO 1</div>
    <div class="vtxo" style="top: 81px;">VTXO 2</div>
    <div class="vtxo" style="top: 154px;">VTXO 3</div>
    <div class="vtxo" style="top: 227px;">VTXO 4</div>
    <div class="caption"><span class="caption-hl">1</span> onchain output &rarr; <span class="caption-hl">many</span> VTXOs &rarr; off-chain DAG</div>
  </div>
</div>

<style>
.arkade-diagram-wrap {
  position: relative;
  width: 525px;
  height: 240px;
  margin: 24px auto 0;
  max-width: 100%;
}
.arkade-diagram {
  position: absolute;
  top: 0;
  left: 0;
  width: 700px;
  height: 320px;
  transform: scale(0.75);
  transform-origin: top left;
  font-family: 'Geist', -apple-system, sans-serif;
}
.arkade-diagram .lines { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.arkade-diagram .lines polyline { fill: none; stroke: #c2e821; stroke-width: 1.5; }
.arkade-diagram .tx-box { position: absolute; left: 4%; top: 50%; transform: translateY(-50%); background: #a3c410; color: #000; padding: 14px 18px; border-radius: 4px; font-size: 13px; font-weight: 600; white-space: nowrap; }
.arkade-diagram .batch-box { position: absolute; left: 32%; top: 50%; transform: translateY(-50%); background: #fff; border: 1.5px dashed #C0C0C0; padding: 14px 22px; border-radius: 20px; font-size: 13px; font-weight: 600; color: #000; white-space: nowrap; }
.arkade-diagram .vtxo { position: absolute; right: 14%; width: 72px; height: 72px; border-radius: 50%; border: 1.5px dashed #C0C0C0; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; color: #737373; }
.arkade-diagram .caption { position: absolute; bottom: -8px; left: 50%; transform: translateX(-50%); font-size: 11px; color: #737373; white-space: nowrap; }
.arkade-diagram .caption-hl { color: #c2e821; font-weight: 600; }
</style>

<!--
Deliberately the same diagram as my Byron Bay talk; Arkade regulars
have seen this. Batch root is n-of-n MuSig2 of all owners + operator;
sub-dust VTXOs via OP_RETURN; VTXO states: preconfirmed → settled →
recoverable → spent.
-->

---

[//]: # (Slide: Arkade: programmability)

# Arkade: scripts are the differentiator

<div class="grid grid-cols-2 gap-6 pt-2">

<div class="p-4 rounded bg-white/5 border-l-4 border-[#c2e821]/60">

**Arkade Script**

Bitcoin Script + **Elements-style introspection opcodes**: `OP_INSPECTOUTPUTVALUE`, `OP_INSPECTINPUTSCRIPTPUBKEY`, …

The script can *see the spending tx* → **covenants, today**: vaults, HTLCs, non-interactive swaps, payment channels *inside* VTXOs.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#f7931a]/60">

**Enforced by whom?**

Not by L1. The covenant path runs on the **cooperative path**, validated inside a **TEE-isolated signer**. The operator can't read your txs (E2E-encrypted), can't skip the script, attests its code remotely.

Unilateral exit leaf stays **pure Bitcoin Script**.

</div>

</div>

<div class="grid grid-cols-3 gap-3 pt-4 text-sm">

<div class="p-3 rounded bg-white/5 border-l-4 border-[#c2e821]/60">
💵 <strong>Arkade Assets</strong>: issued assets on VTXOs; USDT coming (Tether-backed).
</div>

<div class="p-3 rounded bg-white/5 border-l-4 border-[#c2e821]/60">
⚡ <strong>Lightning</strong>: Boltz submarine swaps with virtual HTLCs, both directions.
</div>

<div class="p-3 rounded bg-white/5 border-l-4 border-[#ef4444]/60">
⚠️ <strong>Honest cons</strong>: single operator, TEE trust, expiry/renewal burden, tooling still alpha.
</div>

</div>

<!--
This is the same Introspector/emulator story from my Prague and Byron
talks: a co-signer that only signs if the committed script evaluates
true. Contract catalog in the docs: escrow, HTLC, Spilman + Dryja-Poon
channels, chain swaps, non-interactive swaps (Banco). If a TEE-skeptic
asks: yes, SGX-style attestation is the trust anchor; exit path never
depends on it.
-->

---
layout: center
class: text-center
---

[//]: # (Breather 06: Head to head)

<div class="text-sm opacity-50 tracking-[0.3em] mb-8">CHAPTER 06 / 06</div>

# Head to Head

---

[//]: # (Slide: the big table)

# The scorecard

<div class="compare-table text-xs pt-2">

|  | **Spark** | **Bark** | **Arkade** |
| --- | --- | --- | --- |
| **Design** | Statechains, key handover | Ark, covenantless, pre-signed trees | Ark + virtual mempool + scripts |
| **Operator** | Federation: Lightspark, Flashnet, Breez | Single server, **self-hostable** | Single operator (Ark Labs) + TEE signer |
| **You trust…** | threshold *deleted* old key shares (unverifiable) | trustless once refreshed; arkoor: sender+server no-collusion | operator/TEE won't co-sign conflicts |
| **Expiry** | none, leaves live forever | **~30 days**, refresh in rounds | batch expiry, renew via batch swap / delegation |
| **Unilateral exit** | pre-signed chain, decrementing timelocks; beta, ≳16k sats | unroll tree, ~144-block CSV | unroll tree + chain, 1008-block CSV |
| **Offline receive** | ✅ fully | ✅ arkoor (trust until refresh) | ✅ preconfirmed |
| **Lightning** | via SSPs, 0.25% | server is the LN gateway | Boltz swaps, virtual HTLCs |
| **Assets** | BTKN: **USDT + USDB live** | none | Arkade Assets, USDT planned |
| **Programmability** | none | Bitcoin Script only | **introspection covenants** |
| **Mainnet** | beta since Apr 2025 · WoS, Theya, Blitz | since Jun 2026 · Noah, BTCPay | Aug 2025 / beta Oct 2025 · Boltz, Bull Bitcoin |

</div>

<style>
.compare-table table { width: 100%; }
.compare-table td, .compare-table th { padding: 4px 8px !important; line-height: 1.35; }
.compare-table tr td:first-child { color: #c2e821; white-space: nowrap; }
</style>

<!--
Slow down here, this is the slide people photograph.
Point out the diagonal: each column is strongest exactly where the
others are weakest. Spark = UX + stablecoins, Bark = sovereignty,
Arkade = programmability.
-->

---

[//]: # (Slide: same dream, three bets)

# Same dream, three bets

<div class="grid grid-cols-3 gap-4 pt-6 text-sm">

<div class="p-4 rounded bg-white/5 border-l-4 border-[#c2e821]/60">

**Spark bets on UX**

If the federation behaves, you get the best payments experience on Bitcoin: free, instant, offline, with real stablecoins. The cost: finality you can't prove.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#c2e821]/60">

**Bark bets on Bitcoin**

Pure pre-signed transactions, real exits, self-hostable, and a roadmap that gets *better* if CTV/CSFS activate. The cost: expiry, rounds, liveness.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#f7931a]/60">

**Arkade bets on builders**

Covenants and assets today via an emulated script layer. If you want to *build* (swaps, vaults, channels), this is the sandbox. The cost: operator + TEE trust.

</div>

</div>

<div class="pt-8 text-center text-lg">
None of them needed a soft fork. All of them get <strong>better</strong> with one.
</div>

<!--
Closing framing: these are not three competitors so much as three
positions on the trust-vs-capability curve, all waiting for covenants
to move the whole curve up. CTV/CSFS helps all three: Bark loses
interactivity, Arkade lifts scripts to consensus, Spark could harden
exits.
-->

---
layout: center
class: text-center
---

[//]: # (Slide: closing)

# Questions?

<div class="pt-6 text-sm opacity-80">
Spark: docs.spark.money · Bark: second.tech/docs · Arkade: docs.arkadeos.com
</div>

<div class="pt-10 text-xs opacity-50">
@bonomat - Philipp · BushBash Palm Cove · 26 July 2026
</div>
