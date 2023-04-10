/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { KTSVG } from '../../../_metronic/helpers';
import { ContributorModel, arrayAuthorized } from '../contributors/core/_models';
import { useQuery } from '@tanstack/react-query';
import { EmptyTable } from '../utils/empty-table';
import { SubSubProjectModel } from '../sub-sub-projects/core/_models';
import SubSubSubProjectList from './hook/SubSubSubProjectList';
import { getSubSubSubProjectsContributes } from './core/_requests';
import { SubSubSubProjectCreateFormModal } from './hook/SubSubSubProjectCreateFormModal';

type Props = {
    takeValue: number
    subSubProject?: SubSubProjectModel;
}

const SubSubSubProjectTableMini: React.FC<Props> = ({ subSubProject, takeValue }) => {
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)

    const fetchDataSubSubSubProject = async () => await getSubSubSubProjectsContributes({ take: takeValue, page: 1, sort: 'DESC', subSubProjectId: String(subSubProject?.id) })
    const { isLoading: isLoadingSubSubSubProject, isError: isErrorSubSubSubProject, data: dataSubSubSubProject } = useQuery({
        queryKey: ['subSubSubProjects', subSubProject?.id],
        queryFn: () => fetchDataSubSubSubProject(),
    })
    const dataTableSubSubSubProject = isLoadingSubSubSubProject ? (<tr><td><strong>Loading...</strong></td></tr>) :
        isErrorSubSubSubProject ? (<tr><td><strong>Error find data please try again...</strong></td></tr>) :
            (dataSubSubSubProject?.data?.total <= 0) ? (<EmptyTable name='project' />) :
                (
                    dataSubSubSubProject?.data?.value?.map((item: ContributorModel, index: number) => (
                        <SubSubSubProjectList item={item} key={index} subSubProject={subSubProject} takeValue={takeValue} />
                    )))


    return (
        <>
            <div className={`card mb-5 mb-xl-8`}>

                {/* begin::Header */}
                <div className="card-header border-0 pt-5">
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>{subSubProject?.name || ''}</span>
                        <span className='text-muted mt-1 fw-semibold fs-7'>Over {dataSubSubSubProject?.data?.total || 0} projects - {subSubProject?.name}</span>
                    </h3>

                    {arrayAuthorized.includes(`${subSubProject?.role?.name}`) && (
                        <div className='card-toolbar' title='Click to add a user'>
                            {/* {!subSubProject?.documentTotal && (
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
                                    <th></th>
                                    <th></th>
                                    <th className="text-end min-w-100px"></th>
                                </tr>
                            </thead>
                            <tbody>


                                {dataTableSubSubSubProject}


                            </tbody>
                        </table>
                    </div>

                    {/* {Number(dataSubSubSubProject?.data?.total) > takeValue && (
                        <Link to={`/projects/sb-sb-p/${subProject?.id}`} className="btn btn-light-primary w-100 py-3">
                            Show More
                        </Link>
                    )} */}

                </div>
            </div>

            {openCreateOrUpdateModal && (<SubSubSubProjectCreateFormModal subSubProject={subSubProject} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)}
        </>
    )
}

export { SubSubSubProjectTableMini }

