import * as web3 from '@solana/web3.js';
import { getKeypair } from './generate-keypair';

const PING_PROGRAM_ADDRESS = new web3.PublicKey('ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa');
const PING_PROGRAM_DATA_ADDRESS =  new web3.PublicKey('Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod');

const transaction: web3.Transaction = new web3.Transaction();

const pingTransactionInstruction: web3.TransactionInstruction = new web3.TransactionInstruction({
    keys: [
        {
            pubkey: new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS),
            isSigner: false,
            isWritable: true
        }
    ],
    programId: new web3.PublicKey(PING_PROGRAM_ADDRESS)
});

transaction.add(pingTransactionInstruction);

web3.sendAndConfirmTransaction(
    new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed'),
    transaction,
    [getKeypair()]
).then((signature: web3.TransactionSignature) => {
    console.log(signature)
}).catch(console.error)
