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
import { OrganizationSettingCard } from './hook/OrganizationSettingCard'

const OrganizationWrapperSetting: FC = () => {
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
      <HelmetSite title={`${organizationItem?.data?.name || 'Setting'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${organizationItem?.data?.name || 'Setting'} |`,
            path: `/organizations/${organizationId}/setting`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Setting
      </PageTitle>
      
      <OrganizationHeader organization={organizationItem?.data as OrganizationModel}/>

      <OrganizationSettingCard organization={organizationItem?.data as OrganizationModel} />
      {/* <ContributorsOrganizationTableMini organization={organizationItem?.data} /> */}
    </>
  )
}

export default OrganizationWrapperSetting
