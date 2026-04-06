import { Transaction, TransactionInstruction, PublicKey } from "@solana/web3.js";

const MEMO_PROGRAM_ID = new PublicKey("MemoSq4gqABmAn9kSuhJs3u5q6itnmgW9Y9Bv8H752u");

export const buildShadowTx = (senderPubKey, payload) => {
    // Convert our crypto object to a JSON string for the blockchain
    const memoString = JSON.stringify(payload);

    const instruction = new TransactionInstruction({
        keys: [{ pubkey: senderPubKey, isSigner: true, isWritable: false }],
        programId: MEMO_PROGRAM_ID,
        data: Buffer.from(memoString, "utf-8"),
    });

    return new Transaction().add(instruction);
};