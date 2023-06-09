/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { AlertDangerNotification, AlertSuccessNotification } from '../../utils'
import { formateDateDayjs } from '../../utils/formate-date-dayjs'
import Swal from 'sweetalert2';
import { CategoryModel, DeleteOneCategoryMutation } from '../core/_models'
import { CategoriesCreateFormModal } from './CategoriesCreateFormModal'
import { arrayAuthorized } from '../../contributors/core/_models'

type Props = {
    item?: CategoryModel;
    roleItem?: { name: string }
}

const CategoriesList: React.FC<Props> = ({ item, roleItem }) => {
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)

    const actionDeleteOneMutation = DeleteOneCategoryMutation({
        onSuccess: () => { },
        onError: (error) => { }
    });

    const deleteItem = async (item: any) => {
        Swal.fire({
            title: 'Delete?',
            html: `<b>${item?.name}</b><br/><br/>
            <b>Confirm with your password</b> `,
            confirmButtonText: 'Yes, Deleted',
            cancelButtonText: 'No, Cancel',
            footer: `<b>Delete: ${item?.name}</b>`,
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
                    await actionDeleteOneMutation.mutateAsync({ password, categoryId: String(item?.id) })
                    AlertSuccessNotification({
                        text: 'Contact deleted successfully',
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
                        <div className='d-flex justify-content-start flex-column'>
                            <a href={void (0)} className='text-dark fw-bold text-hover-primary fs-6'>
                                {item?.name}
                            </a>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {item?.description}
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                        {formateDateDayjs(item?.createdAt as Date)}
                    </a>
                </td>
                <td>
                    {arrayAuthorized.includes(`${roleItem?.name}`) && (
                        <div className='d-flex justify-content-end flex-shrink-0'>
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

            {openCreateOrUpdateModal && (<CategoriesCreateFormModal category={item} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}

        </>
    )
}

export default CategoriesList
