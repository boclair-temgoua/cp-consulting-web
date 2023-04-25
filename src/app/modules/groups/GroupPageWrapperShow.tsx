import { FC, useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite, capitalizeOneFirstLetter } from '../utils'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getOneGroup } from './core/_requests'
import { KTSVG } from '../../../_metronic/helpers'
import { formateDaysMonthYearFormatDays } from '../utils/formate-date-dayjs'
import { getPostsBy } from '../posts/core/_requests'
import { PostModel } from '../posts/core/_models'
import PostList from '../posts/hook/PostList'
import { PaginationItem } from '../utils/pagination-item'
import { useDebounce } from '../utils/use-debounce'
import { EmptyTable } from '../utils/empty-table'
import { PostCreateFormModal } from '../posts/hook/PostCreateFormModal'

const GroupPageWrapperShow: FC = () => {
  const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
  const [value, setValue] = useState('')
  const queryClient = useQueryClient()
  const takeValue: number = 6
  const { groupId } = useParams<string>()
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
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
    getPostsBy({
      search: debouncedFilter,
      take: takeValue,
      page: Number(pageItem || 1),
      sort: 'DESC',
      groupId: String(groupId),
    })
  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    data: dataPosts,
    isPreviousData,
  } = useQuery(['posts', pageItem, 'DESC', debouncedFilter], () => fetchData(pageItem, debouncedFilter), {
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
    staleTime: 5000
  })

  // Prefetch the next page!
  useEffect(() => {
    if (dataPosts?.data?.total_page !== pageItem) {
      queryClient.prefetchQuery
        (['posts', pageItem + 1], () =>
          fetchData(pageItem + 1, debouncedFilter)
        )
    }
  }, [dataPosts?.data, pageItem, queryClient, debouncedFilter])

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



      <div className='flex-column-fluid'>

        <div className='d-flex flex-column flex-lg-row'>


          <div className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-400px mb-10 mb-lg-0">
            <div className="card mb-5 mb-xl-8">

              <div className="card-header pt-3">
                <div className="d-flex align-items-center">
                  <div className="symbol symbol-circle symbol-50px me-5">

                    {group?.image ?
                      <img src={group?.image} alt={`${group?.name}`} /> :
                      <div className={`symbol-label fw-bold bg-${group?.color} text-inverse-${group?.color}`}>
                        {capitalizeOneFirstLetter(String(group?.name))}
                      </div>
                    }

                  </div>
                  <div className="flex-grow-1">
                    <a href="#pablo" className="text-gray-800 text-hover-primary fs-4 fw-bold">{group?.name}</a>
                    <span className="text-gray-400 fw-semibold d-block">{formateDaysMonthYearFormatDays(group?.createdAt as Date)}</span>
                  </div>
                </div>
                {/* <div className="fs-6 fw-normal text-gray-700" dangerouslySetInnerHTML={{ __html: group?.description as string }} /> */}
              </div>

              <div className="row px-9 mb-3">
                <div className="col-md-4 text-center">
                  <div className="text-gray-800 fw-bold fs-3">
                    <span className="m-0 counted"> {group?.postTotal || 0}</span>
                  </div>

                  <span className="text-gray-500 fs-8 d-block fw-bold">POSTS</span>
                </div>
                <div className="col-md-4 text-center">
                  <div className="text-gray-800 fw-bold fs-3">
                    <span className="m-0 counted">201</span>
                  </div>

                  <span className="text-gray-500 fs-8 d-block fw-bold">TASKS</span>
                </div>
                <div className="col-md-4 text-center">
                  <div className="text-gray-800 fw-bold fs-3">
                    <span className="m-0 counted">{group?.contributorTotal || 0}</span>
                  </div>

                  <span className="text-gray-500 fs-8 d-block fw-bold">MEMBERS</span>
                </div>
              </div>
              <div className="m-0">
                <ul className="nav nav-pills nav-pills-custom flex-column border-transparent fs-5 fw-bold">
                  <li className="nav-item mt-5">
                    <a className="nav-link text-muted text-active-primary ms-0 py-0 me-10 ps-9 border-0 active" href="#">
                      Feeds
                      <span className="bullet-custom position-absolute start-0 top-0 w-3px h-100 bg-primary rounded-end"></span>
                    </a>
                  </li>
                  <li className="nav-item mt-5">
                    <a className="nav-link text-muted text-active-primary ms-0 py-0 me-10 ps-9 border-0 " href="#">
                      Tasks
                      <span className="bullet-custom position-absolute start-0 top-0 w-3px h-100 bg-primary rounded-end"></span>
                    </a>
                  </li>
                  <li className="nav-item mt-5">
                    <a className="nav-link text-muted text-active-primary ms-0 py-0 me-10 ps-9 border-0 " href="#">
                      Members
                      <span className="bullet-custom position-absolute start-0 top-0 w-3px h-100 bg-primary rounded-end"></span>
                    </a>
                  </li>
                  <li className="nav-item mt-5">
                    <a className="nav-link text-muted text-active-primary ms-0 py-0 me-10 ps-9 border-0 " href="#">
                      Settings
                      <span className="bullet-custom position-absolute start-0 top-0 w-3px h-100 bg-primary rounded-end"></span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* </div> */}
            </div>

            <div className="card mb-5 mb-xl-8">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold text-dark">Suggestions members</span>
                </h3>
              </div>
              <div className="card-body pt-5">
                <div className="d-flex flex-stack">
                  <div className="symbol symbol-40px me-5">
                    <img src="/media/avatars/300-26.jpg" className="h-50 align-self-center" alt="" />
                  </div>
                  <div className="d-flex align-items-center flex-row-fluid flex-wrap">
                    <div className="flex-grow-1 me-2">
                      <a href="#pablo" className="text-gray-800 text-hover-primary fs-6 fw-bold">Jacob Jones</a>

                      <span className="text-muted fw-semibold d-block fs-7">Barone LLC.</span>
                    </div>
                    <a href="#pablo" className="btn btn-sm btn-light fs-8 fw-bold">Invite</a>
                  </div>
                </div>
                <div className="separator separator-dashed my-4"></div>

                <div className="d-flex flex-stack">
                  <div className="symbol symbol-40px me-5">
                    <img src="/media/avatars/300-18.jpg" className="h-50 align-self-center" alt="" />
                  </div>
                  <div className="d-flex align-items-center flex-row-fluid flex-wrap">
                    <div className="flex-grow-1 me-2">
                      <a href="/metronic8/demo1/../demo1/pages/user-profile/overview.html" className="text-gray-800 text-hover-primary fs-6 fw-bold">Annette Black</a>

                      <span className="text-muted fw-semibold d-block fs-7">Binford Ltd.</span>
                    </div>
                    <a href="#pablo" className="btn btn-sm btn-light fs-8 fw-bold">Invite</a>
                  </div>
                </div>



              </div>
            </div>
          </div>


          <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10">

            <div className="card-flush d-grid gap-2 d-md-flex justify-content-md-end mb-3">
              <a href="#back" className='btn-flex btn-light-primary fw-bolder'
                onClick={() => { navigate(-1) }} style={{ cursor: 'pointer' }}>
                <KTSVG path='/media/icons/duotune/arrows/arr063.svg' className='svg-icon-2' />
              </a>
              <a href="#next" className='btn-flex btn-light-primary fw-bolder'
                onClick={() => { navigate(1) }} style={{ cursor: 'pointer' }}>
                <KTSVG path='/media/icons/duotune/arrows/arr001.svg' className='svg-icon-2' />
              </a>

              <button type="button" onClick={() => { setOpenCreateOrUpdateModal(true) }}  className="btn btn-sm btn-primary me-1">
                <KTSVG path='/media/icons/duotune/abstract/abs011.svg' className='svg-icon-3' />
                New Post
              </button>
            </div>


            {dataPostTable}


          </div>

          
            <PaginationItem
              data={dataPosts}
              setPageItem={setPageItem}
              setPreviewPageItem={(old: number) => Math.max(old - 1, 1)}
              setNextPageItem={(old: number) => old + 1}
              paginate={paginate}
              isPreviousData={isPreviousData}
              pageItem={pageItem}
            />
          {openCreateOrUpdateModal && (<PostCreateFormModal setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} groupId={String(groupId)} />)}
          {/* end::Table container */}

        </div>
      </div>




      {groupItem?.data?.role?.name === 'ADMIN' && (
        <div className='card  '>
          <div className='card-header border-0 cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bold m-0'>Delete: {groupItem?.data?.name || 'Project'}</h3>
            </div>
          </div>
          <div id='kt_account_settings_deactivate' className='collapse show'>
            <form
              id='kt_account_deactivate_form'
              className='form fv-plugins-bootstrap5 fv-plugins-framework'
            >
              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button type='submit' className='btn btn-sm btn-danger fw-semibold'>
                  <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />{' '}
                  Delete
                </button>
              </div>

              <input type='hidden' />
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default GroupPageWrapperShow
