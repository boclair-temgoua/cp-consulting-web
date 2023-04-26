/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneProject } from './core/_requests'
import { SubProjectTableMini } from '../sub-projects/SubProjectTableMini'
import { ProjectHeader } from './components/ProjectHeader'
import { ProjectModel } from './core/_models'

const ProjectPageWrapperProject: FC = () => {
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
      <HelmetSite title={`${projectItem?.data?.name || 'Projects'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${projectItem?.data?.name || 'Projects'} |`,
            path: `/projects/${projectId}/projects`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Project
      </PageTitle>

      <ProjectHeader project={projectItem?.data as ProjectModel} />


      <SubProjectTableMini project={projectItem?.data} />
    </>
  )
}

export default ProjectPageWrapperProject
