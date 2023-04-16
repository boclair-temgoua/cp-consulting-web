/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { DeleteOneContactMutation, ContactModel, ContactProjectModel } from '../core/_models'
import { AlertDangerNotification, AlertSuccessNotification, capitalizeFirstLetter } from '../../utils'
import { formateDateDayjs } from '../../utils/formate-date-dayjs'
import Swal from 'sweetalert2';
import { UseFormRegister } from 'react-hook-form'
import { TextInput } from '../../utils/forms'
import { ProjectModel } from '../../projects/core/_models'
import { ContactCreateFormModal } from './ContactCreateFormModal'
import { arrayAuthorized } from '../../contributors/core/_models'

type Props = {
    errors: { [key: string]: any };
    register: UseFormRegister<any>;
    value: string;
    item?: any;
    roleItem?: { name: string }
}

const ContactList: React.FC<Props> = ({ item, register, value, errors, roleItem }) => {
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)

    const actionDeleteOneContactMutation = DeleteOneContactMutation({
        onSuccess: () => { },
        onError: (error) => { }
    });

    const deleteItem = async (item: any) => {
        Swal.fire({
            title: 'Delete?',
            html: `<b>${item?.lastName} ${item?.firstName}</b><br/><br/>
            <b>Confirm with your password</b> `,
            confirmButtonText: 'Yes, Deleted',
            cancelButtonText: 'No, Cancel',
            footer: `<b>Delete: ${item?.lastName} ${item?.firstName}</b>`,
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
                    await actionDeleteOneContactMutation.mutateAsync({ password, contactId: String(item?.id) })
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
                {roleItem?.name === 'ADMIN' && (
                    <td>

                        <div className="form-check form-check-sm form-check-custom form-check-solid">

                            <TextInput
                                className="form-check-input widget-9-check"
                                register={register}
                                errors={errors}
                                inputName="contacts"
                                type={'checkbox'}
                                value={value}
                                validation={{ required: true }}
                                isRequired={true}
                                required="required"
                            />
                        </div>
                    </td>
                )}

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

            {openCreateOrUpdateModal && (<ContactCreateFormModal organizationId={String(item?.organizationId)} contact={item} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
        </>
    )
}

export default ContactList
