# 🌌 ShadowDEX: Private Messaging & Atomic Trading

![Solana](https://img.shields.io/badge/Network-Solana-black?style=for-the-badge&logo=solana)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Encryption](https://img.shields.io/badge/Encryption-X25519-blue?style=for-the-badge)

**ShadowDEX** is a decentralized communication layer built on Solana that enables private, end-to-end encrypted messaging and trustless OTC trading. By utilizing an asymmetric "Secret Handshake," it mimics the privacy-first ethos of Monero while maintaining the sub-second finality of the Solana network.

---

## 🚀 The Core Concept

ShadowDEX treats the Solana blockchain as an immutable, encrypted post office.

1.  **The Handshake:** The first message uses a Diffie-Hellman key exchange. You don't send a password; you send an ephemeral public key that allows the receiver to *derive* the password.
2.  **The Vault:** Once the handshake is complete, a local "Session Key" is stored in the receiver's browser/wallet.
3.  **The Trade:** Negotiate terms in complete privacy, then execute an Atomic Swap directly within the chat interface.

---

## 🛠 Features

* **🔒 End-to-End Encryption:** Messages are encrypted using `tweetnacl-js` (X25519) before hitting the mempool.
* **🤝 Monero-Style Handshakes:** Secure key establishment without ever exposing sensitive data on-chain.
* **💸 Chat-to-Swap:** Integrated SPL-token swap functionality triggered by private chat agreements.
* **⚡ High Performance:** Message costs are identical to standard Solana transaction fees (~$0.0001).
* **📱 Wallet-Native:** No account creation. Your Solana wallet (Phantom, Solflare, etc.) is your identity.

---

## 🏗 Technical Stack

* **Runtime:** Solana Program Library (SPL)
* **Messaging:** Solana Memo Program (Program ID: `MemoSq4gqAB&...`)
* **Encryption Library:** [TweetNaCl.js](https://github.com/dchest/tweetnacl-js)
* **Frontend:** Next.js + Tailwind CSS + Solana Wallet Adapter

---

## 📦 Installation & Setup (Dev)

To get a local version of the ShadowDEX client running:

```bash
# Clone the repository
git clone https://github.com/0x00s3c/ShadowDex.git

# Install dependencies
cd shadow-dex
npm install

# Set up environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

---

## 🔐 Cryptographic Flow

The "Secret Handshake" follows this logic:

1.  **Satoshi** generates a one-time keypair.
2.  **Satoshi** uses **Elon's** public key + his private key to create a `sharedSecret`.
3.  **Satoshi** encrypts the message with `sharedSecret` and sends it to Solana along with his *ephemeral public key*.
4.  **Elon** sees the transaction, takes the ephemeral key, combines it with his private key, and reconstructs the `sharedSecret` to read the message.

> **Note:** The "Shared Secret" is never transmitted. It is calculated independently by both parties.

---

## 🗺 Roadmap

- [ ] **Phase 1:** Proof of Concept (On-chain Handshake).
- [ ] **Phase 2:** Encrypted Chat UI with local history caching.
- [ ] **Phase 3:** Atomic Swap integration (Trade escrow).
- [ ] **Phase 4:** ZK-Compression for metadata obfuscation.

---

## ⚖️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 🤝 Contributing

We welcome contributions! If you have ideas for improving the privacy layer or optimizing transaction costs, please open an issue or submit a PR.

---

*Disclaimer: ShadowDEX is an experimental protocol. Always audit code before using it for high-value transactions.*
