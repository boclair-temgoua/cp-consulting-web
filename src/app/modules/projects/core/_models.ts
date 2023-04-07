export type ProjectModel = {
  id: string
  slug: string
  name: string
  color: string
  image: string
  organizationId: string
  contributorTotal: number
  subProjectTotal: number
  contactTotal: number
  documentTotal: null
  organization: {
    id: string
    name: string
    color: string
    userId: string
  }
  role: {name: 'ADMIN' | 'MODERATOR'}
}
