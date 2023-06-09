/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite, capitalizeOneFirstLetter } from '../utils'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getOneOrganization } from './core/_requests'
import { useQuery } from '@tanstack/react-query'
import { getContributorsOrganization } from '../contributors/core/_requests'
import ContributorMiniList from '../contributors/hook/ContributorMiniList'
import { ContributorModel } from '../contributors/core/_models'
import { CategoryOrganizationTableMini } from '../categoriess/CategoryOrganizationTableMini'
import { OrganizationHeader } from './components/OrganizationHeader'
import { OrganizationModel } from './core/_models'

const OrganizationWrapperShow: FC = () => {
  const navigate = useNavigate();
  const { organizationId } = useParams<string>()
  const [searchParams] = useSearchParams();
  const takeValue: number = 6


  const fetchOneOrganization = async () => await getOneOrganization({ organizationId: String(organizationId) })
  const { data: organizationItem, isError: isErrorOrganization, isLoading: isLoadingOrganization } = useQuery({
    queryKey: ['organization', organizationId],
    queryFn: () => fetchOneOrganization(),
    enabled: Boolean(organizationId),
  })


  const fetchDataContributorMini = async () =>
    await getContributorsOrganization({
      take: takeValue,
      page: 1,
      sort: 'ASC',
      organizationId: String(organizationId),
      type: 'ORGANIZATION'
    })
  const {
    isLoading: isLoadingContributor,
    isError: isErrorContributor,
    data: dataContributorMini,
  } = useQuery({
    queryKey: ['contributorOrganizationMini', String(organizationId), takeValue, 1, 'ASC'],
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
      <HelmetSite title={`${organizationItem?.data?.name || 'Organization'}`} />
      <PageTitle breadcrumbs={[{
        title: `${organizationItem?.data?.name || 'Organization'} |`,
        path: `/organizations/${organizationId}`,
        isSeparator: false,
        isActive: false,
      }]}>Organization</PageTitle>

      <OrganizationHeader organization={organizationItem?.data as OrganizationModel}/>

      <div className='row g-5 g-xl-8'>

        <div className='col-xl-3'>
          <Link to={`/organizations/${organizationId}?tab=${'contributors'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{organizationItem?.data?.contributorTotal || 0}</span>
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
          <Link to={`/organizations/${organizationId}?tab=${'contacts'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{organizationItem?.data?.contactTotal || 0}</span>
                <span className='text-gray-400 pt-1 fw-semibold fs-6'>Contacts</span>
              </div>
            </div>
            <div className='card-body d-flex flex-column justify-content-end pe-0'>
              <div className='text-dark fw-bold fs-2 mb-2 mt-5'>Contacts</div>
              <div className='fw-semibold text-dark'>Contacts {organizationItem?.data?.name}</div>
            </div>
          </Link>
        </div>

        <div className='col-xl-3'>
          <Link to={`/organizations/${organizationId}?tab=${'categories'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{organizationItem?.data?.categoryTotal || 0}</span>
                <span className='text-gray-400 pt-1 fw-semibold fs-6'>Categories</span>
              </div>
            </div>
            <div className='card-body d-flex flex-column justify-content-end pe-0'>
              <div className='text-dark fw-bold fs-2 mb-2 mt-5'>Categories</div>
              <div className='fw-semibold text-dark'>Categories {organizationItem?.data?.name}</div>
            </div>
          </Link>
        </div>

        <div className='col-xl-3'>
          <Link to={`/organizations/${organizationId}?tab=${'documents'}`} className='card hoverable card-xl-stretch mb-5 mb-xl-8'>
            <div className='card-header pt-5'>
              <div className='card-title d-flex flex-column'>
                <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>0</span>
                <span className='text-gray-400 pt-1 fw-semibold fs-6'>Documents</span>
              </div>
            </div>
            <div className='card-body d-flex flex-column justify-content-end pe-0'>
              <div className='text-dark fw-bold fs-2 mb-2 mt-5'>Documents</div>
              <div className='fw-semibold text-dark'>Documents {organizationItem?.data?.name}</div>
            </div>
          </Link>
        </div>

      </div>




      {organizationItem?.data?.id && (
        <>
          {/* {searchParams.get('tab') === 'projects' && (
            <SubProjectTableMini project={projectItem?.data} takeValue={takeValue} />
          )}

          {searchParams.get('tab') === 'documents' && (
            <DocumentTableMini type='PROJECT' projectItem={projectItem?.data} projectId={projectItem?.data?.id} />
          )}

          {searchParams.get('tab') === 'contributors' && (
            <ContributorProjectTableMini project={projectItem?.data} />
          )} */}

          {searchParams.get('tab') === 'categories' && (
            <CategoryOrganizationTableMini organization={organizationItem?.data} />
          )}

        </>
      )}
    </>
  )
}

export default OrganizationWrapperShow
