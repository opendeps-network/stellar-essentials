# Freighter Wallet Integration

Guide for wallet-based authentication and transaction signing across OpenDeps.

## Connection Flow

```typescript
import { isConnected, getPublicKey, signTransaction } from '@stellar/freighter-api';

// 1. Check if Freighter is installed
const connected = await isConnected();
if (!connected) {
  // Prompt user to install Freighter
  window.open('https://freighter.app', '_blank');
  return;
}

// 2. Request public key (triggers permissions popup)
const publicKey = await getPublicKey();

// 3. Get challenge from backend
const { transaction } = await fetch('/api/auth/challenge', {
  method: 'POST',
  body: JSON.stringify({ publicKey }),
}).then(r => r.json());

// 4. Sign with Freighter
const signedXdr = await signTransaction(transaction, {
  networkPassphrase: 'Test SDF Network ; September 2015',
});

// 5. Submit signed challenge to backend
const { token } = await fetch('/api/auth/verify', {
  method: 'POST',
  body: JSON.stringify({ signedXdr }),
}).then(r => r.json());
```

## Network Detection

```typescript
import { getNetworkDetails } from '@stellar/freighter-api';

async function checkNetwork(): Promise<string> {
  const details = await getNetworkDetails();
  return details.network; // 'PUBLIC' | 'TESTNET' | 'FUTURENET'
}
```

## Transaction Signing for Contract Calls

```typescript
async function signContractCall(unsignedXdr: string): Promise<string> {
  return signTransaction(unsignedXdr, {
    networkPassphrase: NETWORK_PASSPHRASES[network],
  });
}
```

## Error Scenarios

| Error | Cause | Handling |
|---|---|---|
| `isConnected()` returns false | Freighter not installed | Show install prompt |
| `getPublicKey()` rejected | User denied permissions | Show retry button |
| `signTransaction()` fails | User rejected signature | Show cancellation message |
| Network mismatch | Freighter on wrong network | Prompt network switch |

## References

- [Freighter API Docs](https://docs.freighter.app)
- [@stellar/freighter-api](https://www.npmjs.com/package/@stellar/freighter-api)
