export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;


export function validateEmail(email: string) {
return emailRegex.test(email);
}


export function validatePassword(password: string) {
return passwordRegex.test(password);
}