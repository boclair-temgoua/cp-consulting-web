import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { KTSVG } from "../../../../_metronic/helpers";
import { useDebounce } from "../../utils/use-debounce";
import { getAllUsers } from "../../auth/core/_requests";
import { ContributorUserInviteList } from "./ContributorUserInviteList";
import { OneUserModel } from "../../auth";
import { ContributorRequestModel } from "../core/_models";

type Props =   {
    setOpenModal?: any,
} & ContributorRequestModel

export const InviteContributorFormModal: React.FC<Props> = ({
    setOpenModal,
    groupId,
    projectId,
    subProjectId,
    subSubProjectId,
    subSubSubProjectId,
    organizationId
}) => {
    const takeItem: number = 4
    const pageItem: number = 1
    const [filter, setFilter] = useState<string>('')

    const debouncedFilter = useDebounce(filter, 1000);
    const isEnabled = Boolean(debouncedFilter)
    const queryKey = ['users', debouncedFilter, pageItem, takeItem]
    const fetchUsers = async (debouncedFilter: string) => await getAllUsers({
        search: debouncedFilter,
        take: takeItem,
        page: pageItem,
        sort: 'DESC'
    })

    const { isLoading, data, isError } = useQuery({
        queryKey: queryKey,
        queryFn: () => fetchUsers(debouncedFilter),
        enabled: !!isEnabled,
        staleTime: 5000
    })

    const dataTable = isLoading ? ('') :
        isError ? (<strong>Error find data please try again...</strong>) :
            (data?.data?.total <= 0) ? ('') :
                (
                    data?.data?.value?.map((item: OneUserModel, index: number) => (
                        <ContributorUserInviteList
                            contributor={item}
                            key={index}
                            groupId={groupId}
                            projectId={projectId}
                            subProjectId={subProjectId}
                            subSubProjectId={subSubProjectId}
                            subSubSubProjectId={subSubSubProjectId}
                            organizationId={organizationId}
                        />
                    )))
    return (
        <>

            <div
                className='modal fade show d-block'
                role='dialog'
                tabIndex={-1}
                aria-modal='true'
            >
                {/* begin::Modal dialog */}
                <div className='modal-dialog modal-dialog-centered mw-550px'>
                    {/* begin::Modal content */}
                    <div className='modal-content'>
                        <div className="modal-header pb-0 border-0 justify-content-end">
                            <div onClick={() => { setOpenModal(false) }} className="btn btn-icon btn-sm btn-active-light-primary ms-2">
                                <KTSVG
                                    path="/media/icons/duotune/arrows/arr061.svg"
                                    className="svg-icon svg-icon-2x"
                                />
                            </div>
                        </div>
                        <div className="modal-body scroll-y pt-0 pb-15">
                            <div className="mw-lg-600px mx-auto">
                                <div className="mb-13 text-center">
                                    <h1 className="mb-3">Invite Collaborator</h1>
                                </div>

                                <input
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="form-control mb-8"
                                    placeholder="Search by emails, first name or last name" />


                                {dataTable}
                            </div>
                        </div>

                    </div>
                    {/* end::Modal content */}
                </div>
                {/* end::Modal dialog */}
            </div>
            {/* begin::Modal Backdrop */}
            <div className='modal-backdrop fade show'></div>
            {/* end::Modal Backdrop */}

        </>


    );
};