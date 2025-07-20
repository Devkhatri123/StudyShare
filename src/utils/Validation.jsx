export const isValidEmail = (email) => {
     const EMAIL_REGEX_PATTERN = new RegExp("^csd\\d{2}(?:0[1-9]|1[0-2])\\d{2}@dsu\\.edu\\.pk$");
        if(EMAIL_REGEX_PATTERN.test(email)){
           return true;
        }
}