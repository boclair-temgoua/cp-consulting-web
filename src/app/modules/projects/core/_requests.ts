import {ResponseContributorModel} from '../../contributors/core/_models'
import {makeApiCall} from '../../utils/get-url-end-point'
import {PaginationRequest} from '../../utils/pagination-item'
import {ProjectModel, ProjectRequestModel} from './_models'

export const getProjectsContributes = async (
  payload: PaginationRequest
): Promise<{data: ResponseContributorModel}> => {
  return await makeApiCall({
    action: 'getProjectsContributes',
    queryParams: payload,
  })
}

export const getOneProject = async (payload: {
  projectId: string
}): Promise<{data: ProjectModel}> => {
  const {projectId} = payload
  return await makeApiCall({
    action: 'getOneProject',
    urlParams: {projectId},
  })
}

export const createOneProject = async (
  payload: ProjectRequestModel
): Promise<{data: ProjectModel}> => {
  return await makeApiCall({
    action: 'createOneProject',
    body: payload,
  })
}

export const updateOneProject = async (
  payload: ProjectRequestModel
): Promise<{data: ProjectModel}> => {
  const {projectId, name, description} = payload
  return await makeApiCall({
    action: 'updateOneProject',
    urlParams: {projectId},
    body: {name, description},
  })
}
