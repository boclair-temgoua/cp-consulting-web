import React, { FC, useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { KTSVG } from '../../../_metronic/helpers'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from '../utils/use-debounce'
import { getContributorsProject } from './core/_requests'
import { getOneProject } from '../projects/core/_requests'
import { EmptyTable } from '../utils/empty-table'
import { ContributorModel } from './core/_models'
import ContributorList from './hook/ContributorList'
import { PaginationItem } from '../utils/pagination-item'
import { SearchInput } from '../utils/forms/SearchInput'
import { InviteContributorFormModal } from './hook/InviteContributorFormModal'

const ContributorsProjectWrapper: FC = () => {
  const location = useLocation()
  const { projectId } = useParams<string>()
  const queryClient = useQueryClient()
  const [searchParams] = useSearchParams();
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [pageItem, setPageItem] = useState(Number(searchParams.get('page')) || 1)
  const [filter, setFilter] = useState<string>('')

  const fetchOneProject = async () => await getOneProject({ projectId: String(projectId) })
  const { data: projectItem, isError: isErrorProject, isLoading: isLoadingProject } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchOneProject(),
  })
  const project = projectItem?.data as any

  const debouncedFilter = useDebounce(filter, 500);
  const isEnabled = Boolean(debouncedFilter)
  const fetchData = async (pageItem = 1, debouncedFilter: string) => await
    getContributorsProject({
      search: debouncedFilter,
      take: 10,
      page: Number(pageItem || 1),
      sort: 'DESC',
      projectId: String(projectId)
    })
  const {
    isLoading,
    isError,
    data,
    isPreviousData,
  } = useQuery({
    queryKey: ['contributors', pageItem, debouncedFilter, projectId],
    queryFn: () => fetchData(pageItem, debouncedFilter),
    enabled: filter ? isEnabled : !isEnabled,
    keepPreviousData: true,
  })

  // Prefetch the next page!
  useEffect(() => {
    if (data?.data?.total_page !== pageItem) {
      queryClient.prefetchQuery
        (['contributors', pageItem + 1], () =>
          fetchData(pageItem + 1, debouncedFilter)
        )
    }
  }, [data, pageItem, queryClient])

  const paginate = (pageItem: number) => {
    setPageItem(pageItem)
  }

  const dataTable = isLoadingProject || isLoading ? (<tr><td><strong>Loading...</strong></td></tr>) :
    isErrorProject || isError ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
      (data?.data?.total <= 0) ? (<EmptyTable name='contributor' />) :
        (
          data?.data?.value?.map((item: ContributorModel, index: number) => (
            <ContributorList item={item} key={index} contributor={project} />
          )))

  return (
    <>
      <HelmetSite title={`Contributors ${project?.name || ''}`} />
      <PageTitle breadcrumbs={[{
        title: `${project?.name} |`,
        path: `/projects/${projectId}/contributors`,
        isSeparator: false,
        isActive: false,
      }]}>Contributor</PageTitle>

      <div className='card mb-5 mb-xl-10'>

        <div className="card-body pt-9 pb-0">
          <div className="d-flex flex-wrap flex-sm-nowrap mb-6">
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img src='https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg' alt='Metornic' />
              </div>
            </div>
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-1">
                    <span className="text-gray-800 text-hover-primary fs-2 fw-bold me-3">{projectItem?.data?.name || 'Project'}</span>
                    {/* <span className="badge badge-light-success me-auto">In Progress</span> */}
                  </div>
                  <div className="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400">
                    {projectItem?.data?.description || 'Project'}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap justify-content-start">
                <div className="d-flex flex-wrap">

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{projectItem?.data?.contributorTotal}</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>Contributors</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{projectItem?.data?.documentTotal || 0}</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>Documents</div>
                  </div>

                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>300</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>Projects</div>
                  </div>

                </div>

                <div className="symbol-group symbol-hover mb-3">
                  <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-bs-original-title="Alan Warden">
                    <span className="symbol-label bg-warning text-inverse-warning fw-bold">BT</span>
                  </div>
                  <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-bs-original-title="Susan Redwood">
                    <span className="symbol-label bg-primary text-inverse-primary fw-bold">AM</span>
                  </div>
                  <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-bs-original-title="Susan Redwood">
                    <span className="symbol-label bg-info text-inverse-info fw-bold">BO</span>
                  </div>
                  <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-bs-original-title="Perry Matthew">
                    <span className="symbol-label bg-primary text-inverse-primary fw-bold">TI</span>
                  </div>
                  <div className="symbol symbol-35px symbol-circle" data-bs-toggle="tooltip" data-bs-original-title="Perry Matthew">
                    <span className="symbol-label bg-danger text-inverse-danger fw-bold">BT</span>
                  </div>

                  <a href="#" className="symbol symbol-35px symbol-circle">
                    <span className="symbol-label bg-dark text-inverse-dark fs-8 fw-bold">+42</span>
                  </a>

                </div>
              </div>
            </div>
          </div>

          <div className="separator"></div>

          <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold">
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/projects/${projectId}` && 'active')
                }
                to={`/projects/${projectId}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/projects/${projectId}/sb-p` && 'active')
                }
                to={`/projects/${projectId}/sb-p`}
              >
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-active-primary py-5 me-6 " href="#">
                Documents
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-active-primary py-5 me-6 " href="#">
                Contacts
              </a>
            </li>
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/projects/${projectId}/contributors` && 'active')
                }
                to={`/projects/${projectId}/contributors`}
              >
                Contributors
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link text-active-primary py-5 me-6" href="#">
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div>


      <div className={`card mb-5 mb-xl-8`}>

        {/* begin::Header */}
        <div className="card-header border-0 pt-5">
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Contributors</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>Over {data?.data?.total || 0} contributors</span>
          </h3>

          {/* {project?.role?.name === 'ADMIN' && (
            <div className='card-toolbar' title='Click to add a user'>
              <a href='#' className='btn btn-sm btn-primary'>
                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                New Contributor
              </a>
            </div>
          )} */}

          {project?.role?.name === 'ADMIN' && (
            <div className="card-toolbar">
              <div className="d-flex justify-content-end">

                <button type="button" onClick={() => { setOpenModal(true) }} className="btn btn-sm btn-primary me-1">
                  New Contributor
                </button>

              </div>
            </div>
          )}

        </div>
        <div className="card-header border-0 pt-5">
          <SearchInput className='d-flex align-items-center position-relative my-1'
            classNameInput='form-control w-250px ps-14'
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(e.target.value)}
            placeholder='Search by email, first name or last name' />
        </div>
        {/* end::Header */}

        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>

            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder fs-6 text-gray-800">
                  <th>Profile</th>
                  <th></th>
                  <th></th>
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

        {openModal && (<InviteContributorFormModal setOpenModal={setOpenModal} projectId={project?.id} />)}

      </div>
      {/* <ProjectPage /> */}
    </>
  )
}

export default ContributorsProjectWrapper
