import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createOneSubSubProject, deleteOneSubSubProject, updateOneSubSubProject} from './_requests'
import {ProjectRequestModel} from '../../projects/core/_models'
import {ContributorRoleModel} from '../../contributors/core/_models'

export type SubSubProjectModel = {
  id: string
  slug: string
  name: string
  color: string
  image: string
  projectId: string
  organizationId: string
  subProjectId: string
  contributorTotal: number
  contactTotal: number
  documentTotal: number
  description: string
  role: {
    name: ContributorRoleModel
  }
}

export type SubSubProjectRequestModel = {
  name: string
  projectId: string
  subProjectId?: string
  description: string
}

export const CreateOrUpdateOneSubSubProjectMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['subSubProjects']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: ProjectRequestModel): Promise<any> => {
      const {subProjectId, subSubProjectId, name, description} = payload
      const {data} = subSubProjectId
        ? await updateOneSubSubProject({subSubProjectId, name, description})
        : await createOneSubSubProject({subProjectId, name, description})
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

export const DeleteOneSubSubProjectMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['subSubProjects']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: {password: string; subSubProjectId: string}): Promise<any> => {
      const {password, subSubProjectId} = payload
      const {data} = await deleteOneSubSubProject({password, subSubProjectId})
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
