import React, { } from 'react'
import { ContributorModel } from '../core/_models'
import { capitalizeFirstLetter } from '../../utils'

type Props = {
    item?: ContributorModel;
    index?: number
}

const ContributorMiniList: React.FC<Props> = ({ item, index }) => {
    return (
        <>
            <div
                className='symbol symbol-30px symbol-circle'
                data-bs-toggle='tooltip'
                title={`${item?.profile?.lastName} ${item?.profile?.firstName}`}
                key={`cw7-item-${index}`}
            >

                {item?.profile?.image ?
                    <img src={item?.profile?.image} alt={`${item?.profile?.lastName} ${item?.profile?.firstName}`} /> :
                    <div className={`symbol-label fw-bold bg-${item?.profile?.color} text-inverse-${item?.profile?.color}`}>
                        {capitalizeFirstLetter(String(item?.profile?.lastName), String(item?.profile?.firstName))}
                    </div>
                }
            </div>
        </>
    )
}

export default ContributorMiniList
