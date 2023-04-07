import {useMutation, useQueryClient} from '@tanstack/react-query'
import {AlertDangerNotification, AlertSuccessNotification} from '../../utils'
import {deleteOneSubProject} from './_requests'

export type SubProjectModel = {
  id: string
  name: string
  color: string
  organizationId: string
  contributorTotal: number
  organization: {
    id: string
    name: string
    color: string
    userId: string
  }
  role: {
    role: {name: 'ADMIN' | 'MODERATOR'}
  }
}

export const DeleteOneSubProjectMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['subProjects']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: {password: string; subProjectId: string}): Promise<any> => {
      const {password, subProjectId} = payload
      const {data} = await deleteOneSubProject({password, subProjectId})
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
