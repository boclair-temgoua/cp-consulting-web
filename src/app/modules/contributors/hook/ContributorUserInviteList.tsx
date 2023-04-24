import { useState } from "react";
import { AlertDangerNotification, AlertSuccessNotification, capitalizeFirstLetter } from "../../utils";
import { KTSVG } from "../../../../_metronic/helpers";
import { OneUserModel } from "../../auth";
import { ContributorRequestModel, CreateOneContributorMutation } from "../core/_models";

type Props = {
    contributor: OneUserModel
} & ContributorRequestModel

export const ContributorUserInviteList: React.FC<Props> = ({
    contributor,
    groupId,
    projectId,
    subProjectId,
    subSubProjectId,
    subSubSubProjectId,
    organizationId
}) => {
    const [isInvited, setIsInvited] = useState<boolean>(true)


    const saveMutation = CreateOneContributorMutation({ onSuccess: () => { } });

    const invitedItem = async (contributor: OneUserModel) => {
        try {
            const payload = {
                userId: contributor?.id,
                groupId,
                projectId,
                subProjectId,
                subSubProjectId,
                subSubSubProjectId,
                organizationId
            }
            await saveMutation.mutateAsync(payload)
            setIsInvited(isInvited => !isInvited)
            AlertSuccessNotification({
                text: 'Contributor invite successfully',
                className: 'info',
                position: 'center',
            })
        } catch (error: any) {
            AlertDangerNotification({ text: `${error?.response?.data?.message}`, className: 'info', position: 'center' })
        }
    }

    return (
        <>
            <div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed" key={contributor?.id}>
                <div className="d-flex align-subscribeProjects-center">
                    <div className="symbol symbol-35px symbol-circle">
                        {contributor?.profile?.image ? (<img alt={`${contributor?.profile?.lastName} ${contributor?.profile?.firstName}`} src={contributor?.profile?.image} />) :
                            (<span className={`symbol-label bg-light-${contributor?.profile?.color} text-${contributor?.profile?.color} fw-bold`}>
                                {capitalizeFirstLetter(String(contributor?.profile?.lastName), String(contributor?.profile?.firstName))}</span>)}
                    </div>
                    <div className="ms-5">
                        <a href={void (0)} className="fs-5 fw-bolder text-gray-900 text-hover-primary mb-2">
                            {contributor?.profile?.lastName} {contributor?.profile?.firstName}
                        </a>
                        <div className="fw-semibold text-muted">{contributor?.email}</div>
                    </div>
                </div>
                <div className="ms-2 w-100px">
                    <button onClick={() => invitedItem(contributor)} className={`btn btn-sm btn-light btn-active-${isInvited ? 'primary' : 'success'}`}>
                        <KTSVG path={`/media/icons/duotune/${isInvited ? 'arrows/arr075' : 'arrows/arr012'}.svg`} className='svg-icon-3' />{isInvited ? 'Invite' : 'Invited'}
                    </button>
                </div>
            </div>
        </>
    )
}