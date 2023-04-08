import {ResponseContributorModel} from '../../contributors/core/_models'
import {ProjectRequestModel} from '../../projects/core/_models'
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
  subProjectId: string
}): Promise<{data: SubProjectModel}> => {
  return await makeApiCall({
    action: 'getOneSubProject',
    queryParams: payload,
  })
}

export const deleteOneSubProject = async (payload: {
  password: string
  subProjectId: string
}): Promise<{data: SubProjectModel}> => {
  const {subProjectId, password} = payload
  return await makeApiCall({
    action: 'deleteOneSubProject',
    urlParams: {subProjectId},
    body: {password},
  })
}

export const createOneSubProject = async (
  payload: ProjectRequestModel
): Promise<{data: SubProjectModel}> => {
  return await makeApiCall({
    action: 'createOneSubProject',
    body: payload,
  })
}

export const updateOneSubProject = async (
  payload: ProjectRequestModel
): Promise<{data: SubProjectModel}> => {
  const {subProjectId, name, description} = payload
  return await makeApiCall({
    action: 'updateOneSubProject',
    urlParams: {subProjectId},
    body: {name, description},
  })
}
