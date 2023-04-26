import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneProject } from './core/_requests'
import { ProjectHeader } from './components/ProjectHeader'
import { ProjectModel } from './core/_models'
import { GroupTableMini } from '../groups/GroupTableMini'

const ProjectPageWrapperGroup: FC = () => {
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
      <HelmetSite title={`${projectItem?.data?.name || 'Groups'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${projectItem?.data?.name || 'Groups'} |`,
            path: `/projects/${projectId}/groups`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Groups
      </PageTitle>
      
      <ProjectHeader project={projectItem?.data as ProjectModel} />

      <GroupTableMini projectId={projectId} type='GROUP'  />
    </>
  )
}

export default ProjectPageWrapperGroup
