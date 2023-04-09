import {useMutation, useQueryClient} from '@tanstack/react-query'
import {createOneProject, updateOneProject} from './_requests'
import {ContributorRoleModel} from '../../contributors/core/_models'

export type ProjectModel = {
  id: string
  slug: string
  name: string
  color: string
  image: string
  organizationId: string
  contributorTotal: number
  subProjectTotal: number
  contactTotal: number
  documentTotal: null
  organization: {
    id: string
    name: string
    color: string
    userId: string
  }
  role: {name: ContributorRoleModel}
}

export type ProjectRequestModel = {
  name: string
  projectId?: string
  subProjectId?: string
  subSubProjectId?: string
  subSubSubProjectId?: string
  description: string
}

export const CreateOrUpdateOneProjectMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['projects']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: ProjectRequestModel): Promise<any> => {
      const {projectId, name, description} = payload
      const {data} = projectId
        ? await updateOneProject({projectId, name, description})
        : await createOneProject({name, description})
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
