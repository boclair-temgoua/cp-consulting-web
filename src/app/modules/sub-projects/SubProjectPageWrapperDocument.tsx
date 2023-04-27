import { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneSubProject } from './core/_requests'
import { DocumentTableMini } from '../documents/DocumentTableMini'
import { SubProjectHeader } from './components/SubProjectHeader'
import { SubProjectModel } from './core/_models'

const SubProjectPageWrapperDocument: FC = () => {
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
        path: `/projects/sb-p/${subProjectId}/document`,
        isSeparator: false,
        isActive: false,
      }]}>Project</PageTitle>

      <SubProjectHeader subProject={subProjectItem?.data as SubProjectModel} />

      <DocumentTableMini type='SUBPROJECT' subProjectId={subProjectItem?.data?.id} />

    </>
  )
}

export default SubProjectPageWrapperDocument
