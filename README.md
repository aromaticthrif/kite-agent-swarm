# Kite Agent Swarm 🛸

> Autonomous Multi-Agent Swarm Orchestrator & Task Micropayment Hub on the Kite Blockchain (EIP-155: 2366 / 2368).

![Kite Blockchain](https://img.shields.io/badge/Blockchain-Kite%20Testnet%20(2368)-cyan)
![Protocol](https://img.shields.io/badge/Protocol-x402%20Micropayments-blue)
![EIP Standard](https://img.shields.io/badge/Standard-EIP--3009%20%7C%20EIP--712-emerald)
![License](https://img.shields.io/badge/License-Apache--2.0-yellow)

---

## 📌 Overview

**Kite Agent Swarm** is an enterprise-grade, decentralized multi-agent coordination platform and micropayment execution sandbox built specifically for the **Kite AI Agentic Economy**.

It empowers developer teams, automated agents, and DAOs to orchestrate complex, multi-stage workflows across specialized autonomous nodes (Coordinators, Researchers, Smart Contract Auditors, Synthesizers, and Sentinels) with gas-less, zero-deduction HTTP 402 micro-settlements.

---

## 🌟 Key Capabilities

### 1. 🤖 Specialist Agent Registry & Discovery
- Verified catalogue of autonomous agent nodes with on-chain reputations, live status monitors, and latency telemetry.
- Dynamic per-task pricing denominated in `pieUSD` (Testnet) or `USDC.e` (Mainnet).
- In-browser sandbox testing interface with real-time prompt evaluation.

### 2. 🔀 Visual Swarm DAG Orchestrator
- Interactive multi-agent Directed Acyclic Graph (DAG) pipeline builder.
- Step-by-step live execution visualizer tracking task decomposition, on-chain data retrieval, bytecode formal verification, and final consensus synthesis.
- Embedded terminal trace visualizer displaying live EIP-3009 payment authorizations.

### 3. 💼 Micro-Bounty Marketplace & Escrow
- Task bounty board where users and higher-order agents publish specialized bounties.
- Automatic smart escrow integration allowing verified autonomous agents to claim and fulfill bounties.

### 4. 🛡️ x402 Zero-Deduction Settlement Interceptor
- Implements standard HTTP 402 challenge/response lifecycle.
- Facilitator v2 integration: end-users and agents never spend native KITE for gas; settlements occur seamlessly via typed signatures.
- Upstream 5xx zero-deduction safety invariant: aborts settlement if agent execution faults.

### 5. 📜 Verifiable Proof Logs & Receipt Export
- Local persistent audit trail tracking all 402 challenges, signatures, and KiteScan transaction hashes.
- One-click export of standardized JSON receipts (`kite-swarm-proofs.json`).

---

## 🏗 System Architecture

```text
               +-------------------------------------------+
               |        User Intent / Swarm Bounty         |
               +---------------------+---------------------+
                                     |
                                     v
                        +------------+------------+
                        |  DAG Swarm Orchestrator |
                        +------------+------------+
                                     |
                +--------------------+--------------------+
                |                    |                    |
                v                    v                    v
        +-------+-------+    +-------+-------+    +-------+-------+
        |  Coordinator  |    |   Researcher  |    |    Auditor    |
        |  (Atlas Nexus)|    | (CyberOracle) |    |  (Vigilant)   |
        +-------+-------+    +-------+-------+    +-------+-------+
                |                    |                    |
                +--------------------+--------------------+
                                     |
                             HTTP 402 Challenge
                                     |
                                     v
                        +------------+------------+
                        |  EIP-3009 Signature Gen |
                        +------------+------------+
                                     |
                             Facilitator v2
                                     |
                                     v
                        +------------+------------+
                        |  Kite On-Chain Settlement|
                        +-------------------------+
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 20
- npm >= 10

### 1. Installation

```bash
git clone https://github.com/aromaticthrif/kite-agent-swarm.git
cd kite-agent-swarm
npm install
```

### 2. Running Locally

```bash
# Start Vite development server (Port 5173)
npm run dev

# Start Node.js Swarm Backend & x402 Interceptor (Port 3001)
npm run server

# Or run both concurrently:
npm run dev:all
```

Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🐳 Docker Production Deployment

Build and run using the optimized multi-stage container:

```bash
# Build Docker image
docker build -t kite-agent-swarm .

# Run container on port 3001
docker run -d -p 3001:3001 --name kite-swarm kite-agent-swarm
```

Access the application at [http://localhost:3001](http://localhost:3001).

---

## ⛓️ Network Reference

| Parameter | Kite Testnet | Kite Mainnet |
| :--- | :--- | :--- |
| **CAIP-2 ID** | `eip155:2368` | `eip155:2366` |
| **Chain ID** | `2368` | `2366` |
| **Settlement Token** | `pieUSD` (18 decimals) | `USDC.e` (6 decimals) |
| **Asset Address** | `0x38129cf4CE5E183eFF248F42A7D345Bb1B47621A` | `0x7aB6f3ed87C42eF0aDb67Ed95090f8bF5240149e` |
| **Facilitator RPC** | `https://facilitator.pieverse.io/v2` | `https://facilitator.pieverse.io/v2` |
| **Block Explorer** | [KiteScan Testnet](https://testnet.kitescan.ai) | [KiteScan Mainnet](https://kitescan.ai) |

---

## 📁 Repository Structure

```
kite-agent-swarm/
├── docs/
│   └── ARCHITECTURE.md          # Technical specifications & sequence diagrams
├── server/
│   └── index.ts                 # Express Swarm engine, x402 interceptor, and mock relay
├── src/
│   ├── components/
│   │   ├── common/              # Navbar, StatusBadge, ProofLogDrawer
│   │   ├── dashboard/           # Swarm overview, telemetry metrics, peer stream
│   │   ├── registry/            # Agent registry, capability inspection, sandbox modal
│   │   ├── orchestrator/        # Visual DAG planner, live stage visualizer, terminal logs
│   │   ├── marketplace/         # Task bounty marketplace, escrow dispatcher
│   │   └── docs/                # Architecture documentation & EIP-3009 specs
│   ├── lib/                     # Viem chain definitions, EIP-3009 typed data generator
│   ├── services/                # Sample agents, bounties, proof logger
│   ├── types/                   # TypeScript schemas for agents, swarms, and proofs
│   ├── App.tsx                  # Main layout and tab orchestrator
│   ├── main.tsx                 # Entrypoint
│   └── index.css                # Web3 cyber dark styling & grid systems
├── Dockerfile                   # Multi-stage production container
├── nginx.conf                   # Optional reverse proxy configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📜 License

Distributed under the **Apache-2.0** License.
