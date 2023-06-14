/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { KTSVG } from '../../../_metronic/helpers';
import { arrayAuthorized } from '../contributors/core/_models';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { EmptyTable } from '../utils/empty-table';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDebounce } from '../utils/use-debounce';
import { PaginationItem } from '../utils/pagination-item';
import { SearchInput } from '../utils/forms/SearchInput';
import { OrganizationModel } from '../organizations/core/_models';
import CategoryList from './hook/CategoryList';
import { getCategoriesBy } from './core/_requests';
import { CategoryModel } from './core/_models';
import { CategoryCreateFormModal } from './hook/CategoryCreateFormModal';

type Props = {
    organization?: OrganizationModel;
}

const schema = yup.object().shape({
    categories: yup.array()
        .min(1, "you can't leave this blank.")
        .required("you can't leave this blank."),
})

const CategoryOrganizationTableMini: React.FC<Props> = ({ organization }) => {
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)

    const { register, handleSubmit,
        formState: { errors, isDirty, isValid }
    } = useForm<{ categories: string[] }>({ resolver: yupResolver(schema), mode: "onChange" });

    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams();
    const [pageItem, setPageItem] = useState(Number(searchParams.get('page')) || 1)
    const [filter, setFilter] = useState<string>('')

    const debouncedFilter = useDebounce(filter, 500);
    const isEnabled = Boolean(debouncedFilter)
    const fetchData = async (pageItem = 1, debouncedFilter: string) => await
        getCategoriesBy({
            search: debouncedFilter,
            take: 10,
            page: Number(pageItem || 1),
            sort: 'DESC',
            is_paginate: true,
            organizationId: String(organization?.id),
        })
    const {
        isLoading: isLoadingCategory,
        isError: isErrorCategory,
        data: dataCategory,
        isPreviousData,
    } = useQuery({
        queryKey: ['categories', pageItem, debouncedFilter, organization?.id],
        queryFn: () => fetchData(pageItem, debouncedFilter),
        enabled: filter ? isEnabled : !isEnabled,
        keepPreviousData: true,
    })

    // Prefetch the next page!
    useEffect(() => {
        if (dataCategory?.data?.total_page !== pageItem) {
            queryClient.prefetchQuery
                (['categories', pageItem + 1], () =>
                    fetchData(pageItem + 1, debouncedFilter)
                )
        }
    }, [dataCategory?.data, pageItem, queryClient, organization?.id, debouncedFilter])

    const paginate = (pageItem: number) => {
        setPageItem(pageItem)
    }


    const dataTableCategory = isLoadingCategory ? (<tr><td><strong>Loading...</strong></td></tr>) :
        isErrorCategory ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
            (dataCategory?.data?.total <= 0) ? (<EmptyTable name='category' />) :
                (
                    dataCategory?.data?.value?.map((item: CategoryModel, index: number) => (
                        <CategoryList item={item} key={index} roleItem={organization?.role} register={register} value={item?.id} errors={errors} />
                    )))

    // const actionDeleteMultipleContactMutation = DeleteMultipleContactMutation({
    //     onSuccess: () => { },
    //     onError: (error) => { }
    // });

    // const onSubmit = (data: any) => {
    //     Swal.fire({
    //         title: 'Delete?',
    //         html: `<b>Confirm with your password</b>`,
    //         confirmButtonText: 'Yes, Deleted',
    //         cancelButtonText: 'No, Cancel',
    //         footer: `<b>Delete: this contact</b>`,
    //         buttonsStyling: false,
    //         customClass: {
    //             confirmButton: 'btn btn-sm btn-danger',
    //             cancelButton: 'btn btn-sm btn-primary',
    //         },
    //         input: 'password',
    //         inputAttributes: {
    //             autocapitalize: 'off',
    //             required: 'true'
    //         },
    //         showCancelButton: true,
    //         reverseButtons: true,
    //         showLoaderOnConfirm: true,
    //         inputPlaceholder: 'Confirm password',
    //         preConfirm: async (password) => {
    //             try {
    //                 await actionDeleteMultipleContactMutation.mutateAsync({ password, contacts: data?.contacts })
    //                 AlertSuccessNotification({
    //                     text: 'Contact deleted successfully',
    //                     className: 'info',
    //                     position: 'center',
    //                 })
    //             } catch (error: any) {
    //                 Swal.showValidationMessage(`${error?.response?.data?.message}`)
    //                 AlertDangerNotification({ text: `${error?.response?.data?.message}`, className: 'info', position: 'center' })
    //             }
    //         },
    //         allowOutsideClick: () => !Swal.isLoading()
    //     })

    // }

    return (
        <>
            <div className="card mb-5 mb-xl-8">
                <div className={`card card-xxl-stretch mb-xl-3`}>


                    <div className='card-header border-0 pt-5'>
                        <h3 className='card-title align-items-start flex-column'>
                            <span className='card-label fw-bold fs-3 mb-1'>Categories</span>
                            <span className='text-muted mt-1 fw-semibold fs-7'>Over {dataCategory?.data?.total || 0} categories</span>
                        </h3>

                        {arrayAuthorized.includes(`${organization?.role?.name}`) && (
                            <div className="card-toolbar">
                                <div className="d-flex justify-content-end">

                                    <button type="button" onClick={() => { setOpenCreateOrUpdateModal(true) }} className="btn btn-sm btn-light-primary me-1">
                                        <KTSVG path='/media/icons/duotune/abstract/abs011.svg' className='svg-icon-3' />
                                        New Category
                                    </button>

                                </div>

                            </div>
                        )}

                    </div>

                    <div className="card-header border-0 pt-5">
                        <SearchInput className='d-flex align-items-center position-relative my-1'
                            classNameInput='form-control w-250px ps-14'
                            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(e.target.value)}
                            placeholder='Search by name or description' />
                    </div>

                    <div className='card-body py-3'>

                        <div className='table-responsive'>

                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr className="fw-bolder fs-6 text-muted">
                                        <th>Name</th>
                                        <th></th>
                                        <th className="text-end min-w-100px"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {dataTableCategory}

                                </tbody>
                            </table>
                        </div>

                        <PaginationItem
                            data={dataCategory}
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


            {openCreateOrUpdateModal && (<CategoryCreateFormModal organizationId={String(organization?.id)} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
        </>
    )
}

export { CategoryOrganizationTableMini }
