import {ResponseContributorModel} from '../../contributors/core/_models'
import {makeApiCall} from '../../utils/get-url-end-point'
import {PaginationRequest} from '../../utils/pagination-item'
import {SubProjectModel} from './_models'

export const getSubProjectsContributes = async (
  payload: {
    projectId: string
  } & PaginationRequest
): Promise<{data: ResponseContributorModel}> => {
  return await makeApiCall({
    action: 'getSubProjectsContributes',
    queryParams: payload,
  })
}

export const getOneSubProject = async (payload: {
  projectId: string
  subProjectId: string
}): Promise<{data: SubProjectModel}> => {
  return await makeApiCall({
    action: 'getOneSubProject',
    queryParams: payload,
  })
}
