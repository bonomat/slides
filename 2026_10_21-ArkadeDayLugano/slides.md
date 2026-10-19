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

## Put the price in a signature.

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

# A swap is only as good as its price

<v-clicks>

Fresh when you ask.

Firm when you sign.

The same for every user.

</v-clicks>

<!--
00:30–01:30 · 60 s

Hook. Make the audience feel the problem before any mechanism.
- Ask the room: "Who has hit 'swap' and got a worse price than they saw?"
- Three properties we want. Reveal one per click; they're the yardstick for the rest of the talk.
- Fresh: reflects the market now. Firm: what you see is what you get. Same for everyone:
  a slow phone shouldn't get worse execution than a bot.

Do not mention Striker mechanics yet.
-->

---

# Arkade already makes swaps non-interactive

<ArkadeStack />

<!--
01:30–02:45 · 75 s

Credit first. This is the foundation; we build on it, not around it.
- Banco: the offer-poster funds a covenant ("pay me X of asset Y"), walks away; anyone
  can fill it. Atomic, no counterparty signature at fill time. Partial fills supported.
- intent-solver + solver-registry: solvers advertise markets and fees in a public,
  forkable list; wallets pick a market and fund an offer.
- For Lightning, on-chain and EVM corridors, Arkade already uses request-for-quote over nostr.

Message: "Everything we did stands on this. Thank you, Ark Labs."

Own the contrast now, it pays off on the Striker slide:
"Non-interactive is the right default. In a minute I'll argue for bringing one round
trip back, for one specific case."
-->

---

# A resting offer is a stale price

<div class="grid grid-cols-[2fr_3fr] gap-8 items-center mt-6">
<div>

The rate is fixed in the covenant.

To change it, the maker has to spend the VTXO.

**So the maker can't really go offline.**

</div>
<StaleChart />
</div>

<!--
02:45–04:00 · 75 s

The first limitation of resting offers for liquidity providers. Keep it neutral:
this is a property of the design, not a flaw in Banco.
- A Banco offer commits the price when it is funded (wantAmount or a fixed ratio).
- Markets move. To reprice, the maker cancels and re-funds: an Arkade transaction each time.
- Banco's cancel leaf is optional and CLTV-locked: maker + Arkade server, only after
  the offer's cancelDelay timestamp. With no cancelDelay there is no cancel path at all;
  the offer can only be filled. (arkade-os/banco src/offer.ts, commit 428ae68.)
  Short timelock = churn; long timelock = stuck with a stale price.
- So a professional maker stays online and watches anyway.

Transition line: "If the maker is online anyway, why not just ask them?"
-->

---

# Every taker rebuilds the order book

<div class="grid grid-cols-[2fr_3fr] gap-8 items-center mt-6">
<div>

<v-clicks>

Scan the Arkade stream for offers.

Track which are still unspent.

Race everyone else to fill the good ones.

</v-clicks>

**Load on the server. Slow clients lose.**

</div>
<ServerLoad />
</div>

<!--
04:00–05:00 · 60 s

The second limitation, on the taker side.
- Resting offers are discovered by reading Arkade transactions, so every client
  maintains its own local view of the book.
- That's repeated work and load on the Arkade server, per client.
- An offer is a single VTXO: the first valid fill wins. A phone on a bad connection
  loses races to a bot sitting next to the server. That breaks "same for every user".
-->

---

# Striker: ask, and get a signed quote

<SwapFlow />

<div v-click="4" class="text-center opacity-80">

Yes, one round trip again. On purpose: the maker is online anyway.

</div>

<!--
05:00–06:30 · 90 s

The core idea. Request/response instead of scanning.
- One request, one fresh answer. No local order book; the client does no scanning.
- The quote is firm: signed by the maker, valid until its expiry.
- Everyone gets the same answer at the same moment: fast or slow client, same price.
- Maker and wallet never talk directly; Striker relays.
- Today it's request/response; streaming quotes over a websocket is a natural next step.

Clicks: 1 ask, 2 signed quote, 3 sign and settle, 4 the "one round trip" line.

Own the contrast with slide 3 (click 4):
- "Banco made swaps non-interactive. We're adding one round trip back, deliberately."
- Why it's worth it: the price is fresh at the moment you ask, nobody scans the stream,
  and the settlement itself is still a single atomic Arkade transaction.
- The interaction is only for pricing, never for custody: if the maker or Striker
  disappears mid-swap, your funds don't move.
-->

---

# Banco puts the price in the script.<br>Striker puts it in a signature.

| | Resting offer | Striker quote |
| --- | --- | --- |
| Change the price | Spend the VTXO | Sign a new quote |
| Price stops being valid | Cancel transaction | Expiry, or epoch bump |
| Maker online | To reprice | To quote |

<!--
06:30–08:00 · 90 s

How it works, one level down. No code, no opcodes.
- The maker deposits liquidity once, into a covenant pool.
- The covenant accepts a fill only with a valid maker signature on the quote,
  before its expiry, paying the maker at that price. Expiry is checked inside the
  covenant against the Emulator's clock (OP_CHECKTIME), not a time the filler chooses.
- The remainder returns to the same pool, so one deposit serves many fills.
- Repricing is free: sign a new quote. Short expiries make old quotes die on their own.
- Emergency stop: bump the pool's epoch, which retires every outstanding quote at once.
  That one does need a cooperative spend with the Arkade server.
- After quoting, the maker can even go offline until the quote expires.

The title is the pitch line. Say it out loud, then pause before the table.
Liquidity stays put; only the price moves.
-->

---

# Nobody has to trust Striker

<v-clicks>

Striker can't take your funds.

Striker can't change the price you signed.

If a swap settles, it settles at the signed price.

</v-clicks>

**Anyone can run a Striker. Anyone can run a maker.**

<!--
08:00–09:00 · 60 s

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

| Role | Who |
| --- | --- |
| Settles | Arkade |
| Prices | Makers |
| Routes | Striker |
| Holds the coins | You |

**No one is both the venue and the counterparty.**

<!--
09:00–09:30 · 30 s

Design property, not a legal claim. Do not say "regulatory advantage" on stage.
- Each role can be run by a different, independent party.
- Striker never holds funds and never takes the other side of a trade.
- Contrast, if useful: FTX was exchange, market maker and custodian in one.
- Today one operator runs Striker, the maker and the Emulator; the separation
  holds structurally, and becomes real as independent parties run each role.

Q&A only, if asked about regulation: regulators already make incumbents separate the
venue from dealing. MiCA Art. 76(5): a platform operator "shall not deal on own account
on the trading platform for crypto-assets they operate". Non-custodial design is the
deciding factor in US money-transmission guidance. Not legal advice; no safe harbour
is guaranteed (CLARITY Act failed cloture 49-50 on 15 Sept 2026, short of the 60 needed).

Transition: "And the split goes one level deeper: inside the maker role itself."
-->

---

# Lend your liquidity, keep custody

<KeySplit />

<div class="mt-8 text-center">

**The market maker prices your coins. They can't take them.**

<span class="text-sm opacity-60">Design direction · Banco can't do this: there the price lives in the script.</span>

</div>

<!--
09:30–10:30 · 60 s

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

Say the hard part before someone asks: a quote key can still sign a terrible price and
fill it itself. That's why the covenant enforces a minimum price and a maximum size per
fill, both set by the owner. Worst case: sold at the floor price until the owner revokes.
Bounded loss, not a stolen pool.

Status, be precise: design direction, not shipped. Today one maker key does everything,
and the payout address is part of the signed quote. The split moves it into the covenant.

Why only signed quotes allow this: with Banco the price is fixed when the offer is funded,
so there is nothing to delegate.

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
10:30–11:30 · 60 s

Demo. Pre-recorded fallback ready; no faucet or setup on stage.
1. Type an amount: the quote appears instantly, with its expiry ticking.
2. Wait for it to refresh: a new quote, new price, no transaction.
3. Swap. Show the result and the receipt.

Say: "That price came from a live feed, was signed by a maker a second ago,
and settled atomically on Arkade."

Demo USD is an 8-decimal test token, not real dollars or USDt.
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
11:30–12:30 · 60 s

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

**Banco** · resting orders, set and forget

**Striker** · firm prices for liquidity that moves

<!--
12:30–13:30 · 60 s

Position explicitly, so nobody leaves thinking it's either/or.
- Banco suits makers who want a fixed price and to walk away, and stream-filled solver flows.
- Striker suits active market makers whose price changes constantly.
- Both settle on the same Arkade covenants and could share discovery:
  a Striker maker could list in the solver registry.
- Same direction Arkade already took for corridors: request-for-quote. We brought it to spot.

What's left on our side: durable order recovery (orders are in memory today),
multiple makers per request, streaming quotes.
-->

---
layout: center
class: text-center
---

# Build on Arkade

*Banco puts the price in the script. Striker puts it in a signature.*

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
13:30–15:00 · 90 s (includes buffer)

Close with one call to action; repeat the takeaway.
- "Banco puts the price in the script. Striker puts it in a signature.
  Both stand on Arkade, and there's room for a lot more on top."
- Ask: market makers, run a maker; wallet builders, integrate quotes;
  contract designers, pick a market from the table and build it.
- QR codes: left is the app, right is the repo. Thank Ark Labs by name.

Stop talking. Go to Q&A.
-->
