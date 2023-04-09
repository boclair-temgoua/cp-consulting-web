export interface KeyAsString {
  [key: string]: string
}

export const colorRole: KeyAsString = {
  ADMIN: 'info',
  MODERATOR: 'primary',
  ANALYST: 'success',
  GHOST: 'danger',
}
