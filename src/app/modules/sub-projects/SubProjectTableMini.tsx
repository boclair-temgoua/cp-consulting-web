/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../_metronic/helpers';
import { ContributorModel } from '../contributors/core/_models';
import { ProjectModel } from '../projects/core/_models';
import { getSubProjectsContributes } from './core/_requests';
import { useQuery } from '@tanstack/react-query';
import { EmptyTable } from '../utils/empty-table';
import SubsubProjectList from './hook/SubProjectList';
import { SubProjectCreateFormModal } from './hook/SubProjectCreateFormModal';

type Props = {
    takeValue: number
    project?: ProjectModel;
}

const SubProjectTableMini: React.FC<Props> = ({ project, takeValue }) => {
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)

    const fetchDataSubProject = async () => await getSubProjectsContributes({ take: takeValue, page: 1, sort: 'DESC', projectId: String(project?.id) })
    const { isLoading: isLoadingSubProject, isError: isErrorSubProject, data: dataSubProject } = useQuery({
        queryKey: ['subProjects', project?.id, 1, 'DESC'],
        queryFn: () => fetchDataSubProject(),
    })
    const dataTableSubProject = isLoadingSubProject ? (<tr><td><strong>Loading...</strong></td></tr>) :
        isErrorSubProject ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
            (dataSubProject?.data?.total <= 0) ? (<EmptyTable name='project' />) :
                (
                    dataSubProject?.data?.value?.map((item: ContributorModel, index: number) => (
                        <SubsubProjectList item={item} key={index} project={project} takeValue={takeValue} />
                    )))


    return (
        <>
            <div className={`card mb-5 mb-xl-8`}>

                {/* begin::Header */}
                <div className="card-header border-0 pt-5">
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>{project?.name || ''}</span>
                        <span className='text-muted mt-1 fw-semibold fs-7'>Over {dataSubProject?.data?.total || 0} projects - {project?.name}</span>
                    </h3>

                    {project?.role?.name === 'ADMIN' && (
                        <div className='card-toolbar' title='Click to add a user'>
                            {/* {!project?.documentTotal && (
                                <button type="button" className="btn btn-sm btn-light-primary me-1">
                                    <KTSVG path='/media/icons/duotune/communication/com008.svg' className='svg-icon-3' />
                                    New File
                                </button>

                            )} */}

                            <button type="button" onClick={() => { setOpenCreateOrUpdateModal(true) }} className="btn btn-sm btn-light-primary me-1">
                                <KTSVG path='/media/icons/duotune/files/fil012.svg' className='svg-icon-3' />
                                New Project
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
                                    <th className="text-end min-w-100px"></th>
                                </tr>
                            </thead>
                            <tbody>


                                {dataTableSubProject}


                            </tbody>
                        </table>
                    </div>

                    {Number(dataSubProject?.data?.total) > takeValue && (
                        <Link to={`/projects/${project?.id}`} className="btn btn-light-primary w-100 py-3">
                            Show More
                        </Link>
                    )}

                </div>
            </div>


            {openCreateOrUpdateModal && (<SubProjectCreateFormModal project={project} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
        </>
    )
}

export { SubProjectTableMini }
