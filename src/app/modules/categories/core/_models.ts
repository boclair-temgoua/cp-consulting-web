import {useMutation, useQueryClient} from '@tanstack/react-query'
import {SortModel} from '../../utils/pagination-item'
import {createOneCategory, deleteOneCategory, updateOneCategory} from './_requests'

export type ResponseCategoryModel = {
  total: number
  per_page: number
  current_page: number
  last_next: number
  skip: number
  sort: SortModel
  total_page: number
  total_value: number
  value: Array<CategoryModel>
}

export type CategoryModel = {
  createdAt: Date
  updatedAt: Date
  id: string
  name: string
  slug: string
  color: string
  description: string
  userCreatedId: string
  organizationId: string
}

export type CategoryRequestModel = {
  name: string
  categoryId?: string
  organizationId?: string
  description?: string
}

export const DeleteOneCategoryMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['categories']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: {password: string; categoryId: string}): Promise<any> => {
      const {password, categoryId} = payload
      const {data} = await deleteOneCategory({password, categoryId})
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

export const CreateOrUpdateOneCategoryMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['categories']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: CategoryRequestModel): Promise<any> => {
      const {categoryId, organizationId, name, description} = payload
      const {data} = categoryId
        ? await updateOneCategory({categoryId, name, organizationId, description})
        : await createOneCategory({organizationId, name, description})
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
