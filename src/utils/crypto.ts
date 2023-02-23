import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse("3D57269CC8919245");    // 16位
const iv = CryptoJS.enc.Utf8.parse("349F65A7F1B85BDF");

export default {
    // aes加密
    encrypt(word: any) {
        let encrypted: string = "";
        if (typeof word === "string") {
            const stringify = CryptoJS.enc.Utf8.parse(word);
            encrypted = CryptoJS.AES.encrypt(stringify, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).ciphertext.toString()
        } else if (typeof word === "object") {
            //对象格式的转成json字符串
            const data = JSON.stringify(word);
            const stringify = CryptoJS.enc.Utf8.parse(data);
            encrypted = CryptoJS.AES.encrypt(stringify, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).ciphertext.toString()
        }

        return encrypted;
    },

    // aes解密
    decrypt(word: string) {
        const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        const stringify = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        const decrypt = CryptoJS.AES.decrypt(stringify, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
}