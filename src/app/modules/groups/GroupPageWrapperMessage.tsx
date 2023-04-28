/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getOneGroup } from './core/_requests'
import { KTSVG } from '../../../_metronic/helpers'
import { GroupHeader } from './components/GroupHeader'
import { useDebounce } from '../utils/use-debounce'
import { EmptyTable } from '../utils/empty-table'
import { ContributorModel, arrayAuthorized } from '../contributors/core/_models'
import ContributorList from '../contributors/hook/ContributorList'
import { getContributorsGroup } from '../contributors/core/_requests'
import { SearchInput } from '../utils/forms/SearchInput'
import { PaginationItem } from '../utils/pagination-item'
import { InviteContributorFormModal } from '../contributors/hook/InviteContributorFormModal'

const GroupPageWrapperMessage: FC = () => {
  const { groupId } = useParams<string>()
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams();
  const [pageItem, setPageItem] = useState(Number(searchParams.get('page')) || 1)
  const [filter, setFilter] = useState<string>('')

  const fetchOneGroup = async () => await getOneGroup({ groupId: String(groupId) })
  const {
    data: groupItem,
  } = useQuery({
    queryKey: ['group', groupId],
    queryFn: () => fetchOneGroup(),
    enabled: Boolean(groupId),
  })
  const group = groupItem?.data

  const debouncedFilter = useDebounce(filter, 500);
  const isEnabled = Boolean(debouncedFilter)
  const fetchData = async (pageItem = 1, debouncedFilter: string) => await
    getContributorsGroup({
      search: debouncedFilter,
      take: 10,
      page: Number(pageItem || 1),
      sort: 'DESC',
      groupId: String(groupId)
    })
  const {
    isLoading: isLoadingContributor,
    isError: isErrorContributor,
    data: dataContributor,
    isPreviousData,
  } = useQuery({
    queryKey: ['contributors', pageItem, debouncedFilter, groupId],
    queryFn: () => fetchData(pageItem, debouncedFilter),
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
  })

  // Prefetch the next page!
  useEffect(() => {
    if (dataContributor?.data?.total_page !== pageItem) {
      queryClient.prefetchQuery
        (['contributors', pageItem + 1], () =>
          fetchData(pageItem + 1, debouncedFilter)
        )
    }
  }, [dataContributor?.data, pageItem, queryClient, groupId, debouncedFilter])

  const paginate = (pageItem: number) => {
    setPageItem(pageItem)
  }

  const dataTableContributor = isLoadingContributor ? (<tr><td><strong>Loading...</strong></td></tr>) :
    isErrorContributor ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
      (dataContributor?.data?.total <= 0) ? (<EmptyTable name='contributor' />) :
        (
          dataContributor?.data?.value?.map((item: ContributorModel, index: number) => (
            <ContributorList item={item} key={index} contributor={group} />
          )))

  return (
    <>
      {/* <HelmetSite title={`${group?.name || 'Group'}`} /> */}
      <PageTitle
        breadcrumbs={[
          {
            title: `Group |`,
            path: `/groups/${groupId}/message`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Messages
      </PageTitle>


      <a href={void (0)} className='btn-flex btn-light-primary fw-bolder'
        onClick={() => { navigate(-1) }} style={{ cursor: 'pointer' }}>
        <KTSVG path='/media/icons/duotune/arrows/arr063.svg' className='svg-icon-2' />
      </a>
      <a href={void (0)} className='btn-flex btn-light-primary fw-bolder'
        onClick={() => { navigate(1) }} style={{ cursor: 'pointer' }}>
        <KTSVG path='/media/icons/duotune/arrows/arr001.svg' className='svg-icon-2' />
      </a>

      <GroupHeader group={group} />













    </>
  )
}

export default GroupPageWrapperMessage
