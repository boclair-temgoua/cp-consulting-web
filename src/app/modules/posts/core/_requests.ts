import {makeApiCall} from '../../utils/get-url-end-point'
import {PaginationRequest} from '../../utils/pagination-item'
import {PostModel, PostRequestModel, ResponsePostModel} from './_models'

export const getPostsBy = async (
  payload: {
    groupId: string
  } & PaginationRequest
): Promise<{data: ResponsePostModel}> => {
  return await makeApiCall({
    action: 'getPostsBy',
    queryParams: payload,
  })
}

export const getOnePost = async (payload: {postSlug: string}): Promise<{data: PostModel}> => {
  const {postSlug} = payload
  return await makeApiCall({
    action: 'getOnePost',
    queryParams: {postSlug},
  })
}

export const createOnePost = async (payload: PostRequestModel): Promise<{data: PostModel}> => {
  return await makeApiCall({
    action: 'createOnePost',
    body: payload,
  })
}

export const updateOnePost = async (payload: PostRequestModel): Promise<{data: PostModel}> => {
  const {postId} = payload
  return await makeApiCall({
    action: 'updateOnePost',
    urlParams: {postId},
    body: payload,
  })
}

export const deleteOnePost = async (payload: {postId: string}): Promise<{data: PostModel}> => {
  const {postId} = payload
  return await makeApiCall({
    action: 'deleteOnePost',
    urlParams: {postId},
  })
}
