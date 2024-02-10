const generateOTP = () => {
    const length=6;
    const characters = '0123456789';
    let OTP = '';

    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * characters.length);
        OTP += characters[index];
    }

    return OTP;
}
// GENERATE A STRING
function generateRandomString(length) {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomString += charset[randomIndex];
    }
    return randomString;
}
module.exports={generateOTP,generateRandomString};