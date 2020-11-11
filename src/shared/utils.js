/*
* Receive a string with tags,divided by comma
* Return the array with tags
* */
export function transformTags(tags) {
  if (!tags) return ''
  return tags
    .split(',')
    .map(item => item.trim())
}
