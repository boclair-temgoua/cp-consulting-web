import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createOnePost, updateOnePost} from './_requests'
import {SortModel} from '../../utils/pagination-item'

export type ResponsePostModel = {
  total: number
  per_page: number
  current_page: number
  last_next: number
  next_page: number
  prev_page: number
  skip: number
  sort: SortModel
  total_page: number
  total_value: number
  value: Array<PostModel>
}

export type PostModel = {
  createdAt: Date
  id: string
  title: string
  slug: string
  description: string
  groupId: string
  userId: string
  commentTotal: number
  likeTotal: number
  isLike: number
  profile: {
    color: string
    email: string
    image: string
    userId: string
    lastName: string
    firstName: string
  }
}

export type PostRequestModel = {
  title?: string
  postId?: string
  groupId?: string
  description: string
}

export const CreateOrUpdateOnePostMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['posts']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: PostRequestModel): Promise<any> => {
      const {groupId, title, postId, description} = payload
      const {data} = postId
        ? await updateOnePost({postId, title, groupId, description})
        : await createOnePost({groupId, title, description})
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
