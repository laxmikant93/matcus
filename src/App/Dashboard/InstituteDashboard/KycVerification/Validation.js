// Legal business name: Edneed Technology Pvt. Ltd
// 	Company identification number: 21 digits alpha-numeric code
// 	Business PAN (Permanent Account Number): ten-digit alphanumeric number
// 	Goods & Services Tax (GST) identification number: 15 digit identification 
// 	Tax deduction account number (TAN): 10 -digit alpha-numeric
// 	Registered business address:  The place of business 

export function IsEmpty(value) {
  return (value === "" || value === null || value === undefined) ? true : false;
}
export function CIN_IsValid(value) {
  return { isValid: (IsEmpty(value) || value.length < 21 || value.length > 21) ? false : true, error: IsEmpty(value) ? "Empty Field" : "Invalid Pan Number" };
}
export function PAN_IsValid(value) {
  return { isValid: (IsEmpty(value) || value.length < 10 || value.length > 10) ? false : true, error: IsEmpty(value) ? "Empty Field" : "Invalid Pan Number" };
}
export function GST_IsValid(value) {
  return { isValid: (IsEmpty(value) || value.length < 15 || value.length > 15) ? false : true, error: IsEmpty(value) ? "Empty Field" : "Invalid Pan Number" };
}

export function Adhar_IsValid(value) {
  return { isValid: (IsEmpty(value) || value.length < 12 || value.length > 12) ? false : true, error: IsEmpty(value) ? "Empty Field" : "Invalid Pan Number" };
}