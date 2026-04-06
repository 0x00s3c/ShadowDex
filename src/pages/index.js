import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import your custom components
import ChatInterface from '../components/ChatInterface';

// Default styles for the wallet modal
require('@solana/wallet-adapter-react-ui/styles.css');

export default function ShadowDEX() {
    // 1. Set up the Network (Devnet is best for testing)
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // 2. Setup supported wallets
    const wallets = useMemo(
        () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
        []
    );

    // Mock receiver address for the demo (Replace with a real public key)
    const demoReceiver = "6v66D6pU7Z8D9L8n8G8w8z8Y8x8C8v8B8n8M8L8K8J8H";

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div className="min-h-screen bg-black text-white font-sans p-8">
                        
                        {/* Header Section */}
                        <header className="flex justify-between items-center max-w-4xl mx-auto mb-12">
                            <div>
                                <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                                    SHADOWDEX
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">Encrypted Atomic Messaging Protocol</p>
                            </div>
                            <WalletMultiButton className="!bg-purple-700 hover:!bg-purple-600 transition-all" />
                        </header>

                        {/* Main UI */}
                        <main className="max-w-xl mx-auto space-y-8">
                            <div className="bg-gray-900/50 border border-gray-800 p-6 rounded-2xl">
                                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">
                                    Privacy Status: <span className="text-green-500">Active</span>
                                </h2>
                                <ChatInterface receiverAddress={demoReceiver} />
                            </div>

                            <section className="text-xs text-gray-600 border-t border-gray-800 pt-6">
                                <p><strong>Protocol Note:</strong> All messages are encrypted locally using X25519 before being broadcast to the Solana network via the Memo Program. Your private key never leaves your wallet.</p>
                            </section>
                        </main>

                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}