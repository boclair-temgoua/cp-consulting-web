/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../_metronic/helpers';
import { ContributorModel, arrayAuthorized } from '../contributors/core/_models';
import { ProjectModel } from '../projects/core/_models';
import { useQuery } from '@tanstack/react-query';
import { EmptyTable } from '../utils/empty-table';
import DocumentList from './hook/DocumentList';
import { getDocumentsBy } from './core/_requests';
import { DocumentModel } from './core/_models';
import { FilterTypeModel } from '../utils/pagination-item';

type Props = {
    organizationId?: string
    projectId?: string
    subProjectId?: string
    subSubProjectId?: string
    subSubSubProjectId?: string
    type: FilterTypeModel
}

const DocumentTableMini: React.FC<Props> = ({ type, subSubSubProjectId, subSubProjectId, subProjectId, projectId, organizationId }) => {
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)

    const fetchDataDocument = async () => await getDocumentsBy({
        take: 4,
        page: 1,
        sort: 'DESC',
        type,
        subSubSubProjectId,
        subSubProjectId,
        subProjectId,
        projectId,
        organizationId
    })
    const { isLoading, isError, data } = useQuery({
        queryKey: [
            'documents',
            type,
            subSubSubProjectId,
            subSubProjectId,
            subProjectId,
            projectId,
            organizationId,
            'DESC'
        ],
        queryFn: () => fetchDataDocument(),
    })
    const dataTableDocument = isLoading ? (<tr><td><strong>Loading...</strong></td></tr>) :
        isError ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
            (data?.data?.total <= 0) ? (<EmptyTable name='files' />) :
                (
                    data?.data?.value?.map((item: DocumentModel, index: number) => (
                        <DocumentList item={item} key={index} />
                    )))


    return (
        <>
            <div className={`card mb-5 mb-xl-8`}>

                {/* begin::Header */}
                <div className="card-header border-0 pt-6">
                    <div className="card-title">
                        <div className="d-flex align-items-center position-relative my-1">
                            <span className="svg-icon svg-icon-1 position-absolute ms-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px">
                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                                </svg>
                            </span>
                            <input type="text" className="form-control form-control-solid w-250px ps-14" placeholder="Search file" />
                        </div>
                    </div>

                    {/* {!arrayAuthorized.includes(`${project?.role?.name}`) && (
                        <div className='card-toolbar' title='Click to add a user'>
                            {!project?.documentTotal && (
                                <button type="button" className="btn btn-sm btn-light-primary me-1">
                                    <KTSVG path='/media/icons/duotune/communication/com008.svg' className='svg-icon-3' />
                                    New File
                                </button>

                            )}
                        </div>
                    )} */}
                </div>
                {/* end::Header */}

                <div className='card-body py-3'>
                    {/* begin::Table container */}
                    <div className='table-responsive'>

                        <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                            <thead>
                                <tr className="fw-bolder fs-6 text-gray-800">
                                    <th>Name</th>
                                    <th></th>
                                    <th></th>
                                    <th className="text-end min-w-100px"></th>
                                </tr>
                            </thead>
                            <tbody>


                                {dataTableDocument}




                            </tbody>
                        </table>
                    </div>

                    {/* {Number(dataSubProject?.data?.total) > takeValue && (
                        <Link to={`/projects/${project?.id}`} className="btn btn-light-primary w-100 py-3">
                            Show More
                        </Link>
                    )} */}

                </div>
            </div>


            {/* {openCreateOrUpdateModal && (<SubProjectCreateFormModal project={project} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)} */}
        </>
    )
}

export { DocumentTableMini }
