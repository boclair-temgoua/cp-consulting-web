import {getCategoriesBy} from '../../modules/categoriess/core/_requests'
import {SortModel} from '../../modules/utils/pagination-item'
import {GET_CATEGORIES} from './index'

export const loadAllCategories =
  (options: {
    take: number
    page: number
    sort: SortModel
    is_paginate: boolean
    organizationId: string
  }) =>
  async (dispatch: any) => {
    const {take, page, sort, is_paginate, organizationId} = options
    await getCategoriesBy({
      take: take,
      page: page,
      sort: sort,
      is_paginate,
      organizationId: String(organizationId),
    })
      .then((response) =>
        dispatch({
          type: GET_CATEGORIES,
          payload: response.data,
        })
      )
      .catch((error: any) => console.error('Error ---->', error.message))
  }
