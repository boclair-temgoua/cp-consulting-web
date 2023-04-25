/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { Link, useNavigate } from 'react-router-dom'
import { ContributorModel } from '../../contributors/core/_models'
import { getContributorsGroup, getContributorsProject } from '../../contributors/core/_requests'
import ContributorMiniList from '../../contributors/hook/ContributorMiniList'
import ContactMiniList from '../../contacts/hook/ContactMiniList'
import { ContactModel } from '../../contacts/core/_models'
import { getContactsBy } from '../../contacts/core/_requests'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../auth'
import { capitalizeOneFirstLetter, colorRole, truncateText } from '../../utils'
import { formateDateDayjs } from '../../utils/formate-date-dayjs'
import { GroupCreateFormModal } from './GroupCreateFormModal'
import { InviteContributorFormModal } from '../../contributors/hook/InviteContributorFormModal'
import { getOneGroup } from '../core/_requests'

type Props = {
    item?: ContributorModel;
}

const GroupList: React.FC<Props> = ({ item }) => {
    const takeItem: number = 6
    const pageItem: number = 1
    const queryClient = useQueryClient()
    const { organization, role } = useAuth() as any
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
    const navigate = useNavigate();


    const fetchDataContributorMini = async () => await getContributorsGroup({ take: takeItem, page: pageItem, sort: 'ASC', groupId: String(item?.groupId) })
    const { isLoading: isLoadingContributor, isError: isErrorContributor, data: dataContributorMini } = useQuery({
        queryKey: ['contributorsGroupMini', item?.groupId, takeItem, pageItem, 'ASC',],
        queryFn: () => fetchDataContributorMini(),
    })
    const dataContributorMiniTable = isLoadingContributor ? (<strong>Loading...</strong>) :
        isErrorContributor ? (<strong>Error find data please try again...</strong>) :
            (dataContributorMini?.data?.total <= 0) ? ('') :
                (
                    dataContributorMini?.data?.value?.map((item: ContributorModel, index: number) => (
                        <ContributorMiniList item={item} key={index} />
                    )))

    const calculatedContributors: number = Number(Number(dataContributorMini?.data.total) - Number(dataContributorMini?.data?.total_value))
    return (
        <>
            <tr key={item?.id} onMouseEnter={() => {
                queryClient.prefetchQuery({
                    queryKey: ['group', String(item?.id)],
                    queryFn: () => getOneGroup({ groupId: String(item?.id) }),
                })
            }}>
                <td>
                    <div className='d-flex align-items-center' onClick={() => navigate(`/groups/${item?.groupId}`, { replace: true })}>
                        <div className='symbol symbol-circle symbol-40px overflow-hidden me-3'>
                            <div className={`symbol-label fs-3 bg-light-${item?.group?.color} text-${item?.group?.color}`}>
                                {capitalizeOneFirstLetter(String(item?.group?.name))}
                            </div>
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <Link to={`/groups/${item?.groupId}`} className='text-dark fw-bold text-hover-primary fs-6'>
                                {item?.group?.name}
                            </Link>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {truncateText(String(item?.group?.description))}
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='symbol-group symbol-hover flex-nowrap'>

                        {dataContributorMiniTable}

                        {calculatedContributors > 0 && (
                            <span className="symbol symbol-35px symbol-circle">
                                <span className="symbol-label fs-8 fw-bold bg-dark text-gray-300">
                                    +{calculatedContributors}
                                </span>
                            </span>
                        )}

                    </div>
                </td>
                <td>
                    <span className={`badge badge-light-${colorRole[String(item?.role?.name)]} fw-bolder`}>
                        {item?.role?.name}
                    </span>
                </td>

                <td>
                    <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                        {formateDateDayjs(item?.createdAt as Date)}
                    </span>
                </td>

                <td>
                    {role?.name === 'ADMIN' && organization?.id === item?.organizationId && (
                        <div className='d-flex justify-content-end flex-shrink-0'>
                            <button onClick={() => { setOpenModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                <KTSVG path='/media/icons/duotune/communication/com006.svg' className='svg-icon-3' />
                            </button>
                            <button onClick={() => { setOpenCreateOrUpdateModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
                                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                            </button>
                        </div>
                    )}
                </td>
            </tr>
            {openModal && (<InviteContributorFormModal setOpenModal={setOpenModal} groupId={item?.groupId} />)}
            {openCreateOrUpdateModal && (<GroupCreateFormModal group={item?.group} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
        </>
    )
}

export default GroupList
