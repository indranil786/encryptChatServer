const encrypt = async (text, passKey, count) => {
    if (count < 1)
        return text;
    else {
        let textArray = [...text];
        let passKeyArray = [...passKey];
        let encryptTextString = textArray.map((char) => {
            return String.fromCharCode((char).charCodeAt(0) + 4)
        }).join('');
        let encryptpassKeyString = passKeyArray.map((char) => {
            return String.fromCharCode((char).charCodeAt(0) + 2)
        }).join('');
        let pos = Math.floor(Math.random() * encryptTextString.length);
        let encryptText = encryptTextString.slice(0, pos + 1) + encryptpassKeyString + encryptTextString.slice(pos + 1);
        return encrypt(encryptText, passKey, count - 1);
    }
}

const decrypt =async  (text, passKey, count) => {
    if (count < 1)
        return text;
    else {
        let textArray = [...text];
        let decryptTextString = textArray.map((char) => {
            return String.fromCharCode((char).charCodeAt(0) - 2)
        }).join('');
        const filteredArr = [...(decryptTextString.split(passKey).filter((char) => {
            return char !== passKey;
        }).join(''))];
        const decryptText = filteredArr.map((char) => String.fromCharCode((char).charCodeAt(0) - 2)).join('');
        return decrypt(decryptText, passKey, count - 1);
    }
}
module.exports={encrypt,decrypt};