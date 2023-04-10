/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Link, useNavigate } from 'react-router-dom'
import { DocumentModel } from '../core/_models'
import { formateDateDayjs } from '../../utils/formate-date-dayjs'

type Props = {
    item?: DocumentModel;
}

const DocumentList: React.FC<Props> = ({ item }) => {

    return (
        <>
            <tr key={item?.id}>
                <td>
                    <div className='d-flex align-items-center'>
                        <div className="symbol symbol-40px overflow-hidden me-3">
                            <img src={item?.typeFile} alt={item?.title} />
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <span className='text-dark fw-bolder text-hover-primary'>
                                {item?.title}
                            </span>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {item?.description}
                            </span>
                        </div>
                    </div>
                </td>
                <td></td>
                <th>
                    <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
                        {formateDateDayjs(item?.createdAt as Date)}
                    </span>
                </th>
                <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                        <a href={item?.url}
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            download={item?.url}
                        >
                            <KTSVG path='/media/icons/duotune/files/fil017.svg' className='svg-icon-3' />
                        </a>
                        <a href='#'
                            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
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

            {/* {openCreateOrUpdateModal && (<ProjectCreateFormModal project={item?.project} setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} />)} */}
        </>
    )
}

export default DocumentList
