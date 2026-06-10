---
sidebar_position: 4
title: Soroban Contracts
description: Soroban smart contract design patterns for OpenDeps
---

# Soroban Contract Design Patterns

Design patterns used across OpenDeps Soroban contracts.

## Contract Structure

Every contract follows this module layout:

```
src/
├── lib.rs          — Entry point, #[contractimpl] impl block
├── storage.rs      — Data persistence (persistent/temporary)
├── math.rs         — Fixed-point math (QF calculations)
├── errors.rs       — ContractError enum
└── test/
    └── mod.rs      — Integration tests
```

## Pattern: Admin-Guarded Initialization

Contracts are initialized with an admin address that controls admin-only functions.

```rust
fn initialize(env: Env, admin: Address) {
    let admin_key = DataKey::Admin;
    env.storage().instance().set(&admin_key, &admin);
}

fn require_admin(env: &Env) -> Address {
    let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
    admin.require_auth();
    admin
}
```

## Pattern: Persistent Project Storage

Projects are stored using the persistent storage interface with a typed key.

```rust
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Project {
    pub id: u64,
    pub owner: Address,
    pub name: String,
    pub description: String,
    pub total_contributions: i128,
}

pub fn store_project(env: &Env, project: &Project) {
    let key = DataKey::Project(project.id);
    env.storage().persistent().set(&key, project);
}

pub fn get_project(env: &Env, id: u64) -> Option<Project> {
    let key = DataKey::Project(id);
    env.storage().persistent().get(&key)
}
```

## Pattern: Fixed-Point QF Math

Quadratic Funding calculations use 7-decimal fixed-point arithmetic to avoid floating point.

```rust
pub fn sqrt(value: i128) -> i128 {
    if value == 0 { return 0; }
    let mut z = (value + 1) / 2;
    let mut y = value;
    while z < y {
        y = z;
        z = (value / z + z) / 2;
    }
    y
}
```

## Pattern: Event Emission

Contract events are emitted for off-chain indexing.

```rust
env.events().publish(
    (Symbol::new(&env, "contribute"),),
    (donor.clone(), project_id, amount),
);
```

## Testing Pattern

Tests use the Soroban SDK testutils with `Env::default()` and mock auth.

```rust
#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::Address as _, Env};

    #[test]
    fn test_initialize() {
        let env = Env::default();
        let contract_id = env.register_contract(None, HelloContract);
        let client = HelloContractClient::new(&env, &contract_id);
        // ... test logic
    }
}
```
