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
// import { OrganizationWrapper } from '../pages/organizations/OrganizationWrapper'

const PrivateRoutes = () => {
  const OrganizationWrapper = lazy(() => import('../modules/organizations/OrganizationWrapper'))
  const ApplicationsWrapper = lazy(() => import('../pages/applications/ApplicationsWrapper'))
  const ProjectsWrapper = lazy(() => import('../modules/projects/ProjectsWrapper'))
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
        <Route path='organizations/:organizationId/contributors' element={<ContributorsOrganizationWrapper />} />
        <Route path='projects/:projectId/contributors' element={<ContributorsProjectWrapper />} />
        <Route path='projects/:projectId' element={<ProjectPageWrapperShow />} />
        <Route path='projects/sb-p/:subProjectId' element={<SubProjectPageWrapperShow />} />
        <Route path='projects/sb-sb-p/:subSubProjectId' element={<SubSubProjectPageWrapperShow />} />
        <Route path='projects/:projectId/new-file' element={<ProjectPageWrapperCreate />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
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
