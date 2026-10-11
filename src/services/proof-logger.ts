import { X402PaymentProof } from '../types/proof';

const STORAGE_KEY = 'kite_swarm_proof_logs';

export function getStoredProofs(): X402PaymentProof[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProofLog(proof: X402PaymentProof): void {
  try {
    const proofs = getStoredProofs();
    proofs.unshift(proof);
    if (proofs.length > 50) proofs.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(proofs));
    window.dispatchEvent(new Event('proof_logs_updated'));
  } catch (err) {
    console.error('Failed to save proof log', err);
  }
}

export function clearProofLogs(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event('proof_logs_updated'));
  } catch (err) {
    console.error('Failed to clear proofs', err);
  }
}
