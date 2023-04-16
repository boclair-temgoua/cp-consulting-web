import {ResponseContributorModel} from '../../contributors/core/_models'
import {makeApiCall} from '../../utils/get-url-end-point'
import {PaginationRequest} from '../../utils/pagination-item'
import {OrganizationModel} from './_models'

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
