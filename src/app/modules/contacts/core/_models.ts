import {SortModel} from '../../utils/pagination-item'

export type ResponseContactModel = {
  total: number
  per_page: number
  current_page: number
  last_next: number
  skip: number
  sort: SortModel
  total_page: number
  total_value: number
  value: Array<OneContactModel>
}

export type OneContactModel = {
  id: string
  createdAt: Date
  firstName: string
  lastName: string
  email: string
  color: string
  phone: string
  address: string
  image: string
  countryId: string
  description: string
  userCreatedId: string
  organizationId: string
  projectId: string
  subProjectId: null
  categoryId: string
  category: {
    id: string
    name: string
    color: string
    organizationId: string
  }
}

export type RequestContactModel = {
  email: string
  lastName: string
  fistName: string
  phone: string
  categoryId: string
  projectId: string
  description: string
}
