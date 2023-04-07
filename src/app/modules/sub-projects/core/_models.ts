export type SubProjectModel = {
  id: string
  name: string
  color: string
  organizationId: string
  contributorTotal: number
  organization: {
    id: string
    name: string
    color: string
    userId: string
  }
  role: {
    role: {name: 'ADMIN' | 'MODERATOR'}
  }
}
