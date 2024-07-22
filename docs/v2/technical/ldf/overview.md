---
title: Overview
description: Overview of all LDFs
hide_table_of_contents: true
sidebar_position: 1
---

# Overview

**Liquidity density functions (LDFs)** are smart contracts that specify how liquidity is distributed across rounded ticks (ricks) and how it changes over time. Each Bunni v2 pool specifies the LDF it will use at deploy time, and cannot be changed later on.

- The two most basic LDFs are `UniformDistribution` and `GeometricDistribution`, describing uniform distributions and geometric distributions over ricks.
- Two `GeometricDistributions` are juxtaposed to create the `DoubleGeometricDistribution`, which is useful for concentrated/bid-ask distributions.
- For volatiles pairs, `CarpetedGeometricDistribution` and `CarpetedDoubleGeometricDistribution` were created that have uniform "carpet" liquidity outside of their main distributions, which ensures the TWAP oracle never gets stuck during volatile market conditions.
- For stable pairs with an asymmetric risk profile (e.g. eETH/ETH), `BuyTheDipGeometricDistribution` optimizes capital efficiency via an asymmetric liquidity distribution and offers protection against depeg events.

Developers should see [`ILiquidityDensityFunction`](./ildf) to learn how to interact with LDF contracts.