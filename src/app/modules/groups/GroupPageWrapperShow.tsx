/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite, capitalizeOneFirstLetter } from '../utils'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getOneGroup } from './core/_requests'
import { KTSVG } from '../../../_metronic/helpers'
import { getPostsBy } from '../posts/core/_requests'
import { PostModel } from '../posts/core/_models'
import PostList from '../posts/hook/PostList'
import { PaginationItem } from '../utils/pagination-item'
import { useDebounce } from '../utils/use-debounce'
import { PostCreateFormModal } from '../posts/hook/PostCreateFormModal'
import { ListsWidget2 } from '../../../_metronic/partials/widgets'
import ContributorMiniList from '../contributors/hook/ContributorMiniList'
import { ContributorModel } from '../contributors/core/_models'
import { getContributorsGroup } from '../contributors/core/_requests'
import { GroupHeader } from './components/GroupHeader'

const GroupPageWrapperShow: FC = () => {
  const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
  const [value, setValue] = useState('')
  const queryClient = useQueryClient()
  const takeValue: number = 6
  const { groupId } = useParams<string>()
  const navigate = useNavigate();
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [pageItem, setPageItem] = useState(Number(searchParams.get('page')) || 1)
  const [filter, setFilter] = useState<string>('')


  const fetchOneGroup = async () => await getOneGroup({ groupId: String(groupId) })
  const {
    isLoading: isLoadingGroup,
    isError: isErrorGroup,
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
    getPostsBy({
      search: debouncedFilter,
      take: takeValue,
      page: Number(pageItem || 1),
      sort: 'DESC',
      groupId: String(group?.id || groupId),
    })
  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    data: dataPosts,
    isPreviousData,
  } = useQuery(['posts', pageItem, 'DESC', debouncedFilter], () => fetchData(pageItem, debouncedFilter), {
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
  })

  // Prefetch the next page!
  useEffect(() => {
    if (dataPosts?.data?.total_page !== pageItem) {
      queryClient.prefetchQuery
        (['posts', pageItem + 1], () =>
          fetchData(pageItem + 1, debouncedFilter)
        )
    }
  }, [dataPosts?.data, pageItem, queryClient, debouncedFilter, groupId])

  const paginate = (pageItem: number) => {
    setPageItem(pageItem)
    navigate(`/groups/${groupId}?${pageItem !== 1 ? `page=${pageItem}` : ''}`)
  }


  const dataPostTable = isLoadingPost ? (
    <strong>Loading...</strong>
  ) : isErrorPost ? (
    <strong>Error find data please try again...</strong>
  ) : dataPosts?.data?.total <= 0 ? ('') : (
    dataPosts?.data?.value?.map((item: PostModel, index: number) => (
      <PostList item={item} key={index} />
    ))
  )

  if (isErrorGroup) {
    navigate(`/error/404`, {replace: true})
  }

  return (
    <>
      <HelmetSite title={`${group?.name || 'Group'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${group?.name || 'Group'} |`,
            path: `/groups/${groupId}`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Group
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


      <div className='row g-5 g-xxl-8'>
        <div className='col-xl-8'>
          {dataPostTable}

          <PaginationItem
            data={dataPosts}
            setPageItem={setPageItem}
            setPreviewPageItem={(old: number) => Math.max(old - 1, 1)}
            setNextPageItem={(old: number) => old + 1}
            paginate={paginate}
            isPreviousData={isPreviousData}
            pageItem={pageItem}
          />
        </div>

        <div className='col-xl-4'>
          {/* <ChartsWidget1 className='mb-5 mb-xxl-8' />

        <ListsWidget5 className='mb-5 mb-xxl-8' /> */}

          <ListsWidget2 className='mb-5 mb-xxl-8' />
        </div>
      </div>
    </>
  )
}

export default GroupPageWrapperShow
