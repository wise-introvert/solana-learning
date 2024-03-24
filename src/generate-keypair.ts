import 'dotenv/config'
import { Keypair } from '@solana/web3.js';
import { getKeypairFromEnvironment } from '@solana-developers/helpers';

export const generateKeypair = (): Keypair => Keypair.generate();

export const getKeypair = (): Keypair => getKeypairFromEnvironment('SECRET_KEY');
