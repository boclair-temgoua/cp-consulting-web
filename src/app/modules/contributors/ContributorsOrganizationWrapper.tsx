import React, { FC, useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { KTSVG } from '../../../_metronic/helpers'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getOneOrganization } from '../organizations/core/_requests'
import { useDebounce } from '../utils/use-debounce'
import { getContributorsOrganization } from './core/_requests'
import ContributorList from './hook/ContributorList'
import { ContributorModel } from './core/_models'
import { PaginationItem } from '../utils/pagination-item'
import { SearchInput } from '../utils/forms/SearchInput'
import { EmptyTable } from '../utils/empty-table'
import { useAuth } from '../auth'

const ContributorsOrganizationWrapper: FC = () => {
  const userItem = useAuth() as any
  const { organizationId } = useParams<string>()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams();
  const [pageItem, setPageItem] = useState(Number(searchParams.get('page')) || 1)
  const [filter, setFilter] = useState<string>('')

  const fetchOneOrganization = async () => await getOneOrganization({ organizationId: String(organizationId) })
  const { data: organizationItem, isError: isErrorOrganization, isLoading: isLoadingOrganization } = useQuery({
    queryKey: ['organization', organizationId],
    queryFn: () => fetchOneOrganization(),
  })
  const organization = organizationItem?.data

  const debouncedFilter = useDebounce(filter, 500);
  const isEnabled = Boolean(debouncedFilter)
  const fetchData = async (pageItem = 1, debouncedFilter: string) => await
    getContributorsOrganization({
      search: debouncedFilter,
      take: 10,
      page: Number(pageItem || 1),
      sort: 'DESC',
      type: 'ORGANIZATION',
      organizationId: String(organizationId)
    })
  const {
    isLoading,
    isError,
    data,
    isPreviousData,
  } = useQuery({
    queryKey: ['contributorsOrganization', pageItem, debouncedFilter, organizationId],
    queryFn: () => fetchData(pageItem, debouncedFilter),
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
  })

  // Prefetch the next page!
  useEffect(() => {
    if (data?.data?.total_page !== pageItem) {
      queryClient.prefetchQuery
        (['contributorsOrganization', pageItem + 1], () =>
          fetchData(pageItem + 1, debouncedFilter)
        )
    }
  }, [data, pageItem, queryClient])

  const paginate = (pageItem: number) => {
    setPageItem(pageItem)
  }

  const dataTable = isLoadingOrganization || isLoading ? (<tr><td><strong>Loading...</strong></td></tr>) :
    isErrorOrganization || isError ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
      (data?.data?.total <= 0) ? (<EmptyTable name='contributor' />) :
        (
          data?.data?.value?.map((item: ContributorModel, index: number) => (
            <ContributorList item={item} key={index} contributor={organization} />
          )))

  return (
    <>
      <HelmetSite title={`Contributors ${organization?.name || ''}`} />
      <PageTitle breadcrumbs={[{
        title: `${organization?.name} |`,
        path: `/organizations/${organizationId}/contributors`,
        isSeparator: false,
        isActive: false,
      }]}>Contributor</PageTitle>

      <div className={`card mb-5 mb-xl-8`}>

        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Contributors</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>Over {data?.data?.total || 0} contributors</span>
          </h3>
          <SearchInput className='d-flex align-items-center position-relative my-1'
            classNameInput='form-control form-control-solid w-250px ps-14'
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(e.target.value)}
            placeholder='Search contributor' />

          {organization?.role?.name === 'ADMIN' && (
            <div className='card-toolbar' title='Click to add a user'>
              <a href='#' className='btn btn-sm btn-primary'>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                New Contributor
              </a>
            </div>
          )}

        </div>
        {/* end::Header */}

        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>

            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder fs-6 text-gray-800">
                  <th>Profile</th>
                  <th>Role</th>
                  <th>Start date</th>
                  <th className="text-end min-w-100px"></th>
                </tr>
              </thead>
              <tbody>

                {dataTable}

              </tbody>
            </table>
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

        </div>


      </div>
      {/* <ProjectPage /> */}
    </>
  )
}

export default ContributorsOrganizationWrapper
