import { decrypt, encrypt } from "../EncryptionUtils";

describe("Encrypt and Decrypt unit test", () => {
  it("should encrypt and decrypt text correctly", () => {
    const originalText = "this is a secret message!";
    const encryptedText = encrypt(originalText);
    expect(encryptedText).not.toBe(originalText);

    const decryptedText = decrypt(encryptedText);
    expect(decryptedText).toBe(originalText);
  });

  it("should handle empty string", () => {
    const emptyText = "";

    const encryptedText = encrypt(emptyText);
    const decryptedText = decrypt(encryptedText);

    expect(decryptedText).toBe(emptyText);
  });

  it("should handle special character", () => {
    const specialText = "!@#$%^&*()_+{}:\"<>?[];',./`~";

    const encryptedText = encrypt(specialText);
    const decryptedText = decrypt(encryptedText);

    expect(decryptedText).toBe(specialText);
  });

  it("should throw an error if decryption fails", () => {
    const invalidEncryptedText = "invalidEncryptedText";
    expect(() => {
      decrypt(invalidEncryptedText);
    }).toThrow();
  });

  it("should handle different encryption keys", () => {
    const customKey = "2".repeat(64); // 64 length string
    process.env.ED_SECRET = customKey;

    const originalText = "This is a secret!";

    const encryptedText = encrypt(originalText);
    const decryptedText = decrypt(encryptedText);

    expect(decryptedText).toBe(originalText);
  });
});
