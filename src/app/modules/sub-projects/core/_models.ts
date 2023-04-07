import {useMutation, useQueryClient} from '@tanstack/react-query'
import {AlertDangerNotification, AlertSuccessNotification} from '../../utils'
import {createOneSubProject, deleteOneSubProject, updateOneSubProject} from './_requests'

export type SubProjectModel = {
  id: string
  name: string
  color: string
  projectId: string
  organizationId: string
  description: string
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

export type SubProjectRequestModel = {
  name: string
  projectId: string
  subProjectId?: string
  description: string
}

export const CreateOrUpdateOneSubProjectMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['subProjects']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: SubProjectRequestModel): Promise<any> => {
      const {subProjectId, projectId, name, description} = payload
      const {data} = subProjectId
        ? await updateOneSubProject({subProjectId, projectId, name, description})
        : await createOneSubProject({projectId, name, description})
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
