import React, { useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { ContributorModel } from '../core/_models'
import { AlertDangerNotification, AlertSuccessNotification, capitalizeFirstLetter, colorRole } from '../../utils'
import { formateDateDayjs } from '../../utils/formate-date-dayjs'
import Swal from 'sweetalert2';
import { ContributorUpdateFormModal } from './ContributorUpdateFormModal'
import { DeleteOneContributorMutation } from '../core/_models'

type Props = {
    item?: ContributorModel;
    contributor?: any
}

const ContributorList: React.FC<Props> = ({ item, contributor }) => {
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)

    const saveMutation = DeleteOneContributorMutation({
        onSuccess: () => { },
        onError: (error) => { }
    });


    const deleteItem = async (item: any) => {
        Swal.fire({
            title: 'Delete?',
            html: `<b>${item?.profile?.firstName} ${item?.profile?.lastName}</b><br/><br/>
            <b>Confirm with your password</b> `,
            confirmButtonText: 'Yes, Deleted',
            cancelButtonText: 'No, Cancel',
            footer: `<b>Delete: ${item?.profile?.firstName} ${item?.profile?.lastName}</b>`,
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
                    await saveMutation.mutateAsync({ password, contributorId: String(item?.id) })
                    AlertSuccessNotification({
                        text: 'Contributor remove successfully',
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

    return (
        <>
            <tr key={item?.id}>
                <td>
                    <div className='d-flex align-items-center'>
                        <div className="symbol symbol-circle symbol-40px overflow-hidden me-3">
                            <a href={void (0)}>
                                {item?.profile?.image ?
                                    <div className="symbol-label">
                                        <img src={item?.profile?.image} alt="Emma Smith" className="w-100" />
                                    </div> :
                                    <div className={`symbol-label fs-3 bg-light-${item?.profile?.color} text-${item?.profile?.color}`}>
                                        {capitalizeFirstLetter(String(item?.profile?.lastName), String(item?.profile?.firstName))}
                                    </div>
                                }
                            </a>
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <Link to='/projects/192817273' className='text-dark fw-bold text-hover-primary fs-6'>
                                {item?.profile?.lastName} {item?.profile?.firstName}
                            </Link>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {item?.profile?.email}
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                        {formateDateDayjs(item?.createdAt as Date)}
                    </a>
                </td>
                {contributor?.role?.name === 'ADMIN' && (
                    <>
                        <td>
                            <span className={`badge badge-light-${colorRole[String(item?.role?.name)]} fw-bolder`}>
                                {item?.role?.name}
                            </span>
                        </td>
                        <td>
                            <div className='d-flex justify-content-end flex-shrink-0'>
                                <button onClick={() => { setOpenCreateOrUpdateModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
                                    <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                                </button>
                                <button type='button' onClick={() => { deleteItem(item) }} className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'>
                                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                                </button>
                            </div>
                        </td>
                    </>
                )}
            </tr>

            {openCreateOrUpdateModal && (<ContributorUpdateFormModal contributor={item} setOpenModal={setOpenCreateOrUpdateModal} />)}
        </>
    )
}

export default ContributorList
