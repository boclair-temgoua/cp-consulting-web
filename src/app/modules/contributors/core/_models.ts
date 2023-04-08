import {SortModel} from '../../utils/pagination-item'

export type ResponseContributorModel = {
  total: number
  per_page: number
  current_page: number
  last_next: number
  skip: number
  sort: SortModel
  total_page: number
  total_value: number
  value: Array<ContributorModel>
}

export type ContributorModel = {
  createdAt: Date
  id: string
  userId: string
  type: string
  organizationId: string
  projectId: string
  subProjectId: string
  subSubProjectId: string
  userCreatedId: string
  organization: {
    id: string
    name: string
    color: string
    email: string
    userId: string
  }
  project: {
    id: string
    name: string
    color: string
    description: string
    organizationId: string
  }
  subProject: {
    id: string
    name: string
    color: string
    projectId: string
    description: string
    organizationId: string
  }
  subSubProject: {
    id: string
    name: string
    slug: string
    color: string
    projectId: string
    description: string
    subProjectId: string
    organizationId: string
  }
  profile: {
    color: string
    email: string
    image: string
    userId: string
    lastName: string
    firstName: string
  }
  role: {
    name: 'ADMIN' | 'MODERATOR'
  }
}

export type OneContributorModel = {
  createdAt: Date
  id: string
  userId: string
  type: string
  organizationId: string
  projectId: string
  subProjectId: string
  userCreatedId: string
  organization: {
    id: string
    name: string
    color: string
    email: string
    userId: string
  }
  role: {
    name: 'ADMIN' | 'MODERATOR'
  }
}
