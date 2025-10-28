export const saveJSON = (key, obj) => {
  if (typeof window === 'undefined') return
  localStorage.setItem(key, JSON.stringify(obj))
}
export const loadJSON = (key) => {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(localStorage.getItem(key)) } catch { return null }
}
