import {ResponseContributorModel} from '../../contributors/core/_models'
import {makeApiCall} from '../../utils/get-url-end-point'
import {PaginationRequest} from '../../utils/pagination-item'
import {OrganizationModel, OrganizationRequestModel} from './_models'

export const getOrganizationsContributes = async (
  payload: PaginationRequest
): Promise<{data: ResponseContributorModel}> => {
  return await makeApiCall({
    action: 'getOrganizationsContributes',
    queryParams: payload,
  })
}

export const getOneOrganization = async (payload: {
  organizationId: string
}): Promise<{data: OrganizationModel}> => {
  return await makeApiCall({
    action: 'getOneOrganization',
    queryParams: payload,
  })
}

export const updateOneOrganization = async (payload: OrganizationRequestModel): Promise<any> => {
  const {organizationId} = payload
  return await makeApiCall({
    action: 'updateOneOrganization',
    urlParams: {organizationId},
    body: payload,
  })
}
