import { describe, expect, it } from 'vitest'

import { nationalRegistryIdSplit } from './national-registry-id-tools'

describe('nationalRegistryIdSplit', () => {
  it('splits a 10-digit national registry id into 6-4 format', () => {
    expect(nationalRegistryIdSplit('1234567890')).toBe('123456-7890')
  })

  it('returns already formatted id unchanged', () => {
    expect(nationalRegistryIdSplit('123456-7890')).toBe('123456-7890')
  })

  it('returns input unchanged when shorter than 10 digits', () => {
    expect(nationalRegistryIdSplit('123456789')).toBe('123456789')
  })

  it('returns input unchanged when longer than 10 digits', () => {
    expect(nationalRegistryIdSplit('12345678901')).toBe('12345678901')
  })

  it('returns input unchanged when containing non-digit characters', () => {
    expect(nationalRegistryIdSplit('12345A7890')).toBe('12345A7890')
  })
})
