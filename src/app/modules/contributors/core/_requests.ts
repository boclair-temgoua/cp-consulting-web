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
}): Promise<OneContributorModel> => {
  const {contributorId} = payload
  return await makeApiCall({
    action: 'deleteOneContributor',
    urlParams: {contributorId},
  })
}
