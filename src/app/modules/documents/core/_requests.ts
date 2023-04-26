import {makeApiCall} from '../../utils/get-url-end-point'
import {FilterKeyId, FilterTypeModel, PaginationRequest} from '../../utils/pagination-item'
import {DocumentModel, ResponseDocumentModel} from './_models'

export const getDocumentsBy = async (
  payload: FilterKeyId & PaginationRequest
): Promise<{data: ResponseDocumentModel}> => {
  return await makeApiCall({
    action: 'getDocumentsBy',
    queryParams: payload,
  })
}

// export const getContributorsProject = async (
//   payload: {
//     projectId: string
//   } & PaginationRequest
// ): Promise<{data: ResponseContributorModel}> => {
//   return await makeApiCall({
//     action: 'getContributorsProject',
//     queryParams: payload,
//   })
// }

// export const getContributorsSubProject = async (
//   payload: {
//     subProjectId: string
//   } & PaginationRequest
// ): Promise<{data: ResponseContributorModel}> => {
//   return await makeApiCall({
//     action: 'getContributorsSubProject',
//     queryParams: payload,
//   })
// }

// export const getContributorsSubSubProject = async (
//   payload: {
//     subSubProjectId: string
//   } & PaginationRequest
// ): Promise<{data: ResponseContributorModel}> => {
//   return await makeApiCall({
//     action: 'getContributorsSubSubProject',
//     queryParams: payload,
//   })
// }

// export const getContributorsSubSubSubProject = async (
//   payload: {
//     subSubSubProjectId: string
//   } & PaginationRequest
// ): Promise<{data: ResponseContributorModel}> => {
//   return await makeApiCall({
//     action: 'getContributorsSubSubSubProject',
//     queryParams: payload,
//   })
// }

// export const getOneContributor = async (payload: {
//   contributorId: string
// }): Promise<OneContributorModel> => {
//   const {contributorId} = payload
//   return await makeApiCall({
//     action: 'getOneContributor',
//     urlParams: {contributorId},
//   })
// }

// export const deleteOneContributor = async (payload: {
//   contributorId: string
//   password: string
// }): Promise<{data: OneContributorModel}> => {
//   const {contributorId, password} = payload
//   return await makeApiCall({
//     action: 'deleteOneContributor',
//     urlParams: {contributorId},
//     body: {password},
//   })
// }

// export const updateRoleContributor = async (payload: {
//   contributorId: string
//   role: string
// }): Promise<{data: OneContributorModel}> => {
//   return await makeApiCall({
//     action: 'updateRoleContributor',
//     body: payload,
//   })
// }

// export const createOneContributorOrganization = async (payload: {
//   userId: string
//   organizationId: string
// }): Promise<{data: OneContributorModel}> => {
//   return await makeApiCall({
//     action: 'createOneContributorOrganization',
//     queryParams: payload,
//   })
// }

// export const createOneContributorProject = async (payload: {
//   userId: string
//   projectId: string
// }): Promise<{data: OneContributorModel}> => {
//   return await makeApiCall({
//     action: 'createOneContributorProject',
//     queryParams: payload,
//   })
// }

// export const createOneContributorSubProject = async (payload: {
//   userId: string
//   subProjectId: string
// }): Promise<{data: OneContributorModel}> => {
//   return await makeApiCall({
//     action: 'createOneContributorSubProject',
//     queryParams: payload,
//   })
// }

// export const createOneContributorSubSubProject = async (payload: {
//   userId: string
//   subSubProjectId: string
// }): Promise<{data: OneContributorModel}> => {
//   return await makeApiCall({
//     action: 'createOneContributorSubSubProject',
//     queryParams: payload,
//   })
// }

// export const createOneContributorSubSubSubProject = async (payload: {
//   userId: string
//   subSubSubProjectId: string
// }): Promise<{data: OneContributorModel}> => {
//   return await makeApiCall({
//     action: 'createOneContributorSubSubSubProject',
//     queryParams: payload,
//   })
// }
