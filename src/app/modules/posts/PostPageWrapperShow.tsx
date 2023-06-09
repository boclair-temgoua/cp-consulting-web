import { FC, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite, capitalizeFirstLetter } from '../utils'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOnePost } from './core/_requests'
import { formateDaysMonthYearFormatDays } from '../utils/formate-date-dayjs'

const PostPageWrapperShow: FC = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const takeValue: number = 6
  const { postSlug } = useParams<string>()

  const fetchOnePost = async () => await getOnePost({ postSlug: String(postSlug) })
  const {
    data: postItem,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['post', postSlug],
    queryFn: () => fetchOnePost(),
    enabled: Boolean(postSlug),
  })
  const post = postItem?.data

  return (
    <>
      <HelmetSite title={`${post?.title || 'Post'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${post?.title || 'Post'} |`,
            path: `/posts/${postSlug}`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Post
      </PageTitle>



      <div className='flex-column-fluid'>

        <div className='d-flex flex-column flex-lg-row'>



          <div className="flex-column flex-lg-row-auto w-100 w-lg-300px w-xl-1000px mb-10 mb-lg-0">

            <div className="card card-flush mb-10">
              <div className="card-header pt-9">
                <div className="d-flex align-items-center">
                  <div className="symbol symbol-circle symbol-50px me-5">
                    {post?.profile?.image ?
                      <img src={post?.profile?.image} alt={`${post?.profile?.lastName} ${post?.profile?.firstName}`} /> :
                      <div className={`symbol-label fw-bold bg-${post?.profile?.color} text-inverse-${post?.profile?.color}`}>
                        {capitalizeFirstLetter(String(post?.profile?.lastName), String(post?.profile?.firstName))}
                      </div>
                    }
                  </div>
                  <div className="flex-grow-1">
                    <span className="text-gray-800 text-hover-primary fs-4 fw-bold">{post?.profile?.firstName} {post?.profile?.lastName}</span>
                    <span className="text-gray-400 fw-semibold d-block">{formateDaysMonthYearFormatDays(post?.createdAt as Date)}</span>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="text-gray-800 fw-bold text-hover-primary fs-1 mb-3">
                  {post?.title}
                </div>
                <div dangerouslySetInnerHTML={{ __html: post?.description as string }} className="fs-6 fw-normal text-gray-700" />
              </div>
              <div className="card-footer pt-0">
                <div className="mb-6">
                  <div className="separator separator-solid"></div>

                  <ul className="nav py-3">
                    <li className="nav-item">
                      <a href='#pablo' className="nav-link btn btn-sm btn-color-gray-600 btn-active-color-primary btn-active-light-primary fw-bold px-4 me-1 collapsible ">
                        {post?.commentTotal || 0} Comments
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#pablo" className="nav-link btn btn-sm btn-color-gray-600 btn-active-color-primary fw-bold px-4 me-1">
                        8 Likes
                      </a>
                    </li>
                  </ul>
                  <div className="separator separator-solid mb-1"></div>
                  <div className="collapse show">

                    <div className="d-flex pt-6">
                      <div className="symbol symbol-circle symbol-40px me-5">
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
                      <div className="symbol symbol-circle symbol-40px me-5">
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


                    <div className="d-flex pt-6">
                      <div className="symbol symbol-circle symbol-40px me-5">
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
                  <div className="symbol symbol-circle symbol-40px me-3">
                    <img src="/media/avatars/300-14.jpg" alt="" />
                  </div>
                  <div className="position-relative w-100">
                    <textarea className="form-control border ps-5" name="search" rows={2} placeholder='add a comment' />
                  </div>
                </div>

              </div>
            </div>

          </div>

          <div className="flex-lg-row-fluid ms-lg-7 ms-xl-10 ">
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

      </div>

    </>
  )
}

export default PostPageWrapperShow
