// import {getOneApi} from '../../modules/user/api'
import {getContributorsOrganization} from '../../modules/contributors/core/_requests'
import {SortModel} from '../../modules/utils/pagination-item'
import {GET_CONTRIBUTORS_PROJECT, GET_CONTRIBUTORS_ORGANIZATION} from './rootAction'

export const loadContributorsOrganization =
  (options: {organizationId: string; take: number; page: number; sort: SortModel}) =>
  async (dispatch: any) => {
    const {organizationId, take, page, sort} = options

    try {
      const {data} = await getContributorsOrganization({
        take: take,
        page: page,
        sort: sort,
        type: 'ORGANIZATION',
        organizationId: String(organizationId),
      })

      dispatch({
        type: GET_CONTRIBUTORS_ORGANIZATION,
        payload: data,
      })
    } catch (error) {
      console.error(error)
    }
  }

export const loadContributorsProject = (options: {user_uuid: string}) => async (dispatch: any) => {
  const {user_uuid} = {...options}
  //   await getOneApi({user_uuid})
  //     .then((response: any) =>
  //       dispatch({
  //         type: GET_CONTRIBUTOR_PROJECT,
  //         payload: response.data,
  //       })
  //     )
  //     .catch((error: any) => console.error(error))
}
