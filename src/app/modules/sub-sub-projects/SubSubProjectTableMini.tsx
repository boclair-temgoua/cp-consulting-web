/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { KTSVG } from '../../../_metronic/helpers';
import { ContributorModel, arrayAuthorized } from '../contributors/core/_models';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { EmptyTable } from '../utils/empty-table';
import { SubProjectModel } from '../sub-projects/core/_models';
import SubSubProjectList from './hook/SubSubProjectList';
import { getSubSubProjectsContributes } from './core/_requests';
import { SubSubProjectCreateFormModal } from './hook/SubSubProjectCreateFormModal';
import { SearchInput } from '../utils/forms/SearchInput';
import { useDebounce } from '../utils/use-debounce';
import { PaginationItem } from '../utils/pagination-item';

type Props = {
    subProject?: SubProjectModel;
}

const SubSubProjectTableMini: React.FC<Props> = ({ subProject }) => {
    const takeNumber = 10
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams();
    const [pageItem, setPageItem] = useState(Number(searchParams.get('page')) || 1)
    const [filter, setFilter] = useState<string>('')

    const debouncedFilter = useDebounce(filter, 500);
    const isEnabled = Boolean(debouncedFilter)
    const fetchData = async (pageItem = 1, debouncedFilter: string) => await
        getSubSubProjectsContributes({
            search: debouncedFilter,
            take: takeNumber,
            page: Number(pageItem || 1),
            sort: 'DESC',
            subProjectId: String(subProject?.id)
        })
    const {
        isLoading: isLoadingSubSubProject,
        isError: isErrorSubSubProject,
        data: dataSubSubProject,
        isPreviousData,
    } = useQuery({
        queryKey: ['subSubProjects', pageItem, debouncedFilter, subProject?.id, 'DESC'],
        queryFn: () => fetchData(pageItem, debouncedFilter),
        enabled: filter ? isEnabled : !isEnabled,
        keepPreviousData: true,
    })


    const dataTableSubSubProject = isLoadingSubSubProject ? (<tr><td><strong>Loading...</strong></td></tr>) :
        isErrorSubSubProject ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
            (dataSubSubProject?.data?.total <= 0) ? (<EmptyTable name='project' />) :
                (
                    dataSubSubProject?.data?.value?.map((item: ContributorModel, index: number) => (
                        <SubSubProjectList item={item} key={index} subProject={subProject} />
                    )))


    // Prefetch the next page!
    useEffect(() => {
        if (dataSubSubProject?.data?.total_page !== pageItem) {
            queryClient.prefetchQuery
                (['subProjects', pageItem + 1], () =>
                    fetchData(pageItem + 1, debouncedFilter)
                )
        }
    }, [dataSubSubProject?.data, pageItem, takeNumber, queryClient, subProject?.id, debouncedFilter])

    const paginate = (pageItem: number) => {
        setPageItem(pageItem)
    }

    return (
        <>
            <div className={`card mb-5 mb-xl-8`}>

                {/* begin::Header */}
                <div className="card-header border-0 pt-5">
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>{subProject?.name || ''}</span>
                        <span className='text-muted mt-1 fw-semibold fs-7'>Over {dataSubSubProject?.data?.total || 0} projects - {subProject?.name}</span>
                    </h3>

                    {arrayAuthorized.includes(`${subProject?.role?.name}`) && (
                        <div className='card-toolbar' title='Click to add a user'>
                            <button type="button" onClick={() => { setOpenCreateOrUpdateModal(true) }} className="btn btn-sm btn-light-primary me-1">
                                <KTSVG path='/media/icons/duotune/abstract/abs011.svg' className='svg-icon-3' />
                                New Project
                            </button>
                        </div>
                    )}



                </div>
                {/* end::Header */}

                <div className="card-header border-0 pt-5">
                    <SearchInput className='d-flex align-items-center position-relative my-1'
                        classNameInput='form-control w-250px ps-14'
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(e.target.value)}
                        placeholder='Search by name' />
                </div>

                <div className='card-body py-3'>
                    {/* begin::Table container */}
                    <div className='table-responsive'>

                        <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                            <thead>
                                <tr className="fw-bolder fs-6 text-muted">
                                    <th>Name</th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-end min-w-100px"></th>
                                </tr>
                            </thead>
                            <tbody>


                                {dataTableSubSubProject}


                            </tbody>
                        </table>
                    </div>

                    <PaginationItem
                        data={dataSubSubProject}
                        setPageItem={setPageItem}
                        setPreviewPageItem={(old: number) => Math.max(old - 1, 1)}
                        setNextPageItem={(old: number) => old + 1}
                        paginate={paginate}
                        isPreviousData={isPreviousData}
                        pageItem={pageItem}
                    />

                </div>
            </div>

            {openCreateOrUpdateModal && (<SubSubProjectCreateFormModal subProject={subProject} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
        </>
    )
}

export { SubSubProjectTableMini }
