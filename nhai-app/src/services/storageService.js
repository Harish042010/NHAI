/**
 * Storage Service - Mock SQLCipher encrypted storage
 */

const STORAGE_KEYS = {
  EMPLOYEES: 'nhai_employees',
  ATTENDANCE: 'nhai_attendance',
  AUDIT_LOG: 'nhai_audit_log',
};

// Mock encryption (in production, use real SQLCipher with AES-256)
const mockEncrypt = (data) => {
  try {
    return btoa(JSON.stringify(data));
  } catch (e) {
    return JSON.stringify(data);
  }
};

const mockDecrypt = (encrypted) => {
  try {
    return JSON.parse(atob(encrypted));
  } catch (e) {
    try {
      return JSON.parse(encrypted);
    } catch (err) {
      return null;
    }
  }
};

export const storageService = {
  saveEncrypted: (key, data) => {
    try {
      const encrypted = mockEncrypt(data);
      localStorage.setItem(key, encrypted);
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  },

  getDecrypted: (key) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return mockDecrypt(encrypted);
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  },

  getStorageStats: () => {
    let totalSize = 0;
    Object.values(STORAGE_KEYS).forEach(key => {
      const item = localStorage.getItem(key);
      if (item) {
        totalSize += item.length;
      }
    });

    return {
      usedSize: Math.round(totalSize / 1024 * 100) / 100,
      maxSize: 50000,
      percentUsed: Math.round((totalSize / (50000 * 1024)) * 100),
    };
  },

  clear: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  },
};

export default storageService;
