---
sidebar_position: 3
title: Integration Patterns
description: Reusable integration patterns for Stellar across OpenDeps
---

# Integration Patterns

Reusable patterns for Stellar integration across OpenDeps.

## Pattern 1: Wallet Authentication (SEP-10)

```
Frontend                          Backend                     Stellar
   │                                │                           │
   │  POST /api/auth/challenge      │                           │
   │──────────────────────────────▶ │                           │
   │                                │  Create challenge tx      │
   │  { transaction: xdr }         │                           │
   │◀──────────────────────────────│                           │
   │                                │                           │
   │  signTransaction(xdr)          │                           │
   │  (Freighter)                   │                           │
   │                                │                           │
   │  POST /api/auth/verify         │                           │
   │  { signed_xdr }               │                           │
   │──────────────────────────────▶ │                           │
   │                                │  Verify against Horizon   │
   │                                │──────────────────────────▶│
   │                                │◀──────────────────────────│
   │  { token: "jwt..." }          │                           │
   │◀──────────────────────────────│                           │
```

## Pattern 2: Contract Interaction via Backend

```
Frontend                     Backend                     Soroban Contract
   │                           │                              │
   │ POST /api/voting/         │                              │
   │ contribute(project, amt) │                              │
   │─────────────────────────▶│                              │
   │                           │  buildContractTransaction()  │
   │                           │  simulateTransaction()      │
   │                           │────────────────────────────▶│
   │                           │◀────────────────────────────│
   │  { sim, minResourceFee } │                              │
   │◀─────────────────────────│                              │
   │                           │                              │
   │ signTransaction(sim)      │                              │
   │ (Freighter)               │                              │
   │                           │                              │
   │ POST /api/voting/         │                              │
   │ contribute/confirm        │                              │
   │ { signed_xdr }           │                              │
   │─────────────────────────▶│                              │
   │                           │  sendTransaction()           │
   │                           │────────────────────────────▶│
   │                           │◀────────────────────────────│
   │  { tx_hash, status }     │                              │
   │◀─────────────────────────│                              │
```

## Pattern 3: Contract Address Resolution

All Soroban contract addresses are stored as environment variables:

```
# .env (backend)
STELLAR_NETWORK=testnet
HORIZON_URL=https://horizon-testnet.stellar.org
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
CONTRACT_ID=CCY6Q... (contract deploy address)
```

## Pattern 4: Error Handling

All Stellar errors are normalized into a standard shape:

```typescript
interface StellarError {
  code: 'TIMEOUT' | 'INSUFFICIENT_FEE' | 'CONTRACT_ERROR' | 'AUTH_FAILED' | 'NETWORK';
  message: string;
  original?: Error;
}
```

## Pattern 5: Network Switching

Components detect network from environment and validate Freighter is on the correct network:

```typescript
async function ensureNetwork(): Promise<void> {
  const network = await getNetworkDetails();
  if (network.network !== expectedNetwork) {
    throw new StellarError({
      code: 'NETWORK',
      message: `Expected ${expectedNetwork}, got ${network.network}`
    });
  }
}
```
