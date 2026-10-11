# Kite Agent Swarm REST API Specification

All endpoints are hosted on the Swarm Orchestrator node (`port 3001`).

---

## 1. Health & Heartbeat
- **`GET /api/health`**
  - **Description**: Probes the status of the local orchestrator node and active agent quorum.
  - **Response**:
    ```json
    {
      "status": "online",
      "system": "Kite Agent Swarm Orchestrator Node",
      "version": "1.0.0",
      "network": "eip155:2368",
      "activeAgents": 5,
      "timestamp": "2026-10-12T00:00:00.000Z"
    }
    ```

---

## 2. Agent Registry
- **`GET /api/agents`**
  - **Description**: Returns all registered specialist agents, roles, fees, and wallet addresses.

---

## 3. Invocation & x402 Interceptor
- **`POST /api/agent/:role`**
  - **Headers**:
    - `PAYMENT-SIGNATURE` (Optional on first attempt)
  - **Behavior**:
    - If `PAYMENT-SIGNATURE` is missing -> Responds with `HTTP 402 Payment Required` and `PAYMENT-REQUIRED` header.
    - If valid signature is present -> Executes computation, settles via Facilitator v2, responds with `HTTP 200 OK` and `PAYMENT-RESPONSE` header.

---

## 4. Swarm DAG Orchestrator
- **`POST /api/swarm/orchestrate`**
  - **Body**:
    ```json
    {
      "prompt": "Audit lending pool reentrancy vectors"
    }
    ```
  - **Response**: Planned DAG stages, agent dependencies, and estimated pieUSD cost.
