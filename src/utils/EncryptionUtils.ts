import crypto from 'crypto';

const SECRET = process.env.ED_SECRET as string || '';
const ENCRYPTION_KEY = Buffer.from(SECRET, 'hex'); // 16, 24, or 32 bytes
const IV_LENGTH = 16; // 16 bytes for AES

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + encrypted;
}

export function decrypt(encryptedText: string): string {
  const iv = Buffer.from(encryptedText.slice(0, IV_LENGTH * 2), 'hex');
  const encryptedData = encryptedText.slice(IV_LENGTH * 2);
  const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);
  
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}