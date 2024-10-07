import nacl from 'tweetnacl';
import util from 'tweetnacl-util';

let sharedKey: Uint8Array | null = null;

export const generateKeyPair = () => {
  const keyPair = nacl.box.keyPair();
  return {
    publicKey: util.encodeBase64(keyPair.publicKey),
    secretKey: util.encodeBase64(keyPair.secretKey),
  };
};

export const setSharedKey = (theirPublicKey: string, mySecretKey: string) => {
  const publicKeyUint8 = util.decodeBase64(theirPublicKey);
  const secretKeyUint8 = util.decodeBase64(mySecretKey);
  sharedKey = nacl.box.before(publicKeyUint8, secretKeyUint8);
};

export const encryptMessage = (message: string): string => {
  if (!sharedKey) throw new Error('Shared key not set');
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const messageUint8 = util.decodeUTF8(message);
  const encrypted = nacl.box.after(messageUint8, nonce, sharedKey);
  const fullMessage = new Uint8Array(nonce.length + encrypted.length);
  fullMessage.set(nonce);
  fullMessage.set(encrypted, nonce.length);
  return util.encodeBase64(fullMessage);
};

export const decryptMessage = (messageWithNonce: string): string => {
  if (!sharedKey) throw new Error('Shared key not set');
  const messageWithNonceAsUint8Array = util.decodeBase64(messageWithNonce);
  const nonce = messageWithNonceAsUint8Array.slice(0, nacl.box.nonceLength);
  const message = messageWithNonceAsUint8Array.slice(nacl.box.nonceLength);
  const decrypted = nacl.box.open.after(message, nonce, sharedKey);
  if (!decrypted) throw new Error('Could not decrypt message');
  return util.encodeUTF8(decrypted);
};