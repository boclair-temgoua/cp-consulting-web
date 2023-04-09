import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { KTSVG } from '../../../_metronic/helpers'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '../auth'
import { getOneSubSubProject } from './core/_requests'
import { arrayAuthorized } from '../contributors/core/_models'
import { SubSubSubProjectTableMini } from '../sub-sub-sub-projects/SubSubSubProjectTableMini'
import { ContributorSubSubProjectTableMini } from '../contributors/ContributorSubSubProjectTableMini'

const SubSubProjectPageWrapperShow: FC = () => {
  const takeValue: number = 6
  const { role } = useAuth() as any
  const { subSubProjectId } = useParams<string>()

  const fetchOneSubSubProject = async () => await getOneSubSubProject({ subSubProjectId: String(subSubProjectId) })
  const { data: subSubProjectItem, isError: isErrorSubSubProject, isLoading: isLoadingProject } = useQuery({
    queryKey: ['subSubProject', subSubProjectId],
    queryFn: () => fetchOneSubSubProject(),
  })


  return (
    <>
      <HelmetSite title={`${subSubProjectItem?.data?.name || 'Project'}`} />
      <PageTitle breadcrumbs={[{
        title: `${subSubProjectItem?.data?.name || 'Project'} |`,
        path: `/projects/sb-sb-p/${subSubProjectId}`,
        isSeparator: false,
        isActive: false,
      }]}>Project</PageTitle>


      {subSubProjectItem?.data?.id && (

        <SubSubSubProjectTableMini subSubProject={subSubProjectItem?.data} takeValue={takeValue} />

      )}

      {subSubProjectItem?.data?.id && (

        <ContributorSubSubProjectTableMini subSubProject={subSubProjectItem?.data} takeValue={takeValue} />

      )}


      {arrayAuthorized.includes(`${subSubProjectItem?.data?.role?.name}`) && (
        <div className="card  ">

          <div className="card-header border-0 cursor-pointer">
            <div className="card-title m-0">
              <h3 className="fw-bold m-0">Delete: {subSubProjectItem?.data?.name || 'Project'}</h3>
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

export default SubSubProjectPageWrapperShow
