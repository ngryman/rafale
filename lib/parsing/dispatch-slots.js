export default function dispatchSlots(parts, placeholder) {
  let markup = parts[0]
  for (let i = 1; i < parts.length; i++) {
    markup += placeholder
    markup += parts[i]
  }
  return markup
}