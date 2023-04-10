/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Link, useNavigate } from 'react-router-dom'
import { ContributorModel, arrayAuthorized } from '../../contributors/core/_models'
import ContributorMiniList from '../../contributors/hook/ContributorMiniList'
import { useQuery } from '@tanstack/react-query'
import { getContributorsSubSubSubProject } from '../../contributors/core/_requests'
import Swal from 'sweetalert2';
import { AlertDangerNotification, AlertSuccessNotification, colorRole } from '../../utils'
import { formateDateDayjs } from '../../utils/formate-date-dayjs'
import { SubSubProjectModel } from '../../sub-sub-projects/core/_models'
import { SubSubSubProjectCreateFormModal } from './SubSubSubProjectCreateFormModal'
import { DeleteOneSubSubSubProjectMutation } from '../core/_models'
import { InviteContributorFormModal } from '../../contributors/hook/InviteContributorFormModal'

type Props = {
    takeValue?: number
    item?: ContributorModel;
    subSubProject?: SubSubProjectModel;
}

const SubSubSubProjectList: React.FC<Props> = ({ item, subSubProject, takeValue }) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
    const navigate = useNavigate();


    const fetchDataContributorMini = async () => await getContributorsSubSubSubProject({ take: Number(takeValue), page: 1, sort: 'ASC', subSubSubProjectId: String(item?.subSubSubProjectId) })
    const { isLoading: isLoadingContributor, isError: isErrorContributor, data: dataContributorMini } = useQuery({
        queryKey: ['contributorSubSubSubProjectMini', item?.subSubSubProjectId, 1, 'ASC'],
        queryFn: () => fetchDataContributorMini(),
    })
    const dataContributorMiniTable = isLoadingContributor ? (<strong>Loading...</strong>) :
        isErrorContributor ? (<strong>Error find data please try again...</strong>) :
            (dataContributorMini?.data?.total <= 0) ? ('') :
                (
                    dataContributorMini?.data?.value?.map((item: ContributorModel, index: number) => (
                        <ContributorMiniList item={item} key={index} />
                    )))


    const actionMutation = DeleteOneSubSubSubProjectMutation({
        onSuccess: () => { },
        onError: (error) => { }
    });


    const deleteItem = async (item: any) => {
        Swal.fire({
            title: 'Delete?',
            html: `<b>${item?.subProject?.name}</b><br/><br/>
            <b>Confirm with your password</b> `,
            confirmButtonText: 'Yes, Deleted',
            cancelButtonText: 'No, Cancel',
            footer: `<b>Delete: ${item?.subProject?.name}</b>`,
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-sm btn-danger',
                cancelButton: 'btn btn-sm btn-primary',
            },
            input: 'password',
            inputAttributes: {
                autocapitalize: 'off',
                required: 'true'
            },
            showCancelButton: true,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            inputPlaceholder: 'Confirm password',
            preConfirm: async (password) => {
                try {
                    await actionMutation.mutateAsync({ password, subSubSubProjectId: String(item?.subSubSubProjectId) })
                    AlertSuccessNotification({
                        text: 'Project deleted successfully',
                        className: 'info',
                        position: 'center',
                    })
                } catch (error: any) {
                    Swal.showValidationMessage(`${error?.response?.data?.message}`)
                    AlertDangerNotification({ text: `${error?.response?.data?.message}`, className: 'info', position: 'center' })
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        })

    }

    const calculatedContributors: number = Number(Number(dataContributorMini?.data.total) - Number(dataContributorMini?.data?.total_value))
    return (
        <>
            <tr key={item?.id}>
                <td>
                    <div className='d-flex align-items-center' onClick={() => navigate(`/projects/sb-sb-sb-p/${item?.subSubSubProjectId}`, { replace: true })}>
                        <div className='symbol symbol-35px me-5'>
                            <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt="" />
                            {/* <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' /> */}
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <Link to={`/projects/sb-sb-sb-p/${item?.subSubSubProjectId}`} className='text-dark fw-bold text-hover-primary fs-6'>
                                {item?.subSubSubProject?.name}
                            </Link>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {item?.subSubSubProject?.description}
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='symbol-group symbol-hover flex-nowrap'>

                        {dataContributorMiniTable}

                        <Link to={`/projects`} className="symbol symbol-30px symbol-circle">
                            {calculatedContributors > Number(dataContributorMini?.data?.total_value) &&
                                <span className="symbol-label fs-8 fw-bold bg-dark text-gray-300">
                                    +{calculatedContributors}
                                </span>
                            }
                        </Link>

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
                    {arrayAuthorized.includes(`${subSubProject?.role?.name}`) && (
                        <div className='d-flex justify-content-end flex-shrink-0'>
                            <button onClick={() => { setOpenModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                <KTSVG path='/media/icons/duotune/communication/com006.svg' className='svg-icon-3' />
                            </button>
                            <button onClick={() => { setOpenCreateOrUpdateModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
                                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                            </button>
                            <button type='button' onClick={() => { deleteItem(item) }} className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'>
                                <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                            </button>
                        </div>

                    )}
                </td>
            </tr>
            {openModal && (<InviteContributorFormModal setOpenModal={setOpenModal} subSubSubProjectId={item?.subSubSubProject?.id} />)}
            {openCreateOrUpdateModal && (<SubSubSubProjectCreateFormModal subSubSubProject={item?.subSubSubProject} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
        </>
    )
}

export default SubSubSubProjectList
