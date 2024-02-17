export function isEmail(value) {
  return (
    value.indexOf("@") !== -1 &&
    value.lastIndexOf(".") > value.indexOf("@") &&
    value.endsWith(".com")
  );
}

// Username validation using length check
export function userNameValidation(value) {
  return (
    value.length <= 60 &&
    /^[a-zA-Z0-9!@#$%^&*()-_+=|\\?<>{}[\]:;'".,~`]+$/.test(value)
  );
}

// Password validation using length check and includes for each required character type
export function passwordValidation(value) {
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[!@#$%^&*()-_=+[{\]};:'",.<>?]/.test(value);

  return (
    value.length >= 7 &&
    value.length <= 12 &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumber &&
    hasSpecialChar
  );
}

// Street validation using length check
export function streetValidation(value) {
  return value.length > 0 && /^[א-ת\s]*$/.test(value);
}

// House number validation using isNaN to check if the value is a number
export function housenumberValidation(value) {
  return !isNaN(value) && parseInt(value) > 0;
}

// Custom validation function to check if two values are equal
export function isEqualsToOtherValue(value, otherValue) {
  return value === otherValue;
}

// First name validation using length check and regex
export function firstNameValidation(value) {
  return value.length > 0 && /^[A-Za-z]+$/.test(value);
}

// Last name validation using length check and regex
export function lastNameValidation(value) {
  return value.length > 0 && /^[A-Za-z]+$/.test(value);
}

// Function to check if value has a minimum length
export function hasMinLength(value, minLength) {
  return value.length >= minLength;
}

export function dateValidation(value) {
  const [year, month, day] = value.split("-").map(Number);
  const selectedDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - selectedDate.getFullYear();
  const monthDiff = currentDate.getMonth() - selectedDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < selectedDate.getDate())
  ) {
    age--;
  }

  // Check if the age is within the valid range (18 to 120)
  return age >= 18 && age < 120;
}
