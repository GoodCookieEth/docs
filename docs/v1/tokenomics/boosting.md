---
sidebar_position: 5
---

# Boosting

Boosting is a mechanic in LIT tokenomics where holding [veLIT](./velit) increases the rate at which you receive [oLIT](./olit) rewards from staking in a [gauge](./gauges).

## The Curve model

Curve modifies a liquidity provider's weight in a staking pool using the following formula:
$$
w = \min (l, 0.4l + 0.6L\frac{v}{V})
$$
$w$ is the weight, $l$ is the liquidity provided by the LP, $L$ is the total liquidity in the staking pool, $v$ is the amount of vetokens the LP has, $V$ is the total vetoken supply.

This means that if an LP has no vetokens, their liquidity is multiplied by 0.4x when deciding their weight in the staking pool. When they have enough vetokens (at least $\frac{b}{B}W$), their weight goes from 0.4x to 1x, which translates into $\frac{1}{0.4} = 2.5$x boost.

## The Bunni model

Bunni modifies the Curve model by changing the parameters such that the formula becomes:
$$
w = \min (l, 0.2l + 0.8L\frac{v}{V})
$$
Which translates into increasing the max boost from 2.5x to 5x. This makes holding veLIT more attractive & powerful and increases the veLIT holding rate amongst LPs.

## Why am I receiving max boost in one gauge but not another?

The boost you receive depends not only on your veLIT balance but also on the veLIT balances of everyone else in the gauge you're in. Remember: staking weight is ultimately relative since all the stakers compete for the same pie!

For instance, if you're staking in a gauge where you're the only one who owns veLIT, your boost has a much more significant effect. If everyone else has a lot of veLIT, your veLIT has less effect since everyone else is much more competitive.
