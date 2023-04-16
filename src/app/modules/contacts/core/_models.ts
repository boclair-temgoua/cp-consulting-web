import {useMutation, useQueryClient} from '@tanstack/react-query'
import {FilterTypeModel, SortModel} from '../../utils/pagination-item'
import {
  createOneContact,
  createOneContactProject,
  deleteMultipleContact,
  deleteOneContact,
  updateOneContact,
} from './_requests'

export type ResponseContactModel = {
  total: number
  per_page: number
  current_page: number
  last_next: number
  skip: number
  sort: SortModel
  total_page: number
  total_value: number
  value: Array<ContactModel>
}

export type ResponseContactProjectModel = {
  total: number
  per_page: number
  current_page: number
  last_next: number
  skip: number
  sort: SortModel
  total_page: number
  total_value: number
  value: Array<ContactProjectModel>
}

export type ContactProjectModel = {
  type: string
  createdAt: Date
  contactId: string
  organizationId: string
  projectId: string
  subProjectId: string
  subSubProjectId: string
  subSubSubProjectId: string
  userCreatedId: string
  contact: {
    id: string
    slug: string
    color: string
    email: string
    phone: string
    address: string
    category: string
    lastName: string
    countryId: string
    firstName: string
    categoryId: string
    otherPhone: string
    description: string
    userCreatedId: string
    organizationId: string
  }
}

export type ContactModel = {
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

export type ContactRequestModel = {
  contactId: string
  email: string
  lastName: string
  fistName: string
  phone: string
  categoryId: string
  projectId: string
  organizationId: string
}

export type ContactInviteRequestModel = {
  contactId?: string
  type: FilterTypeModel
  organizationId: string
  projectId?: string
  subProjectId?: string
  subSubProjectId?: string
  subSubSubProjectId?: string
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

export const CreateOrUpdateOneContactMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['contacts']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: ContactRequestModel): Promise<any> => {
      const {contactId} = payload
      const {data} = contactId ? await updateOneContact(payload) : await createOneContact(payload)
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

export const CreateOneContactProjectMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['contacts']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: ContactInviteRequestModel): Promise<any> => {
      const data = await createOneContactProject(payload)
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
        await queryClient.invalidateQueries()
        if (onSuccess) {
          onSuccess()
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries()
        if (onError) {
          onError(error)
        }
      },
    }
  )

  return result
}
