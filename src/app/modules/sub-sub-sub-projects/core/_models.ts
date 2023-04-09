import {useMutation, useQueryClient} from '@tanstack/react-query'
// import {createOneSubSubProject, deleteOneSubSubProject, updateOneSubSubProject} from './_requests'
import {ProjectRequestModel} from '../../projects/core/_models'
import {ContributorRoleModel} from '../../contributors/core/_models'
import {
  createOneSubSubSubProject,
  deleteOneSubSubSubProject,
  updateOneSubSubSubProject,
} from './_requests'

export type SubSubSubProjectModel = {
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
  role: {
    name: ContributorRoleModel
  }
}
export const CreateOrUpdateOneSubSubSubProjectMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['subSubSubProjects']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: ProjectRequestModel): Promise<any> => {
      const {subSubSubProjectId, subSubProjectId, name, description} = payload
      const {data} = subSubSubProjectId
        ? await updateOneSubSubSubProject({subSubSubProjectId, name, description})
        : await createOneSubSubSubProject({subSubProjectId, name, description})
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

export const DeleteOneSubSubSubProjectMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['subSubSubProjects']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: {password: string; subSubSubProjectId: string}): Promise<any> => {
      const {password, subSubSubProjectId} = payload
      const {data} = await deleteOneSubSubSubProject({password, subSubSubProjectId})
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
