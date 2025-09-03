export const isValidEmail = (email) => {
  let isValidEmail = false;
  const Regex_Patterns = ["^csd\\d{2}(?:0[1-9]|1[0-2])\\d{2}@dsu\\.edu\\.pk$", "^ce\\d{2}(?:0[1-9]|1[0-2])\\d{2}@dsu\\.edu\\.pk$"];
  for (let index = 0; index < Regex_Patterns.length; index++) {
    const element = Regex_Patterns[index];
    const EMAIL_REGEX_PATTERN = new RegExp(element);
    if (EMAIL_REGEX_PATTERN.test(email)) {
      isValidEmail = EMAIL_REGEX_PATTERN.test(email);
      break
    }
  }
  return isValidEmail;
}


// Subject code validation
// Subjects department code regex
const regexObj = {
  "CS": "^CS\\d{3,5}$",
  "CE": "^CE\\d{3,5}$"
}
export const isValidSubjectCode = (code, department) => {
  if (regexObj.hasOwnProperty(department)) {
    const Subject_Department_Code_REGEX = new RegExp(regexObj[department]);
    return Subject_Department_Code_REGEX.test(code);
  } else return false;
}



export const convertBase64ToBlob = (base64, mime) => {
  const bytes = atob(base64);
  const length = bytes.length;
  const uint8array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8array[i] = bytes.charCodeAt(i);
  }
  return new Blob([uint8array], { type: mime })
}

export const returnFullFormOfDepartment = (department) => {
  if (department == "CS") return "Computer Science";
  else if (department == "CE") return "Civil Engineering";
}

export const returnFullSemester = (semester) =>{
  if(semester == 1) return "1st";
  else if (semester == 2) return "2nd";
  else if (semester == 3) return "3rd";
  else if (semester == 4) return "4th";
  else if (semester == 5) return "5th";
  else if (semester == 6) return "6h";
  else if (semester == 7) return "7th";
  else if (semester == 8) return "8th";
}

// Department and email validation. 
// Making sure user has correct email against selected department
const emailRegex = {
  "CS": "^csd\\d{2}(?:0[1-9]|1[0-2])\\d{2}@dsu\\.edu\\.pk$",
  "CE": "^ce\\d{2}(?:0[1-9]|1[0-2])\\d{2}@dsu\\.edu\\.pk$"
}
export const validateEmailAndDepartment = (email, department) => {
  if (emailRegex.hasOwnProperty(department)) {
    const Subject_Department_Code_REGEX = new RegExp(emailRegex[department]);
    return Subject_Department_Code_REGEX.test(email);
  } else return false;
}