/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { useSearchParams } from 'react-router-dom'
import { HelmetSite } from '../utils'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getOrganizationsContributes } from './core/_requests'
import { useDebounce } from '../utils/use-debounce';
import { PaginationItem } from '../utils/pagination-item'
import OrganizationList from './hook/OrganizationList'
import { useAuth } from '../auth'
import { ContributorModel } from '../contributors/core/_models'
import { EmptyTable } from '../utils/empty-table'


const OrganizationWrapper: React.FC = () => {
  const { organization } = useAuth() as any
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams();
  const [pageItem, setPageItem] = useState(Number(searchParams.get('page')) || 1)
  const [filter, setFilter] = useState<string>('')

  const debouncedFilter = useDebounce(filter, 500);
  const isEnabled = Boolean(debouncedFilter)
  const fetchData = async (pageItem = 1, debouncedFilter: string) => await
    getOrganizationsContributes({
      search: debouncedFilter,
      take: 5,
      page: Number(pageItem || 1),
      sort: 'DESC'
    })
  const {
    isLoading,
    isError,
    data,
    isPreviousData,
  } = useQuery(['organizations', pageItem, debouncedFilter], () => fetchData(pageItem, debouncedFilter), {
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
    staleTime: 5000
  })

  // Prefetch the next page!
  useEffect(() => {
    if (data?.data?.total_page !== pageItem) {
      queryClient.prefetchQuery
        (['organizations', pageItem + 1], () =>
          fetchData(pageItem + 1, debouncedFilter)
        )
    }
  }, [data, pageItem, queryClient])

  const paginate = (pageItem: number) => {
    setPageItem(pageItem)
  }

  const dataTable = isLoading ? (<tr><td><strong>Loading...</strong></td></tr>) :
    isError ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
      (data?.data?.total <= 0) ? (<EmptyTable name='organization' />) :
        (
          data?.data?.value?.map((item: ContributorModel, index: number) => (
            <OrganizationList item={item} key={index} />
          )))


  return (
    <>
      <HelmetSite title={`${organization?.name || 'Organization'}`} />
      <PageTitle breadcrumbs={[{
        title: `${organization?.name} |`,
        path: '/organizations',
        isSeparator: false,
        isActive: false,
      },]}>Organizations</PageTitle>

      <div className={`card mb-5 mb-xl-8`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Organizations</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>Over {data?.data?.total || 0} organizations</span>
          </h3>
        </div>
        <div className="card-header border-0 pt-6">
          <div className="card-title">
            <div className="d-flex align-items-center position-relative my-1">
              <span className="svg-icon svg-icon-1 position-absolute ms-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px">
                  <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                  <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                </svg>
              </span>
              <input type="text" className="form-control form-control-solid w-250px ps-14"
                placeholder="Search contributor"
                name="search"
                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(e.target.value)} />
            </div>
          </div>
        </div>

        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className="fw-bolder fs-6 text-gray-800">
                  <th>Name</th>
                  <th>Contributors</th>
                  <th className="text-end min-w-100px"></th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>

                {dataTable}

              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>

          <PaginationItem
            data={data}
            setPageItem={setPageItem}
            setPreviewPageItem={(old: number) => Math.max(old - 1, 1)}
            setNextPageItem={(old: number) => old + 1}
            paginate={paginate}
            isPreviousData={isPreviousData}
            pageItem={pageItem}
          />

          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}

export default OrganizationWrapper
