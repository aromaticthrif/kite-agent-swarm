import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { INITIAL_AGENTS, INITIAL_BOUNTIES } from '../src/services/sample-agents.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors({
  exposedHeaders: ['PAYMENT-REQUIRED', 'PAYMENT-RESPONSE', 'payment-required', 'payment-response'],
}));
app.use(express.json());

// 1. Health Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    system: 'Kite Agent Swarm Orchestrator Node',
    version: '1.0.0',
    network: 'eip155:2368',
    activeAgents: INITIAL_AGENTS.length,
    timestamp: new Date().toISOString(),
  });
});

// 2. Agents Registry
app.get('/api/agents', (_req: Request, res: Response) => {
  res.json({
    count: INITIAL_AGENTS.length,
    agents: INITIAL_AGENTS,
  });
});

// 3. Bounties Listing
app.get('/api/bounties', (_req: Request, res: Response) => {
  res.json({
    count: INITIAL_BOUNTIES.length,
    bounties: INITIAL_BOUNTIES,
  });
});

// 4. Dispatch Individual Agent with x402 Micropayment Interceptor
app.post('/api/agent/:role', (req: Request, res: Response) => {
  const { role } = req.params;
  const paymentSig = req.headers['payment-signature'];

  const agent = INITIAL_AGENTS.find((a) => a.role === role);
  if (!agent) {
    res.status(404).json({ error: `Agent with role '${role}' not found` });
    return;
  }

  // If no payment signature provided, return HTTP 402 Payment Required
  if (!paymentSig) {
    const cost = agent.capabilities[0]?.costPerInvoke || '0.02';
    const challenge = {
      version: 'x402-v1',
      recipient: agent.walletAddress,
      network: agent.network,
      amount: cost,
      token: 'pieUSD',
      tokenAddress: '0x38129cf4CE5E183eFF248F42A7D345Bb1B47621A',
      nonce: '0x' + Math.random().toString(16).substring(2).padEnd(64, '0'),
      facilitator: 'https://facilitator.pieverse.io/v2',
    };

    const b64Challenge = Buffer.from(JSON.stringify(challenge)).toString('base64');
    res.setHeader('PAYMENT-REQUIRED', b64Challenge);
    res.status(402).json({
      error: 'Payment Required',
      message: `Invoking agent ${agent.name} requires ${cost} pieUSD authorization.`,
      challenge,
    });
    return;
  }

  // Payment Signature Present -> Settle and execute
  const fakeTxHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
  const responseData = {
    agent: agent.name,
    role: agent.role,
    executionTimeMs: agent.latencyMs + Math.floor(Math.random() * 50),
    status: 'success',
    output: `Autonomous computation executed by ${agent.name}. Verified zero-deduction integrity on Kite Blockchain.`,
    settlementTx: fakeTxHash,
  };

  res.setHeader('PAYMENT-RESPONSE', Buffer.from(JSON.stringify({ settled: true, txHash: fakeTxHash })).toString('base64'));
  res.status(200).json(responseData);
});

// 5. Swarm Pipeline Orchestration Engine
app.post('/api/swarm/orchestrate', async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).json({ error: 'Missing prompt in request body' });
    return;
  }

  const pipelineId = 'pipe-' + Date.now();
  const stages = [
    {
      agent: 'Atlas Nexus',
      role: 'coordinator',
      action: 'Task Decomposition & DAG Dependency Structuring',
      cost: '0.02 pieUSD',
    },
    {
      agent: 'CyberOracle Research',
      role: 'researcher',
      action: 'On-chain Data & Liquidity Retrieval',
      cost: '0.04 pieUSD',
    },
    {
      agent: 'Vigilant Guardian',
      role: 'auditor',
      action: 'AST Bytecode & Reentrancy Vulnerability Audit',
      cost: '0.08 pieUSD',
    },
    {
      agent: 'OmniSynthesizer',
      role: 'synthesizer',
      action: 'Cross-Agent Consensus Synthesis & Cryptographic Attestation',
      cost: '0.02 pieUSD',
    },
  ];

  res.json({
    pipelineId,
    prompt,
    stages,
    totalEstimatedCost: '0.16 pieUSD',
    network: 'eip155:2368',
    status: 'planned',
  });
});

app.listen(port, () => {
  console.log(`[Kite Agent Swarm] Orchestrator Node listening at http://localhost:${port}`);
});
