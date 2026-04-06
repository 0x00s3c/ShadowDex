const nacl = require('tweetnacl');
const { decodeUTF8, encodeUTF8, encodeBase64, decodeBase64 } = require('tweetnacl-util');

/**
 * SHADOWDEX HANDSHAKE SIMULATION
 */

// 1. Setup Identities (In a real app, these come from Solana Wallets)
const SatoshiWallet = nacl.box.keyPair();
const ElonWallet = nacl.box.keyPair();

const ElonPublicKeyBase64 = encodeBase64(ElonWallet.publicKey);

console.log("--- 🌌 ShadowDEX Handshake Start ---");
console.log("Elon's Public Address:", ElonPublicKeyBase64);

// 2. Satoshi prepares a private message
const secretMessage = "Meet me at the DEX at midnight. Trade 10 SOL.";

// Satoshi generates a one-time (ephemeral) key for THIS message only
const SatoshiEphemeral = nacl.box.keyPair();
const nonce = nacl.randomBytes(nacl.box.nonceLength);

// Satoshi encrypts using: (Message, Nonce, Elon's Public Key, HER Ephemeral Private Key)
const encrypted = nacl.box(
    decodeUTF8(secretMessage),
    nonce,
    ElonWallet.publicKey,
    SatoshiEphemeral.secretKey
);

// This is what actually gets sent to the Solana Blockchain (The Payload)
const solanaPayload = {
    ephemeralKey: encodeBase64(SatoshiEphemeral.publicKey),
    nonce: encodeBase64(nonce),
    ciphertext: encodeBase64(encrypted)
};

console.log("\n--- 📤 On-Chain Data (What the public sees) ---");
console.log(JSON.stringify(solanaPayload, null, 2));

// 3. Elon receives the data from the blockchain and decrypts it
console.log("\n--- 📥 Elon Decrypting... ---");

const decrypted = nacl.box.open(
    decodeBase64(solanaPayload.ciphertext),
    decodeBase64(solanaPayload.nonce),
    decodeBase64(solanaPayload.ephemeralKey),
    ElonWallet.secretKey // Elon uses his Private Key
);

if (decrypted) {
    console.log("✅ Success! Decrypted Message:", encodeUTF8(decrypted));
} else {
    console.log("❌ Decryption failed. Key mismatch.");
}