import {ResponseContributorModel} from '../../contributors/core/_models'
import {ProjectRequestModel} from '../../projects/core/_models'
import {makeApiCall} from '../../utils/get-url-end-point'
import {PaginationRequest} from '../../utils/pagination-item'
import {SubSubSubProjectModel} from './_models'

export const getSubSubSubProjectsContributes = async (
  payload: {
    subSubProjectId: string
  } & PaginationRequest
): Promise<{data: ResponseContributorModel}> => {
  return await makeApiCall({
    action: 'getSubSubSubProjectsContributes',
    queryParams: payload,
  })
}

export const getOneSubSubSubProject = async (payload: {
  subSubSubProjectId: string
}): Promise<{data: SubSubSubProjectModel}> => {
  return await makeApiCall({
    action: 'getOneSubSubSubProject',
    queryParams: payload,
  })
}

export const deleteOneSubSubSubProject = async (payload: {
  password: string
  subSubSubProjectId: string
}): Promise<{data: SubSubSubProjectModel}> => {
  const {subSubSubProjectId, password} = payload
  return await makeApiCall({
    action: 'deleteOneSubSubSubProject',
    urlParams: {subSubSubProjectId},
    body: {password},
  })
}

export const createOneSubSubSubProject = async (
  payload: ProjectRequestModel
): Promise<{data: SubSubSubProjectModel}> => {
  return await makeApiCall({
    action: 'createOneSubSubSubProject',
    body: payload,
  })
}

export const updateOneSubSubSubProject = async (
  payload: ProjectRequestModel
): Promise<{data: SubSubSubProjectModel}> => {
  const {subSubSubProjectId} = payload
  return await makeApiCall({
    action: 'updateOneSubSubSubProject',
    urlParams: {subSubSubProjectId},
    body: payload,
  })
}
