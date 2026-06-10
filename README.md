# OpenDeps Stellar

Architecture, standards, and integration patterns for Stellar network usage across the OpenDeps ecosystem.

## Overview

OpenDeps uses the Stellar network for community-driven dependency funding via Quadratic Funding. This repo documents how Stellar is used across all OpenDeps components — from Soroban smart contracts to wallet-based voting.

## Repos

| Repo | Description |
|---|---|
| [gitcoin-allo-contracts](https://github.com/opendeps-network/gitcoin-allo-contracts) | Soroban smart contracts for Quadratic Funding |
| [gitcoin-allo-frontend](https://github.com/opendeps-network/gitcoin-allo-frontend) | Voting dashboard with Freighter wallet |
| [gitcoin-allo-backend](https://github.com/opendeps-network/gitcoin-allo-backend) | API layer for QF voting data |
| [stellar-integration](https://github.com/opendeps-network/stellar-integration) | Shared TypeScript library for Stellar operations |
| [stellar-soroban-utils](https://github.com/opendeps-network/stellar-soroban-utils) | Shared Rust library for Soroban contract utilities |

## Contents

- [Architecture](docs/architecture.md) — System architecture and data flow
- [SEP References](docs/seps.md) — Stellar Ecosystem Proposals used
- [Integration Patterns](docs/integration-patterns.md) — Reusable integration patterns
- [Soroban Contracts](docs/soroban.md) — Soroban contract design patterns
- [Wallet Integration](docs/wallet.md) — Freighter wallet integration guide

## License

Apache-2.0
