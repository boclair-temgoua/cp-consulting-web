/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { capitalizeFirstLetter, truncateDescription } from '../../utils'
import { formateDaysMonthYearFormatDays } from '../../utils/formate-date-dayjs'
import { PostModel } from '../core/_models'
import { getOnePost } from '../core/_requests'

type PostList = {
    item?: PostModel;
}

const PostList: React.FC<PostList> = ({ item }) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate();


    return (
        <>
            <div key={item?.id} onMouseEnter={() => {
                queryClient.prefetchQuery({
                    queryKey: ['post', String(item?.slug)],
                    queryFn: () => getOnePost({ postSlug: String(item?.slug) }),
                })
            }} className="card card-flush mb-10">
                <div className="card-header pt-9">
                    <div className="d-flex align-items-center">
                        <div className="symbol symbol-circle symbol-50px me-5">
                            {item?.profile?.image ?
                                <img src={item?.profile?.image} alt={`${item?.profile?.lastName} ${item?.profile?.firstName}`} /> :
                                <div className={`symbol-label fw-bold bg-${item?.profile?.color} text-inverse-${item?.profile?.color}`}>
                                    {capitalizeFirstLetter(String(item?.profile?.lastName), String(item?.profile?.firstName))}
                                </div>
                            }
                        </div>
                        <div className="flex-grow-1">
                            <a href="#pablo" className="text-gray-800 text-hover-primary fs-4 fw-bold">{item?.profile?.lastName} {item?.profile?.firstName}</a>
                            <span className="text-gray-400 fw-semibold d-block">{formateDaysMonthYearFormatDays(item?.createdAt as Date)}</span>
                        </div>
                    </div>
                </div>

                <div className="card-body" onClick={() => navigate(`/posts/${item?.slug}`)}>
                    <div className="text-gray-800 fw-bold text-hover-primary fs-4">
                        {item?.title}
                    </div>
                    <div className="fs-6 fw-normal text-gray-700" dangerouslySetInnerHTML={{ __html: truncateDescription(item?.description as string) as string }} />
                </div>
                <div className="card-footer pt-0">
                    <div className="mb-6">
                        <div className="separator separator-solid"></div>

                        <ul className="nav py-3">
                            <li className="nav-item">
                                <button type="button" onClick={() => navigate(`/posts/${item?.slug}`)} className="nav-link btn btn-sm btn-color-gray-600 btn-active-color-primary btn-active-light-primary fw-bold px-4 me-1 collapsible ">
                                    {item?.commentTotal || 0} Comments
                                </button>
                            </li>
                            {/* <li className="nav-item">
                                <a href="#pablo" className="nav-link btn btn-sm btn-color-gray-600 btn-active-color-danger text-danger fw-bold px-4 me-1">
                                    8 Likes
                                </a>
                            </li> */}
                        </ul>
                        <div className="separator separator-solid mb-1"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostList
