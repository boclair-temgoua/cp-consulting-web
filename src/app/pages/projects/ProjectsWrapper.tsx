/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState } from 'react'
import { PageLink, PageTitle } from '../../../_metronic/layout/core'
import clsx from 'clsx'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { getLayoutFromLocalStorage, ILayout, LayoutSetup } from '../../../_metronic/layout/core'
import { TablesWidget10 } from '../../../_metronic/partials/widgets'
import { Link } from 'react-router-dom'
import { HelmetSite } from '../../modules/utils'

const ProjectsWrapper: FC = () => {
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
      <HelmetSite title={`Projects`} />
      <PageTitle breadcrumbs={[{
        title: 'Projects |',
        path: '/projects',
        isSeparator: false,
        isActive: false,
      }]}>Projects</PageTitle>
      {/* <div className='card mb-10'>
        <div className='card-body d-flex align-items-center py-8'>
          <div className='d-flex h-80px w-80px flex-shrink-0 flex-center position-relative'>
            <KTSVG
              path='/media/icons/duotune/abstract/abs051.svg'
              className='svg-icon-danger position-absolute opacity-15'
              svgClassName='h-80px w-80px'
            />
            <KTSVG
              path='/media/icons/duotune/coding/cod009.svg'
              className='svg-icon-3x svg-icon-danger position-absolute'
            />
          </div>

          <div className='ms-6'>
            <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
              The layout builder is to assist your set and configure your preferred project layout
              specifications and preview it in real-time.
            </p>
            <p className='list-unstyled text-gray-600 fw-bold fs-6 p-0 m-0'>
              Also, you can configurate the Layout in the code 
            </p>
          </div>
        </div>
      </div> */}

      <div className={`card mb-5 mb-xl-8`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Projects</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>Over 500 projects</span>
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
              New Project
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
                <tr className="fw-bolder fs-6 text-gray-800">
                  <th>Name</th>
                  <th>Contributors</th>
                  <th className="text-end min-w-100px"></th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <img src="/media/svg/files/folder-document.svg" alt="" />
                        {/* <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' /> */}
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <Link to='/projects/192817273' className='text-dark fw-bold text-hover-primary fs-6'>
                          Name project
                        </Link>
                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                          ici c'est la description...
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='symbol-group symbol-hover flex-nowrap'>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="name"
                        key={`cw7-item-1`}
                      >
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-11.jpg')} />
                      </div>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="name"
                        key={`cw7-item-2`}
                      >
                        <span
                          className={clsx(
                            'symbol-label fw-bold',
                            'bg-info',
                            'text-inverse-info'
                          )}
                        >AS</span>
                      </div>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="name"
                        key={`cw7-item-3`}
                      >
                        <span
                          className={clsx(
                            'symbol-label fw-bold',
                            'bg-warning',
                            'text-inverse-warning'
                          )}
                        >CD</span>
                      </div>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="Boclair Temgoua"
                        key={`cw7-item-4`}
                      >
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-2.jpg')} />
                      </div>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="Info name"
                        key={`cw7-item-5`}
                      >
                        <span
                          className={clsx(
                            'symbol-label fw-bold',
                            'bg-info',
                            'text-inverse-info'
                          )}
                        >TB</span>
                      </div>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="name"
                        key={`cw7-item-1`}
                      >
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-12.jpg')} />
                      </div>
                      <Link to={`/projects/wbchgyugwu/contributors`} className="symbol symbol-30px symbol-circle">
                        <span className="symbol-label fs-8 fw-bold bg-dark text-gray-300">+42</span>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
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
                      <div className='symbol symbol-45px me-5'>
                        <img src="/media/svg/files/folder-document.svg" alt="" />
                        {/* <img src={toAbsoluteUrl('/media/avatars/300-2.jpg')} alt='' /> */}
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <Link to='/projects/sgyusjcgjy' className='text-dark fw-bold text-hover-primary fs-6'>
                          Project Name
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className='symbol-group symbol-hover flex-nowrap'>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="name"
                        key={`cw7-item-1`}
                      >
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-11.jpg')} />
                      </div>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="name"
                        key={`cw7-item-2`}
                      >
                        <span
                          className={clsx(
                            'symbol-label fw-bold',
                            'bg-info',
                            'text-inverse-info'
                          )}
                        >AS</span>
                      </div>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="name"
                        key={`cw7-item-3`}
                      >
                        <span
                          className={clsx(
                            'symbol-label fw-bold',
                            'bg-warning',
                            'text-inverse-warning'
                          )}
                        >CD</span>
                      </div>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="Boclair Temgoua"
                        key={`cw7-item-4`}
                      >
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-2.jpg')} />
                      </div>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="Info name"
                        key={`cw7-item-5`}
                      >
                        <span
                          className={clsx(
                            'symbol-label fw-bold',
                            'bg-info',
                            'text-inverse-info'
                          )}
                        >TB</span>
                      </div>
                      <div
                        className='symbol symbol-30px symbol-circle'
                        data-bs-toggle='tooltip'
                        title="name"
                        key={`cw7-item-1`}
                      >
                        <img alt='Pic' src={toAbsoluteUrl('/media/avatars/300-12.jpg')} />
                      </div>
                      <Link to={`/projects/wbchgyugwu/contributors`} className="symbol symbol-30px symbol-circle">
                        <span className="symbol-label fs-8 fw-bold bg-dark text-gray-300">+42</span>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'
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

export default ProjectsWrapper
