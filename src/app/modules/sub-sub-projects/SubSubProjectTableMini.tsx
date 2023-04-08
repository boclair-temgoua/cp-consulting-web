/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../_metronic/helpers';
import { ContributorModel } from '../contributors/core/_models';
import { ProjectModel } from '../projects/core/_models';
import { useQuery } from '@tanstack/react-query';
import { EmptyTable } from '../utils/empty-table';
import { SubProjectModel } from '../sub-projects/core/_models';
import SubSubProjectList from './hook/SubSubProjectList';
import { getSubSubProjectsContributes } from './core/_requests';
import { SubSubProjectCreateFormModal } from './hook/SubSubProjectCreateFormModal';

type Props = {
    takeValue: number
    subProject?: SubProjectModel;
}

const SubSubProjectTableMini: React.FC<Props> = ({ subProject, takeValue }) => {
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)

    const fetchDataSubSubProject = async () => await getSubSubProjectsContributes({ take: takeValue, page: 1, sort: 'DESC', subProjectId: String(subProject?.id) })
    const { isLoading: isLoadingSubSubProject, isError: isErrorSubSubProject, data: dataSubSubProject } = useQuery({
        queryKey: ['subSubProjects', subProject?.id],
        queryFn: () => fetchDataSubSubProject(),
    })
    const dataTableSubSubProject = isLoadingSubSubProject ? (<tr><td><strong>Loading...</strong></td></tr>) :
        isErrorSubSubProject ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
            (dataSubSubProject?.data?.total <= 0) ? (<EmptyTable name='project' />) :
                (
                    dataSubSubProject?.data?.value?.map((item: ContributorModel, index: number) => (
                        <SubSubProjectList item={item} key={index} subProject={subProject} takeValue={takeValue} />
                    )))


    return (
        <>
            {Number(dataSubSubProject?.data?.total) > 0 &&

                <div className={`card mb-5 mb-xl-8`}>

                    {/* begin::Header */}
                    <div className="card-header border-0 pt-5">
                        <h3 className='card-title align-items-start flex-column'>
                            <span className='card-label fw-bold fs-3 mb-1'>{subProject?.name || ''}</span>
                            <span className='text-muted mt-1 fw-semibold fs-7'>Over {dataSubSubProject?.data?.total || 0} projects - {subProject?.name}</span>
                        </h3>

                        {subProject?.role?.name === 'ADMIN' && (
                            <div className='card-toolbar' title='Click to add a user'>
                                {!subProject?.documentTotal && (
                                    <button type="button" className="btn btn-sm btn-light-primary me-1">
                                        <KTSVG path='/media/icons/duotune/communication/com008.svg' className='svg-icon-3' />
                                        New File
                                    </button>

                                )}

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


                                    {dataTableSubSubProject}


                                </tbody>
                            </table>
                        </div>

                        {Number(dataSubSubProject?.data?.total) > takeValue && (
                            <Link to={`/projects/sb-sb-p/${subProject?.id}`} className="btn btn-light-primary w-100 py-3">
                                Show More
                            </Link>
                        )}

                    </div>
                </div>

            }

            {openCreateOrUpdateModal && (<SubSubProjectCreateFormModal subProject={subProject} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
        </>
    )
}

export { SubSubProjectTableMini }