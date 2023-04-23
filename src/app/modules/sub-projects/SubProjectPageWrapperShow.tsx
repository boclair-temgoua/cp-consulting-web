import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { KTSVG } from '../../../_metronic/helpers'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneSubProject } from './core/_requests'
import { ContributorModel, arrayAuthorized } from '../contributors/core/_models'
import { SubSubProjectTableMini } from '../sub-sub-projects/SubSubProjectTableMini'
import { ContributorSubProjectTableMini } from '../contributors/ContributorSubProjectTableMini'
import { DocumentTableMini } from '../documents/DocumentTableMini'
import { getContributorsSubProject } from '../contributors/core/_requests'
import ContributorMiniList from '../contributors/hook/ContributorMiniList'

const SubProjectPageWrapperShow: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const takeValue: number = 6
  const { subProjectId } = useParams<string>()

  const fetchOneSubProject = async () => await getOneSubProject({ subProjectId: String(subProjectId) })
  const { data: subProjectItem, isError: isErrorSubProject, isLoading: isLoadingProject } = useQuery({
    queryKey: ['subProject', subProjectId],
    queryFn: () => fetchOneSubProject(),
    enabled: Boolean(subProjectId),
  })


  const fetchDataContributorMini = async () =>
    await getContributorsSubProject({
      take: takeValue,
      page: 1,
      sort: 'ASC',
      subProjectId: String(subProjectId),
    })
  const {
    isLoading: isLoadingContributor,
    isError: isErrorContributor,
    data: dataContributorMini,
  } = useQuery({
    queryKey: ['contributorSubProjectMini', String(subProjectId), takeValue, 1, 'ASC'],
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

  return (
    <>
      <HelmetSite title={`${subProjectItem?.data?.name || 'Project'}`} />
      <PageTitle breadcrumbs={[{
        title: `${subProjectItem?.data?.name || 'Project'} |`,
        path: `/projects/sb-p/${subProjectId}`,
        isSeparator: false,
        isActive: false,
      }]}>Project</PageTitle>

      <div className="app-toolbar py-3 py-lg-6">
          <button type="button" className="btn btn-sm btn-light" onClick={() => navigate(-1)}>
            <KTSVG path='/media/icons/duotune/arrows/arr002.svg' className='svg-icon-3' />
          </button>
          <button type="button" className="btn btn-sm btn-light" onClick={() => navigate(1)}>
            <KTSVG path='/media/icons/duotune/arrows/arr001.svg' className='svg-icon-3' />
          </button>
      </div>

      <div className='row g-5 g-xl-8'>

        <div className='col-xl-3'>
          <Link to={`/projects/sb-p/${subProjectId}?tab=${'projects'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{subProjectItem?.data?.subSubProjectTotal || 0}</span>
                <span className='text-gray-400 pt-1 fw-semibold fs-6'>Projects</span>
              </div>
            </div>
            <div className='card-body d-flex flex-column justify-content-end pe-0'>
              <div className='text-dark fw-bold fs-2 mb-2 mt-5'>{subProjectItem?.data?.name}</div>
              <div className='fw-semibold text-dark'>{subProjectItem?.data?.description}</div>
            </div>
          </Link>
        </div>

        <div className='col-xl-3'>
          <Link to={`/projects/sb-p/${subProjectId}?tab=${'documents'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{subProjectItem?.data?.documentTotal || 0}</span>
                <span className='text-gray-400 pt-1 fw-semibold fs-6'>Documents</span>
              </div>
            </div>
            <div className='card-body d-flex flex-column justify-content-end pe-0'>
              <div className='text-dark fw-bold fs-2 mb-2 mt-5'>Documents</div>
              <div className='fw-semibold text-dark'>Documents {subProjectItem?.data?.name}</div>
            </div>
          </Link>
        </div>

        <div className='col-xl-3'>
          <Link to={`/projects/sb-p/${subProjectId}?tab=${'contributors'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{subProjectItem?.data?.contributorTotal || 0}</span>
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
          <Link to={`/projects/sb-p/${subProjectId}?tab=${'contacts'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{subProjectItem?.data?.contactTotal || 0}</span>
                <span className='text-gray-400 pt-1 fw-semibold fs-6'>Contacts</span>
              </div>
            </div>
            <div className='card-body d-flex flex-column justify-content-end pe-0'>
              <div className='text-dark fw-bold fs-2 mb-2 mt-5'>Contacts</div>
              <div className='fw-semibold text-dark'>Contacts {subProjectItem?.data?.name}</div>
            </div>
          </Link>
        </div>

      </div>



      {subProjectItem?.data?.id && (
        <>
          {searchParams.get('tab') === 'projects' && (
            <SubSubProjectTableMini subProject={subProjectItem?.data} takeValue={takeValue} />
          )}

          {searchParams.get('tab') === 'documents' && (
            <DocumentTableMini type='SUBPROJECT' subProjectId={subProjectItem?.data?.id} />
          )}

          {searchParams.get('tab') === 'contributors' && (
            <ContributorSubProjectTableMini subProject={subProjectItem?.data} takeValue={takeValue} />
          )}
        </>
      )}


      {arrayAuthorized.includes(`${subProjectItem?.data?.role?.name}`) && (
        <div className="card  ">

          <div className="card-header border-0 cursor-pointer">
            <div className="card-title m-0">
              <h3 className="fw-bold m-0">Delete: {subProjectItem?.data?.name || 'Project'}</h3>
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

export default SubProjectPageWrapperShow
