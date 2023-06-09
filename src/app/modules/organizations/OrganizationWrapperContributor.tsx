/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneOrganization } from './core/_requests'
import { OrganizationHeader } from './components/OrganizationHeader'
import { OrganizationModel } from './core/_models'
import { ContributorsOrganizationTableMini } from '../contributors/ContributorsOrganizationTableMini'

const OrganizationWrapperContributor: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const takeValue: number = 6
  const { organizationId } = useParams<string>()

  const fetchOneOrganization = async () => await getOneOrganization({ organizationId: String(organizationId) })
  const { data: organizationItem, isError: isErrorOrganization, isLoading: isLoadingOrganization } = useQuery({
    queryKey: ['organization', organizationId],
    queryFn: () => fetchOneOrganization(),
    enabled: Boolean(organizationId),
  })

  return (
    <>
      <HelmetSite title={`${organizationItem?.data?.name || 'Contributors'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${organizationItem?.data?.name || 'Contributors'} |`,
            path: `/organizations/${organizationId}/contributors`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Contributors
      </PageTitle>
      
      <OrganizationHeader organization={organizationItem?.data as OrganizationModel}/>


      <ContributorsOrganizationTableMini organization={organizationItem?.data} />
    </>
  )
}

export default OrganizationWrapperContributor
