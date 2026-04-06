import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { encryptForHandshake } from '../lib/crypto';
import { buildShadowTx } from '../lib/solana';

export default function ChatInterface({ receiverAddress }) {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const sendSecretMessage = async () => {
        if (!publicKey || !msg) return;
        setLoading(true);

        try {
            // NOTE: In a real app, you would use a derived key here, 
            // not the main wallet secret key, for maximum safety.
            const ephemeralKey = nacl.box.keyPair(); 
            
            const payload = encryptForHandshake(
                new PublicKey(receiverAddress).toBytes(),
                ephemeralKey.secretKey, // Mocking the handshake
                msg
            );

            const tx = buildShadowTx(publicKey, payload);
            const signature = await sendTransaction(tx, connection);
            
            alert(`Message Encrypted & Sent! TX: ${signature}`);
            setMsg("");
        } catch (err) {
            alert("Transaction failed: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="shadow-dex-ui p-6 bg-gray-900 rounded-xl text-white">
            <h3 className="text-lg font-mono text-purple-400"> SHADOW_DEX_PROTOCOL</h3>
            <p className="text-xs text-gray-500 mb-4">Target: {receiverAddress}</p>
            
            <textarea 
                className="w-full h-24 p-3 bg-black border border-purple-900 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Write your private trade intent..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
            />

            <button 
                disabled={loading}
                onClick={sendSecretMessage}
                className="mt-4 w-full bg-purple-600 hover:bg-purple-500 py-2 rounded-md font-bold transition-all"
            >
                {loading ? "SEALING MESSAGE..." : "ENCRYPT & SEND"}
            </button>
        </div>
    );
}