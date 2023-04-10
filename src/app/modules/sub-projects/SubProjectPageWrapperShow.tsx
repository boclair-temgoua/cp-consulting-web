import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { KTSVG } from '../../../_metronic/helpers'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneSubProject } from './core/_requests'
import { arrayAuthorized } from '../contributors/core/_models'
import { SubSubProjectTableMini } from '../sub-sub-projects/SubSubProjectTableMini'
import { ContributorSubProjectTableMini } from '../contributors/ContributorSubProjectTableMini'
import { DocumentTableMini } from '../documents/DocumentTableMini'

const SubProjectPageWrapperShow: FC = () => {
  const [searchParams] = useSearchParams();
  const takeValue: number = 6
  const { subProjectId } = useParams<string>()
  // const [pageItem, setPageItem] = useState(Number(searchParams.get('page')) || 1)

  const fetchOneSubProject = async () => await getOneSubProject({ subProjectId: String(subProjectId) })
  const { data: subProjectItem, isError: isErrorSubProject, isLoading: isLoadingProject } = useQuery({
    queryKey: ['subProject', subProjectId],
    queryFn: () => fetchOneSubProject(),
  })

  console.log('fhfgaj =======',searchParams.get('tab'))
  return (
    <>
      <HelmetSite title={`${subProjectItem?.data?.name || 'Project'}`} />
      <PageTitle breadcrumbs={[{
        title: `${subProjectItem?.data?.name || 'Project'} |`,
        path: `/projects/sb-p/${subProjectId}`,
        isSeparator: false,
        isActive: false,
      }]}>Project</PageTitle>




      {subProjectItem?.data?.id && (
        <>
          <DocumentTableMini type='SUBPROJECT' subProjectId={subProjectItem?.data?.id} />

          <SubSubProjectTableMini subProject={subProjectItem?.data} takeValue={takeValue} />

          <ContributorSubProjectTableMini subProject={subProjectItem?.data} takeValue={takeValue} />
        </>

      )}


      {/* {subProjectItem?.data?.id && (

<ContactProjectTableMini subProject={subProjectItem?.data} takeValue={takeValue} />

)} */}


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
