import {PageType, makeApiCall} from '../../utils/get-url-end-point'
import {PaginationRequest} from '../../utils/pagination-item'
import {OneContactModel, RequestContactModel, ResponseContactModel} from './_models'

export const getContactsBy = async (
  payload: {
    type: PageType
    organizationId?: string
    projectId?: string
    subProjectId?: string
  } & PaginationRequest
): Promise<{data: ResponseContactModel}> => {
  return await makeApiCall({
    action: 'getContactsBy',
    queryParams: payload,
  })
}

export const getOneContact = async (payload: {contactId: string}): Promise<OneContactModel> => {
  const {contactId} = payload
  return await makeApiCall({
    action: 'getOneContact',
    urlParams: {contactId},
  })
}

export const createOneContact = async (payload: RequestContactModel): Promise<OneContactModel> => {
  return await makeApiCall({
    action: 'createOneContact',
    body: payload,
  })
}

export const deleteOneContact = async (payload: {
  contactId: string
  password: string
}): Promise<any> => {
  const {contactId, password} = payload
  return await makeApiCall({
    action: 'deleteOneContact',
    urlParams: {contactId},
    body: {password},
  })
}

export const deleteMultipleContact = async (payload: {
  password: string
  contacts: string[]
}): Promise<any> => {
  return await makeApiCall({
    action: 'deleteMultipleContact',
    body: payload,
  })
}
