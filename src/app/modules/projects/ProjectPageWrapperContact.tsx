/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneProject } from './core/_requests'
import { ContactProjectTableMini } from '../contacts/ContactProjectTableMini'
import { KTSVG } from '../../../_metronic/helpers'
import { ProjectHeader } from './components/ProjectHeader'
import { ProjectModel } from './core/_models'

const ProjectPageWrapperContact: FC = () => {
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
      <HelmetSite title={`${projectItem?.data?.name || 'Contacts'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${projectItem?.data?.name || 'Contacts'} |`,
            path: `/projects/${projectId}/contacts`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Contacts
      </PageTitle>

      <ProjectHeader project={projectItem?.data as ProjectModel} />

      <ContactProjectTableMini project={projectItem?.data} takeValue={takeValue} />

    </>
  )
}

export default ProjectPageWrapperContact
