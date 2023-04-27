import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneSubProject } from './core/_requests'
import { ContributorSubProjectTableMini } from '../contributors/ContributorSubProjectTableMini'
import { SubProjectHeader } from './components/SubProjectHeader'
import { SubProjectModel } from './core/_models'

const SubProjectPageWrapperContributor: FC = () => {
  const { subProjectId } = useParams<string>()

  const fetchOneSubProject = async () => await getOneSubProject({ subProjectId: String(subProjectId) })
  const { data: subProjectItem, isError: isErrorSubProject, isLoading: isLoadingProject } = useQuery({
    queryKey: ['subProject', subProjectId],
    queryFn: () => fetchOneSubProject(),
    enabled: Boolean(subProjectId),
  })

  return (
    <>
      <HelmetSite title={`${subProjectItem?.data?.name || 'Project'}`} />
      <PageTitle breadcrumbs={[{
        title: `${subProjectItem?.data?.name || 'Project'} |`,
        path: `/projects/sb-p/${subProjectId}`,
        isSeparator: false,
        isActive: false,
      }]}>Project</PageTitle>

      <SubProjectHeader subProject={subProjectItem?.data as SubProjectModel} />

      <ContributorSubProjectTableMini subProject={subProjectItem?.data} />

    </>
  )
}

export default SubProjectPageWrapperContributor
