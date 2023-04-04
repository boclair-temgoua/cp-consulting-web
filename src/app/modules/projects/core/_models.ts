export type ProjectModel = {
  id: string
  name: string
  color: 'danger'
  organizationId: string
  contributorTotal: number
  organization: {
    id: string
    name: string
    color: string
    userId: string
  }
}
