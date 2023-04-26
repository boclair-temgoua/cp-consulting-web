import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneProject } from './core/_requests'
import { DocumentTableMini } from '../documents/DocumentTableMini'
import { ProjectHeader } from './components/ProjectHeader'
import { ProjectModel } from './core/_models'

const ProjectPageWrapperDocument: FC = () => {
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
      <HelmetSite title={`${projectItem?.data?.name || 'Documents'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${projectItem?.data?.name || 'Documents'} |`,
            path: `/projects/${projectId}/documents`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Documents
      </PageTitle>

      <ProjectHeader project={projectItem?.data as ProjectModel} />


      <DocumentTableMini type='PROJECT' projectItem={projectItem?.data} projectId={projectItem?.data?.id} />
    </>
  )
}

export default ProjectPageWrapperDocument
