/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Link, useNavigate } from 'react-router-dom'
import { ContributorModel } from '../../contributors/core/_models'
// import { getContributorssubProject } from '../../contributors/core/_requests'
import ContributorMiniList from '../../contributors/hook/ContributorMiniList'
import ContactMiniList from '../../contacts/hook/ContactMiniList'
import { OneContactModel } from '../../contacts/core/_models'
import { getContactsBy } from '../../contacts/core/_requests'
import { useQuery } from '@tanstack/react-query'
import { getContributorsSubProject } from '../../contributors/core/_requests'
import { ProjectModel } from '../../projects/core/_models'
import Swal from 'sweetalert2';

type Props = {
    takeValue?: number
    item?: ContributorModel;
    projectItem?: ProjectModel;
}

const SubsubProjectList: React.FC<Props> = ({ item, projectItem, takeValue }) => {
    const navigate = useNavigate();


    const fetchDataContributorMini = async () => await getContributorsSubProject({ take: Number(takeValue), page: 1, sort: 'ASC', subProjectId: String(item?.subProjectId) })
    const { isLoading: isLoadingContributor, isError: isErrorContributor, data: dataContributorMini } = useQuery({
        queryKey: ['contributorSubProjectMini', item?.subProjectId],
        queryFn: () => fetchDataContributorMini(),
    })
    const dataContributorMiniTable = isLoadingContributor ? (<strong>Loading...</strong>) :
        isErrorContributor ? (<strong>Error find data please try again...</strong>) :
            (dataContributorMini?.data?.total <= 0) ? ('') :
                (
                    dataContributorMini?.data?.value?.map((item: ContributorModel, index: number) => (
                        <ContributorMiniList item={item} key={index} />
                    )))


    const deleteItem = async (voucher: any) => {
        Swal.fire({
            title: 'Delete?',
            text: 'Are you sure you want to perform this action?',
            confirmButtonText: 'Yes, Deleted',
            cancelButtonText: 'No, Cancel',
            buttonsStyling: false,
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-outline-default',
            },
            showCancelButton: true,
            reverseButtons: true,
        }).then(async (result) => {
            if (result.value) {
                console.log('item ======>', item)
                //Envoyer la requet au serve
                // const payloadSave = { code: voucher?.code }
                // eslint-disable-next-line no-lone-blocks
                // {
                //   voucher?.voucherType === 'COUPON' ?
                //     actionDeleteCouponMutation.mutateAsync(payloadSave) :
                //     actionDeleteVoucherMutation.mutateAsync(payloadSave)
                // }

            }
        });

    }

    const calculatedContributors: number = Number(Number(dataContributorMini?.data.total) - Number(dataContributorMini?.data?.total_value))
    return (
        <>
            <tr key={item?.id}>
                <td>
                    <div className='d-flex align-items-center' onClick={() => navigate(`/projects/${item?.projectId}/${item?.subProjectId}`, { replace: true })}>
                        <div className='symbol symbol-35px me-5'>
                            <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt="" />
                            {/* <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' /> */}
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <Link to={`/projects/${item?.projectId}/${item?.subProjectId}`} className='text-dark fw-bold text-hover-primary fs-6'>
                                {item?.subProject?.name}
                            </Link>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {item?.subProject?.description}
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='symbol-group symbol-hover flex-nowrap'>

                        {dataContributorMiniTable}

                        <Link to={`/projects/${item?.projectId}`} className="symbol symbol-30px symbol-circle">
                            {calculatedContributors > Number(dataContributorMini?.data?.total_value) &&
                                <span className="symbol-label fs-8 fw-bold bg-dark text-gray-300">
                                    +{calculatedContributors}
                                </span>
                            }
                        </Link>

                    </div>
                </td>

                <td>
                    {projectItem?.role?.name === 'ADMIN' && (
                        <div className='d-flex justify-content-end flex-shrink-0'>
                            <a href='#'
                                className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                            >
                                <KTSVG path='/media/icons/duotune/general/gen055.svg' className='svg-icon-3' />
                            </a>
                            <button type='button' onClick={() => { deleteItem(item) }} className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1'>
                                <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
                            </button>
                        </div>

                    )}
                </td>
            </tr>
        </>
    )
}

export default SubsubProjectList
