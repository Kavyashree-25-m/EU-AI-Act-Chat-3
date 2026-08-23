import { STORAGE_KEYS } from "../utils/constants";

export function loadEmail() {
  return localStorage.getItem(STORAGE_KEYS.EMAIL) || "";
}

export function saveEmail(value) {
  localStorage.setItem(STORAGE_KEYS.EMAIL, value);
}

export function loadAnswers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.ANSWERS) || "{}");
  } catch {
    return {};
  }
}

export function saveAnswers(value) {
  localStorage.setItem(STORAGE_KEYS.ANSWERS, JSON.stringify(value));
}
