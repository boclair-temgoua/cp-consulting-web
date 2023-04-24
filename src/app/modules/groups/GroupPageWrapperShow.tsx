import { FC, useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneGroup } from './core/_requests'
import { useAuth } from '../auth'
import { SubProjectTableMini } from '../sub-projects/SubProjectTableMini'
import { ContactProjectTableMini } from '../contacts/ContactProjectTableMini'
import { ContributorProjectTableMini } from '../contributors/ContributorProjectTableMini'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { DocumentTableMini } from '../documents/DocumentTableMini'
import { Dropdown1 } from '../../../_metronic/partials'
import ContributorMiniList from '../contributors/hook/ContributorMiniList'
import { getContributorsGroup, getContributorsProject } from '../contributors/core/_requests'
import { ContributorModel } from '../contributors/core/_models'

const GroupPageWrapperShow: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const takeValue: number = 6
  const { groupId } = useParams<string>()

  const fetchOneProject = async () => await getOneGroup({ groupId: String(groupId) })
  const {
    data: groupItem,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['groupId', groupId],
    queryFn: () => fetchOneProject(),
    enabled: Boolean(groupId),
  })

  const fetchDataContributorMini = async () =>
    await getContributorsGroup({
      take: takeValue,
      page: 1,
      sort: 'ASC',
      groupId: String(groupId),
    })
  const {
    isLoading: isLoadingContributor,
    isError: isErrorContributor,
    data: dataContributorMini,
  } = useQuery({
    queryKey: ['contributorsGroupMini', String(groupId), takeValue, 1, 'ASC'],
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
      <HelmetSite title={`${groupItem?.data?.name || 'Group'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${groupItem?.data?.name || 'Group'} |`,
            path: `/groups/${groupId}`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Project
      </PageTitle>

      <a href={void (0)} className='btn-flex btn-light-primary fw-bolder'
        onClick={() => { navigate(-1) }} style={{ cursor: 'pointer' }}>
        <KTSVG path='/media/icons/duotune/arrows/arr063.svg' className='svg-icon-2' />
      </a>
      <a href={void (0)} className='btn-flex btn-light-primary fw-bolder'
        onClick={() => { navigate(1) }} style={{ cursor: 'pointer' }}>
        <KTSVG path='/media/icons/duotune/arrows/arr001.svg' className='svg-icon-2' />
      </a>




      {groupItem?.data?.role?.name === 'ADMIN' && (
        <div className='card  '>
          <div className='card-header border-0 cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bold m-0'>Delete: {groupItem?.data?.name || 'Project'}</h3>
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

export default GroupPageWrapperShow
