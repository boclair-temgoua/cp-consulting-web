/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { OneContactModel } from '../core/_models'
import { capitalizeFirstLetter } from '../../utils'
import { formateDateDayjs } from '../../utils/formate-date-dayjs'
import Swal from 'sweetalert2';

type Props = {
    item?: OneContactModel;
}

const ContactList: React.FC<Props> = ({ item }) => {

    const deleteItem = async (voucher: any) => {
        Swal.fire({
            title: 'Delete?',
            text: 'Are you sure you want to perform this action?',
            confirmButtonText: 'Yes, Deleted',
            cancelButtonText: 'No, Cancel',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-default',
            },
            showCancelButton: true,
            reverseButtons: true,
        }).then(async (result) => {
            if (result.value) {
                console.log('item ======>', item)
                //Envoyer la requet au serve
                // const payloadSave = { code: voucher?.code }
                // eslint-disable-next-line no-lone-blocks
                // {
                //   voucher?.voucherType === 'COUPON' ?
                //     actionDeleteCouponMutation.mutateAsync(payloadSave) :
                //     actionDeleteVoucherMutation.mutateAsync(payloadSave)
                // }

            }
        });

    }

    return (
        <>
            <tr key={item?.id}>
                <td>
                    <div className='d-flex align-items-center'>
                        <div className="symbol symbol-circle symbol-40px overflow-hidden me-3">
                            <a href={void (0)}>
                                {item?.image ?
                                    <div className="symbol-label">
                                        <img src={item?.image} alt="Emma Smith" className="w-100" />
                                    </div> :
                                    <div className={`symbol-label fs-3 bg-light-${item?.color} text-${item?.color}`}>
                                        {capitalizeFirstLetter(String(item?.lastName), String(item?.firstName))}
                                    </div>
                                }
                            </a>
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <a href={void (0)} className='text-dark fw-bold text-hover-primary fs-6'>
                                {item?.lastName} {item?.firstName}
                            </a>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {item?.email}
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='d-flex align-items-center'>
                        <div className='d-flex justify-content-start flex-column'>
                            <a href={void (0)} className='text-dark fw-bold text-hover-primary fs-6'>
                                {item?.category?.name}
                            </a>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {item?.phone} {item?.address}
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
                    <div className='d-flex justify-content-end flex-shrink-0'>
                        <a
                            href='#'
                            className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
                        >
                            <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                        </a>
                        <button type='button' onClick={() => { deleteItem(item) }} className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'>
                            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                        </button>
                    </div>
                    {/* {contributor?.role?.name === 'ADMIN' && (
                        <div className='d-flex justify-content-end flex-shrink-0'>
                            <a
                                href='#'
                                className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
                            >
                                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                            </a>
                            <button type='button' onClick={() => { deleteItem(item) }} className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'>
                                <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                            </button>
                        </div>
                    )} */}
                </td>
            </tr>

        </>
    )
}

export default ContactList