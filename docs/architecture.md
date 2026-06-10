# Architecture

## System Overview

OpenDeps uses Stellar as the settlement and governance layer for community-driven dependency funding. The system combines Soroban smart contracts, Horizon APIs, and Freighter wallet authentication.

## Component Diagram

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (User)                        │
│  ┌─────────────────────────────────────────────────┐   │
│  │  gitcoin-allo-frontend                          │   │
│  │  • Freighter Wallet (auth & sign)               │   │
│  │  • QF voting UI                                 │   │
│  │  • Matching pool visualization                  │   │
│  └──────────────┬──────────────────────────────────┘   │
└─────────────────┼──────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────┐
│                gitcoin-allo-backend                      │
│  • REST API                                              │
│  • Soroban contract interaction                          │
│  • Horizon data queries                                  │
└──────────────┬──────────────────────────┬────────────────┘
               │                          │
               ▼                          ▼
┌──────────────────────┐    ┌────────────────────────────┐
│   Stellar Network    │    │     Stellar Horizon         │
│  • Soroban Contracts │    │  • Account data             │
│  • QF math engine    │    │  • Transaction history      │
│  • Matching pool     │    │  • Network info             │
└──────────────────────┘    └────────────────────────────┘
```

## Data Flow

1. User connects Freighter wallet → frontend receives public key
2. Frontend calls backend API with signed challenge (SEP-10)
3. Backend verifies Stellar auth, creates session
4. User votes by contributing tokens to a project
5. Backend submits Soroban contract transaction
6. Contract computes QF distribution on-chain
7. Frontend queries backend for real-time matching results

## Network Topology

- **Mainnet**: Production QF pools with real token matching
- **Testnet**: Development, staging, and community testing
- **Future**: Futurenet for protocol upgrade testing

## Key Design Decisions

- **Soroban for QF math**: On-chain computation ensures transparency
- **Freighter for auth**: SEP-10 enables wallet-based identity
- **Backend as relayer**: Off-chain indexing for performance, on-chain for settlement
