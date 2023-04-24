import {makeApiCall} from '../../utils/get-url-end-point'
import {PaginationRequest} from '../../utils/pagination-item'
import {PostModel, PostRequestModel, ResponsePostModel} from './_models'

export const getPostsBy = async (
  payload: PaginationRequest
): Promise<{data: ResponsePostModel}> => {
  return await makeApiCall({
    action: 'getPostsBy',
    queryParams: payload,
  })
}

export const getOnePost = async (payload: {postId: string}): Promise<{data: PostModel}> => {
  const {postId} = payload
  return await makeApiCall({
    action: 'getOnePost',
    queryParams: {postId},
  })
}

export const createOnePost = async (payload: PostRequestModel): Promise<{data: PostModel}> => {
  return await makeApiCall({
    action: 'createOnePost',
    body: payload,
  })
}

export const updateOnePost = async (payload: PostRequestModel): Promise<{data: PostModel}> => {
  const {postId, title, description} = payload
  return await makeApiCall({
    action: 'updateOnePost',
    urlParams: {postId},
    body: {title, description},
  })
}

export const deleteOnePost = async (payload: {postId: string}): Promise<{data: PostModel}> => {
  const {postId} = payload
  return await makeApiCall({
    action: 'deleteOnePost',
    urlParams: {postId},
  })
}
