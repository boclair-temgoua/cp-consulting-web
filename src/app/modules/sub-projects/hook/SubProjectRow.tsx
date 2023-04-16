/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { ContributorModel } from '../../contributors/core/_models'
import { getContributorsProject } from '../../contributors/core/_requests'
import ContributorMiniList from '../../contributors/hook/ContributorMiniList'
import ContactMiniList from '../../contacts/hook/ContactMiniList'
import { ContactModel } from '../../contacts/core/_models'
import { getContactsBy } from '../../contacts/core/_requests'
import { useQuery } from '@tanstack/react-query'
import { SearchInput } from '../../utils/forms/SearchInput'

type Props = {
    item?: ContributorModel;
}

const SubProjectRow: React.FC<Props> = ({ item }) => {


    const setFilter = () => {

    }

    return (
        <>
            <div className={`card mb-5 mb-xl-8`}>

                {/* begin::Header */}
                <div className="card-header border-0 pt-5">
                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>Project</span>
                        <span className='text-muted mt-1 fw-semibold fs-7'>Over 302 projects in Boclair temgoua</span>
                    </h3>

                    <div className='card-toolbar' title='Click to add a user'>
                        <a href='#' className='btn btn-sm btn-primary'>
                            <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                            New Contributor
                        </a>
                    </div>

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


                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className="symbol symbol-40px overflow-hidden me-3">
                                                <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt="" />
                                            </div>
                                            <div className='d-flex justify-content-start flex-column'>
                                                <Link to={`/projects/${'projectId'}`} className='text-dark fw-bolder text-hover-primary'>
                                                    Bullletin trimestre 2
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        <div className='d-flex justify-content-end flex-shrink-0'>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                                            </a>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                                            </a>
                                            <a
                                                href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/general/gen027.svg'
                                                    className='svg-icon-3'
                                                />
                                            </a>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className="symbol symbol-40px overflow-hidden me-3">
                                                <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt="" />
                                            </div>
                                            <div className='d-flex justify-content-start flex-column'>
                                                <Link to={`/projects/${'projectId'}`} className='text-dark fw-bolder text-hover-primary'>
                                                    Bullletin trimestre 2
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        <div className='d-flex justify-content-end flex-shrink-0'>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                                            </a>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                                            </a>
                                            <a
                                                href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/general/gen027.svg'
                                                    className='svg-icon-3'
                                                />
                                            </a>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className="symbol symbol-40px overflow-hidden me-3">
                                                <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt="" />
                                            </div>
                                            <div className='d-flex justify-content-start flex-column'>
                                                <Link to={`/projects/${'projectId'}`} className='text-dark fw-bolder text-hover-primary'>
                                                    Bullletin trimestre 2
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        <div className='d-flex justify-content-end flex-shrink-0'>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                                            </a>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                                            </a>
                                            <a
                                                href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/general/gen027.svg'
                                                    className='svg-icon-3'
                                                />
                                            </a>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className="symbol symbol-40px overflow-hidden me-3">
                                                <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt="" />
                                            </div>
                                            <div className='d-flex justify-content-start flex-column'>
                                                <Link to={`/projects/${'projectId'}`} className='text-dark fw-bolder text-hover-primary'>
                                                    Bullletin trimestre 2
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        <div className='d-flex justify-content-end flex-shrink-0'>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                                            </a>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                                            </a>
                                            <a
                                                href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/general/gen027.svg'
                                                    className='svg-icon-3'
                                                />
                                            </a>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className="symbol symbol-40px overflow-hidden me-3">
                                                <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt="" />
                                            </div>
                                            <div className='d-flex justify-content-start flex-column'>
                                                <Link to={`/projects/${'projectId'}`} className='text-dark fw-bolder text-hover-primary'>
                                                    Bullletin trimestre 2
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        <div className='d-flex justify-content-end flex-shrink-0'>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                                            </a>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                                            </a>
                                            <a
                                                href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/general/gen027.svg'
                                                    className='svg-icon-3'
                                                />
                                            </a>
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className="symbol symbol-40px overflow-hidden me-3">
                                                <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt="" />
                                            </div>
                                            <div className='d-flex justify-content-start flex-column'>
                                                <Link to={`/projects/${'projectId'}`} className='text-dark fw-bolder text-hover-primary'>
                                                    Bullletin trimestre 2
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                    </td>
                                    <td>
                                        <div className='d-flex justify-content-end flex-shrink-0'>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                                            </a>
                                            <a href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                            >
                                                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                                            </a>
                                            <a
                                                href='#'
                                                className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'
                                            >
                                                <KTSVG
                                                    path='/media/icons/duotune/general/gen027.svg'
                                                    className='svg-icon-3'
                                                />
                                            </a>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                    </div>

                    <Link to={`/projects/${'projectId'}/contributors`} className="btn btn-light-primary w-100 py-3">
                        Show More Projects
                    </Link>

                </div>

            </div>
        </>
    )
}

export default SubProjectRow
