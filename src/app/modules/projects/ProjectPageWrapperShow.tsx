import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneProject } from './core/_requests'
import { useAuth } from '../auth'
import { SubProjectTableMini } from '../sub-projects/SubProjectTableMini'
import { ContactProjectTableMini } from '../contacts/ContactProjectTableMini'
import { ContributorSubProjectTableMini } from '../contributors/ContributorSubProjectTableMini'

const ProjectPageWrapperShow: FC = () => {
  const takeValue: number = 6
  const { role } = useAuth() as any
  const { projectId } = useParams<string>()

  const fetchOneProject = async () => await getOneProject({ projectId: String(projectId) })
  const { data: projectItem, isError: isErrorProject, isLoading: isLoadingProject } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchOneProject(),
  })



  return (
    <>
      <HelmetSite title={`${projectItem?.data?.name || 'Project'}`} />
      <PageTitle breadcrumbs={[{
        title: `${projectItem?.data?.name || 'Project'} |`,
        path: `/projects/${projectId}`,
        isSeparator: false,
        isActive: false,
      }]}>Project</PageTitle>

      {/* <div className={`card mb-5 mb-xl-8`}> */}


      {/* <SubProjectRow />

      <SubProjectRow />

      <SubProjectRowComponent /> */}

      {/* <div className={`card mb-5 mb-xl-8`}>

        <div className="card-header border-0 pt-6">
          <div className="card-title">
            <div className="d-flex align-items-center position-relative my-1">
              <span className="svg-icon svg-icon-1 position-absolute ms-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px">
                  <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                  <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                </svg>
              </span>
              <input type="text" className="form-control form-control-solid w-250px ps-14" placeholder="Search file" value="" />
            </div>
          </div>
          <div className='card-toolbar' title='Click to add a user'>
            <Link to={`/projects/${projectId}/new-file`} className='btn btn-sm btn-primary'>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              New File
            </Link>
          </div>
        </div>


        <div className='card-body py-3'>

          <div className='table-responsive'>

            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bolder fs-6 text-gray-800">
                  <th>Name</th>
                  <th></th>
                  <th className="text-end min-w-100px"></th>
                </tr>
              </thead>
              <tbody>

                <tr>
                  <td>

                    <div className='d-flex align-items-center'>
                      <div className="symbol symbol-40px overflow-hidden me-3">
                        <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/pdf.svg" alt="" />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <Link to={`/projects/${projectId}`} className='text-dark fw-bolder text-hover-primary'>
                          Bullletin trimestre 1
                        </Link>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          Redux itself is a standalone library that can be used with any UI layer or framework, including React, Angular, Vue, Ember, and vanilla JS. Although Redux and
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                      </a>
                      <a href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                        <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3'
                        />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className="symbol symbol-40px overflow-hidden me-3">
                        <img src="/media/avatars/300-7.jpg" alt="" />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <Link to={`/projects/${projectId}`} className='text-dark fw-bolder text-hover-primary'>
                          Info de la demande
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                      </a>
                      <a href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3'
                        />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className="symbol symbol-40px overflow-hidden me-3">
                        <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt="" />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <Link to={`/projects/${projectId}`} className='text-dark fw-bolder text-hover-primary'>
                          Bullletin trimestre 2
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                      </a>
                      <a href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3'
                        />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className="symbol symbol-40px overflow-hidden me-3">
                        <img src="/media/svg/files/doc.svg" alt="" />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <Link to={`/projects/${projectId}`} className='text-dark fw-bolder text-hover-primary'>
                          Bullletin trimestre 2
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                      </a>
                      <a href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3'
                        />
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className="symbol symbol-40px overflow-hidden me-3">
                        <img src="/media/svg/files/xml.svg" alt="" />
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <Link to={`/projects/${projectId}`} className='text-dark fw-bolder text-hover-primary'>
                          Bullletin trimestre 2
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                      </a>
                      <a href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen027.svg'
                          className='svg-icon-3'
                        />
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>

      </div> */}


      {/* <div className="row gy-5 gx-xl-8">

        <div className={`col-xxl-12`}>

          <SubProjectRowComponent />

        </div>

      </div> */}


      {projectItem?.data?.subProjectTotal && (
        <div className="row gy-5 gx-xl-8">

          <div className={`col-xxl-12`}>

            <SubProjectTableMini project={projectItem?.data} takeValue={takeValue} />

          </div>
        </div>
      )}


      <div className='row g-5 gx-xxl-8'>


        {projectItem?.data?.contactTotal && (

          <ContactProjectTableMini project={projectItem?.data} takeValue={takeValue} />


        )}

        {projectItem?.data?.id && (

          <ContributorSubProjectTableMini project={projectItem?.data} takeValue={takeValue} />

        )}



      </div>



      {/* </div> */}

    </>
  )
}

export default ProjectPageWrapperShow
