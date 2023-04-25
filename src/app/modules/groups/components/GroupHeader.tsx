/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useLocation } from 'react-router-dom'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { capitalizeOneFirstLetter } from '../../utils'
import ContributorMiniList from '../../contributors/hook/ContributorMiniList'
import { ContributorModel } from '../../contributors/core/_models'
import { useQuery } from '@tanstack/react-query'
import { getContributorsGroup } from '../../contributors/core/_requests'
import { GroupModel } from '../core/_models'
import { PostCreateFormModal } from '../../posts/hook/PostCreateFormModal'

interface Props {
  group?: GroupModel
}

const GroupHeader: React.FC<Props> = ({ group }) => {
  const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
  const takeValue: number = 6
  const location = useLocation()

  const fetchDataContributorMini = async () =>
    await getContributorsGroup({
      take: takeValue,
      page: 1,
      sort: 'ASC',
      groupId: String(group?.id),
    })
  const {
    isLoading: isLoadingContributor,
    isError: isErrorContributor,
    data: dataContributorMini,
  } = useQuery({
    queryKey: ['contributorGroupMini', String(group?.id), takeValue, 1, 'ASC'],
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
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-0'>
          <div className='d-flex flex-wrap flex-sm-nowrap mb-6'>
            <div className='me-7 mb-4'>
              <div className='symbol symbol-100px symbol-lg-160px symbol-fixed position-relative'>

                <div className={`symbol-label fs-2 bg-light-${group?.color} text-${group?.color}`}>
                  {capitalizeOneFirstLetter(String(group?.name))}
                </div>

              </div>
            </div>
            <div className='flex-grow-1'>
              <div className='d-flex justify-content-between align-items-start flex-wrap mb-2'>
                <div className='d-flex flex-column'>
                  <div className='d-flex align-items-center mb-1'>
                    <span className='text-gray-800 text-hover-primary fs-2 fw-bold me-3'>
                      {group?.name || 'Group'}
                    </span>
                  </div>
                  <div className='d-flex flex-wrap fw-bold fs-6 mb-4 pe-2'>
                    <p

                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      {group?.description}
                    </p>
                    {/* <p
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/general/gen018.svg'
                        className='svg-icon-4 me-1'
                      />
                      SF, Bay Area
                    </p>
                    <p
                      className='d-flex align-items-center text-gray-400 text-hover-primary me-5 mb-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/electronics/elc002.svg'
                        className='svg-icon-4 me-1'
                      />
                      3425712192
                    </p>
                    <p
                      className='d-flex align-items-center text-gray-400 text-hover-primary mb-2'
                    >
                      <KTSVG
                        path='/media/icons/duotune/communication/com011.svg'
                        className='svg-icon-4 me-1'
                      />
                      max@kt.com
                    </p> */}
                  </div>
                </div>


                <div className='d-flex my-4'>
                  <button type="button" onClick={() => { setOpenCreateOrUpdateModal(true) }} className="btn btn-sm btn-light-primary me-1">
                    <KTSVG path='/media/icons/duotune/abstract/abs011.svg' className='svg-icon-3' />
                    New Post
                  </button>
                </div>

              </div>

              <div className='d-flex flex-wrap justify-content-start'>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{group?.postTotal || 0}</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>Posts</div>
                  </div>
                </div>
                <div className='d-flex flex-wrap'>
                  <div className='border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3'>
                    <div className='d-flex align-items-center'>
                      <div className='fs-2 fw-bolder'>{group?.contributorTotal || 0}</div>
                    </div>
                    <div className='fw-bold fs-6 text-gray-400'>Members</div>
                  </div>
                </div>

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
                  (location.pathname === `/groups/${group?.id}` && 'active')
                }
                to={`/groups/${group?.id}`}
              >
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                className={
                  `nav-link text-active-primary me-6 ` +
                  (location.pathname === `/groups/${group?.id}/contributors` && 'active')
                }
                to={`/groups/${group?.id}/contributors`}
              >
                Members
              </Link>
            </li>
            <li className='nav-item'>
              <Link
               className={
                `nav-link text-active-primary me-6 ` +
                (location.pathname === `/groups/${group?.id}/settings` && 'active')
              }
                to={`/groups/${group?.id}/setting`}
              >
                Setting
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {openCreateOrUpdateModal && (<PostCreateFormModal setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} groupId={String(group?.id)} />)}

    </>
  )
}

export { GroupHeader }
