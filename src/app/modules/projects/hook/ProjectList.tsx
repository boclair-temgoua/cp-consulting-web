/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Link, useNavigate } from 'react-router-dom'
import { ContributorModel } from '../../contributors/core/_models'
import { getContributorsProject } from '../../contributors/core/_requests'
import ContributorMiniList from '../../contributors/hook/ContributorMiniList'
import ContactMiniList from '../../contacts/hook/ContactMiniList'
import { OneContactModel } from '../../contacts/core/_models'
import { getContactsBy } from '../../contacts/core/_requests'
import { useQuery } from '@tanstack/react-query'
import { ProjectCreateFormModal } from './ProjectCreateFormModal'
import { useAuth } from '../../auth'
import { colorRole } from '../../utils'
import { formateDateDayjs } from '../../utils/formate-date-dayjs'

type Props = {
    item?: ContributorModel;
}

const ProjectList: React.FC<Props> = ({ item }) => {
    const takeItem: number = 6
    const pageItem: number = 1
    const { organization, role } = useAuth() as any
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
    const navigate = useNavigate();


    const fetchDataContributorMini = async () => await getContributorsProject({ take: takeItem, page: pageItem, sort: 'ASC', projectId: String(item?.projectId) })
    const { isLoading: isLoadingContributor, isError: isErrorContributor, data: dataContributorMini } = useQuery({
        queryKey: ['contributorsProjectMini', item?.projectId, takeItem, pageItem, 'ASC',],
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
            <tr key={item?.id}>
                <td>
                    <div className='d-flex align-items-center' onClick={() => navigate(`/projects/${item?.projectId}?tab=${'home'}`, { replace: true })}>
                        <div className='symbol symbol-35px me-5'>
                            <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt={item?.project?.name} />
                            {/* <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' /> */}
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <Link to={`/projects/${item?.projectId}?tab=${'home'}`} className='text-dark fw-bold text-hover-primary fs-6'>
                                {item?.project?.name}
                            </Link>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {item?.project?.description}
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <span className={`badge badge-light-${item?.organization?.color} fw-bolder`}>
                        {item?.organization?.name}
                    </span>
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
                            <button onClick={() => { setOpenCreateOrUpdateModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
                                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                            </button>
                        </div>
                    )}
                </td>
            </tr>

            {openCreateOrUpdateModal && (<ProjectCreateFormModal project={item?.project} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
        </>
    )
}

export default ProjectList
