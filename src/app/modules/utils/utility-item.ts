export interface KeyAsString {
  [key: string]: string
}

export const colorRole: KeyAsString = {
  ADMIN: 'info',
  MODERATOR: 'primary',
  ANALYST: 'success',
  GHOST: 'danger',
}

export const dataCountFormatter = (input: number) => {
  const abbrev = ['', 'k', 'M', 'B', 'T']
  const unrangifiedOrder = Math.floor(Math.log10(Math.abs(input)) / 3)
  const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1))
  const suffix = abbrev[order]
  return input / Math.pow(10, order * 3) + suffix
}
