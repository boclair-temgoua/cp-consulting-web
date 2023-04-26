import {ResponseContributorModel} from '../../contributors/core/_models'
import {ProjectRequestModel} from '../../projects/core/_models'
import {makeApiCall} from '../../utils/get-url-end-point'
import {FilterKeyId, PaginationRequest} from '../../utils/pagination-item'
import {GroupModel} from './_models'

export const getGroupsContributes = async (
  payload: FilterKeyId & PaginationRequest
): Promise<{data: ResponseContributorModel}> => {
  return await makeApiCall({
    action: 'getGroupsContributes',
    queryParams: payload,
  })
}

export const getOneGroup = async (payload: {groupId: string}): Promise<{data: GroupModel}> => {
  const {groupId} = payload
  return await makeApiCall({
    action: 'getOneGroup',
    queryParams: {groupId},
  })
}

export const createOneGroup = async (payload: ProjectRequestModel): Promise<{data: GroupModel}> => {
  return await makeApiCall({
    action: 'createOneGroup',
    body: payload,
  })
}

export const updateOneGroup = async (payload: ProjectRequestModel): Promise<{data: GroupModel}> => {
  const {groupId, name, description} = payload
  return await makeApiCall({
    action: 'updateOneGroup',
    urlParams: {groupId},
    body: {name, description},
  })
}

export const deleteOneGroup = async (payload: {
  password: string
  groupId: string
}): Promise<{data: GroupModel}> => {
  const {groupId, password} = payload
  return await makeApiCall({
    action: 'deleteOneGroup',
    urlParams: {groupId},
    body: {password},
  })
}
