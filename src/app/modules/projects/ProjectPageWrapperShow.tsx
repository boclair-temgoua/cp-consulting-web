import {FC, useEffect, useState} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {HelmetSite} from '../utils'
import {Link, useLocation, useNavigate, useParams, useSearchParams} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import {getOneProject} from './core/_requests'
import {useAuth} from '../auth'
import {SubProjectTableMini} from '../sub-projects/SubProjectTableMini'
import {ContactProjectTableMini} from '../contacts/ContactProjectTableMini'
import {ContributorProjectTableMini} from '../contributors/ContributorProjectTableMini'
import {KTSVG, toAbsoluteUrl} from '../../../_metronic/helpers'
import {DocumentTableMini} from '../documents/DocumentTableMini'
import {Dropdown1} from '../../../_metronic/partials'
import ContributorMiniList from '../contributors/hook/ContributorMiniList'
import {getContributorsProject} from '../contributors/core/_requests'
import {ContributorModel} from '../contributors/core/_models'

const ProjectPageWrapperShow: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const takeValue: number = 6
  const {projectId} = useParams<string>()

  const fetchOneProject = async () => await getOneProject({projectId: String(projectId)})
  const {
    data: projectItem,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchOneProject(),
  })

  const fetchDataContributorMini = async () =>
    await getContributorsProject({
      take: takeValue,
      page: 1,
      sort: 'ASC',
      projectId: String(projectId),
    })
  const {
    isLoading: isLoadingContributor,
    isError: isErrorContributor,
    data: dataContributorMini,
  } = useQuery({
    queryKey: ['contributorsProjectMini', String(projectId), takeValue, 1, 'ASC'],
    queryFn: () => fetchDataContributorMini(),
  })
  const dataContributorMiniTable = isLoadingContributor ? (
    <strong>Loading...</strong>
  ) : isErrorContributor ? (
    <strong>Error find data please try again...</strong>
  ) : dataContributorMini?.data?.total <= 0 ? (
    ''
  ) : (
    dataContributorMini?.data?.value?.map((item: ContributorModel, index: number) => (
      <ContributorMiniList item={item} key={index} />
    ))
  )

  const calculatedContributors: number = Number(
    Number(dataContributorMini?.data.total) - Number(dataContributorMini?.data?.total_value)
  )
  console.log('navigate ========>',navigate)
  return (
    <>
      <HelmetSite title={`${projectItem?.data?.name || 'Project'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${projectItem?.data?.name || 'Project'} |`,
            path: `/projects/${projectId}`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Project
      </PageTitle>

      <div className="app-toolbar py-3 py-lg-6">
          <button type="button" className={`btn btn-sm btn-light`} onClick={() => navigate(-1)} >
            <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-3' />
          </button>
          <button type="button" className="btn btn-sm btn-light" onClick={() => navigate(1)}>
            <KTSVG path='/media/icons/duotune/arrows/arr001.svg' className='svg-icon-3' />
          </button>
      </div>

      <div className='row g-5 g-xl-8'>

        <div className='col-xl-3'>
          <Link to={`/projects/${projectId}?tab=${'projects'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{projectItem?.data?.subProjectTotal || 0}</span>
                <span className='text-gray-400 pt-1 fw-semibold fs-6'>Projects</span>
              </div>
            </div>
            <div className='card-body d-flex flex-column justify-content-end pe-0'>
              <div className='text-dark fw-bold fs-2 mb-2 mt-5'>{projectItem?.data?.name}</div>
              <div className='fw-semibold text-dark'>{projectItem?.data?.description}</div>
            </div>
          </Link>
        </div>

        <div className='col-xl-3'>
          <Link to={`/projects/${projectId}?tab=${'documents'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{projectItem?.data?.documentTotal || 0}</span>
                <span className='text-gray-400 pt-1 fw-semibold fs-6'>Documents</span>
              </div>
            </div>
            <div className='card-body d-flex flex-column justify-content-end pe-0'>
              <div className='text-dark fw-bold fs-2 mb-2 mt-5'>Documents</div>
              <div className='fw-semibold text-dark'>Documents {projectItem?.data?.name}</div>
            </div>
          </Link>
        </div>

        <div className='col-xl-3'>
          <Link to={`/projects/${projectId}?tab=${'contributors'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{projectItem?.data?.contributorTotal || 0}</span>
                <span className='text-gray-400 pt-1 fw-semibold fs-6'>Contributors</span>
              </div>
            </div>
            <div className='card-body d-flex flex-column justify-content-end pe-0'>
              <div className='symbol-group symbol-hover flex-nowrap'>
                {dataContributorMiniTable}

                {calculatedContributors > 0 && (
                  <span className='symbol symbol-35px symbol-circle'>
                    <span className='symbol-label bg-dark text-inverse-dark fs-8 fw-bold'>
                      +{calculatedContributors}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </Link>
        </div>

        <div className='col-xl-3'>
          <Link to={`/projects/${projectId}?tab=${'contacts'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{projectItem?.data?.contactTotal || 0}</span>
                <span className='text-gray-400 pt-1 fw-semibold fs-6'>Contacts</span>
              </div>
            </div>
            <div className='card-body d-flex flex-column justify-content-end pe-0'>
              <div className='text-dark fw-bold fs-2 mb-2 mt-5'>Contacts</div>
              <div className='fw-semibold text-dark'>Contacts {projectItem?.data?.name}</div>
            </div>
          </Link>
        </div>

      </div>

      {/* <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-6'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <img
                  src='https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg'
                  alt='Metornic'
                />
              </div>
            </div>
            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-1'>
                    <span className='text-gray-800 text-hover-primary fs-2 fw-bold me-3'>
                      {projectItem?.data?.name || 'Project'}
                    </span>
                  </div>
                  <div className='d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-400'>
                    {projectItem?.data?.description || 'Project'}
                  </div>
                </div>
              </div>
              <div className='d-flex flex-wrap justify-content-start'>
                <div className='d-flex flex-wrap'>
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
                      <div className='fs-2 fw-bolder'>
                        {projectItem?.data?.subProjectTotal || 0}
                      </div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>Projects</div>
                  </div>
                </div>

                <div className='symbol-group symbol-hover mb-3'>
                  {dataContributorMiniTable}

                  {calculatedContributors > 0 && (
                    <span className='symbol symbol-35px symbol-circle'>
                      <span className='symbol-label bg-dark text-inverse-dark fs-8 fw-bold'>
                        +{calculatedContributors}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='separator'></div>

          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (searchParams.get('tab') === 'home' && 'active')
                }
                to={`/projects/${projectId}?tab=${'home'}`}
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
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
            <li className='nav-item'>
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
            <li className='nav-item'>
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
            <li className='nav-item'>
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
            <li className='nav-item'>
              <a className='nav-link text-active-primary py-5 me-6' href='#'>
                Settings
              </a>
            </li>
          </ul>
        </div>
      </div> */}

      {projectItem?.data?.id && (
        <>
          {searchParams.get('tab') === 'projects' && (
            <SubProjectTableMini project={projectItem?.data} takeValue={takeValue} />
          )}

          {searchParams.get('tab') === 'documents' && (
            <DocumentTableMini type='PROJECT' projectItem={projectItem?.data} projectId={projectItem?.data?.id} />
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
        <div className='card  '>
          <div className='card-header border-0 cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bold m-0'>Delete: {projectItem?.data?.name || 'Project'}</h3>
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

export default ProjectPageWrapperShow
