/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useLocation } from 'react-router-dom'
import { capitalizeOneFirstLetter } from '../../utils'
import ContributorMiniList from '../../contributors/hook/ContributorMiniList'
import { ContributorModel } from '../../contributors/core/_models'
import { useQuery } from '@tanstack/react-query'
import { getContributorsProject, getContributorsSubProject } from '../../contributors/core/_requests'
import { SubProjectModel } from '../core/_models'
import { KTSVG } from '../../../../_metronic/helpers'

interface Props {
  subProject: SubProjectModel
}

const SubProjectHeader: React.FC<Props> = ({ subProject }) => {
  const navigate = useNavigate()
  const takeValue: number = 6
  const location = useLocation()

  const fetchDataContributorMini = async () =>
    await getContributorsSubProject({
      take: takeValue,
      page: 1,
      sort: 'ASC',
      subProjectId: String(subProject?.id),
    })
  const {
    isLoading: isLoadingContributor,
    isError: isErrorContributor,
    data: dataContributorMini,
  } = useQuery({
    queryKey: ['contributorSubProjectMini', String(subProject?.id), takeValue, 1, 'ASC'],
    queryFn: () => fetchDataContributorMini(),
  })
  const dataContributorMiniTable = isLoadingContributor ? (
    <strong>Loading...</strong>
  ) : isErrorContributor ? (
    <strong>Error find data please try again...</strong>
  ) : dataContributorMini?.data?.total <= 0 ? (
    ''
  ) : (
    dataContributorMini?.data?.value?.map((item: ContributorModel, index: number) => (
      <ContributorMiniList item={item} key={index} />
    ))
  )

  const calculatedContributors: number = Number(
    Number(dataContributorMini?.data.total) - Number(dataContributorMini?.data?.total_value)
  )
  return (
    <>
      <a href={void (0)} className='btn-flex btn-light-primary fw-bolder'
        onClick={() => { navigate(`/projects/${subProject?.projectId}`) }} style={{ cursor: 'pointer' }}>
        <KTSVG path='/media/icons/duotune/arrows/arr063.svg' className='svg-icon-2' />
      </a>
      <a href={void (0)} className='btn-flex btn-light-primary fw-bolder'
        onClick={() => { navigate(-1) }} style={{ cursor: 'pointer' }}>
        <KTSVG path='/media/icons/duotune/arrows/arr001.svg' className='svg-icon-2' />
      </a>

      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-6'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>
                <div
                  className={`symbol-label fs-2 bg-light-${subProject?.color} text-${subProject?.color}`}
                >
                  {capitalizeOneFirstLetter(String(subProject?.name))}
                </div>
              </div>
            </div>
            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-1'>
                    <span className='text-gray-800 text-hover-primary fs-2 fw-bold me-3'>
                      {subProject?.name || 'Group'}
                    </span>
                  </div>
                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    <p className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'>
                      {subProject?.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className='d-flex flex-wrap justify-content-start'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{subProject?.contributorTotal || 0}</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>Members</div>
                  </div>
                </div>
                {Number(subProject?.subSubProjectTotal) > 0 && (
                  <div className='d-flex flex-wrap'>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-2 fw-bolder'>{subProject?.subSubProjectTotal || 0}</div>
                      </div>
                      <div className='fw-bold fs-6 text-gray-400'>Projects</div>
                    </div>
                  </div>
                )}
                {Number(subProject?.documentTotal) > 0 && (
                  <div className='d-flex flex-wrap'>
                    <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                      <div className='d-flex align-items-center'>
                        <div className='fs-2 fw-bolder'>{subProject?.documentTotal || 0}</div>
                      </div>
                      <div className='fw-bold fs-6 text-gray-400'>Documents</div>
                    </div>
                  </div>
                )}
                <div className='symbol-group symbol-hover mb-3'>
                  {dataContributorMiniTable}

                  {calculatedContributors > 0 && (
                    <span className='symbol symbol-35px symbol-circle'>
                      <span className='symbol-label bg-dark text-inverse-dark fs-8 fw-bold'>
                        +{calculatedContributors}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='separator'></div>

          <ul className='nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold'>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/projects/sb-p/${subProject?.id}` && 'active')
                }
                to={`/projects/sb-p/${subProject?.id}`}
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/projects/sb-p/${subProject?.id}/project` && 'active')
                }
                to={`/projects/sb-p/${subProject?.id}/project`}
              >
                Projects
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/projects/sb-p/${subProject?.id}/contributor` && 'active')
                }
                to={`/projects/sb-p/${subProject?.id}/contributor`}
              >
                Members
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/projects/sb-p/${subProject?.id}/document` && 'active')
                }
                to={`/projects/sb-p/${subProject?.id}/document`}
              >
                Documents
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/projects/sb-p/${subProject?.id}/group` && 'active')
                }
                to={`/projects/sb-p/${subProject?.id}/group`}
              >
                Groups
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/projects/sb-p/${subProject?.id}/contact` && 'active')
                }
                to={`/projects/sb-p/${subProject?.id}/contact`}
              >
                Contacts
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/projects/sb-p/${subProject?.id}/settings` && 'active')
                }
                to={`/projects/sb-p/${subProject?.id}/setting`}
              >
                Setting
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export { SubProjectHeader }
