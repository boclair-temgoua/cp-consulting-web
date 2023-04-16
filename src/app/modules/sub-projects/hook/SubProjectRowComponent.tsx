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

type Props = {
    item?: ContributorModel;
}

const SubProjectRowComponent: React.FC<Props> = ({ item }) => {


    return (
        <>
            <div className={`card mb-5 mb-xl-8`}>

                {/* begin::Header */}
                {/* <div className="card-header border-0 pt-6">
                    <div className="card-title">
                        <div className="d-flex align-items-center position-relative my-1">
                            <span className="svg-icon svg-icon-1 position-absolute ms-6">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mh-50px">
                                    <rect opacity="0.5" x="17.0365" y="15.1223" width="8.15546" height="2" rx="1" transform="rotate(45 17.0365 15.1223)" fill="currentColor"></rect>
                                    <path d="M11 19C6.55556 19 3 15.4444 3 11C3 6.55556 6.55556 3 11 3C15.4444 3 19 6.55556 19 11C19 15.4444 15.4444 19 11 19ZM11 5C7.53333 5 5 7.53333 5 11C5 14.4667 7.53333 17 11 17C14.4667 17 17 14.4667 17 11C17 7.53333 14.4667 5 11 5Z" fill="currentColor"></path>
                                </svg>
                            </span>
                            <input type="text" className="form-control form-control-solid w-250px ps-14" placeholder="Search file" value="" />
                        </div>
                    </div>

                    <div className="card-toolbar">
                        <div className="d-flex justify-content-end">

                            <button type="button" className="btn btn-sm btn-primary me-3">
                                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                                New File
                            </button>
                            <button type="button" className="btn btn-sm btn-primary">
                                <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                                New Project
                            </button>
                        </div>
                    </div>


                </div> */}
                <div className="card-header border-0 pt-5">

                    <h3 className='card-title align-items-start flex-column'>
                        <span className='card-label fw-bold fs-3 mb-1'>Files</span>
                        <span className='text-muted mt-1 fw-semibold fs-7'>Over 302 files in Boclair temgoua</span>
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
                                                <img src="/media/svg/files/doc.svg" alt="" />
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
                                                <img src="/media/svg/files/doc.svg" alt="" />
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
                                                <img src="/media/svg/files/doc.svg" alt="" />
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
                                                <img src="/media/svg/files/doc.svg" alt="" />
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
                                                <img src="/media/svg/files/doc.svg" alt="" />
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
                                                <img src="/media/svg/files/doc.svg" alt="" />
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
                        Show More Files
                    </Link>

                    {/* <ul className="pagination">
    <li className="page-item previous disabled">
      <a href="#" className="page-link">
        <i className="previous"></i>
      </a>
    </li>
    <li className="page-item">
      <a href="#" className="page-link">
        1
      </a>
    </li>
    <li className="page-item active">
      <a href="#" className="page-link">
        2
      </a>
    </li>
    <li className="page-item">
      <a href="#" className="page-link">
        3
      </a>
    </li>
    <li className="page-item next">
      <a href="#" className="page-link">
        <i className="next"></i>
      </a>
    </li>
  </ul> */}

                </div>

            </div>
        </>
    )
}

export default SubProjectRowComponent
