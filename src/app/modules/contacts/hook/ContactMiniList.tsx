import React, { } from 'react'
import { ContactModel } from '../core/_models'
import { capitalizeFirstLetter } from '../../utils'

type Props = {
    item?: ContactModel;
    index?: number
}

const ContactMiniList: React.FC<Props> = ({ item, index }) => {
    return (
        <>
            <div
                className='symbol symbol-30px symbol-circle'
                data-bs-toggle='tooltip'
                title={`${item?.lastName} ${item?.firstName}`}
                key={`cw7-item-${index}`}
            >

                {item?.image ?
                    <img src={item?.image} alt={`${item?.lastName} ${item?.firstName}`} /> :
                    <div className={`symbol-label fw-bold bg-${item?.color} text-inverse-${item?.color}`}>
                        {capitalizeFirstLetter(String(item?.lastName), String(item?.firstName))}
                    </div>
                }
            </div>
        </>
    )
}

export default ContactMiniList
