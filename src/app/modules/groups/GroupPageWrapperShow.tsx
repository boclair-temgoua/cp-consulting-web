import { FC, useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOneGroup } from './core/_requests'
import { useAuth } from '../auth'
import { SubProjectTableMini } from '../sub-projects/SubProjectTableMini'
import { ContactProjectTableMini } from '../contacts/ContactProjectTableMini'
import { ContributorProjectTableMini } from '../contributors/ContributorProjectTableMini'
import { KTSVG, toAbsoluteUrl } from '../../../_metronic/helpers'
import { DocumentTableMini } from '../documents/DocumentTableMini'
import { Dropdown1 } from '../../../_metronic/partials'
import ContributorMiniList from '../contributors/hook/ContributorMiniList'
import ReactQuill from 'react-quill'
import { getContributorsGroup, getContributorsProject } from '../contributors/core/_requests'
import { ContributorModel } from '../contributors/core/_models'

const GroupPageWrapperShow: FC = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const takeValue: number = 6
  const { groupId } = useParams<string>()

  const fetchOneGroup = async () => await getOneGroup({ groupId: String(groupId) })
  const {
    data: groupItem,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['group', groupId],
    queryFn: () => fetchOneGroup(),
    enabled: Boolean(groupId),
  })

  const fetchDataContributorMini = async () =>
    await getContributorsGroup({
      take: takeValue,
      page: 1,
      sort: 'ASC',
      groupId: String(groupId),
    })
  const {
    isLoading: isLoadingContributor,
    isError: isErrorContributor,
    data: dataContributorMini,
  } = useQuery({
    queryKey: ['contributorsGroupMini', String(groupId), takeValue, 1, 'ASC'],
    queryFn: () => fetchDataContributorMini(),
  })
  const dataContributorMiniTable = isLoadingContributor ? (
    <strong>Loading...</strong>
  ) : isErrorContributor ? (
    <strong>Error find data please try again...</strong>
  ) : dataContributorMini?.data?.total <= 0 ? (
    ''
  ) : (
    dataContributorMini?.data?.value?.map((item: ContributorModel, index: number) => (
      <ContributorMiniList item={item} key={index} />
    ))
  )

  const calculatedContributors: number = Number(
    Number(dataContributorMini?.data.total) - Number(dataContributorMini?.data?.total_value)
  )
  return (
    <>
      <HelmetSite title={`${groupItem?.data?.name || 'Group'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${groupItem?.data?.name || 'Group'} |`,
            path: `/groups/${groupId}`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Group
      </PageTitle>

      <a href="#back" className='btn-flex btn-light-primary fw-bolder'
        onClick={() => { navigate(-1) }} style={{ cursor: 'pointer' }}>
        <KTSVG path='/media/icons/duotune/arrows/arr063.svg' className='svg-icon-2' />
      </a>
      <a href="#next" className='btn-flex btn-light-primary fw-bolder'
        onClick={() => { navigate(1) }} style={{ cursor: 'pointer' }}>
        <KTSVG path='/media/icons/duotune/arrows/arr001.svg' className='svg-icon-2' />
      </a>

      <div className='d-flex flex-row'>

        <div className='d-lg-flex flex-column flex-lg-row-auto w-lg-325px'>
          <div className="card mb-5 mb-xl-8">
            <div className="card-body pt-15 px-0">
              <div className="d-flex flex-column text-center mb-9 px-9">
                <div className="symbol symbol-80px symbol-circle symbol-lg-150px mb-4">
                  <img src="/media/avatars/300-20.jpg" className="" alt="" />
                </div>
                <div className="text-center">
                  <a href="#pablo" className="text-gray-800 fw-bold text-hover-primary fs-4">{groupItem?.data?.name}</a>

                  <span className="text-muted d-block fw-semibold">{groupItem?.data?.description}</span>
                </div>
              </div>
              <div className="row px-9 mb-4">
                <div className="col-md-4 text-center">
                  <div className="text-gray-800 fw-bold fs-3">
                    <span className="m-0 counted">642</span>
                  </div>

                  <span className="text-gray-500 fs-8 d-block fw-bold">POSTS</span>
                </div>
                <div className="col-md-4 text-center">
                  <div className="text-gray-800 fw-bold fs-3">
                    <span className="m-0 counted">201</span>
                  </div>

                  <span className="text-gray-500 fs-8 d-block fw-bold">TASKS</span>
                </div>
                <div className="col-md-4 text-center">
                  <div className="text-gray-800 fw-bold fs-3">
                    <span className="m-0 counted">12</span>
                  </div>

                  <span className="text-gray-500 fs-8 d-block fw-bold">MEMBERS</span>
                </div>
              </div>
              <div className="m-0">
                <ul className="nav nav-pills nav-pills-custom flex-column border-transparent fs-5 fw-bold">
                  <li className="nav-item mt-5">
                    <a className="nav-link text-muted text-active-primary ms-0 py-0 me-10 ps-9 border-0 active" href="#">
                      Feeds
                      <span className="bullet-custom position-absolute start-0 top-0 w-3px h-100 bg-primary rounded-end"></span>
                    </a>
                  </li>
                  <li className="nav-item mt-5">
                    <a className="nav-link text-muted text-active-primary ms-0 py-0 me-10 ps-9 border-0 " href="#">
                      Tasks
                      <span className="bullet-custom position-absolute start-0 top-0 w-3px h-100 bg-primary rounded-end"></span>
                    </a>
                  </li>
                  <li className="nav-item mt-5">
                    <a className="nav-link text-muted text-active-primary ms-0 py-0 me-10 ps-9 border-0 " href="#">
                      Members
                      <span className="bullet-custom position-absolute start-0 top-0 w-3px h-100 bg-primary rounded-end"></span>
                    </a>
                  </li>
                  <li className="nav-item mt-5">
                    <a className="nav-link text-muted text-active-primary ms-0 py-0 me-10 ps-9 border-0 " href="#">
                      Settings
                      <span className="bullet-custom position-absolute start-0 top-0 w-3px h-100 bg-primary rounded-end"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>


        </div>

        

        <div className="w-100 flex-lg-row-fluid mx-lg-13">

          {/* <div className="card card-flush mb-3">
            <ReactQuill theme="snow" value={value} onChange={setValue} />
          </div> */}

          <div className="card-flush d-grid gap-2 d-md-flex justify-content-md-end mb-3">
            <button type="button" onClick={() => { navigate(`/groups/post/${groupId}/create`) }} className="btn btn-sm btn-primary me-1">
              <KTSVG path='/media/icons/duotune/abstract/abs011.svg' className='svg-icon-3' />
              New Post
            </button>
          </div>

          <div className="card card-flush mb-10">

            <div className="card-header pt-9">
              <div className="d-flex align-items-center">
                <div className="symbol symbol-circle symbol-50px me-5">

                  <img src="/media/avatars/300-12.jpg" className="" alt="" />

                </div>
                <div className="flex-grow-1">
                  <a href="#pablo" className="text-gray-800 text-hover-primary fs-4 fw-bold">Brooklyn Simmons</a>
                  <span className="text-gray-400 fw-semibold d-block">Yestarday at 5:06 PM</span>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="text-gray-800 fw-bold text-hover-primary fs-4">
                Who do I Want to Work With? A Simple Framework
              </div>
              <div className="fs-6 fw-normal text-gray-700">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an the release sheets containing Lorem Ipsum passages, and more recently with desktop publishing ...
              </div>
            </div>
            <div className="card-footer pt-0">
              <div className="mb-6">
                <div className="separator separator-solid"></div>

                <ul className="nav py-3">
                  <li className="nav-item">
                    <a href='#pablo' className="nav-link btn btn-sm btn-color-gray-600 btn-active-color-primary btn-active-light-primary fw-bold px-4 me-1 collapsible ">
                      3 Comments
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#pablo" className="nav-link btn btn-sm btn-color-gray-600 btn-active-color-primary fw-bold px-4 me-1">
                      8 Likes
                    </a>
                  </li>
                </ul>
                <div className="separator separator-solid mb-1"></div>
                <div className="collapse show" id="kt_social_feeds_comments_2">

                  <div className="d-flex pt-6">
                    <div className="symbol symbol-circle symbol-35px me-5">
                      <img src="/media/avatars/300-5.jpg" alt="" />
                    </div>
                    <div className="d-flex flex-column flex-row-fluid">
                      <div className="d-flex align-items-center flex-wrap mb-0">
                        <a href="#pablo" className="text-gray-800 text-hover-primary fw-bold me-6">Mr. Anderson</a>

                        <span className="text-gray-400 fw-semibold fs-7 me-5">1 Day ago</span>

                        <a href="#pablo" className="ms-auto text-gray-400 text-hover-primary fw-semibold fs-7">Reply</a>
                      </div>
                      <span className="text-gray-800 fs-7 fw-normal pt-1">Long before you sit dow to put digital pen to paper you need to make sure you have to sit down and write.</span>
                    </div>
                  </div>

                  <div className="d-flex pt-6">
                    <div className="symbol symbol-circle symbol-35px me-5">
                      <img src="/media/avatars/300-1.jpg" alt="" />
                    </div>
                    <div className="d-flex flex-column flex-row-fluid">
                      <div className="d-flex align-items-center flex-wrap mb-0">
                        <a href="#pablo" className="text-gray-800 text-hover-primary fw-bold me-6">Mrs. Anderson</a>

                        <span className="text-gray-400 fw-semibold fs-7 me-5">2 Days ago</span>

                        <a href="#pablo" className="ms-auto text-gray-400 text-hover-primary fw-semibold fs-7">Reply</a>
                      </div>
                      <span className="text-gray-800 fs-7 fw-normal pt-1">Long before you sit dow to put digital pen to paper</span>
                    </div>
                  </div>


                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="symbol symbol-circle symbol-35px me-3">
                  <img src="/media/avatars/300-14.jpg" alt="" />
                </div>
                <div className="position-relative w-100">
                  <textarea className="form-control border ps-5" name="search" rows={2} placeholder='add a comment' />
                </div>
              </div>
            </div>

          </div>

        </div>


        <div className="d-lg-flex flex-column flex-lg-row-auto w-lg-325px">

          <div className="card mb-5 mb-xl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold text-dark">Suggestions members</span>
              </h3>
            </div>
            <div className="card-body pt-5">
              <div className="d-flex flex-stack">
                <div className="symbol symbol-40px me-5">
                  <img src="/media/avatars/300-26.jpg" className="h-50 align-self-center" alt="" />
                </div>
                <div className="d-flex align-items-center flex-row-fluid flex-wrap">
                  <div className="flex-grow-1 me-2">
                    <a href="#pablo" className="text-gray-800 text-hover-primary fs-6 fw-bold">Jacob Jones</a>

                    <span className="text-muted fw-semibold d-block fs-7">Barone LLC.</span>
                  </div>
                  <a href="#pablo" className="btn btn-sm btn-light fs-8 fw-bold">Invite</a>
                </div>
              </div>
              <div className="separator separator-dashed my-4"></div>

              <div className="d-flex flex-stack">
                <div className="symbol symbol-40px me-5">
                  <img src="/media/avatars/300-18.jpg" className="h-50 align-self-center" alt="" />
                </div>
                <div className="d-flex align-items-center flex-row-fluid flex-wrap">
                  <div className="flex-grow-1 me-2">
                    <a href="/metronic8/demo1/../demo1/pages/user-profile/overview.html" className="text-gray-800 text-hover-primary fs-6 fw-bold">Annette Black</a>

                    <span className="text-muted fw-semibold d-block fs-7">Binford Ltd.</span>
                  </div>
                  <a href="#pablo" className="btn btn-sm btn-light fs-8 fw-bold">Invite</a>
                </div>
              </div>



            </div>
          </div>


        </div>
      </div>




      {groupItem?.data?.role?.name === 'ADMIN' && (
        <div className='card  '>
          <div className='card-header border-0 cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bold m-0'>Delete: {groupItem?.data?.name || 'Project'}</h3>
            </div>
          </div>
          <div id='kt_account_settings_deactivate' className='collapse show'>
            <form
              id='kt_account_deactivate_form'
              className='form fv-plugins-bootstrap5 fv-plugins-framework'
            >
              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button type='submit' className='btn btn-sm btn-danger fw-semibold'>
                  <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />{' '}
                  Delete
                </button>
              </div>

              <input type='hidden' />
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default GroupPageWrapperShow
