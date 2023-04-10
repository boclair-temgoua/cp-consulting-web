import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createOneSubProject, deleteOneSubProject, updateOneSubProject} from './_requests'
import {ProjectRequestModel} from '../../projects/core/_models'
import {ContributorRoleModel} from '../../contributors/core/_models'

export type SubProjectModel = {
  id: string
  slug: string
  name: string
  color: string
  image: string
  projectId: string
  organizationId: string
  contributorTotal: number
  contactTotal: number
  documentTotal: number
  subSubProjectTotal: number
  description: string
  organization: {
    id: string
    name: string
    color: string
    userId: string
  }
  role: {
    name: ContributorRoleModel
  }
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
    async (payload: ProjectRequestModel): Promise<any> => {
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
