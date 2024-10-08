// setup.ts
import { PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { client } from '../client';

export const programId = new PublicKey('');

export const [challengePDA] = PublicKey.findProgramAddressSync(
    [Buffer.from('')],
    programId,
);
