import { FC, useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneProject } from './core/_requests'
import { useAuth } from '../auth'
import { SubProjectTableMini } from '../sub-projects/SubProjectTableMini'
import { ContactProjectTableMini } from '../contacts/ContactProjectTableMini'
import { ContributorProjectTableMini } from '../contributors/ContributorProjectTableMini'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { DocumentTableMini } from '../documents/DocumentTableMini'
import { Dropdown1 } from '../../../_metronic/partials'

const ProjectPageWrapperShow: FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation()
  const takeValue: number = 6
  const { projectId } = useParams<string>()

  const fetchOneProject = async () => await getOneProject({ projectId: String(projectId) })
  const { data: projectItem, isError, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchOneProject(),
  })


  console.log('tab =======', searchParams.get('tab'))
  return (
    <>
      <HelmetSite title={`${projectItem?.data?.name || 'Project'}`} />
      <PageTitle breadcrumbs={[{
        title: `${projectItem?.data?.name || 'Project'} |`,
        path: `/projects/${projectId}`,
        isSeparator: false,
        isActive: false,
      }]}>Project</PageTitle>




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
                  (searchParams.get('tab') === '' && 'active')
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
                  (searchParams.get('tab') === `projects` && 'active')
                }
                to={`/projects/${projectId}?tab=${'projects'}`}
              >
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (searchParams.get('tab') === `documents` && 'active')
                }
                to={`/projects/${projectId}?tab=${'documents'}`}
              >
                Documents
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (searchParams.get('tab') === `contacts` && 'active')
                }
                to={`/projects/${projectId}?tab=${'contacts'}`}
              >
                Contacts
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (searchParams.get('tab') === `contributors` && 'active')
                }
                to={`/projects/${projectId}?tab=${'contributors'}`}
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

      {projectItem?.data?.id && (

        <>
          {searchParams.get('tab') === 'projects' && (
            <SubProjectTableMini project={projectItem?.data} takeValue={takeValue} />
          )}

          {searchParams.get('tab') === 'documents' && (
            <DocumentTableMini type='PROJECT' projectId={projectItem?.data?.id} />
          )}

          {searchParams.get('tab') === 'contributors' && (
            <ContributorProjectTableMini project={projectItem?.data} />
          )}

          {searchParams.get('tab') === 'contacts' && (
            <ContactProjectTableMini project={projectItem?.data} takeValue={takeValue} />
          )}
        </>
      )}

      {projectItem?.data?.role?.name === 'ADMIN' && (
        <div className="card  ">

          <div className="card-header border-0 cursor-pointer">
            <div className="card-title m-0">
              <h3 className="fw-bold m-0">Delete: {projectItem?.data?.name || 'Project'}</h3>
            </div>
          </div>
          <div id="kt_account_settings_deactivate" className="collapse show">
            <form id="kt_account_deactivate_form" className="form fv-plugins-bootstrap5 fv-plugins-framework">


              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <button type="submit" className="btn btn-sm btn-danger fw-semibold">
                  <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' /> Delete
                </button>
              </div>

              <input type="hidden" /></form>
          </div>
        </div>
      )}


    </>
  )
}

export default ProjectPageWrapperShow
