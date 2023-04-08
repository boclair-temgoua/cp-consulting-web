/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { } from 'react'
import { Link } from 'react-router-dom'
import { KTSVG } from '../../../_metronic/helpers';
import { ContributorModel } from './core/_models';
import { ProjectModel } from '../projects/core/_models';
import { useQuery } from '@tanstack/react-query';
import { EmptyTable } from '../utils/empty-table';
import ContributorList from './hook/ContributorList';
import { getContributorsProject } from './core/_requests';

type Props = {
    takeValue: number
    project?: ProjectModel;
}

const ContributorSubProjectTableMini: React.FC<Props> = ({ project, takeValue }) => {

    const fetchDataContributor = async () => await getContributorsProject({ take: takeValue, page: 1, sort: 'DESC', projectId: String(project?.id) })
    const { isLoading: isLoadingContributor, isError: isErrorContributor, data: dataContributor } = useQuery({
        queryKey: ['contributorsProject', project?.id],
        queryFn: () => fetchDataContributor(),
    })
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


                        {project?.role?.name === 'ADMIN' && (
                            <div className="card-toolbar">
                                <div className="d-flex justify-content-end">

                                    {!project?.contactTotal && (
                                        <button type="button" className="btn btn-sm btn-light-primary me-1">
                                            <KTSVG path='/media/icons/duotune/communication/com006.svg' className='svg-icon-3' />
                                            New Contact
                                        </button>
                                    )}

                                    {!project?.subProjectTotal && (
                                        <button type="button" className="btn btn-sm btn-light-primary me-1">
                                            <KTSVG path='/media/icons/duotune/files/fil012.svg' className='svg-icon-3' />
                                            New Folder
                                        </button>

                                    )}

                                    {!project?.documentTotal && (
                                        <button type="button" className="btn btn-sm btn-light-primary me-1">
                                            <KTSVG path='/media/icons/duotune/communication/com008.svg' className='svg-icon-3' />
                                            New File
                                        </button>
                                    )}

                                    <button type="button" className="btn btn-sm btn-light-primary me-1">
                                        <KTSVG path='/media/icons/duotune/communication/com006.svg' className='svg-icon-3' />
                                        New Contributor
                                    </button>

                                </div>
                            </div>

                        )}

                    </div>

                    <div className='card-body py-3'>

                        <div className='table-responsive'>

                            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
                                <thead>
                                    <tr className="fw-bolder fs-6 text-gray-800">
                                        <th>Profile</th>
                                        <th></th>
                                        {project?.role?.name === 'ADMIN' && (
                                            <>
                                                <th></th>
                                                <th className="text-end min-w-100px"></th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataTableContributor}
                                </tbody>
                            </table>
                        </div>

                        {Number(dataContributor?.data?.total) > takeValue && (
                            <Link to={`/projects/${project?.id}/contributors`} className="btn btn-light-primary w-100 py-3">
                                Show More
                            </Link>
                        )}

                    </div>

                </div>

            </div>


        </>
    )
}

export { ContributorSubProjectTableMini }
