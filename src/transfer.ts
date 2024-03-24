import { Connection, SystemProgram, PublicKey, clusterApiUrl, Transaction, TransactionInstruction, Keypair, sendAndConfirmTransaction, TransactionSignature, LAMPORTS_PER_SOL } from '@solana/web3.js'

import { getKeypair } from './generate-keypair';

export const transfer = async (toPubKeyString: string, amountInLamports: number): Promise<any> => {
    let toPubkey: PublicKey;
    try {
        toPubkey = new PublicKey(toPubKeyString);
    } catch(err) {
        throw new Error("Invalid recipient address");
    }

    const connection: Connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const fromPubKeypair: Keypair = getKeypair();
    const transaction: Transaction = new Transaction();

    const transferInstruction: TransactionInstruction = SystemProgram.transfer({
        toPubkey,
        fromPubkey: fromPubKeypair.publicKey,
        lamports: amountInLamports
    });
    transaction.add(transferInstruction);

    const signature: TransactionSignature = await sendAndConfirmTransaction(connection, transaction, [fromPubKeypair])

    console.log(`Sent ${amountInLamports / LAMPORTS_PER_SOL} sol to ${toPubkey.toBase58()} with signature: ${signature}`)
}
