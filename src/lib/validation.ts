/**
 * UK-Specific Validation Utilities
 */

export const validateUKPostcode = (postcode: string): boolean => {
    const ukPostcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
    return ukPostcodeRegex.test(postcode.trim());
};

export const validateUKPhone = (phone: string): boolean => {
    // UK phone: +44 followed by 10 digits, or 07 followed by 9 digits
    const ukPhoneRegex = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
    return ukPhoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateAge = (dob: string, minAge: number = 21): { valid: boolean; age?: number } => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return { valid: age >= minAge, age };
};

export const validateSortCode = (sortCode: string): boolean => {
    // UK sort code: XX-XX-XX format
    const sortCodeRegex = /^\d{2}-\d{2}-\d{2}$/;
    return sortCodeRegex.test(sortCode);
};

export const formatSortCode = (value: string): string => {
    // Remove non-digits
    const digits = value.replace(/\D/g, '');

    // Format as XX-XX-XX
    if (digits.length <= 2) return digits;
    if (digits.length <= 4) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 4)}-${digits.slice(4, 6)}`;
};

export const validateAccountNumber = (accountNumber: string): boolean => {
    // UK account number: exactly 8 digits
    return /^\d{8}$/.test(accountNumber.replace(/\s/g, ''));
};

export const validateUKVehicleReg = (reg: string): boolean => {
    // UK registration formats (simplified): AB12 CDE or AB12CDE
    const ukRegRegex = /^[A-Z]{2}\d{2}\s?[A-Z]{3}$/i;
    return ukRegRegex.test(reg.trim());
};

export const validateNINumber = (ni: string): boolean => {
    // UK NI Number format: XX 12 34 56 X (with or without spaces)
    const niRegex = /^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}\s?\d{2}\s?\d{2}\s?\d{2}\s?[A-D]{1}$/i;
    const cleaned = ni.replace(/\s/g, '').toUpperCase();

    if (!niRegex.test(ni)) return false;

    // Invalid prefixes
    const invalidPrefixes = ['BG', 'GB', 'NK', 'KN', 'TN', 'NT', 'ZZ'];
    const prefix = cleaned.substring(0, 2);

    return !invalidPrefixes.includes(prefix);
};

export const validateDVLACheckCode = (code: string): boolean => {
    // DVLA check code: 8 characters alphanumeric
    return /^[A-Z0-9]{8}$/i.test(code.trim());
};

export const validateFileSize = (file: File, maxSizeMB: number = 5): boolean => {
    const maxBytes = maxSizeMB * 1024 * 1024;
    return file.size <= maxBytes;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
    return allowedTypes.includes(file.type);
};

export const IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const DOCUMENT_ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'application/pdf'];

// File conversion utilities
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};

export const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};
