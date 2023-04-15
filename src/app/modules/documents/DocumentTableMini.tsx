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
import { SearchInput } from '../utils/forms/SearchInput';

type Props = {
    organizationId?: string
    projectItem?: any
    projectId?: string
    subProjectId?: string
    subSubProjectId?: string
    subSubSubProjectId?: string
    type: FilterTypeModel
}

const DocumentTableMini: React.FC<Props> = ({
    type,
    subSubSubProjectId,
    subSubProjectId,
    subProjectId,
    projectId,
    organizationId,
    projectItem
}) => {
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
                <div className="card-header border-0 pt-5">
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>{projectItem?.name || ''}</span>
                        <span className='text-muted mt-1 fw-semibold fs-7'>Over {projectItem?.data?.total || 0} documents - {projectItem?.name}</span>
                    </h3>

                    {arrayAuthorized.includes(`${projectItem?.role?.name}`) && (
                        <div className='card-toolbar' title='Click to add a user'>
                            <button type="button" onClick={() => { setOpenCreateOrUpdateModal(true) }} className="btn btn-sm btn-light-primary me-1">
                                <KTSVG path='/media/icons/duotune/abstract/abs011.svg' className='svg-icon-3' />
                                New Document
                            </button>
                        </div>
                    )}
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
