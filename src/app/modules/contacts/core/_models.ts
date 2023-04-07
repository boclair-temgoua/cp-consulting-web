import {useMutation, useQueryClient} from '@tanstack/react-query'
import {SortModel} from '../../utils/pagination-item'
import {deleteMultipleContact, deleteOneContact} from './_requests'

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

export const DeleteOneContactMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['contacts']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: {password: string; contactId: string}): Promise<any> => {
      const {password, contactId} = payload
      const {data} = await deleteOneContact({password, contactId})
      return data
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries({queryKey})
        if (onSuccess) {
          onSuccess()
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({queryKey})
        if (onSuccess) {
          onSuccess()
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries({queryKey})
        if (onError) {
          onError(error)
        }
      },
    }
  )

  return result
}

export const DeleteMultipleContactMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['contacts']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: {password: string; contacts: string[]}): Promise<any> => {
      const {password, contacts} = payload
      const {data} = await deleteMultipleContact({password, contacts})
      return data
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries({queryKey})
        if (onSuccess) {
          onSuccess()
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries({queryKey})
        if (onSuccess) {
          onSuccess()
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries({queryKey})
        if (onError) {
          onError(error)
        }
      },
    }
  )

  return result
}
