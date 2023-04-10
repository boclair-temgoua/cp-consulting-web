import {useMutation, useQueryClient} from '@tanstack/react-query'
import {SortModel} from '../../utils/pagination-item'

export type ResponseDocumentModel = {
  total: number
  per_page: number
  current_page: number
  last_next: number
  skip: number
  sort: SortModel
  total_page: number
  total_value: number
  value: Array<DocumentModel>
}

export type DocumentModel = {
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  id: string
  title: string
  description: string
  typeFile: string
  url: string
  type: string
  organizationId: string
  projectId: string
  subProjectId: string
  subSubProjectId: string
  subSubSubProjectId: string
}

// export type ContributorRequestModel = {
//   projectId?: string
//   subProjectId?: string
//   subSubProjectId?: string
//   subSubSubProjectId?: string
//   organizationId?: string
// }

// export const DeleteOneContributorMutation = ({
//   onSuccess,
//   onError,
// }: {
//   onSuccess?: () => void
//   onError?: (error: any) => void
// } = {}) => {
//   const queryKey = ['contributors']
//   const queryClient = useQueryClient()
//   const result = useMutation(
//     async (payload: {password: string; contributorId: string}): Promise<any> => {
//       const {password, contributorId} = payload
//       const {data} = await deleteOneContributor({password, contributorId})
//       return data
//     },
//     {
//       onSettled: async () => {
//         await queryClient.invalidateQueries({queryKey})
//         if (onSuccess) {
//           onSuccess()
//         }
//       },
//       onSuccess: async () => {
//         await queryClient.invalidateQueries({queryKey})
//         if (onSuccess) {
//           onSuccess()
//         }
//       },
//       onError: async (error: any) => {
//         await queryClient.invalidateQueries({queryKey})
//         if (onError) {
//           onError(error)
//         }
//       },
//     }
//   )

//   return result
// }

// export const CreateOneContributorMutation = ({
//   onSuccess,
//   onError,
// }: {
//   onSuccess?: () => void
//   onError?: (error: any) => void
// } = {}) => {
//   const queryKeyContributors = ['contributors']
//   const queryKeyContributorSubProjectMini = ['contributorSubProjectMini']
//   const queryKeyContributorSubSubProjectMini = ['contributorSubSubProjectMini']
//   const queryKeyContributorSubSubSubProjectMini = ['contributorSubSubSubProjectMini']
//   const queryClient = useQueryClient()
//   const result = useMutation(
//     async (
//       payload: {
//         userId: string
//       } & ContributorRequestModel
//     ): Promise<any> => {
//       const {userId, projectId, subProjectId, subSubProjectId, subSubSubProjectId, organizationId} =
//         payload
//       if (organizationId) {
//         await createOneContributorOrganization({userId, organizationId})
//       }
//       if (projectId) {
//         await createOneContributorProject({userId, projectId})
//       }
//       if (subProjectId) {
//         await createOneContributorSubProject({userId, subProjectId})
//       }
//       if (subSubProjectId) {
//         await createOneContributorSubSubProject({userId, subSubProjectId})
//       }
//       if (subSubSubProjectId) {
//         await createOneContributorSubSubSubProject({userId, subSubSubProjectId})
//       }
//       return 'contributor save'
//     },
//     {
//       onSettled: async () => {
//         await queryClient.invalidateQueries(queryKeyContributors)
//         await queryClient.invalidateQueries(queryKeyContributorSubProjectMini)
//         await queryClient.invalidateQueries(queryKeyContributorSubSubProjectMini)
//         await queryClient.invalidateQueries(queryKeyContributorSubSubSubProjectMini)
//         if (onSuccess) {
//           onSuccess()
//         }
//       },
//       onSuccess: async () => {
//         await queryClient.invalidateQueries(queryKeyContributors)
//         await queryClient.invalidateQueries(queryKeyContributorSubProjectMini)
//         await queryClient.invalidateQueries(queryKeyContributorSubSubProjectMini)
//         await queryClient.invalidateQueries(queryKeyContributorSubSubSubProjectMini)
//         if (onSuccess) {
//           onSuccess()
//         }
//       },
//       onError: async (error: any) => {
//         await queryClient.invalidateQueries(queryKeyContributors)
//         await queryClient.invalidateQueries(queryKeyContributorSubProjectMini)
//         await queryClient.invalidateQueries(queryKeyContributorSubSubProjectMini)
//         await queryClient.invalidateQueries(queryKeyContributorSubSubSubProjectMini)
//         if (onError) {
//           onError(error)
//         }
//       },
//     }
//   )

//   return result
// }
