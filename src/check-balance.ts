import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

export interface BalanceResponse {
    lamports: number;
    sol: number;
}
export const getBalance = async (address: PublicKey, net: string): Promise<BalanceResponse> => {
    const connection: Connection = new Connection(net, 'confirmed')
    const balanceInLamports: number = await connection.getBalance(address);
    const balanceInSols: number = balanceInLamports / LAMPORTS_PER_SOL;

    return {
        lamports: balanceInLamports,
        sol: balanceInSols
    }
}
