import { lazy, FC, Suspense } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { MasterLayout } from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import { DashboardWrapper } from '../pages/dashboard/DashboardWrapper'
import { MenuTestPage } from '../pages/MenuTestPage'
import { getCSSVariableValue } from '../../_metronic/assets/ts/_utils'
import { WithChildren } from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import ProjectPageWrapperShow from '../modules/projects/ProjectPageWrapperShow'
import ProjectPageWrapperCreate from '../modules/projects/ProjectPageWrapperCreate'
import ContributorsOrganizationWrapper from '../modules/contributors/ContributorsOrganizationWrapper'
import ContributorsProjectWrapper from '../modules/contributors/ContributorsProjectWrapper'
import SubProjectPageWrapperShow from '../modules/sub-projects/SubProjectPageWrapperShow'
import SubSubProjectPageWrapperShow from '../modules/sub-sub-projects/SubSubProjectPageWrapperShow'
import SubSubSubProjectPageWrapperShow from '../modules/sub-sub-sub-projects/SubSubSubProjectPageWrapperShow'
import OrganizationWrapperShow from '../modules/organizations/OrganizationWrapperShow'
import GroupPageWrapperShow from '../modules/groups/GroupPageWrapperShow'
import GroupPageWrapperContributor from '../modules/groups/GroupPageWrapperContributor'
import PostPageWrapperShow from '../modules/posts/PostPageWrapperShow'
import ProjectPageWrapperContributor from '../modules/projects/ProjectPageWrapperContributor'
import ProjectPageWrapperProject from '../modules/projects/ProjectPageWrapperProject'
import ProjectPageWrapperContact from '../modules/projects/ProjectPageWrapperContact'
import ProjectPageWrapperDocument from '../modules/projects/ProjectPageWrapperDocument'
import ProjectPageWrapperGroup from '../modules/projects/ProjectPageWrapperGroup'
import SubProjectPageWrapperProject from '../modules/sub-projects/SubProjectPageWrapperProject'
import SubProjectPageWrapperContributor from '../modules/sub-projects/SubProjectPageWrapperContributor'
import SubProjectPageWrapperDocument from '../modules/sub-projects/SubProjectPageWrapperDocument'
import SubProjectPageWrapperGroup from '../modules/sub-projects/SubProjectPageWrapperGroup'
// import { OrganizationWrapper } from '../pages/organizations/OrganizationWrapper'

const PrivateRoutes = () => {
  const OrganizationWrapper = lazy(() => import('../modules/organizations/OrganizationWrapper'))
  const ApplicationsWrapper = lazy(() => import('../pages/applications/ApplicationsWrapper'))
  const ProjectsWrapper = lazy(() => import('../modules/projects/ProjectsWrapper'))
  const GroupsWrapper = lazy(() => import('../modules/groups/GroupsWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        {/* <Route path='organizations' element={<OrganizationWrapper />} /> */}
        {/* <Route path='projects' element={<ProjectsWrapper />} /> */}
        <Route path='organizations/:organizationId' element={<OrganizationWrapperShow />} />
        <Route
          path='organizations/:organizationId/contributors'
          element={<ContributorsOrganizationWrapper />}
        />
        {/* <Route path='projects/:projectId/contributors' element={<ContributorsProjectWrapper />} /> */}

        {/* Projects Routes */}
        <Route path='projects/:projectId' element={<ProjectPageWrapperShow />} />
        <Route path='projects/:projectId/project' element={<ProjectPageWrapperProject />} />
        <Route path='projects/:projectId/contributor' element={<ProjectPageWrapperContributor />} />
        <Route path='projects/:projectId/contact' element={<ProjectPageWrapperContact />} />
        <Route path='projects/:projectId/group' element={<ProjectPageWrapperGroup />} />
        <Route path='projects/:projectId/document' element={<ProjectPageWrapperDocument />} />
        
        <Route path='projects/:projectId/new-file' element={<ProjectPageWrapperCreate />} />

        {/* Groups Routes */}
        <Route path='groups/:groupId' element={<GroupPageWrapperShow />} />
        <Route path='groups/:groupId/contributors' element={<GroupPageWrapperContributor />} />
        

        {/* SubProjects Routes */}
        <Route path='projects/sb-p/:subProjectId' element={<SubProjectPageWrapperShow />} />
        <Route path='projects/sb-p/:subProjectId/group' element={<SubProjectPageWrapperGroup />} />
        <Route path='projects/sb-p/:subProjectId/project' element={<SubProjectPageWrapperProject />} />
        <Route path='projects/sb-p/:subProjectId/document' element={<SubProjectPageWrapperDocument />} />
        <Route path='projects/sb-p/:subProjectId/contributor' element={<SubProjectPageWrapperContributor />} />
        


        <Route
          path='projects/sb-sb-p/:subSubProjectId'
          element={<SubSubProjectPageWrapperShow />}
        />
        <Route
          path='projects/sb-sb-sb-p/:subSubSubProjectId'
          element={<SubSubSubProjectPageWrapperShow />}
        />
        <Route path='posts/:postSlug' element={<PostPageWrapperShow />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='groups/*'
          element={
            <SuspensedView>
              <GroupsWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='projects/*'
          element={
            <SuspensedView>
              <ProjectsWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='organizations/*'
          element={
            <SuspensedView>
              <OrganizationWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='applications/*'
          element={
            <SuspensedView>
              <ApplicationsWrapper />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export { PrivateRoutes }
