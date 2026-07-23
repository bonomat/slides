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

- On-chain Bitcoin: slow, fees spikes, not private.
- Lightning's answer: a **payment channel**: one on-chain **2-of-2 multisig** between two parties.
- Inside it, they re-sign the balance split **off-chain**, as often as they like. Only open + close touch the chain.
- No direct channel? **Route** through others; HTLCs make every hop atomic.

--> Result: instant, cheap, high-volume payments. It works™️: exchanges, most of retail BTC payments today.

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

- 💸 **A channel per user**: Onboarding the next billion = billions of channel opens.
- 📥 **Inbound liquidity**: You can't *receive* until someone locks coins toward you. New users must buy or beg for
  inbound capacity.
- 🔌 **Always online**: receiving needs your node up. Miss a revocation, and a stale-state close can cost you. Hence
  watchtowers.
- ⚠️ **Force-close pain**: unhappy path = on-chain tx at the worst time, timelocked funds, fee spikes.
- 🧭 **Routing failures**: larger payments might fail to find a path.

<div class="pt-8 text-center text-sm opacity-80">
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

- Instead of one tx/*2 users*, one tx/**n users**.
- ⚡ instant, cheap payments, **no inbound liquidity problem**
- 📱 **receive while offline**, no node to run
- 🧾 no per-user on-chain footprint to get paid
- 🔑 still **self-custodial**: exit without permission

--> Spark, Bark and Arkade are three different implementations:

<div class="mt-3 p-4 border-l-4 border-[#c2e821] bg-[#c2e821]/10">

How do they work and differ?

</div>

::right::

<div class="pt-10">

**The axes we'll compare on:**

<div class="grid grid-cols-1 gap-3 pt-4 text-sm">

<div class="p-3 rounded bg-white/5 border-l-4 border-[#c2e821]/60">
⚙️ <strong>Technical implementation</strong>: how does it work under the hood?
</div>

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

[//]: # (Breather 03: Technical comparison)

<div class="text-sm opacity-50 tracking-[0.3em] mb-8">CHAPTER 03 / 07</div>

# Technical Comparison

<div class="text-lg opacity-70 mt-4 font-normal">
Same promise, three architectures
</div>

---

[//]: # (Slide: Family tree)

# The family tree

<svg viewBox="0 0 760 340" class="tree-svg" xmlns="http://www.w3.org/2000/svg">
  <line class="tr-line" x1="210" y1="104" x2="140" y2="216" />
  <line class="tr-line" x1="210" y1="104" x2="380" y2="216" />
  <line class="tr-line" x1="210" y1="104" x2="620" y2="216" />
  <line class="tr-line" x1="550" y1="104" x2="380" y2="216" />
  <line class="tr-line" x1="550" y1="104" x2="620" y2="216" />
  <rect class="tr-parent" x="120" y="40" width="180" height="64" rx="8" />
  <text class="tr-pt" x="210" y="66" text-anchor="middle">Statechains</text>
  <text class="tr-ps" x="210" y="88" text-anchor="middle">ownership = key handover</text>
  <rect class="tr-parent" x="460" y="40" width="180" height="64" rx="8" />
  <text class="tr-pt" x="550" y="66" text-anchor="middle">Ark</text>
  <text class="tr-ps" x="550" y="88" text-anchor="middle">shared UTXO + pre-signed exit</text>
  <rect class="tr-child" x="60" y="216" width="160" height="64" rx="8" />
  <text class="tr-ct" x="140" y="242" text-anchor="middle">Spark</text>
  <text class="tr-cs" x="140" y="264" text-anchor="middle">pure statechain</text>
  <rect class="tr-child" x="300" y="216" width="160" height="64" rx="8" />
  <text class="tr-ct" x="380" y="242" text-anchor="middle">Bark</text>
  <text class="tr-cs" x="380" y="264" text-anchor="middle">Ark + statechain</text>
  <rect class="tr-child" x="540" y="216" width="160" height="64" rx="8" />
  <text class="tr-ct" x="620" y="242" text-anchor="middle">Arkade</text>
  <text class="tr-cs" x="620" y="264" text-anchor="middle">Ark + statechain</text>
  <text class="tr-annot" x="380" y="325" text-anchor="middle">Bark and Arkade: Ark rounds for settlement, statechain-style handover for instant sends</text>
</svg>

<style>
.tree-svg { display: block; width: 100%; max-width: 960px; height: auto; margin: 8px auto 0; font-family: 'Geist', -apple-system, sans-serif; }
.tree-svg .tr-line { stroke: #c2e821; stroke-width: 1.5; }
.tree-svg .tr-parent { fill: rgba(194,232,33,0.12); stroke: #c2e821; stroke-width: 1.5; }
.tree-svg .tr-pt { fill: #c2e821; font-size: 18px; font-weight: 700; }
.tree-svg .tr-ps { fill: rgba(255,255,255,0.6); font-size: 10px; }
.tree-svg .tr-child { fill: #fff; stroke: #C0C0C0; stroke-width: 1.5; stroke-dasharray: 6 4; }
.tree-svg .tr-ct { fill: #000; font-size: 16px; font-weight: 700; }
.tree-svg .tr-cs { fill: #737373; font-size: 10.5px; }
.tree-svg .tr-annot { fill: rgba(255,255,255,0.6); font-size: 11px; font-style: italic; }
</style>

<!--
The joke writes itself: Ark is ark. The useful insight: Spark is the
only pure statechain. Bark and Arkade both settle through Ark rounds
(batch output, pre-signed exit trees) but their instant payments
(arkoor / preconfirmations) are statechain-flavored: the server co-signs
a handover and you trust it not to sign a conflicting one until the
next round settles you. So the real spectrum is how much statechain
trust you hold, and for how long.
-->

---

[//]: # (Slide: Statechains explained)

# Statechains: how Spark moves coins

<svg viewBox="0 0 960 400" class="sc-svg" xmlns="http://www.w3.org/2000/svg">
  <rect class="sc-utxo" x="30" y="60" width="250" height="96" rx="10" />
  <text class="sc-ut" x="155" y="98" text-anchor="middle">On-chain UTXO</text>
  <text class="sc-us" x="155" y="120" text-anchor="middle">2-of-2: owner + SE share</text>
  <text class="sc-us" x="155" y="138" text-anchor="middle">root keys destroyed: unsweepable</text>
  <line class="sc-hand" x1="90" y1="156" x2="70" y2="238" />
  <line class="sc-hand" x1="155" y1="156" x2="155" y2="238" />
  <line class="sc-hand" x1="220" y1="156" x2="240" y2="238" />
  <circle class="sc-leaf" cx="70" cy="266" r="28" />
  <text class="sc-lt" x="70" y="263" text-anchor="middle">leaf</text>
  <text class="sc-ls" x="70" y="277" text-anchor="middle">50k</text>
  <circle class="sc-leaf" cx="155" cy="266" r="28" />
  <text class="sc-lt" x="155" y="263" text-anchor="middle">leaf</text>
  <text class="sc-ls" x="155" y="277" text-anchor="middle">30k</text>
  <circle class="sc-leaf now" cx="240" cy="266" r="28" />
  <text class="sc-lt" x="240" y="263" text-anchor="middle">leaf</text>
  <text class="sc-ls" x="240" y="277" text-anchor="middle">20k</text>
  <text class="sc-annot" x="155" y="330" text-anchor="middle">split off-chain into a tree of leaves;</text>
  <text class="sc-annot" x="155" y="348" text-anchor="middle">leaves split &amp; merge on the fly</text>
  <line class="sc-link" x1="268" y1="256" x2="420" y2="72" />
  <line class="sc-link" x1="268" y1="266" x2="420" y2="196" />
  <line class="sc-link" x1="268" y1="276" x2="420" y2="320" />
  <text class="sc-ht" x="330" y="250" text-anchor="middle">one leaf's life:</text>
  <rect class="sc-owner" x="420" y="40" width="180" height="64" rx="8" />
  <text class="sc-ot" x="510" y="66" text-anchor="middle">Alice + SE</text>
  <text class="sc-os" x="510" y="86" text-anchor="middle">deposit</text>
  <rect class="sc-exit old" x="660" y="40" width="270" height="64" rx="8" />
  <text class="sc-et" x="795" y="66" text-anchor="middle">exit tx: Alice, timelock 400</text>
  <text class="sc-ed" x="795" y="86" text-anchor="middle">🗑 old SE share deleted</text>
  <line class="sc-strike" x1="672" y1="72" x2="918" y2="72" />
  <line class="sc-hand" x1="510" y1="104" x2="510" y2="164" />
  <polyline class="sc-arrow" points="506,159 510,164 514,159" />
  <text class="sc-ht" x="524" y="140" text-anchor="start">handover: tweak + delete</text>
  <rect class="sc-owner" x="420" y="164" width="180" height="64" rx="8" />
  <text class="sc-ot" x="510" y="190" text-anchor="middle">Bob + SE</text>
  <text class="sc-os" x="510" y="210" text-anchor="middle">instant, off-chain</text>
  <rect class="sc-exit old" x="660" y="164" width="270" height="64" rx="8" />
  <text class="sc-et" x="795" y="190" text-anchor="middle">exit tx: Bob, timelock 300</text>
  <text class="sc-ed" x="795" y="210" text-anchor="middle">🗑 old SE share deleted</text>
  <line class="sc-strike" x1="672" y1="196" x2="918" y2="196" />
  <line class="sc-hand" x1="510" y1="228" x2="510" y2="288" />
  <polyline class="sc-arrow" points="506,283 510,288 514,283" />
  <text class="sc-ht" x="524" y="264" text-anchor="start">handover: tweak + delete</text>
  <rect class="sc-owner now" x="420" y="288" width="180" height="64" rx="8" />
  <text class="sc-ot" x="510" y="314" text-anchor="middle">Carol + SE</text>
  <text class="sc-os" x="510" y="334" text-anchor="middle">current owner</text>
  <rect class="sc-exit now" x="660" y="288" width="270" height="64" rx="8" />
  <text class="sc-et now" x="795" y="314" text-anchor="middle">exit tx: Carol, timelock 200</text>
  <text class="sc-ed now" x="795" y="334" text-anchor="middle">lowest timelock exits first</text>
  <text class="sc-annot" x="480" y="390" text-anchor="middle">the coin never moves; who can sign for it moves, and the newest owner always wins the exit race</text>
</svg>

<style>
.sc-svg { display: block; width: 100%; max-width: 940px; height: auto; margin: 8px auto 0; font-family: 'Geist', -apple-system, sans-serif; }
.sc-svg .sc-utxo { fill: rgba(194,232,33,0.12); stroke: #c2e821; stroke-width: 2; }
.sc-svg .sc-ut { fill: #c2e821; font-size: 18px; font-weight: 700; }
.sc-svg .sc-us { fill: rgba(255,255,255,0.65); font-size: 12px; }
.sc-svg .sc-link { stroke: rgba(194,232,33,0.35); stroke-width: 1; stroke-dasharray: 4 4; }
.sc-svg .sc-leaf { fill: #fff; stroke: #C0C0C0; stroke-width: 1.5; stroke-dasharray: 6 4; }
.sc-svg .sc-leaf.now { stroke: #c2e821; stroke-width: 2; stroke-dasharray: none; }
.sc-svg .sc-lt { fill: #000; font-size: 12px; font-weight: 700; }
.sc-svg .sc-ls { fill: #737373; font-size: 10px; }
.sc-svg .sc-owner { fill: #fff; stroke: #C0C0C0; stroke-width: 1.5; stroke-dasharray: 6 4; }
.sc-svg .sc-owner.now { stroke: #c2e821; stroke-width: 2; stroke-dasharray: none; }
.sc-svg .sc-ot { fill: #000; font-size: 15px; font-weight: 700; }
.sc-svg .sc-os { fill: #737373; font-size: 11px; }
.sc-svg .sc-exit { fill: none; }
.sc-svg .sc-exit.old { stroke: rgba(255,255,255,0.25); stroke-width: 1.5; stroke-dasharray: 6 4; }
.sc-svg .sc-exit.now { fill: rgba(247,147,26,0.1); stroke: #f7931a; stroke-width: 2; }
.sc-svg .sc-et { fill: rgba(255,255,255,0.5); font-size: 13px; font-weight: 600; }
.sc-svg .sc-et.now { fill: #f7931a; }
.sc-svg .sc-ed { fill: rgba(255,255,255,0.4); font-size: 11px; }
.sc-svg .sc-ed.now { fill: rgba(247,147,26,0.8); }
.sc-svg .sc-strike { stroke: rgba(239,68,68,0.6); stroke-width: 1.5; }
.sc-svg .sc-hand { stroke: #c2e821; stroke-width: 1.5; }
.sc-svg .sc-arrow { stroke: #c2e821; stroke-width: 1.5; fill: none; }
.sc-svg .sc-ht { fill: rgba(255,255,255,0.7); font-size: 11px; font-style: italic; }
.sc-svg .sc-annot { fill: rgba(255,255,255,0.6); font-size: 12px; font-style: italic; }
</style>

<!--
Classic statechains are indivisible: you hand over the whole coin.
Spark fixes this with the tree on the left: root = the on-chain UTXO,
branches = internal txs with no timelocks connecting root to leaves,
leaves = user-owned txs each with a relative-timelock exit. Leaves
split instantly for payments and merge back together; child keys
mathematically combine to equal parent keys, so value moves flexibly
without touching the chain. Exit = broadcast the branch chain
root-to-leaf. (Source: spark.money/research/what-is-spark-bitcoin-layer-2)

Then the right side, per leaf: Alice deposits into a 2-of-2 with the
Spark Entity and pre-signs an exit tx (timelock 400). To pay Bob, the SE
tweaks its key share so Alice's key no longer completes the aggregate,
deletes the old share, and co-signs a NEW exit for Bob with a lower
timelock (300). Same again for Carol (200). Decrementing timelocks mean
the latest owner can always confirm their exit before any earlier
owner's stale exit becomes valid. The entire security model hangs on
that deletion actually happening, which sets up the Spark trust slide.

Q&A ammo, "don't the timelocks run out after N transfers?": no
timebomb. The timelocks are RELATIVE (CSV): X blocks after the parent
branch tx is mined, so nothing counts down while the coin is off-chain
(this is Spark's fix over Mercury statechains, which used absolute
timelocks). The decrement only orders the broadcast race: current
owner's lower CSV confirms first. It does cap the number of transfers
per leaf though; when headroom runs low, the wallet swaps value into a
fresh leaf (leaves split/merge off-chain with SE cooperation, new leaf
= full timelock). Exact step size and floor are not published.
-->

---
layout: center
class: text-center
---

[//]: # (Breather 04: Spark)

<div class="text-sm opacity-50 tracking-[0.3em] mb-8">CHAPTER 04 / 07</div>

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

- Built by **Lightspark** on **statechains**.
- **Operator federation** (Lightspark, Flashnet, Breez) holds one key share, you hold the other.
- **Your signature is always required.**
- Transfer: SE **tweaks its share**, **deletes the old one**, signs a new exit tx with a **lower timelock**.
- No on-chain tx. **Offline receive.**
- **No expiry**: timelocks are *relative*, and the root's operator keys are **destroyed**. Nobody can ever sweep the
  UTXO.

::right::

<div class="spark-diagram-wrap">
<svg viewBox="0 0 480 300" class="spark-svg" xmlns="http://www.w3.org/2000/svg">
  <rect class="sp-box user" x="20" y="30" width="130" height="54" rx="6" />
  <text class="sp-t" x="85" y="53" text-anchor="middle">Alice's key</text>
  <text class="sp-s" x="85" y="71" text-anchor="middle">sk_alice</text>
  <rect class="sp-box se" x="20" y="120" width="130" height="54" rx="6" />
  <text class="sp-t se" x="85" y="143" text-anchor="middle">SE key share</text>
  <text class="sp-s se" x="85" y="161" text-anchor="middle">sk_se</text>
  <line class="sp-line" x1="150" y1="102" x2="220" y2="102" />
  <polyline class="sp-arrow" points="215,98 220,102 215,106" />
  <text class="sp-label" x="185" y="90" text-anchor="middle">transfer</text>
  <rect class="sp-box user" x="230" y="30" width="130" height="54" rx="6" />
  <text class="sp-t" x="295" y="53" text-anchor="middle">Bob's key</text>
  <text class="sp-s" x="295" y="71" text-anchor="middle">sk_bob</text>
  <rect class="sp-box se" x="230" y="120" width="130" height="54" rx="6" />
  <text class="sp-t se" x="295" y="143" text-anchor="middle">SE key share</text>
  <text class="sp-s se" x="295" y="161" text-anchor="middle">sk_se + tweak</text>
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
.spark-svg .sp-s { fill: #555; font-size: 10px; }
.spark-svg .sp-t.se { fill: #fff; }
.spark-svg .sp-s.se { fill: rgba(255,255,255,0.75); }
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
- **Stablecoins live**: BTKN tokens (**USDT** and **USDB**), implemented by: Wallet of Satoshi, Blitz, Breez

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#ef4444]/60">

**The ugly**

- Security = SE **actually deleted** the old key.
- Federation is 3 companies. Liveness of the federation required for every transfer.
- Unilateral exit: beta, chain of txs, uneconomical below **~16k sats**.
- No scripts, no contracts. Payments only.
- **If SE keeps shares and colludes with past owner → **your coin can be double-spent**.**

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

[//]: # (Slide: Spark tree and the root)

# The Spark tree: anchored at the root

<svg viewBox="0 0 960 540" class="sr-svg" xmlns="http://www.w3.org/2000/svg">
  <line class="sr-line" x1="480" y1="118" x2="480" y2="200" />
  <line class="sr-divider" x1="30" y1="162" x2="930" y2="162" />
  <text class="sr-dt" x="920" y="155" text-anchor="end">everything below stays off-chain ↓</text>
  <line class="sr-line" x1="480" y1="278" x2="260" y2="330" />
  <line class="sr-line" x1="480" y1="278" x2="700" y2="330" />
  <line class="sr-line" x1="260" y1="386" x2="160" y2="432" />
  <line class="sr-line" x1="260" y1="386" x2="360" y2="432" />
  <line class="sr-line" x1="700" y1="386" x2="610" y2="432" />
  <line class="sr-line" x1="700" y1="386" x2="700" y2="432" />
  <line class="sr-line" x1="700" y1="386" x2="790" y2="432" />
  <rect class="sr-root" x="320" y="24" width="320" height="94" rx="10" />
  <text class="sr-rt" x="480" y="54" text-anchor="middle">Root: on-chain UTXO · 100k sats</text>
  <text class="sr-rs" x="480" y="76" text-anchor="middle">depositor + SE aggregate key (2-of-2)</text>
  <text class="sr-rs" x="480" y="94" text-anchor="middle">SE root share destroyed after signing</text>
  <text class="sr-never" x="480" y="140" text-anchor="middle">no timelock · never expires · only the pre-signed tree can spend it</text>
  <rect class="sr-split" x="310" y="200" width="340" height="78" rx="10" />
  <text class="sr-st" x="480" y="228" text-anchor="middle">first off-chain tx: the split</text>
  <text class="sr-ss" x="480" y="250" text-anchor="middle">spends the root → two outputs</text>
  <text class="sr-ss" x="480" y="268" text-anchor="middle">pre-signed, held in wallets, never broadcast</text>
  <rect class="sr-out" x="190" y="330" width="140" height="56" rx="8" />
  <text class="sr-ot" x="260" y="353" text-anchor="middle">10k sats</text>
  <text class="sr-os" x="260" y="371" text-anchor="middle">output 0</text>
  <rect class="sr-out" x="630" y="330" width="140" height="56" rx="8" />
  <text class="sr-ot" x="700" y="353" text-anchor="middle">90k sats</text>
  <text class="sr-os" x="700" y="371" text-anchor="middle">output 1</text>
  <circle class="sr-leaf" cx="160" cy="466" r="34" />
  <text class="sr-lt" x="160" y="462" text-anchor="middle">Alice</text>
  <text class="sr-ls" x="160" y="478" text-anchor="middle">4k · CSV exit</text>
  <circle class="sr-leaf" cx="360" cy="466" r="34" />
  <text class="sr-lt" x="360" y="462" text-anchor="middle">Bob</text>
  <text class="sr-ls" x="360" y="478" text-anchor="middle">6k · CSV exit</text>
  <circle class="sr-more" cx="610" cy="466" r="26" />
  <text class="sr-mt" x="610" y="471" text-anchor="middle">…</text>
  <circle class="sr-more" cx="700" cy="466" r="26" />
  <text class="sr-mt" x="700" y="471" text-anchor="middle">…</text>
  <circle class="sr-more" cx="790" cy="466" r="26" />
  <text class="sr-mt" x="790" y="471" text-anchor="middle">…</text>
  <text class="sr-ms" x="700" y="516" text-anchor="middle">split further, on demand, as payments happen</text>
  <text class="sr-annot" x="290" y="530" text-anchor="middle">leaves change hands by key handover; the root never notices</text>
</svg>

<style>
.sr-svg { display: block; width: 100%; max-width: 720px; height: auto; margin: 0 auto; font-family: 'Geist', -apple-system, sans-serif; }
.sr-svg .sr-line { stroke: rgba(194,232,33,0.5); stroke-width: 1.5; }
.sr-svg .sr-root { fill: rgba(194,232,33,0.15); stroke: #c2e821; stroke-width: 3; }
.sr-svg .sr-rt { fill: #c2e821; font-size: 19px; font-weight: 700; }
.sr-svg .sr-rs { fill: rgba(255,255,255,0.75); font-size: 12px; }
.sr-svg .sr-never { fill: #f7931a; font-size: 13px; font-weight: 600; }
.sr-svg .sr-split { fill: rgba(247,147,26,0.12); stroke: #f7931a; stroke-width: 3; }
.sr-svg .sr-st { fill: #f7931a; font-size: 17px; font-weight: 700; }
.sr-svg .sr-ss { fill: rgba(255,255,255,0.75); font-size: 12px; }
.sr-svg .sr-divider { stroke: rgba(255,255,255,0.25); stroke-width: 1; stroke-dasharray: 4 4; }
.sr-svg .sr-dt { fill: rgba(255,255,255,0.5); font-size: 11px; font-style: italic; }
.sr-svg .sr-out { fill: #fff; stroke: #C0C0C0; stroke-width: 1.5; stroke-dasharray: 6 4; }
.sr-svg .sr-ot { fill: #f7931a; font-size: 14px; font-weight: 700; }
.sr-svg .sr-os { fill: #737373; font-size: 11px; }
.sr-svg .sr-leaf { fill: #fff; stroke: #C0C0C0; stroke-width: 1.5; stroke-dasharray: 6 4; }
.sr-svg .sr-lt { fill: #000; font-size: 13px; font-weight: 700; }
.sr-svg .sr-ls { fill: #737373; font-size: 10px; }
.sr-svg .sr-more { fill: rgba(255,255,255,0.06); stroke: rgba(255,255,255,0.35); stroke-width: 1.5; stroke-dasharray: 4 4; }
.sr-svg .sr-mt { fill: rgba(255,255,255,0.6); font-size: 16px; font-weight: 700; }
.sr-svg .sr-ms { fill: rgba(255,255,255,0.5); font-size: 11px; font-style: italic; }
.sr-svg .sr-annot { fill: rgba(255,255,255,0.6); font-size: 12px; font-style: italic; }
</style>

<!--
The root detail that surprises people: it starts as a 2-of-2 aggregate
between the depositor and the SE, they pre-sign the branch txs, and then
the SE DESTROYS its root key share. From that moment the pre-signed
tree is the only possible way to spend the UTXO: covenant-like behavior
without a covenant. No absolute timelock anywhere means the tree can sit
off-chain forever: this is exactly why Spark has no expiry while Ark
rounds do (the Ark server needs its fronted liquidity back, Spark fronts
nothing). Leaves at the bottom keep changing hands via key handover;
the root never notices.

Q&A ammo, "does the root UTXO have multiple outputs?": no, one output.
The tree is entirely virtual: the branch tx is a pre-signed,
unbroadcast tx that WOULD spend the root and create N outputs; each of
those feeds the next pre-signed tx down to the leaves. Nothing is
broadcast in normal operation. Unilateral exit = broadcast the path
root to your leaf, tx by tx, then wait out the CSV. Deeper leaf =
more txs = pricier exit. Splitting a leaf = pre-signing new child txs
below it. Same virtual-tree trick as Bark's round trees.
-->

---
layout: center
class: text-center
---

[//]: # (Breather 05: Ark)

<div class="text-sm opacity-50 tracking-[0.3em] mb-8">CHAPTER 05 / 07</div>

# Ark

<div class="text-lg opacity-70 mt-4 font-normal">
The original protocol: shared UTXOs, rounds, and trees
</div>

---
layout: two-cols
layoutClass: gap-8
---

[//]: # (Slide: Ark: the original protocol)

# Ark: rounds and trees

- Proposed by **Burak (2023)**: one UTXO among many users, renew it in **rounds**.
- The **Ark server** periodically broadcasts **round tx** that funds a **shared output**, fronting the liquidity.
- This output splits into a **pre-signed tree** (**VTXOs**: virtual UTXOs owned by users).
- Every tree node: cooperative **n-of-n** (everyone below + server) or **timelocked recovery**.
- VTXOs **expire**: after the round's lifetime the server **sweeps** the shared output to recover its liquidity; users *
  *refresh** into a new round before that.
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
Unilateral exit = broadcast your branch, wait out a CSV delay, leave. Works until expiry.
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
Rounds have 5 phases: intent → tree signing → round tx broadcast →
forfeit signing → claim. Trees are wide (quad) to keep exit depth
logarithmic: 256 users = 5 txs deep. The expiry is the crucial
difference vs Spark: the server fronts every round's liquidity and the
sweep path is how it gets it back. Original Ark wanted covenants (CTV)
to make the tree non-interactive; without them, everyone signs.
-->

---

[//]: # (Slide: The Ark tree with amounts)

# The Ark round tree

<svg viewBox="0 0 960 540" class="at-svg" xmlns="http://www.w3.org/2000/svg">
  <line class="at-line" x1="480" y1="118" x2="480" y2="200" />
  <line class="at-divider" x1="30" y1="162" x2="930" y2="162" />
  <text class="at-dt" x="920" y="155" text-anchor="end">everything below stays off-chain ↓</text>
  <line class="at-line" x1="480" y1="270" x2="160" y2="318" />
  <line class="at-line" x1="480" y1="270" x2="360" y2="318" />
  <line class="at-line" x1="480" y1="270" x2="610" y2="318" />
  <line class="at-line" x1="480" y1="270" x2="790" y2="318" />
  <line class="at-oline" x1="160" y1="382" x2="95" y2="432" />
  <line class="at-oline" x1="160" y1="382" x2="235" y2="432" />
  <rect class="at-root" x="300" y="24" width="360" height="94" rx="10" />
  <text class="at-rt" x="480" y="54" text-anchor="middle">Round tx: on-chain · 100k sats</text>
  <text class="at-rs" x="480" y="76" text-anchor="middle">one shared output, liquidity fronted by the server</text>
  <text class="at-rs" x="480" y="94" text-anchor="middle">n-of-n: all users in this round + server</text>
  <text class="at-sweep" x="480" y="140" text-anchor="middle">⏳ expires after ~30 days · then the server can sweep it · refresh before that</text>
  <rect class="at-branch" x="320" y="200" width="320" height="70" rx="10" />
  <text class="at-bt" x="480" y="228" text-anchor="middle">pre-signed tree of branch txs</text>
  <text class="at-bs" x="480" y="250" text-anchor="middle">signed by everyone before the round tx broadcasts</text>
  <rect class="at-note" x="40" y="185" width="240" height="112" rx="8" />
  <text class="at-nt" x="52" y="209" text-anchor="start">💰 Why front liquidity?</text>
  <text class="at-ns" x="52" y="231" text-anchor="start">Users swap old VTXOs for new ones.</text>
  <text class="at-ns" x="52" y="248" text-anchor="start">The server must fund the new round</text>
  <text class="at-ns" x="52" y="265" text-anchor="start">tx now, but only collects the old</text>
  <text class="at-ns" x="52" y="282" text-anchor="start">round's coins later.</text>
  <rect class="at-note" x="680" y="185" width="240" height="112" rx="8" />
  <text class="at-nt" x="692" y="209" text-anchor="start">⏳ Why expiry?</text>
  <text class="at-ns" x="692" y="231" text-anchor="start">Expiry is when the server sweeps</text>
  <text class="at-ns" x="692" y="248" text-anchor="start">the old round and gets its capital</text>
  <text class="at-ns" x="692" y="265" text-anchor="start">back. Without it, every round locks</text>
  <text class="at-ns" x="692" y="282" text-anchor="start">the server's money forever.</text>
  <circle class="at-leaf" cx="160" cy="350" r="32" />
  <text class="at-lt" x="160" y="346" text-anchor="middle">Alice</text>
  <text class="at-ls" x="160" y="362" text-anchor="middle">25k VTXO</text>
  <circle class="at-leaf" cx="360" cy="350" r="32" />
  <text class="at-lt" x="360" y="346" text-anchor="middle">Bob</text>
  <text class="at-ls" x="360" y="362" text-anchor="middle">15k VTXO</text>
  <circle class="at-leaf" cx="610" cy="350" r="32" />
  <text class="at-lt" x="610" y="346" text-anchor="middle">Carol</text>
  <text class="at-ls" x="610" y="362" text-anchor="middle">20k VTXO</text>
  <circle class="at-leaf" cx="790" cy="350" r="32" />
  <text class="at-lt" x="790" y="346" text-anchor="middle">Dave</text>
  <text class="at-ls" x="790" y="362" text-anchor="middle">40k VTXO</text>
  <circle class="at-leaf oor" cx="95" cy="460" r="28" />
  <text class="at-lt" x="95" y="456" text-anchor="middle">Erin</text>
  <text class="at-ls" x="95" y="472" text-anchor="middle">10k</text>
  <circle class="at-leaf oor" cx="235" cy="460" r="28" />
  <text class="at-lt" x="235" y="456" text-anchor="middle">Alice</text>
  <text class="at-ls" x="235" y="472" text-anchor="middle">15k change</text>
  <text class="at-ols" x="165" y="510" text-anchor="middle">out-of-round spend: instant, off-chain</text>
  <rect class="at-note" x="480" y="420" width="450" height="88" rx="8" />
  <text class="at-nt" x="492" y="444" text-anchor="start">🔁 This layer behaves like a statechain</text>
  <text class="at-ns" x="492" y="466" text-anchor="start">The server co-signs the handover and promises not to sign a conflict.</text>
  <text class="at-ns" x="492" y="483" text-anchor="start">Until Erin refreshes into a round, she trusts server + sender</text>
  <text class="at-ns" x="492" y="500" text-anchor="start">not to collude, just like statechain key deletion.</text>
  <text class="at-annot" x="480" y="532" text-anchor="middle">same virtual-tree trick as Spark, but: the anchor expires, and the whole tree is signed by everyone up front</text>
</svg>

<style>
.at-svg { display: block; width: 100%; max-width: 720px; height: auto; margin: 0 auto; font-family: 'Geist', -apple-system, sans-serif; }
.at-svg .at-line { stroke: rgba(194,232,33,0.5); stroke-width: 1.5; }
.at-svg .at-divider { stroke: rgba(255,255,255,0.25); stroke-width: 1; stroke-dasharray: 4 4; }
.at-svg .at-dt { fill: rgba(255,255,255,0.5); font-size: 11px; font-style: italic; }
.at-svg .at-root { fill: rgba(194,232,33,0.15); stroke: #c2e821; stroke-width: 3; }
.at-svg .at-rt { fill: #c2e821; font-size: 19px; font-weight: 700; }
.at-svg .at-rs { fill: rgba(255,255,255,0.75); font-size: 12px; }
.at-svg .at-sweep { fill: #f7931a; font-size: 13px; font-weight: 600; }
.at-svg .at-branch { fill: #fff; stroke: #C0C0C0; stroke-width: 1.5; stroke-dasharray: 6 4; }
.at-svg .at-note { fill: rgba(247,147,26,0.08); stroke: rgba(247,147,26,0.5); stroke-width: 1; }
.at-svg .at-nt { fill: #f7931a; font-size: 13px; font-weight: 700; }
.at-svg .at-ns { fill: rgba(255,255,255,0.7); font-size: 11px; }
.at-svg .at-bt { fill: #000; font-size: 15px; font-weight: 700; }
.at-svg .at-bs { fill: #737373; font-size: 11px; }
.at-svg .at-leaf { fill: #fff; stroke: #C0C0C0; stroke-width: 1.5; stroke-dasharray: 6 4; }
.at-svg .at-leaf.oor { stroke: #f7931a; }
.at-svg .at-oline { stroke: #f7931a; stroke-width: 1.5; stroke-dasharray: 5 4; }
.at-svg .at-ols { fill: rgba(247,147,26,0.8); font-size: 11px; font-style: italic; }
.at-svg .at-lt { fill: #000; font-size: 13px; font-weight: 700; }
.at-svg .at-ls { fill: #737373; font-size: 10px; }
.at-svg .at-annot { fill: rgba(255,255,255,0.6); font-size: 12px; font-style: italic; }
</style>

<!--
Deliberately the same layout as the Spark tree slide two chapters
earlier, so the audience can diff them visually. Three differences to
say out loud: (1) the root is the SERVER's money, not the depositor's,
which is why it must expire and be swept back; (2) the tree is fully
signed up front by every participant in the round, n-of-n, which is
the interactivity cost covenants would remove; (3) leaves are VTXOs
that must refresh into a new round before expiry or the sweep eats
them.

Q&A ammo, "why can't users provide the liquidity on-chain?": boarding
IS user-funded (round tx spends the user's own coins). The fronting is
only for refreshes: the refresher's value is locked in the OLD round's
shared output, spendable only n-of-n by everyone in that round
(unobtainable: offline users, people who exited) or via the server's
timelocked sweep. So the user forfeits the old claim to the server
(user+server sigs only) and the server pays fresh value now, recovering
the swept old output at expiry. That timing gap is the float, and it's
why refresh is priced like a loan. CTV removes the signing
interactivity, not this capital float.
-->

---

[//]: # (Slide: Bark implementation)

# Bark: Ark on mainnet

- **Second** (Steven, Erik, Neil, ex-Blockstream).
- First public Ark mainnet: **June 2026**.
- No covenants needed: each round's tree is **signed interactively** by all participants; be online or **delegate** your
  refresh.
- Rounds roughly **hourly**, VTXO lifetime **~30 days** (both server-configurable); quad trees instead of binary trees,
  keep exits shallow.
- Payments = **arkoor** (*"Ark out-of-round"*): instant, server co-signs, statechain-flavored until refreshed.
- In production: Arkee, Bark, Noah

<!--
Terminology note: the docs dropped the old "clArk / covenantless Ark"
branding; it's just the Ark protocol, implemented by bark (client) and
captaind (server). The arkoor line is the "Bark = Ark + statechain"
claim from the family tree slide, paid off. Wallet restore needs
mnemonic AND a backup of the wallet's data directory.
-->

---

[//]: # (Slide: Bark: expiry, arkoor, the honest costs)

# Bark: the fine print

<div class="grid grid-cols-2 gap-6 pt-4">

<div class="p-4 rounded bg-white/5 border-l-4 border-[#c2e821]/60">

**The good**

- Board/refresh VTXOs are **trustless**: real unilateral exit, pure Bitcoin txs.
- Instant **arkoor** payments; offline receive.
- Lightning both ways via server as gateway (HTLC-on-VTXO), no channels.
- Open protocol, **self-hostable server** (`captaind`), Rust, full SDK.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#ef4444]/60">

**The catch**

- VTXOs **expire (~30 days)**: Liquidity cost each refresh (~0.07%).
- Refresh needs **online during a round** (can be delegated).
- **Arkoor** payments: receiver trusts *sender + server don't collude*.
- Server is also the **only Lightning/swap provider**: every LN payment routes through it; LN receive trusts a server
  key deletion.

</div>

</div>

<div class="pt-4 p-3 border-l-4 border-[#f7931a] bg-[#f7931a]/10 text-sm">

Focused on fast and easy payments.

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

[//]: # (Breather 06: Arkade)

<div class="text-sm opacity-50 tracking-[0.3em] mb-8">CHAPTER 06 / 07</div>

# Arkade

<div class="text-lg opacity-70 mt-4 font-normal">
Ark + a programmable execution layer
</div>

---
layout: two-cols
layoutClass: gap-8
---

[//]: # (Slide: Arkade: how it works)

# Arkade: Ark + Statechain + extended Scripts

- Built by **Ark Labs**. Mainnet quietly since **Aug 2025** (Baltic Honeybadger), public beta **Oct 2025**.
- Same Ark base as Bark: **VTXOs** in batch outputs, commitment txs, forfeits, expiry + renewal, unilateral exit.
- On top: a **Virtual Mempool**: a DAG of chained off-chain txs. Operator co-sign = *preconfirmation*, instantly
  spendable.
- **Checkpoint txs** + forfeits protect the operator; **intent delegation** renews your VTXOs while you're offline.
- **Arkade Script**: Bitcoin Script + introspection opcodes → **covenants**: vaults, swaps, channels.
- **Arkade Assets**: issued assets living on VTXOs; **USDT** coming (Tether-backed).

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

[//]: # (Slide: Arkade: the fine print)

# Arkade: the fine print

<div class="grid grid-cols-2 gap-6 pt-4">

<div class="p-4 rounded bg-white/5 border-l-4 border-[#c2e821]/60">

**The good**

- Everything Ark gives: instant preconfirmed payments, offline receive, unilateral exit.
- **Covenants today**: Arkade Script sees the spending tx; vaults, non-interactive swaps, channels *inside* VTXOs.
- **Assets on VTXOs**, same exit guarantees; USDT coming.
- Lightning via **independent swap providers**: Satora, Boltz.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#ef4444]/60">

**The catch**

- **Single operator** (Ark Labs); preconfirmations trust it not to co-sign a conflict.
- Covenants are **not L1-enforced**: they run in a **TEE co-signer** (the Emulator, attested)
- Same Ark **expiry + renewal** burden (delegation helps).

</div>

</div>

<div class="pt-4 p-3 border-l-4 border-[#f7931a] bg-[#f7931a]/10 text-sm">

Focused on builders: a programmable execution layer on Bitcoin.

</div>

<!--
This is the same Introspector/emulator story from my Prague and Byron
talks: a co-signer that only signs if the committed script evaluates
true. Arkade Script = Bitcoin Script + Elements-style introspection
opcodes (OP_INSPECTOUTPUTVALUE, OP_INSPECTINPUTSCRIPTPUBKEY, ...).
Contract catalog in the docs: escrow, HTLC, Spilman + Dryja-Poon
channels, chain swaps, non-interactive swaps (Banco). If a TEE-skeptic
asks: yes, SGX-style attestation is the trust anchor; exit path never
depends on it.
-->

---
layout: center
class: text-center
---

[//]: # (Breather 07: Head to head)

<div class="text-sm opacity-50 tracking-[0.3em] mb-8">CHAPTER 07 / 07</div>

# Head to Head

---

[//]: # (Slide: the big table)

# The scorecard

<div class="compare-table text-xs pt-2">

|                     | **Spark**                                                 | **Bark**                                                     | **Arkade**                                                     |
|---------------------|-----------------------------------------------------------|--------------------------------------------------------------|----------------------------------------------------------------|
| **Design**          | Statechains, key handover                                 | Ark, pre-signed trees, no covenants                          | Ark + virtual mempool + scripts                                |
| **Operator**        | Federation: Lightspark, Flashnet, Breez                   | Single server, **self-hostable**                             | Single operator (Ark Labs) + TEE signer                        |
| **You trust…**      | threshold *deleted* old key shares (unverifiable)         | trustless once refreshed; arkoor: sender+server no-collusion | trustless once refreshed; sender+server no-collusion |
| **Expiry**          | none, leaves live forever                                 | **~30 days**, refresh in rounds                              | batch expiry, renew via batch swap / delegation                |
| **Unilateral exit** | pre-signed chain, decrementing timelocks; beta, ≳16k sats | unroll tree, ~144-block CSV                                  | unroll tree + chain, 1008-block CSV                            |
| **Offline receive** | ✅ fully                                                   | ✅ arkoor (trust until refresh)                               | ✅ preconfirmed                                                 |
| **Lightning**       | via SSPs, 0.25%                                           | server is the LN gateway                                     | Satora, Boltz swaps, virtual HTLCs                             |
| **Assets**          | BTKN: **USDT + USDB live**                                | none                                                         | Arkade Assets, USDT planned                                    |
| **Programmability** | none                                                      | Bitcoin Script only                                          | **introspection covenants**                                    |
| **Mainnet**         | beta since Apr 2025 · WoS, Theya, Blitz                   | since Jun 2026 · Noah, Arkee, BTCPay                         | Aug 2025 / beta Oct 2025 · Satora, Boltz, Bull Bitcoin         |

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

If the federation behaves, you get the best payments experience on Bitcoin: free, instant, offline, with real
stablecoins. The cost: finality you can't prove.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#c2e821]/60">

**Bark bets on Bitcoin**

Pure pre-signed transactions, real exits, self-hostable, and a roadmap that gets *better* if CTV/CSFS activate. The
cost: expiry, rounds, liveness.

</div>

<div class="p-4 rounded bg-white/5 border-l-4 border-[#f7931a]/60">

**Arkade bets on builders**

Covenants and assets today via an emulated script layer. If you want to *build* (swaps, vaults, channels), this is the
sandbox. The cost: operator + TEE trust.

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
