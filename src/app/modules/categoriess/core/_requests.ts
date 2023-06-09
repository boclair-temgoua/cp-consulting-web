import {makeApiCall} from '../../utils/get-url-end-point'
import {PaginationRequest} from '../../utils/pagination-item'
import {CategoryModel, CategoryRequestModel, ResponseCategoryModel} from './_models'

export const getCategoriesBy = async (
  payload: {
    organizationId?: string
    is_paginate: boolean
  } & PaginationRequest
): Promise<{data: ResponseCategoryModel}> => {
  return await makeApiCall({
    action: 'getCategoriesBy',
    queryParams: payload,
  })
}

export const getOneCategory = async (payload: {categoryId: string}): Promise<CategoryModel> => {
  const {categoryId} = payload
  return await makeApiCall({
    action: 'getOneCategory',
    urlParams: {categoryId},
  })
}

export const createOneCategory = async (payload: CategoryRequestModel): Promise<CategoryModel> => {
  return await makeApiCall({
    action: 'createOneCategory',
    body: payload,
  })
}

export const updateOneCategory = async (payload: CategoryRequestModel): Promise<any> => {
  const {categoryId, name, description, organizationId} = payload
  return await makeApiCall({
    action: 'updateOneCategory',
    urlParams: {categoryId},
    body: {name, description, organizationId},
  })
}

export const deleteOneCategory = async (payload: {
  categoryId: string
  password: string
}): Promise<any> => {
  const {categoryId, password} = payload
  return await makeApiCall({
    action: 'deleteOneCategory',
    urlParams: {categoryId},
    body: {password},
  })
}
