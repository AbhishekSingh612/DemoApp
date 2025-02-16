import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { encodeBase32LowerCase } from '@oslojs/encoding';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}

export function validateEmail(email: unknown): email is string {
	return (
		typeof email === 'string' &&
		email.length >= 3 &&
		email.length <= 31 &&
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
	);
}

export function validatePassword(password: unknown): password is string {
	return (
		typeof password === 'string' &&
		password.length >= 6 &&
		password.length <= 255
	);
}

export function validateNotBlank(text: unknown): text is string {
	return (
		typeof text === 'string' &&
		text.length > 0 &&
		text.length <= 255
	);
}