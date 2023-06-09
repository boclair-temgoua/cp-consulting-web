/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { AlertDangerNotification, AlertSuccessNotification } from '../../utils'
import { formateDateDayjs } from '../../utils/formate-date-dayjs'
import Swal from 'sweetalert2';
import { DiscountModel, DeleteOneDiscountMutation } from '../core/_models'
import { DiscountsCreateFormModal } from './DiscountsCreateFormModal'
import { arrayAuthorized } from '../../contributors/core/_models'
import { changeStatusOneDiscount } from '../core/_requests';

type Props = {
    item?: DiscountModel;
    roleItem?: { name: string }
}

const CategoriesList: React.FC<Props> = ({ item, roleItem }) => {
    const [isChecked, setIsChecked] = useState(item?.isActive);
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)

    const actionDeleteOneMutation = DeleteOneDiscountMutation({
        onSuccess: () => { },
        onError: (error) => { }
    });

    const deleteItem = async (item: any) => {
        // Swal.fire({
        //     title: 'Delete?',
        //     html: `<b>${item?.name}</b><br/><br/>
        //     <b>Confirm with your password</b> `,
        //     confirmButtonText: 'Yes, Deleted',
        //     cancelButtonText: 'No, Cancel',
        //     footer: `<b>Delete: ${item?.name}</b>`,
        //     buttonsStyling: false,
        //     customClass: {
        //         confirmButton: 'btn btn-sm btn-danger',
        //         cancelButton: 'btn btn-sm btn-primary',
        //     },
        //     input: 'password',
        //     inputAttributes: {
        //         autocapitalize: 'off',
        //         required: 'true'
        //     },
        //     showCancelButton: true,
        //     reverseButtons: true,
        //     showLoaderOnConfirm: true,
        //     inputPlaceholder: 'Confirm password',
        //     preConfirm: async (password) => {
        //         try {
        //             await actionDeleteOneMutation.mutateAsync({ password, categoryId: String(item?.id) })
        //             AlertSuccessNotification({
        //                 text: 'Contact deleted successfully',
        //                 className: 'info',
        //                 position: 'center',
        //             })
        //         } catch (error: any) {
        //             Swal.showValidationMessage(`${error?.response?.data?.message}`)
        //             AlertDangerNotification({ text: `${error?.response?.data?.message}`, className: 'info', position: 'center' })
        //         }
        //     },
        //     allowOutsideClick: () => !Swal.isLoading()
        // })

    }

    const changeStatusItem = async () => {
        try {
            setIsChecked(!isChecked);
            await changeStatusOneDiscount({ discountId: String(item?.id) })
            AlertSuccessNotification({
                text: 'Status change successfully',
                className: 'info',
                position: 'center',
            })
        } catch (error: any) {
            Swal.showValidationMessage(`${error?.response?.data?.message}`)
            AlertDangerNotification({ text: `${error?.response?.data?.message}`, className: 'info', position: 'center' })
        }
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
                        {`${item?.percent}%`}
                    </a>
                </td>
                <td>
                    <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                        {formateDateDayjs(item?.startedAt as Date)}
                    </a>
                </td>
                <td>
                    <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                        {formateDateDayjs(item?.expiredAt as Date)}
                    </a>
                </td>
                <td>
                    <a href={void (0)} className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                        {formateDateDayjs(item?.createdAt as Date)}
                    </a>
                </td>
                <td>
                    {arrayAuthorized.includes(`${roleItem?.name}`) && (
                        <div className='d-flex justify-content-end flex-shrink-0'>


                            <div
                                className='form-check 
                                form-check-custom 
                                form-check-solid 
                                form-check-success 
                                form-switch ms-8'
                            >
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    id='isActive'
                                    name='isActive'
                                    defaultChecked={isChecked}
                                    onChange={() => { changeStatusItem() }}
                                />
                            </div>

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

            {openCreateOrUpdateModal && (<DiscountsCreateFormModal discount={item} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}

        </>
    )
}

export default CategoriesList
