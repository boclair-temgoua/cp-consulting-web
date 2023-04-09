import React, { FC, useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useDebounce } from '../utils/use-debounce'
import { getContributorsProject } from '../contributors/core/_requests'
import { getOneSubProject } from './core/_requests'
import { EmptyTable } from '../utils/empty-table'
import { ContributorModel, arrayAuthorized } from '../contributors/core/_models'
import ContributorList from '../contributors/hook/ContributorList'
import { getContactsBy } from '../contacts/core/_requests'
import { OneContactModel } from '../contacts/core/_models'
import ContactList from '../contacts/hook/ContactList'
import { useAuth } from '../auth'
import { SubSubProjectTableMini } from '../sub-sub-projects/SubSubProjectTableMini'
import { ContributorSubProjectTableMini } from '../contributors/ContributorSubProjectTableMini'

const SubProjectPageWrapperShow: FC = () => {
  const takeValue: number = 6
  const { role } = useAuth() as any
  const { subProjectId } = useParams<string>()

  const fetchOneSubProject = async () => await getOneSubProject({ subProjectId: String(subProjectId) })
  const { data: subProjectItem, isError: isErrorSubProject, isLoading: isLoadingProject } = useQuery({
    queryKey: ['subProject', subProjectId],
    queryFn: () => fetchOneSubProject(),
  })


  // const fetchDataContributor = async () => await getContributorsProject({ take: 5, page: 1, sort: 'DESC', subProjectId: String(subProjectId) })
  // const { isLoading: isLoadingContributor, isError: isErrorContributor, data: dataContributor } = useQuery({
  //   queryKey: ['contributorsSubProject', subProjectId],
  //   queryFn: () => fetchDataContributor(),
  // })
  // const dataTableContributor = isLoadingProject || isLoadingContributor ? (<tr><td><strong>Loading...</strong></td></tr>) :
  //   isErrorProject || isErrorContributor ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
  //     (dataContributor?.data?.total <= 0) ? (<EmptyTable name='contributor' />) :
  //       (
  //         dataContributor?.data?.value?.map((item: ContributorModel, index: number) => (
  //           <ContributorList item={item} key={index} contributor={projectItem?.data} />
  //         )))


  // const fetchDataContact = async () => await getContactsBy({ take: 5, page: 1, sort: 'DESC', type: 'PROJECT', projectId: String(projectId) })
  // const { isLoading: isLoadingContact, isError: isErrorContact, data: dataContact } = useQuery({
  //   queryKey: ['contactsProject', projectId],
  //   queryFn: () => fetchDataContact(),
  // })
  // const dataTableContact = isLoadingProject || isLoadingContact ? (<tr><td><strong>Loading...</strong></td></tr>) :
  //   isErrorProject || isErrorContact ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
  //     (dataContact?.data?.total <= 0) ? (<EmptyTable name='contact' />) :
  //       (
  //         dataContact?.data?.value?.map((item: OneContactModel, index: number) => (
  //           <ContactList item={item} key={index} />
  //         )))


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

        <SubSubProjectTableMini subProject={subProjectItem?.data} takeValue={takeValue} />

      )}

      {subProjectItem?.data?.id && (

        <ContributorSubProjectTableMini subProject={subProjectItem?.data} takeValue={takeValue} />

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
