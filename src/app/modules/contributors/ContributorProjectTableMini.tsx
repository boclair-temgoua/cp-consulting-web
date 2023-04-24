/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { KTSVG } from '../../../_metronic/helpers';
import { ContributorModel, arrayAuthorized } from './core/_models';
import { ProjectModel } from '../projects/core/_models';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { EmptyTable } from '../utils/empty-table';
import ContributorList from './hook/ContributorList';
import { getContributorsProject } from './core/_requests';
import { InviteContributorFormModal } from './hook/InviteContributorFormModal';
import { PaginationItem } from '../utils/pagination-item';
import { useDebounce } from '../utils/use-debounce';
import { SearchInput } from '../utils/forms/SearchInput';

type Props = {
    project?: ProjectModel;
}

const ContributorProjectTableMini: React.FC<Props> = ({ project }) => {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams();
    const [pageItem, setPageItem] = useState(Number(searchParams.get('page')) || 1)
    const [filter, setFilter] = useState<string>('')

    const debouncedFilter = useDebounce(filter, 500);
    const isEnabled = Boolean(debouncedFilter)
    const fetchData = async (pageItem = 1, debouncedFilter: string) => await
        getContributorsProject({
            search: debouncedFilter,
            take: 6,
            page: Number(pageItem || 1),
            sort: 'DESC',
            projectId: String(project?.id)
        })
    const {
        isLoading: isLoadingContributor,
        isError: isErrorContributor,
        data: dataContributor,
        isPreviousData,
    } = useQuery({
        queryKey: ['contributors', pageItem, debouncedFilter, project?.id],
        queryFn: () => fetchData(pageItem, debouncedFilter),
        enabled: filter ? isEnabled : !isEnabled,
        keepPreviousData: true,
    })

    // Prefetch the next page!
    useEffect(() => {
        if (dataContributor?.data?.total_page !== pageItem) {
            queryClient.prefetchQuery
                (['contributors', pageItem + 1], () =>
                    fetchData(pageItem + 1, debouncedFilter)
                )
        }
    }, [dataContributor?.data, pageItem, queryClient, project?.id,debouncedFilter])

    const paginate = (pageItem: number) => {
        setPageItem(pageItem)
    }

    const dataTableContributor = isLoadingContributor ? (<tr><td><strong>Loading...</strong></td></tr>) :
        isErrorContributor ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
            (dataContributor?.data?.total <= 0) ? (<EmptyTable name='contributor' />) :
                (
                    dataContributor?.data?.value?.map((item: ContributorModel, index: number) => (
                        <ContributorList item={item} key={index} contributor={project} />
                    )))


    return (
        <>
            <div className={`card mb-5 mb-xl-8`}>

                <div className={`card card-xxl-stretch mb-5 mb-xl-8`}>

                    <div className='card-header border-0 pt-5'>
                        <h3 className='card-title align-items-start flex-column'>
                            <span className='card-label fw-bold fs-3 mb-1'>Contributors</span>
                            <span className='text-muted mt-1 fw-semibold fs-7'>Over {dataContributor?.data?.total || 0} contributors</span>
                        </h3>
                        {arrayAuthorized.includes(`${project?.role?.name}`) && (
                            <div className="card-toolbar">
                                <div className="d-flex justify-content-end">
                                    <button type="button" onClick={() => { setOpenModal(true) }} className="btn btn-sm btn-light-primary me-1">
                                        <KTSVG path='/media/icons/duotune/abstract/abs011.svg' className='svg-icon-3' />
                                        New Contributor
                                    </button>
                                </div>
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
                                        <th>Profile</th>
                                        <th></th>
                                        <th></th>
                                        <th className="text-end min-w-100px"></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {dataTableContributor}

                                </tbody>
                            </table>
                        </div>


                        <PaginationItem
                            data={dataContributor}
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

            {openModal && (<InviteContributorFormModal setOpenModal={setOpenModal} projectId={project?.id} />)}

        </>
    )
}

export { ContributorProjectTableMini }
