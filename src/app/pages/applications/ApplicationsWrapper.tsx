/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import React, { useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { getLayoutFromLocalStorage, ILayout, LayoutSetup, PageTitle, PageLink } from '../../../_metronic/layout/core'
import { TablesWidget10 } from '../../../_metronic/partials/widgets'
import { Link } from 'react-router-dom'
import { HelmetSite } from '../../modules/utils'

const ApplicationsWrapper: React.FC = () => {
  const [tab, setTab] = useState('Sidebar')
  const [config, setConfig] = useState<ILayout>(getLayoutFromLocalStorage())
  const [configLoading, setConfigLoading] = useState<boolean>(false)
  const [resetLoading, setResetLoading] = useState<boolean>(false)

  const updateConfig = () => {
    setConfigLoading(true)
    try {
      LayoutSetup.setConfig(config)
      window.location.reload()
    } catch (error) {
      setConfig(getLayoutFromLocalStorage())
      setConfigLoading(false)
    }
  }

  const reset = () => {
    setResetLoading(true)
    setTimeout(() => {
      setConfig(getLayoutFromLocalStorage())
      setResetLoading(false)
    }, 1000)
  }

  return (
    <>
      <HelmetSite title={`Applications`} />
      <PageTitle breadcrumbs={[{
        title: 'Applications |',
        path: '/applications',
        isSeparator: false,
        isActive: false,
      }]}>Applications</PageTitle>

      <div className={`card mb-5 mb-xl-8`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Applications</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>Over 3 applications</span>
          </h3>
          <div
            className='card-toolbar'
            title='Click to add a user'
          >
            <a
              href='#'
              className='btn btn-sm btn-primary'
            >
              <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
              New Application
            </a>
          </div>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-150px'>Name</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href={void (0)} className='text-dark fw-bold text-hover-primary fs-6'>
                          Name application 1
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href={void (0)}
                        className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                      </a>
                      <a
                        href={void (0)}
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
                      <div className='d-flex justify-content-start text-dark flex-column'>
                        <a href={void (0)} className='text-dark fw-bold text-hover-primary fs-6'>
                          Name application 2
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href={void (0)}
                        className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
                      >
                        <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                      </a>
                      <a
                        href={void (0)}
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
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>

          <ul className="pagination">
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
          </ul>

          {/* end::Table container */}
        </div>
        {/* begin::Body */}
      </div>
    </>
  )
}

export default ApplicationsWrapper
