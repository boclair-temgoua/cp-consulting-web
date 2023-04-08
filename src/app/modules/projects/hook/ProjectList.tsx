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

type Props = {
    item?: ContributorModel;
}

const ProjectList: React.FC<Props> = ({ item }) => {
    const { organization, role } = useAuth() as any
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
    const navigate = useNavigate();


    const fetchDataContributorMini = async () => await getContributorsProject({ take: 6, page: 1, sort: 'ASC', projectId: String(item?.projectId) })
    const { isLoading: isLoadingContributor, isError: isErrorContributor, data: dataContributorMini } = useQuery({
        queryKey: ['contributorsProjectMini', item?.projectId],
        queryFn: () => fetchDataContributorMini(),
    })
    const datataContributorMiniTable = isLoadingContributor ? (<strong>Loading...</strong>) :
        isErrorContributor ? (<strong>Error find data please try again...</strong>) :
            (dataContributorMini?.data?.total <= 0) ? ('') :
                (
                    dataContributorMini?.data?.value?.map((item: ContributorModel, index: number) => (
                        <ContributorMiniList item={item} key={index} />
                    )))



    const fetchDataContactMini = async () => await getContactsBy({ take: 5, page: 1, sort: 'ASC', type: 'PROJECT', projectId: String(item?.projectId) })
    const { isLoading: isLoadingContact, isError: isErrorContact, data: dataContactMini } = useQuery({
        queryKey: ['contactsProjectMini', item?.projectId],
        queryFn: () => fetchDataContactMini(),
    })
    const datataContactMiniTable = isLoadingContact ? (<strong>Loading...</strong>) :
        isErrorContact ? (<strong>Error find data please try again...</strong>) :
            (dataContactMini?.data?.total <= 0) ? ('') :
                (
                    dataContactMini?.data?.value?.map((item: OneContactModel, index: number) => (
                        <ContactMiniList item={item} key={index} index={index} />
                    )))

    return (
        <>
            <tr key={item?.id}>
                <td>
                    <div className='d-flex align-items-center' onClick={() => navigate(`/projects/${item?.projectId}`, { replace: true })}>
                        <div className='symbol symbol-35px me-5'>
                            <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt={item?.project?.name} />
                            {/* <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' /> */}
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <Link to={`/projects/${item?.projectId}`} className='text-dark fw-bold text-hover-primary fs-6'>
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
                    <span className={`badge badge-light-${colorRole[String(item?.role?.name)]} fw-bolder`}>
                        {item?.role?.name}
                    </span>
                </td>
                <td>
                    <div className='symbol-group symbol-hover flex-nowrap'>

                        {datataContributorMiniTable}

                    </div>
                </td>

                <td>
                    {/* <div className='symbol-group symbol-hover flex-nowrap'>

                        {datataContactMiniTable}

                    </div> */}
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
