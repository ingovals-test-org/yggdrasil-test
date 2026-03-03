export function nationalRegistryIdSplit(nationalRegistryId: string) {
  if (/^\d{10}$/.test(nationalRegistryId)) {
    return `${nationalRegistryId.slice(0, 6)}-${nationalRegistryId.slice(6)}`
  }
  return nationalRegistryId
}
