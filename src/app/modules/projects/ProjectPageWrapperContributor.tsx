/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneProject } from './core/_requests'
import { ContributorProjectTableMini } from '../contributors/ContributorProjectTableMini'
import { KTSVG } from '../../../_metronic/helpers'
import { ProjectHeader } from './components/ProjectHeader'
import { ProjectModel } from './core/_models'

const ProjectPageWrapperContributor: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const takeValue: number = 6
  const { projectId } = useParams<string>()

  const fetchOneProject = async () => await getOneProject({ projectId: String(projectId) })
  const {
    data: projectItem,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => fetchOneProject(),
    enabled: Boolean(projectId),
  })

  return (
    <>
      <HelmetSite title={`${projectItem?.data?.name || 'Contributors'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${projectItem?.data?.name || 'Contributors'} |`,
            path: `/projects/${projectId}/contributors`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Contributor
      </PageTitle>
      
      <ProjectHeader project={projectItem?.data as ProjectModel} />


      <ContributorProjectTableMini project={projectItem?.data} />
    </>
  )
}

export default ProjectPageWrapperContributor
