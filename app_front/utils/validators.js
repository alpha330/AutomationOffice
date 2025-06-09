
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


function validateIranPhoneNumber(phoneNumber) {
    const regex = /^(09)(1[0-9]|3[0-9]|2[0-9]|9[0-9]|7[0-9])\d{7}$/;
    return regex.test(phoneNumber);
}

export {
    isValidEmail,
    validateIranPhoneNumber,
}