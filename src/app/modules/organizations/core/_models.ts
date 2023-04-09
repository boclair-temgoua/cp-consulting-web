import {ContributorRoleModel} from '../../contributors/core/_models'

export type OrganizationModel = {
  id: string
  name: string
  color: string
  image: string
  userId: string
  contributorTotal: number
  projectTotal: number
  userAddress: string
  createdAt: Date
  profileOwner: {
    color: string
    email: string
    image: string
    userId: string
    lastName: string
    firstName: string
    profileId: string
  }
  role: {
    name: ContributorRoleModel
  }
}
