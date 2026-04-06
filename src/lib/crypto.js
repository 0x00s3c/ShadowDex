import * as nacl from "tweetnacl";
import { decodeUTF8, encodeUTF8, encodeBase64, decodeBase64 } from "tweetnacl-util";

/**
 * Satoshi encrypts a message for Elon.
 * @param {Uint8Array} ElonPubKey - Elon's actual Public Key (32 bytes)
 * @param {Uint8Array} SatoshiSecretKey - Satoshi's Private Key
 * @param {string} message - Plaintext message
 */
export const encryptForHandshake = (ElonPubKey, SatoshiSecretKey, message) => {
    // Generate a one-time ephemeral keypair for this specific send
    const ephemeralKeypair = nacl.box.keyPair();
    const nonce = nacl.randomBytes(nacl.box.nonceLength);

    const encrypted = nacl.box(
        decodeUTF8(message),
        nonce,
        ElonPubKey,
        ephemeralKeypair.secretKey
    );

    return {
        eph: encodeBase64(ephemeralKeypair.publicKey),
        nonce: encodeBase64(nonce),
        ciphertext: encodeBase64(encrypted)
    };
};

/**
 * Elon decrypts Satoshi's message using his private key and her ephemeral public key.
 */
export const decryptFromHandshake = (ElonSecretKey, ephemeralPubKeyBase64, nonceBase64, ciphertextBase64) => {
    try {
        const decrypted = nacl.box.open(
            decodeBase64(ciphertextBase64),
            decodeBase64(nonceBase64),
            decodeBase64(ephemeralPubKeyBase64),
            ElonSecretKey
        );
        return decrypted ? encodeUTF8(decrypted) : null;
    } catch (e) {
        console.error("Decryption error:", e);
        return null;
    }
};