import {ContributorRoleModel} from '../../contributors/core/_models'

export type OrganizationModel = {
  id: string
  name: string
  color: string
  image: string
  userId: string
  email: string
  contributorTotal: number
  categoryTotal: number
  contactTotal: number
  projectTotal: number
  userAddress: string
  phone: string
  firstAddress: string
  secondAddress: string
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

export type OrganizationRequestModel = {
  name: string
  phone: string
  firstAddress: string
  secondAddress: string
  organizationId: string
}
