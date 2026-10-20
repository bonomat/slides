---
theme: seriph
title: 'Striker: Request-for-quote swaps on Arkade'
info: |
  15 minutes · high-level technical builder pitch
colorSchema: dark
background: '#101612'
transition: slide-left
class: text-center
drawings:
  persist: false
---

# Striker

## Signed, sealed, swapped.

<div class="mt-10">
  <Byline />
</div>

<div class="absolute bottom-8 left-0 right-0 text-center text-sm opacity-50">
Arkade Day · Lugano · 21 October 2026
</div>

<!--
00:00–00:30 · 30 s

Say:
- "I'm going to show you a different way to price swaps on Arkade."
- Name, one line about who you are. Nothing else.

Delivery: don't read the slide. Pause after the title.
-->

---
layout: center
---

<SectionDivider n="01" label="Why" title="A match made on another layer" />

<!--
00:30–00:35 · 5 s

Read the title, smile, move on. Trading on Arkade: buyers and sellers matched on a layer 2.
-->

---
layout: center
---

# A swap is only as good as its price

- Fresh when you ask.
- Firm when you sign.
- The same for every user.

<!--
00:35–01:30 · 55 s

Hook. Make the audience feel the problem before any mechanism.
- Ask the room: "Who has hit 'swap' and got a worse price than they saw?"
- Three properties we want, all on screen at once; they're the yardstick for the rest of the talk.
- Fresh: reflects the market now. Firm: what you see is what you get. Same for everyone:
  a slow phone shouldn't get worse execution than a bot.

Do not mention Striker mechanics yet.
-->

---
layout: center
---

<SectionDivider n="02" label="Today" title="Arkade Intents" />

<!--
01:30–01:35 · 5 s
-->

---

# How you swap on Arkade today

<IntentsFlow />

<!--
01:35–02:45 · 70 s

Credit first. This is the foundation; we build on it, not around it.
- Spot markets (Arkade to Arkade): solvers list a card in the solver registry with
  a price feed, a fee and size limits. Your app picks a market, reads that feed,
  prices the trade, and funds a standing offer. Any solver watching the Arkade stream
  can fill it. Fully non-interactive.
- Atomic: either the fill happens or your coins stay in the offer until you cancel.
- Corridor markets (Lightning, on-chain, EVM) already use request-for-quote over nostr:
  the solver signs the terms, and funding is the acceptance.

Message: "Everything we did stands on this. Thank you, Ark Labs."

Vocabulary: say "Arkade Intents", not Banco. The offer is a Banco standing order.
Source: arkade-os/solver-registry, docs/arkade-discovery-spec.md (v0.3.0).
-->

---
layout: center
---

<SectionDivider n="03" label="The problem" title="Insert coin. Hope for a fill." />

<!--
02:45–02:50 · 5 s

The arcade joke carries the point: today you pay first and hope.
-->

---

# Anyone can list. Nobody has to fill.

<div>

- Solvers advertise markets in an open registry.
- A listing isn't a commitment.
- You can't see the liquidity behind it.
- **You fund first, and find out later.**

</div>

<!--
02:50–03:40 · 50 s

Quality control is hard in an open market. Keep it neutral: open listing is a feature.
- Listing is a pull request with a JSON card. The fee is a soft promise; the registry's
  own words: "a solver whose published fee doesn't fill loses flow".
- Spot offers are "funded blind": "There is no liveness signal in v0 for spot markets".
- If nobody fills, getting out costs "one cancel transaction".

Do not say orders get "stuck": settlement is atomic, and cancel works. The point is
that you commit before anyone commits back.
-->

---

# Your client does the pricing

<div>

- Pick a solver, read its price feed.
- Price the trade yourself.
- Give up a safety cushion, every trade.
- **Slow clients need a bigger cushion.**

</div>

<!--
03:40–04:30 · 50 s

The burden of getting an up-to-date price sits on the user's device.
- Per the solver registry, the client fetches the index, picks a market, reads the
  solver's pinned feed, and prices the trade itself.
- Then it concedes the solver's fee plus a safety cushion (suggested default 50 bps),
  because client and solver read the feed at different moments. In their words, the
  maker "leaves safety_bps on the table every trade".
- Too small a cushion and the offer sits unfilled. A phone on a bad connection reads
  the feed later than a bot next to the server, so it needs a bigger cushion.
  That breaks "the same for every user" from the opening slide.
-->

---

# Solvers trade from a hot wallet

<div>

- To fill, a solver keeps its inventory online.
- Whoever runs the solver controls all of it.
- **One compromised server, one empty wallet.**

</div>

<!--
04:30–05:00 · 30 s

Short. This sets up the key-split slide later; don't solve it here.
- Any automated filler needs its keys online to spend its own coins.
- So liquidity and pricing are the same key, on the most exposed machine.

Transition: "So what if the maker committed first, and the coins weren't in a hot wallet?"
-->

---
layout: center
---

<SectionDivider n="04" label="The solution" title="Player 2 has entered the game" />

<!--
05:00–05:05 · 5 s

Player 2 is the maker: a counterparty who commits before you do.
-->

---

# Definitions

<div class="grid grid-cols-[1fr_0.9fr_1fr] gap-6 items-stretch mt-8">
<div class="maker-card">
<div class="maker-label">Arkade Intents</div>

**You** are the maker.

You post an offer, then wait for a solver.

</div>
<div class="self-center"><BrainKnot /></div>
<div class="maker-card">
<div class="maker-label">Striker</div>

The maker is a **liquidity provider**.

It quotes you a price and commits to it.

</div>
</div>

<div class="mt-8 text-center opacity-80">

Same word, flipped role. The commitment moves from you to the one with the liquidity.

</div>

<style>
.maker-card { border: 1px solid #3f5a48; background: #17221b; border-radius: 10px; padding: 1.2rem 1.3rem; }
.maker-card p { margin: 0.5rem 0; }
.maker-label { font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase; color: #6ee7a0; font-weight: 700; }
</style>

<!--
05:05–05:35 · 30 s

Get a laugh, then the point lands.
- "Quick vocabulary check, because this tied my brain in a knot."
- Arkade Intents, per their solver registry: the user who funds the offer is the maker,
  the solver fills it. That's the order-book convention: whoever rests is the maker.
- Striker uses the request-for-quote convention: the market maker is the one who answers
  with a firm price and the liquidity behind it.

Line: "On Intents, you are the maker: you post and wait. On Striker, the maker quotes
you and commits. That flip is the whole talk."
-->

---

# Striker: ask, and get a signed quote

<SwapFlow />

<div v-click="4" class="text-center opacity-80">

One request. A firm price. Then you fund.

</div>

<!--
05:35–07:00 · 85 s

The core idea. The maker commits before the user does.
- One request, one fresh answer. Striker asks the makers and returns the best quote.
  The client does no shopping and no scanning.
- The quote is firm: signed by the maker against a funded pool, valid until its expiry.
- A signed quote fills itself: once signed, Striker and the Emulator can settle it
  without the maker. The maker can only back out by withdrawing or bumping the epoch,
  both visible on Arkade.
- Everyone gets the same answer at the same moment: fast or slow client, same price.
- Maker and wallet never talk directly; Striker relays.
- The quote names the pool, not one specific coin. Other fills spend the pool coin and
  create a new one; the quote stays valid and Striker orders the fills. The wallet never
  needs to know which coin is current.

Clicks: 1 ask, 2 signed quote, 3 sign and settle, 4 the closing line.
-->

---

# The maker commits first.

<div class="compare">

| | Arkade Intents today | Striker |
| --- | --- | --- |
| Who sets the price | Your client, from a feed | The maker who fills |
| Before you fund | Nobody has committed | A signed quote, backed by a pool |
| Safety cushion | Every trade | None |
| Liquidity | Not visible | Public pool balance |
| Who shops for prices | Your client | Striker |

</div>

<style>
.compare th { font-weight: 700; color: #e5e7eb; }
.compare th:last-child { color: #6ee7a0; }
.compare td:first-child { font-weight: 700; color: #9ca3af; }
.compare td:last-child { color: #6ee7a0; }
</style>

<div class="mt-4 text-sm opacity-70">

Striker makes signed spot request enforceable.

</div>

<!--
07:00–08:30 · 90 s

The title is the pitch line. Say it out loud, then pause before the table.

How it works, one level down. No code, no opcodes.
- The maker deposits liquidity once, into a covenant pool.
- The covenant accepts a fill only with a valid maker signature on the quote,
  before its expiry, paying the maker at that price. Expiry is checked inside the
  covenant against the Emulator's clock (OP_CHECKTIME), not a time the filler chooses.
- The remainder returns to the same pool, so one deposit serves many fills.
  Anyone can follow the pool on Arkade and see its balance.
- Repricing is free: sign a new quote. Short expiries make old quotes die on their own.
- Emergency stop: bump the pool's epoch, which retires every outstanding quote at once.
  That one does need a cooperative spend with the Arkade server.
- After quoting, the maker can even go offline until the quote expires.

The roadmap line, be generous: the registry spec has a dormant "v1: signed live quotes
over nostr" for spot markets, the gap it names is "spot markets, which are funded blind".
A v1 quote is a solver's promise ("an offer funded before expiration ... will be filled").
A Striker quote is backed by a pool and fills itself, without the maker.
-->

---

# Nobody has to trust Striker

<div>

- Striker can't take your funds.
- Striker can't change the price you signed.
- If a swap settles, it settles at the signed price.
- **Anyone can run a Striker. Anyone can run a maker.**

</div>

<!--
08:30–09:30 · 60 s

Trust minimization, Arkade's ethos. Say "trust-minimized", never "trustless".
- The wallet verifies the maker's signature before authorizing anything.
- The wallet's covenant only releases funds if it receives at least the signed amount.
- What remains trusted, say it before someone asks:
  Striker can refuse or delay an order; then the wallet refunds itself.
  A maker can cancel quotes before they are filled, by spending the pool VTXO.
  Refunds and cancellation currently need the Arkade server's cooperation.
- Striker is open source; nothing about it is privileged.
-->

---

# Separate roles, separate parties

<RoleSplit />

<div class="mt-6 text-center">

**No one is both the venue and the counterparty.**

</div>

<!--
09:30–11:00 · 90 s (includes the hidden key-split slide's time)

Design property, not a legal claim. Do not say "regulatory advantage" on stage.
- Each role can be run by a different, independent party.
- Striker never holds funds and never takes the other side of a trade.
- Read it as layers: you, Striker and the maker talk on top; Arkade settles underneath.
- Say, don't show: FTX was venue, market maker and custodian in one.
  When one party holds every role, nobody checks anybody.

Then point at the maker's split. This is the part nobody else can do:
- Coin owner keeps the owner key, cold: withdraws, and revokes every quote at once.
- Market maker gets a quote key: signs quotes, can't move the funds.
- Analogy: an exchange API key with "trade" on and "withdraw" off, but enforced
  by a covenant, not by the exchange's policy.
- It answers the hot-wallet problem: a compromised quoting server can't drain the pool.
- If asked "can't the quote key sign a terrible price?": the covenant enforces a minimum
  price and a maximum size per fill. Worst case is bounded, not a stolen pool.

Q&A only, if asked about regulation: regulators already make incumbents separate the
venue from dealing. MiCA Art. 76(5): a platform operator "shall not deal on own account
on the trading platform for crypto-assets they operate". Non-custodial design is the
deciding factor in US money-transmission guidance. Not legal advice; no safe harbour
is guaranteed (CLARITY Act failed cloture 49-50 on 15 Sept 2026, short of the 60 needed).
-->

---
hide: true
---

# Lend your liquidity, keep custody

<KeySplit />

<div class="mt-8 text-center">

**The market maker prices your coins. They can't take them.**

<span class="text-sm opacity-60">Design direction · The answer to the hot-wallet problem.</span>

</div>

<!--
10:00–11:00 · 60 s

The pitch: you hold the liquidity, a professional prices it. Today that means handing
your coins to a market-making firm. Here you hand over a key that can only sign quotes.
- Owner key, kept cold: withdraws, and bumps the epoch to revoke every quote at once.
- Quote key, given to the market maker: signs quotes. Nothing else.
- The covenant always pays the proceeds back to the owner.

Analogy that lands: an exchange API key with "trade" on and "withdraw" off.
Same idea, but enforced by a covenant, not by the exchange's policy.

Two ways to use it:
- Different parties: a fund or treasury has the BTC, a trading firm has the pricing.
  The owner runs almost nothing; the market maker runs the feeds and the quote signer.
- Same firm, as security: the quoting server is the hot, exposed machine. If it's
  compromised, the attacker gets a key that sells at or above your floor. Not your pool.
  Call back to the hot-wallet problem slide.

Say the hard part before someone asks: a quote key can still sign a terrible price and
fill it itself. That's why the covenant enforces a minimum price and a maximum size per
fill, both set by the owner. Worst case: sold at the floor price until the owner revokes.
Bounded loss, not a stolen pool.

Why Striker makes this possible: at trade time the maker's only job is a signature,
so a signature is all you need to delegate.

Q&A, if asked "so the owner runs nothing?": almost. The pool coin expires like any
Arkade coin and needs refreshing. Either the owner runs a small refresh job, or the
covenant lets anyone refresh it back into the same script.
-->

---
layout: center
---

# Live on Mutinynet

BTC ↔ demo USD

<!--
11:00–12:00 · 60 s

Demo. Pre-recorded fallback ready; no faucet or setup on stage.
1. Type an amount: the quote appears instantly, with its expiry ticking.
2. Wait for it to refresh: a new quote, new price, no transaction.
3. Swap. Show the result and the receipt.

Say: "That price came from a live feed, was signed by a maker a second ago,
and settled atomically on Arkade."

Demo USD is an 8-decimal test token, not real dollars or USDt.
-->

---
layout: center
---

<SectionDivider n="05" label="What's next" title="Level up" />

<!--
12:00–12:05 · 5 s
-->

---

# Signed quotes open up more markets

<div class="grid grid-cols-[3fr_2fr] gap-8 items-center mt-4">
<div>

| Market | What the quote carries |
| --- | --- |
| Binary options | Strike, expiry, payout |
| Prediction markets | Event, odds |
| AMM-style pools | Price from a curve the maker computes |
| Futures | Mark price, margin terms |

</div>
<BinaryOption />
</div>

<!--
12:05–13:00 · 55 s

The ambition. Frame as ideas for anyone building on Arkade, not a Striker roadmap.
- Anything where the price moves faster than you want to move coins fits signed quotes
  over covenant-held collateral.
- Lead with one: a fully collateralized binary option paid in sats.
  Both sides' collateral locked at entry; resolved by a price attestation.
- Be honest about the hard parts: each needs its own collateral rules and,
  for outcomes, an oracle. Futures (margin, liquidation) are the hardest.

Chart: point at the strike line and the expiry line. Price above strike at expiry pays out.
-->

---

# Complements, not replaces

<div>

**Arkade Intents** · the open market: any route, any solver

**Striker** · committed liquidity and firm prices for swaps on Arkade

</div>

<!--
13:00–14:00 · 60 s

Position explicitly, so nobody leaves thinking it's either/or.
- Intents is the open market: corridors to Lightning, on-chain and EVM, and anyone can be a solver.
- Striker suits active market makers who want to commit to a price without moving coins.
- Both settle on the same Arkade covenants. Ideas, not promises: a Striker maker could
  list in the solver registry, and a Striker could answer Intents' request-for-quote path.
-->

---
layout: center
class: text-center
---

# Build on Arkade

*The maker commits first. The price lives in a signature.*

Run a maker · Run a Striker · Build the next market

<div class="flex justify-center gap-16 mt-6">
  <a href="https://striker.mutinynet.subms.dev/" class="flex flex-col items-center gap-2 !border-none">
    <img src="/qr-app.svg" class="w-36 h-36 rounded-lg" />
    <span class="text-sm opacity-80">striker.mutinynet.subms.dev</span>
  </a>
  <a href="https://github.com/bonomat/striker" class="flex flex-col items-center gap-2 !border-none">
    <img src="/qr-repo.svg" class="w-36 h-36 rounded-lg" />
    <span class="text-sm opacity-80">github.com/bonomat/striker</span>
  </a>
</div>

<div class="mt-8">
  <Byline handles />
</div>

<!--
14:00–15:00 · 60 s (includes buffer)

Close with one call to action; repeat the takeaway.
- "With Striker, the maker commits first, and the price lives in a signature.
  It all stands on Arkade, and there's room for a lot more on top."
- Ask: market makers, run a maker; wallet builders, integrate quotes;
  contract designers, pick a market from the table and build it.
- QR codes: left is the app, right is the repo. Thank Ark Labs by name.

Stop talking. Go to Q&A.
-->
