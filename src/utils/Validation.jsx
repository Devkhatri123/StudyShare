export const isValidEmail = (email) => {
   let isValidEmail = false;
   const Regex_Patterns = ["^csd\\d{2}(?:0[1-9]|1[0-2])\\d{2}@dsu\\.edu\\.pk$", "^ce\\d{2}(?:0[1-9]|1[0-2])\\d{2}@dsu\\.edu\\.pk$"];
   for (let index = 0; index <Regex_Patterns.length; index++) {
      const element = Regex_Patterns[index];
       const EMAIL_REGEX_PATTERN = new RegExp(element);
       if(EMAIL_REGEX_PATTERN.test(email)){
         isValidEmail = EMAIL_REGEX_PATTERN.test(email);
         break
        }
   }
   return isValidEmail;
}

export const convertBase64ToBlob = (base64,mime) => {
              const bytes = atob(base64);
              const length = bytes.length;
              const uint8array = new Uint8Array(length);
              for (let i = 0; i < length; i++) {
                uint8array[i] = bytes.charCodeAt(i);
              }
              return new Blob([uint8array], { type: mime })
            }