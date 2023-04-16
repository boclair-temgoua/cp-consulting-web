import {ResponseContributorModel} from '../../contributors/core/_models'
import {ProjectRequestModel} from '../../projects/core/_models'
import {makeApiCall} from '../../utils/get-url-end-point'
import {PaginationRequest} from '../../utils/pagination-item'
import {SubSubProjectModel, SubSubProjectRequestModel} from './_models'

export const getSubSubProjectsContributes = async (
  payload: {
    subProjectId: string
  } & PaginationRequest
): Promise<{data: ResponseContributorModel}> => {
  return await makeApiCall({
    action: 'getSubSubProjectsContributes',
    queryParams: payload,
  })
}

export const getOneSubSubProject = async (payload: {
  subSubProjectId: string
}): Promise<{data: SubSubProjectModel}> => {
  return await makeApiCall({
    action: 'getOneSubSubProject',
    queryParams: payload,
  })
}

export const deleteOneSubSubProject = async (payload: {
  password: string
  subSubProjectId: string
}): Promise<{data: SubSubProjectModel}> => {
  const {subSubProjectId, password} = payload
  return await makeApiCall({
    action: 'deleteOneSubSubProject',
    urlParams: {subSubProjectId},
    body: {password},
  })
}

export const createOneSubSubProject = async (
  payload: ProjectRequestModel
): Promise<{data: SubSubProjectModel}> => {
  return await makeApiCall({
    action: 'createOneSubSubProject',
    body: payload,
  })
}

export const updateOneSubSubProject = async (
  payload: ProjectRequestModel
): Promise<{data: SubSubProjectModel}> => {
  const {subSubProjectId} = payload
  return await makeApiCall({
    action: 'updateOneSubSubProject',
    urlParams: {subSubProjectId},
    body: payload,
  })
}
