import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { KTSVG } from "../../../../_metronic/helpers";
import { useDebounce } from "../../utils/use-debounce";
import { ContactInviteRequestModel, ContactModel } from "../core/_models";
import { getContactsBy } from "../core/_requests";
import { ContactUserInviteList } from "./ContactUserInviteList";

type Props = {
    setOpenModal?: any,
} & ContactInviteRequestModel

export const InviteContactFormModal: React.FC<Props> = ({
    setOpenModal,
    projectId,
    subProjectId,
    subSubProjectId,
    subSubSubProjectId,
    type,
    organizationId
}) => {
    const takeItem: number = 6
    const pageItem: number = 1
    const [filter, setFilter] = useState<string>('')

    const debouncedFilter = useDebounce(filter, 1000);
    const isEnabled = Boolean(debouncedFilter)
    const queryKey = ['contacts', debouncedFilter, pageItem, takeItem]
    const fetchContacts = async (debouncedFilter: string) => await getContactsBy({
        search: debouncedFilter,
        take: takeItem,
        page: pageItem,
        sort: 'DESC',
        organizationId: String(organizationId)
    })

    const { isLoading, data, isError } = useQuery({
        queryKey: queryKey,
        queryFn: () => fetchContacts(debouncedFilter),
        enabled: !!isEnabled,
        staleTime: 5000
    })

    const dataTable = isLoading ? ('') :
        isError ? (<strong>Error find data please try again...</strong>) :
            (data?.data?.total <= 0) ? ('') :
                (
                    data?.data?.value?.map((item: ContactModel, index: number) => (
                        <ContactUserInviteList
                            contact={item}
                            key={index}
                            type={type}
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
                                    <h1 className="mb-3">Add Contact</h1>
                                    <div className="text-muted fw-bold fs-5">If contact don't already exist
                                        <a href="#" className="link-primary fw-bolder"> create new</a>.
                                    </div>
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