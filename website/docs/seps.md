---
sidebar_position: 2
title: SEP References
description: Stellar Ecosystem Proposals used across OpenDeps
---

# Stellar Ecosystem Proposals (SEPs)

SEPs used across OpenDeps components.

## SEP-10: Stellar Web Authentication

Used for wallet-based authentication in the frontend and backend.

**Flow:**
1. Backend generates a challenge transaction
2. Frontend signs with Freighter using `signTransaction`
3. Backend verifies the signed challenge and issues a session

**Implementation:**
- `stellar-integration` provides `verifyAuthChallenge()` and `createAuthChallenge()`
- Backend validates on every authenticated API call

## SEP-24: Hosted Deposit and Withdrawal

Planned for fiat on/off ramps to QF matching pools.

**Status:** Not yet implemented

## SEP-38: Anchor RFQ

Used for cross-asset quotes in the QF matching pool.

**Status:** Not yet implemented

## SEP-41: Soroban Smart Contracts

Core SEP defining the Soroban contract interface.

**Used by:**
- `gitcoin-allo-contracts` — Soroban contracts follow SEP-41 spec
- `stellar-integration` — Contract client uses SEP-41 `simulateTransaction` / `sendTransaction`

## SEP-29: Network Passphrase

Standard network identifiers used across all components:

| Network | Passphrase |
|---|---|
| Mainnet | `Public Global Stellar Network ; September 2015` |
| Testnet | `Test SDF Network ; September 2015` |
| Futurenet | `Test SDF Future Network ; October 2022` |

## References

- [SEP-10 Specification](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md)
- [SEP-24 Specification](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0024.md)
- [SEP-38 Specification](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0038.md)
- [SEP-41 Specification](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0041.md)
- [SEP-29 Specification](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0029.md)
