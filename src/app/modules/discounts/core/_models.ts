import {useMutation, useQueryClient} from '@tanstack/react-query'
import {SortModel} from '../../utils/pagination-item'
import {createOneDiscount, deleteOneDiscount, updateOneDiscount} from './_requests'

export type ResponseDiscountModel = {
  total: number
  per_page: number
  current_page: number
  last_next: number
  skip: number
  sort: SortModel
  total_page: number
  total_value: number
  value: Array<DiscountModel>
}

export type DiscountModel = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  id: string
  name: string
  description: string
  percent: number
  isActive: boolean
  expiredAt: Date
  startedAt: Date
  organizationId: string
}

export type DiscountRequestModel = {
  name?: string
  discountId?: string
  description?: string
  isActive?: boolean
  startedAt?: Date
  expiredAt?: Date
  percent?: number
}

export const DeleteOneDiscountMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['discounts']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: {discountId: string}): Promise<any> => {
      const {discountId} = payload
      const {data} = await deleteOneDiscount({discountId})
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

export const CreateOrUpdateOneDiscountMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['discounts']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: DiscountRequestModel): Promise<any> => {
      const {expiredAt, percent, name, startedAt, discountId, description} = payload
      const {data} = discountId
        ? await updateOneDiscount({discountId, name, expiredAt, startedAt, percent, description})
        : await createOneDiscount({name, expiredAt, startedAt, percent, description})
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
