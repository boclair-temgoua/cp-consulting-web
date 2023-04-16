import { useState } from "react";
import { AlertDangerNotification, AlertSuccessNotification, capitalizeFirstLetter } from "../../utils";
import { KTSVG } from "../../../../_metronic/helpers";
import { OneUserModel } from "../../auth";
import { ContactInviteRequestModel, ContactModel, CreateOneContactProjectMutation } from "../core/_models";
// import { ContributorRequestModel, CreateOneContributorMutation } from "../core/_models";

type Props = {
    contact: ContactModel
} & ContactInviteRequestModel

export const ContactUserInviteList: React.FC<Props> = ({
    contact,
    projectId,
    subProjectId,
    subSubProjectId,
    subSubSubProjectId,
    type,
    organizationId
}) => {
    const [isInvited, setIsInvited] = useState<boolean>(true)


    const saveMutation = CreateOneContactProjectMutation({ onSuccess: () => { } });

    const invitedItem = async (contact: ContactModel) => {
        try {
            const payload = {
                contactId: contact?.id,
                projectId,
                subProjectId,
                subSubProjectId,
                subSubSubProjectId,
                type,
                organizationId
            }
            await saveMutation.mutateAsync(payload)
            setIsInvited(isInvited => !isInvited)
            AlertSuccessNotification({
                text: 'Contact invite successfully',
                className: 'info',
                position: 'center',
            })
        } catch (error: any) {
            AlertDangerNotification({ text: `${error?.response?.data?.message}`, className: 'info', position: 'center' })
        }
    }

    return (
        <>
            <div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed" key={contact?.id}>
                <div className="d-flex align-subscribeProjects-center">
                    <div className="symbol symbol-35px symbol-circle">
                        {contact?.image ? (<img alt={`${contact?.lastName} ${contact?.firstName}`} src={contact?.image} />) :
                            (<span className={`symbol-label bg-light-${contact?.color} text-${contact?.color} fw-bold`}>
                                {capitalizeFirstLetter(String(contact?.lastName), String(contact?.firstName))}</span>)}
                    </div>
                    <div className="ms-5">
                        <a href={void (0)} className="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2">
                            {contact?.lastName} {contact?.firstName}
                        </a>
                        <div className="fw-semibold text-muted">{contact?.email}</div>
                    </div>
                </div>
                <div className="ms-2 w-100px">
                    <button onClick={() => invitedItem(contact)} className={`btn btn-sm btn-light btn-active-${isInvited ? 'primary' : 'success'}`}>
                        <KTSVG path={`/media/icons/duotune/${isInvited ? 'arrows/arr075' : 'arrows/arr012'}.svg`} className='svg-icon-3' />{isInvited ? 'Invite' : 'Invited'}
                    </button>
                </div>
            </div>
        </>
    )
}