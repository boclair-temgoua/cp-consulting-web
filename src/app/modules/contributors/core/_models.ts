import {useMutation, useQueryClient} from '@tanstack/react-query'
import {SortModel} from '../../utils/pagination-item'
import {
  createOneContributorOrganization,
  createOneContributorProject,
  createOneContributorSubProject,
  createOneContributorSubSubProject,
  createOneContributorSubSubSubProject,
  deleteOneContributor,
  updateRoleContributor,
} from './_requests'

export type ContributorRoleModel = 'ADMIN' | 'MODERATOR' | 'ANALYST'

export const arrayAuthorized = ['ADMIN', 'MODERATOR']

export const optionsRoles: any = [{name: 'ADMIN'}, {name: 'MODERATOR'}, {name: 'ANALYST'}]

export type ResponseContributorModel = {
  total: number
  per_page: number
  current_page: number
  last_next: number
  skip: number
  sort: SortModel
  total_page: number
  total_value: number
  value: Array<ContributorModel>
}

export type ContributorModel = {
  createdAt: Date
  id: string
  userId: string
  type: string
  organizationId: string
  projectId: string
  subProjectId: string
  subSubProjectId: string
  subSubSubProjectId: string
  userCreatedId: string
  organization: {
    id: string
    name: string
    color: string
    email: string
    userId: string
  }
  project: {
    id: string
    name: string
    color: string
    description: string
    organizationId: string
  }
  subProject: {
    id: string
    name: string
    color: string
    projectId: string
    description: string
    organizationId: string
  }
  subSubProject: {
    id: string
    name: string
    slug: string
    color: string
    projectId: string
    description: string
    subProjectId: string
    organizationId: string
  }
  subSubSubProject: {
    id: string
    name: string
    slug: string
    color: string
    projectId: string
    description: string
    subProjectId: string
    organizationId: string
    subSubProjectId: string
  }
  profile: {
    color: string
    email: string
    image: string
    userId: string
    lastName: string
    firstName: string
  }
  role: {
    name: ContributorRoleModel
  }
}

export type ContributorRequestModel = {
  projectId?: string
  subProjectId?: string
  subSubProjectId?: string
  subSubSubProjectId?: string
  organizationId?: string
}

export type OneContributorModel = {
  createdAt: Date
  id: string
  userId: string
  type: string
  organizationId: string
  projectId: string
  subProjectId: string
  userCreatedId: string
  organization: {
    id: string
    name: string
    color: string
    email: string
    userId: string
  }
  role: {
    name: ContributorRoleModel
  }
}

export const UpdateRoleContributorMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['contributors']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: {contributorId: string; role: string}): Promise<any> => {
      const {contributorId, role} = payload
      const {data} = await updateRoleContributor({contributorId, role})
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

export const DeleteOneContributorMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKey = ['contributors']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (payload: {password: string; contributorId: string}): Promise<any> => {
      const {password, contributorId} = payload
      const {data} = await deleteOneContributor({password, contributorId})
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

export const CreateOneContributorMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: (error: any) => void
} = {}) => {
  const queryKeyContributors = ['contributors']
  const queryKeyContributorSubProjectMini = ['contributorSubProjectMini']
  const queryKeyContributorSubSubProjectMini = ['contributorSubSubProjectMini']
  const queryKeyContributorSubSubSubProjectMini = ['contributorSubSubSubProjectMini']
  const queryClient = useQueryClient()
  const result = useMutation(
    async (
      payload: {
        userId: string
      } & ContributorRequestModel
    ): Promise<any> => {
      const {userId, projectId, subProjectId, subSubProjectId, subSubSubProjectId, organizationId} =
        payload
      if (organizationId) {
        await createOneContributorOrganization({userId, organizationId})
      }
      if (projectId) {
        await createOneContributorProject({userId, projectId})
      }
      if (subProjectId) {
        await createOneContributorSubProject({userId, subProjectId})
      }
      if (subSubProjectId) {
        await createOneContributorSubSubProject({userId, subSubProjectId})
      }
      if (subSubSubProjectId) {
        await createOneContributorSubSubSubProject({userId, subSubSubProjectId})
      }
      return 'contributor save'
    },
    {
      onSettled: async () => {
        await queryClient.invalidateQueries(queryKeyContributors)
        await queryClient.invalidateQueries(queryKeyContributorSubProjectMini)
        await queryClient.invalidateQueries(queryKeyContributorSubSubProjectMini)
        await queryClient.invalidateQueries(queryKeyContributorSubSubSubProjectMini)
        if (onSuccess) {
          onSuccess()
        }
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(queryKeyContributors)
        await queryClient.invalidateQueries(queryKeyContributorSubProjectMini)
        await queryClient.invalidateQueries(queryKeyContributorSubSubProjectMini)
        await queryClient.invalidateQueries(queryKeyContributorSubSubSubProjectMini)
        if (onSuccess) {
          onSuccess()
        }
      },
      onError: async (error: any) => {
        await queryClient.invalidateQueries(queryKeyContributors)
        await queryClient.invalidateQueries(queryKeyContributorSubProjectMini)
        await queryClient.invalidateQueries(queryKeyContributorSubSubProjectMini)
        await queryClient.invalidateQueries(queryKeyContributorSubSubSubProjectMini)
        if (onError) {
          onError(error)
        }
      },
    }
  )

  return result
}
