/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { capitalizeFirstLetter, truncateDescription } from '../../utils'
import { formateDaysMonthYearFormatDays } from '../../utils/formate-date-dayjs'
import { PostModel } from '../core/_models'
import { getOnePost } from '../core/_requests'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { PostCreateFormModal } from './PostCreateFormModal'
import { useAuth } from '../../auth'

type Props = {
    item?: PostModel;
}

const PostList: React.FC<Props> = ({ item }) => {
    const { profile } = useAuth() as any
    const [openCreateOrUpdateModal, setOpenCreateOrUpdateModal] = useState<boolean>(false)
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    return (
        <>
            <div className={`card mb-5 mb-xxl-8`} key={item?.id} onMouseEnter={() => {
                queryClient.prefetchQuery({
                    queryKey: ['post', String(item?.slug)],
                    queryFn: () => getOnePost({ postSlug: String(item?.slug) }),
                })
            }}>
                {/* begin::Body */}
                <div className='card-body pb-0'>
                    {/* begin::Header */}
                    <div className='d-flex align-items-center mb-5'>
                        {/* begin::User */}
                        <div className='d-flex align-items-center flex-grow-1'>
                            {/* begin::Avatar */}
                            <div className='symbol symbol-45px me-5'>
                                {item?.profile?.image ?
                                    <img src={item?.profile?.image} alt={`${item?.profile?.lastName} ${item?.profile?.firstName}`} /> :
                                    <div className={`symbol-label fw-bold bg-${item?.profile?.color} text-inverse-${item?.profile?.color}`}>
                                        {capitalizeFirstLetter(String(item?.profile?.lastName), String(item?.profile?.firstName))}
                                    </div>
                                }
                            </div>
                            {/* end::Avatar */}

                            {/* begin::Info */}
                            <div className='d-flex flex-column'>
                                <a href={void (0)} className='text-gray-800 text-hover-primary fs-6 fw-bold'>
                                    {item?.profile?.lastName} {item?.profile?.firstName}
                                </a>
                                <span className="text-gray-400 fw-semibold d-block">{formateDaysMonthYearFormatDays(item?.createdAt as Date)}</span>
                            </div>
                            {/* end::Info */}
                        </div>
                        {/* end::User */}

                        {/* begin::Menu */}

                        {profile?.userId === item?.userId && (
                            <div className='my-0'>
                                <button onClick={() => { setOpenCreateOrUpdateModal(true) }} className='btn btn-icon btn-bg-light btn-active-color-success btn-sm me-1'>
                                    <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                                </button>
                                <button type='button' className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'>
                                    <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                                </button>
                            </div>
                        )}
                        {/* end::Menu */}
                    </div>
                    {/* end::Header */}

                    {/* begin::Post */}
                    <div className='mb-5'>
                        {/* begin::Text */}
                        <p style={{ cursor: 'pointer' }} className="text-gray-800 fw-bold text-hover-primary fs-1" onClick={() => navigate(`/posts/${item?.slug}`)}>
                            {item?.title} {item?.description?.length}
                        </p>
                        <p className='text-gray-800 fw-normal mb-5' dangerouslySetInnerHTML={{ __html: String(truncateDescription(String(item?.description))) }} />
                        {/* <p className='text-gray-800 fw-normal mb-5'>
                            {truncateDescription(String(item?.description))}
                        </p> */}
                        {/* end::Text */}

                        {/* begin::Toolbar */}

                        <div className='d-flex align-items-center mb-5'>
                            <a
                                href={void (0)}
                                title={`${item?.commentTotal || 0} Comments`}
                                className='btn btn-sm btn-light btn-color-muted btn-active-light-success px-4 py-2 me-4'
                            >
                                <KTSVG path='/media/icons/duotune/communication/com012.svg' className='svg-icon-2' />
                                {item?.commentTotal || 0}
                            </a>

                            <a
                                href={void (0)}
                                title={`${item?.likeTotal || 0} Likes`}
                                className={`btn btn-sm btn-light${item?.isLike ? '-danger' : ''} btn-color-${item?.isLike ? 'danger' : 'muted'} btn-active-light-danger px-4 py-2`}
                            >
                                <KTSVG path='/media/icons/duotune/general/gen030.svg' className='svg-icon-2' />
                                {item?.likeTotal || 0}
                            </a>
                        </div>
                        {/* end::Toolbar */}
                    </div>
                    {/* end::Post */}

                    {/* begin::Separator */}
                    <div className='separator mb-4'></div>
                    {/* end::Separator */}

                    {/* begin::Reply input */}
                    <form className='position-relative mb-6'>
                        <textarea
                            className='form-control border-0 p-0 pe-10 resize-none min-h-25px'
                            rows={1}
                            placeholder='Reply..'
                        ></textarea>

                        <div className='position-absolute top-0 end-0 me-n5'>
                            <span className='btn btn-icon btn-sm btn-active-color-primary pe-0 me-2'>
                                <KTSVG
                                    path='/media/icons/duotune/communication/com008.svg'
                                    className='svg-icon-3 mb-3'
                                />
                            </span>

                            <span className='btn btn-icon btn-sm btn-active-color-primary ps-0'>
                                <KTSVG path='/media/icons/duotune/general/gen018.svg' className='svg-icon-2 mb-3' />
                            </span>
                        </div>
                    </form>
                    {/* edit::Reply input */}
                </div>
                {/* end::Body */}
            </div>
            {openCreateOrUpdateModal && (<PostCreateFormModal setOpenCreateOrUpdateModal={setOpenCreateOrUpdateModal} groupId={String(item?.groupId)} post={item} />)}

        </>
    )
}

export default PostList
