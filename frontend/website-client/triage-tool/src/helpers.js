export const storageKey = "nhs-stoptober-triage-tool"

export function resetLocalStorage() {
  localStorage.removeItem(storageKey)
}
