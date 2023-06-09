import {makeApiCall} from '../../utils/get-url-end-point'
import {PaginationRequest} from '../../utils/pagination-item'
import {DiscountModel, DiscountRequestModel, ResponseDiscountModel} from './_models'

export const getDiscountsBy = async (
  payload: {
    is_paginate: boolean
  } & PaginationRequest
): Promise<{data: ResponseDiscountModel}> => {
  return await makeApiCall({
    action: 'getDiscountsBy',
    queryParams: payload,
  })
}

export const getOneDiscount = async (payload: {DiscountId: string}): Promise<DiscountModel> => {
  const {DiscountId} = payload
  return await makeApiCall({
    action: 'getOneDiscount',
    urlParams: {DiscountId},
  })
}

export const createOneDiscount = async (payload: DiscountRequestModel): Promise<DiscountModel> => {
  return await makeApiCall({
    action: 'createOneDiscount',
    body: payload,
  })
}

export const updateOneDiscount = async (payload: DiscountRequestModel): Promise<any> => {
  const {discountId, name, expiredAt, startedAt, percent, description} = payload
  return await makeApiCall({
    action: 'updateOneDiscount',
    urlParams: {discountId},
    body: {name, expiredAt, startedAt, percent, description},
  })
}

export const changeStatusOneDiscount = async (payload: {discountId: string}): Promise<any> => {
  return await makeApiCall({
    action: 'changeStatusOneDiscount',
    queryParams: payload,
  })
}

export const deleteOneDiscount = async (payload: {discountId: string}): Promise<any> => {
  const {discountId} = payload
  return await makeApiCall({
    action: 'deleteOneDiscount',
    urlParams: {discountId},
  })
}
