/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Link, useNavigate } from 'react-router-dom'
import { ContributorModel } from '../../contributors/core/_models'
import { getContributorsOrganization } from '../../contributors/core/_requests'
import ContributorMiniList from '../../contributors/hook/ContributorMiniList'
import { useQuery } from '@tanstack/react-query'

type Props = {
    item?: ContributorModel;
}

const OrganizationList: React.FC<Props> = ({ item }) => {
    const navigate = useNavigate();
    // const [contributors, setContributors] = useState<any>([])

    // useEffect(() => {
    //     const loadItem = async () => {
    //         const { data } = await getContributorsOrganization({
    //             take: 10,
    //             page: 1,
    //             sort: 'ASC',
    //             type: 'ORGANIZATION',
    //             organizationId: String(item?.organizationId)
    //         })
    //         setContributors(data as any)
    //     }
    //     loadItem()
    // }, [item?.organizationId])

    // const dataTable = (contributors?.total <= 0) ? ('') :
    //     contributors?.value?.map((item: ContributorModel, index: number) => (
    //         <ContributorMiniList item={item} key={index} index={index} />
    //     ))

    const fetchDataContributorMini = async () => await getContributorsOrganization({ take: 5, page: 1, sort: 'ASC', type: 'ORGANIZATION', organizationId: String(item?.organizationId) })
    const { isLoading: isLoadingContributor, isError: isErrorContributor, data: dataContributorMini } = useQuery({
        queryKey: ['contributorsOrganizationMini', item?.organizationId],
        queryFn: () => fetchDataContributorMini(),
    })

    const datataContributorMiniTable = isLoadingContributor ? (<strong>Loading...</strong>) :
        isErrorContributor ? ('') :
            (dataContributorMini?.data?.total <= 0) ? ('') :
                (
                    dataContributorMini?.data?.value?.map((item: ContributorModel, index: number) => (
                        <OrganizationList item={item} key={index} />
                    )))

    const calculatedContributors: number = Number(dataContributorMini?.data.total) - Number(dataContributorMini?.data?.total_value)
    return (
        <>
            <tr key={item?.id}>
                <td>
                    <div className='d-flex align-items-center'>
                        <div className='d-flex justify-content-start flex-column'>
                            <Link to={`/organizations/${item?.organizationId}`} className='text-dark fw-bold text-hover-primary fs-6'>
                                {item?.organization?.name}
                            </Link>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {item?.organization?.email}
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='symbol-group symbol-hover flex-nowrap'>

                        {datataContributorMiniTable}

                        <Link to={`/organizations/${item?.organizationId}/contributors`} className="symbol symbol-30px symbol-circle">
                            {calculatedContributors >= Number(dataContributorMini?.data?.total_value) &&
                                <span className="symbol-label fs-8 fw-bold bg-dark text-gray-300">
                                    +{calculatedContributors}
                                </span>
                            }
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
                    </div>
                </td>
            </tr>
        </>
    )
}

export default OrganizationList
