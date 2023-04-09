import {makeApiCall} from '../../utils/get-url-end-point'
import {FilterTypeModel, PaginationRequest} from '../../utils/pagination-item'
import {OneContributorModel, ResponseContributorModel} from './_models'

export const getContributorsOrganization = async (
  payload: {
    organizationId: string
    type: FilterTypeModel
  } & PaginationRequest
): Promise<{data: ResponseContributorModel}> => {
  return await makeApiCall({
    action: 'getContributorsOrganization',
    queryParams: payload,
  })
}

export const getContributorsProject = async (
  payload: {
    projectId: string
  } & PaginationRequest
): Promise<{data: ResponseContributorModel}> => {
  return await makeApiCall({
    action: 'getContributorsProject',
    queryParams: payload,
  })
}

export const getContributorsSubProject = async (
  payload: {
    subProjectId: string
  } & PaginationRequest
): Promise<{data: ResponseContributorModel}> => {
  return await makeApiCall({
    action: 'getContributorsSubProject',
    queryParams: payload,
  })
}

export const getContributorsSubSubProject = async (
  payload: {
    subSubProjectId: string
  } & PaginationRequest
): Promise<{data: ResponseContributorModel}> => {
  return await makeApiCall({
    action: 'getContributorsSubSubProject',
    queryParams: payload,
  })
}

export const getOneContributor = async (payload: {
  contributorId: string
}): Promise<OneContributorModel> => {
  const {contributorId} = payload
  return await makeApiCall({
    action: 'getOneContributor',
    urlParams: {contributorId},
  })
}

export const deleteOneContributor = async (payload: {
  contributorId: string
  password: string
}): Promise<{data: OneContributorModel}> => {
  const {contributorId, password} = payload
  return await makeApiCall({
    action: 'deleteOneContributor',
    urlParams: {contributorId},
    body: {password},
  })
}

export const updateRoleContributor = async (payload: {
  contributorId: string
  role: string
}): Promise<{data: OneContributorModel}> => {
  return await makeApiCall({
    action: 'updateRoleContributor',
    body: payload,
  })
}
