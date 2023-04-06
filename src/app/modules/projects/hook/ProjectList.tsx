/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { Link } from 'react-router-dom'
import { ContributorModel } from '../../contributors/core/_models'
import { getContributorsProject } from '../../contributors/core/_requests'
import ContributorMiniList from '../../contributors/hook/ContributorMiniList'
import ContactMiniList from '../../contacts/hook/ContactMiniList'
import { OneContactModel } from '../../contacts/core/_models'
import { getContactsBy } from '../../contacts/core/_requests'

type Props = {
    item?: ContributorModel;
}

const ProjectList: React.FC<Props> = ({ item }) => {
    const [contributors, setContributors] = useState<any>([])
    const [contacts, setContacts] = useState<any>([])

    useEffect(() => {
        const loadItem = async () => {
            const { data: dataCcntributors } = await getContributorsProject({
                take: 6,
                page: 1,
                sort: 'ASC',
                projectId: String(item?.projectId)
            })
            setContributors(dataCcntributors as any)

            const { data: dataProject } = await getContactsBy({
                take: 6,
                page: 1,
                sort: 'ASC',
                type: 'PROJECT',
                projectId: String(item?.projectId)
            })
            setContacts(dataProject as any)
        }
        loadItem()
    }, [item?.projectId])

    const dataContributorsTable = (contributors?.total <= 0) ? ('') :
        contributors?.value?.map((item: ContributorModel, index: number) => (
            <ContributorMiniList item={item} key={index} index={index} />
        ))


    const dataContactsTable = (contacts?.total <= 0) ? ('') :
        contacts?.value?.map((item: OneContactModel, index: number) => (
            <ContactMiniList item={item} key={index} index={index} />
        ))

    return (
        <>
            <tr key={item?.id}>
                <td>
                    <div className='d-flex align-items-center'>
                        <div className='symbol symbol-35px me-5'>
                            <img src="https://berivo.s3.eu-central-1.amazonaws.com/svg/files/folder-document.svg" alt="" />
                            {/* <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' /> */}
                        </div>
                        <div className='d-flex justify-content-start flex-column'>
                            <Link to={`/projects/${item?.projectId}`} className='text-dark fw-bold text-hover-primary fs-6'>
                                {item?.project?.name}
                            </Link>
                            <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {item?.project?.description}
                            </span>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='symbol-group symbol-hover flex-nowrap'>

                        {dataContributorsTable}

                    </div>
                </td>

                <td>
                    <div className='symbol-group symbol-hover flex-nowrap'>

                        {dataContactsTable}

                    </div>
                </td>

                <td>
                    <span className={`badge badge-light-${item?.organization?.color} fw-bolder`}>
                        {item?.organization?.name}
                    </span>
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

export default ProjectList
