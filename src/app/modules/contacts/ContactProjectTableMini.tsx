/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { KTSVG } from '../../../_metronic/helpers';
import { ContributorModel } from '../contributors/core/_models';
import { ProjectModel } from '../projects/core/_models';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { EmptyTable } from '../utils/empty-table';
import { getContactProjectsBy, getContactsBy } from './core/_requests';
import ContactList from './hook/ContactList';
import { DeleteMultipleContactMutation, ContactModel, ContactProjectModel } from './core/_models';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from 'sweetalert2';
import { AlertDangerNotification, AlertSuccessNotification } from '../utils';
import { useDebounce } from '../utils/use-debounce';
import { PaginationItem } from '../utils/pagination-item';
import { SearchInput } from '../utils/forms/SearchInput';
import { InviteContactFormModal } from './hook/InviteContactFormModal';

type Props = {
    takeValue: number
    project?: ProjectModel;
}

const schema = yup.object().shape({
    contacts: yup.array()
        .min(1, "you can't leave this blank.")
        .required("you can't leave this blank."),
})

const ContactProjectTableMini: React.FC<Props> = ({ project }) => {
    const [openModal, setOpenModal] = useState<boolean>(false)

    const { register, handleSubmit,
        formState: { errors, isDirty, isValid }
    } = useForm<string[]>({ resolver: yupResolver(schema), mode: "onChange" });

    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams();
    const [pageItem, setPageItem] = useState(Number(searchParams.get('page')) || 1)
    const [filter, setFilter] = useState<string>('')

    const debouncedFilter = useDebounce(filter, 500);
    const isEnabled = Boolean(debouncedFilter)
    const fetchData = async (pageItem = 1, debouncedFilter: string) => await
        getContactProjectsBy({
            search: debouncedFilter,
            take: 6,
            page: Number(pageItem || 1),
            sort: 'DESC',
            projectId: String(project?.id),
            type: 'PROJECT',
            organizationId: String(project?.organizationId)
        })
    const {
        isLoading: isLoadingContact,
        isError: isErrorContact,
        data: dataContact,
        isPreviousData,
    } = useQuery({
        queryKey: ['contacts', pageItem, debouncedFilter, project?.id],
        queryFn: () => fetchData(pageItem, debouncedFilter),
        enabled: filter ? isEnabled : !isEnabled,
        keepPreviousData: true,
    })

    // Prefetch the next page!
    useEffect(() => {
        if (dataContact?.data?.total_page !== pageItem) {
            queryClient.prefetchQuery
                (['contacts', pageItem + 1], () =>
                    fetchData(pageItem + 1, debouncedFilter)
                )
        }
    }, [dataContact?.data, pageItem, queryClient, debouncedFilter, project?.id])

    const paginate = (pageItem: number) => {
        setPageItem(pageItem)
    }


    const dataTableContact = isLoadingContact ? (<tr><td><strong>Loading...</strong></td></tr>) :
        isErrorContact ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
            (dataContact?.data?.total <= 0) ? (<EmptyTable name='contact' />) :
                (
                    dataContact?.data?.value?.map((item: ContactProjectModel, index: number) => (
                        <ContactList roleItem={project?.role} item={item?.contact} key={index} register={register} value={item?.contact?.id} errors={errors} />
                    )))

    const actionDeleteMultipleContactMutation = DeleteMultipleContactMutation({
        onSuccess: () => { },
        onError: (error) => { }
    });

    const onSubmit = (data: any) => {
        Swal.fire({
            title: 'Delete?',
            html: `<b>Confirm with your password</b>`,
            confirmButtonText: 'Yes, Deleted',
            cancelButtonText: 'No, Cancel',
            footer: `<b>Delete: this contact</b>`,
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
                    await actionDeleteMultipleContactMutation.mutateAsync({ password, contacts: data?.contacts })
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
            <div className="card mb-5 mb-xl-8">
                <div className={`card card-xxl-stretch mb-xl-3`}>


                    <div className='card-header border-0 pt-5'>
                        <h3 className='card-title align-items-start flex-column'>
                            <span className='card-label fw-bold fs-3 mb-1'>Contacts</span>
                            <span className='text-muted mt-1 fw-semibold fs-7'>Over {dataContact?.data?.total || 0} contacts</span>
                        </h3>

                        {project?.role?.name === 'ADMIN' && (
                            <div className="card-toolbar">
                                <div className="d-flex justify-content-end">

                                    <button type="button" onClick={() => { setOpenModal(true) }} className="btn btn-sm btn-light-primary me-1">
                                        <KTSVG path='/media/icons/duotune/abstract/abs011.svg' className='svg-icon-3' />
                                        New Contact
                                    </button>

                                </div>


                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <button type="submit"
                                        disabled={!isDirty || !isValid}
                                        className="btn btn-sm btn-danger me-1">
                                        <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                                        Delete Multiple
                                    </button>
                                </form>

                            </div>
                        )}

                    </div>

                    <div className="card-header border-0 pt-5">
                        <SearchInput className='d-flex align-items-center position-relative my-1'
                            classNameInput='form-control w-250px ps-14'
                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(e.target.value)}
                            placeholder='Search by email, first name or last name' />
                    </div>

                    <div className='card-body py-3'>

                        <div className='table-responsive'>

                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr className="fw-bolder fs-6 text-muted">
                                        {project?.role?.name === 'ADMIN' && (
                                            <th className="w-25px">
                                            </th>
                                        )}
                                        <th>Profile</th>
                                        <th></th>
                                        <th></th>
                                        <th className="text-end min-w-100px"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {dataTableContact}

                                </tbody>
                            </table>
                        </div>

                        <PaginationItem
                            data={dataContact}
                            setPageItem={setPageItem}
                            setPreviewPageItem={(old: number) => Math.max(old - 1, 1)}
                            setNextPageItem={(old: number) => old + 1}
                            paginate={paginate}
                            isPreviousData={isPreviousData}
                            pageItem={pageItem}
                        />


                    </div>



                </div>
            </div>

            {openModal && (<InviteContactFormModal
                type='PROJECT'
                setOpenModal={setOpenModal}
                organizationId={String(project?.organizationId)}
                projectId={project?.id}
            />)}


        </>
    )
}

export { ContactProjectTableMini }
