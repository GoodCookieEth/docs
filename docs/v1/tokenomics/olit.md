---
sidebar_position: 2
---

# oLIT

oLIT is a call option token for LIT that lets its holder purchase LIT at a discount to the market price. Unlike regular options, oLIT does not expire.

Currently the discount is set to 50%, but the value can be changed by governance.

## How to get oLIT

oLIT is given to Bunni liquidity providers as incentive. Provide liquidity on Bunni and stake in [gauges](./gauges) to receive oLIT incentives.

## How to use oLIT

You can use oLIT to buy LIT at a discount. Visit the [oLIT page](https://bunni.pro/options) on the Bunni website to do so.

## Why oLIT?

Instead of using LIT as the reward token, Bunni uses call option tokens for LIT as the reward token. This has the benefit of enabling the protocol to accumulate a large cash reserve regardless of market conditions, as well as letting loyal holders buy LIT at a discount.

It’s best to illustrate this mechanism with an example. Let’s say the price of LIT is \$100, and there is a call option token oLIT that gives its holder a perpetual right to buy LIT at 90% of the market price. The protocol issues 1 oLIT to a farmer Alice, who immediately exercises the option to buy 1 LIT for \$90 and sell it on a DEX for \$100. The tally of gains & losses are as follows:

- The protocol: -1 LIT, +$90
- The farmer Alice: +$10
- The DEX LPs: +1 LIT, -$100

Compare this to regular liquidity mining where the farmer doesn't pay anything to the protocol:

- The protocol: -1 LIT
- The farmer Alice: +$100
- The DEX LPs: +1 LIT, -$100

We have the following observations:

- **Reallocation of cash**: Using oLIT instead of LIT as the reward token effectively transfers cash gains from the farmers to the protocol, and the LPs for the token are not affected.
- **Trading off incentivization efficiency for protocol cashflow**: In our example, for each LIT token issued by the protocol, the farmer Alice only gets \$10 of rewards instead of \$100 in the case of regular liquidity mining, which is less efficient. The higher the discount is, the more efficient the incentivization is, but the less cash the protocol gets.
- **Effectively a continuous token sale**: Instead of giving away tokens for free in regular liquidity mining, we effectively turn incentivization into a continuous token sale at the current market price, which enables the protocol to potentially capture a lot more cash compared to a one-off token sale since the protocol would be selling tokens at a higher price when the market price goes up.

Furthermore, when option reward tokens are used in [FOO](https://blog.timelessfi.com/posts/foo/) where the farmers are the same people as the token LPs, the tally becomes:

- The protocol: -1 LIT, +$90
- The farmer-LP: +1 LIT, -$90

which means that as the farmers receive oLIT rewards, they get the right to buy tokens from the protocol at a discount and increase their ownership. Over time, the protocol ownership will be transferred away from holders who aren’t providing liquidity and to the farmers who are providing liquidity, which optimizes the protocol ownership.

The tally also stays the same regardless of whether the farmer dumps the LIT gained from excercising the option on the market, since the farmer and the LP are one and the same. Because of this, we can assume that a lot of the farmers will not sell the LIT but lock it into vetoken and improve their yield.

## Links

- [Source code](https://github.com/timeless-fi/options-token)
- [Etherscan](https://etherscan.io/token/0x627fee87d0d9d2c55098a06ac805db8f98b158aa)