import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ContributorModel, UpdateRoleContributorMutation, optionsRoles } from '../core/_models';
import { SelectValueNameInput } from '../../utils/forms/SelectValueNameInput';
import { AlertDangerNotification, AlertSuccessNotification, capitalizeFirstLetter } from '../../utils';
// import { OneContributorSubscribeResponse } from '../../subscribes/core/_models';
// import { ContributorUpdateMutation, optionsRoles, UpdateContributorRequest } from '../core/_models';
// import { SelectValueIdInput } from '../../forms';

interface Props {
    setOpenModal: any,
    contributor: ContributorModel | any
    //   subscribeUserItem?: OneContributorSubscribeResponse | any
}

const schema = yup
    .object({
        role: yup.string().required(),
    })
    .required();

export const ContributorUpdateFormModal: React.FC<Props> = ({ setOpenModal, contributor }) => {
    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
    const { register, handleSubmit, setValue,
        formState: { errors, isSubmitted, isDirty, isValid }
    } = useForm<any>({ resolver: yupResolver(schema), mode: "onChange" });

    useEffect(() => {
        if (contributor) {
            const fields = ['role'];
            fields?.forEach((field: any) => setValue(field, contributor[field]?.name));
        }
    }, [contributor]);

    const saveMutation = UpdateRoleContributorMutation({
        onSuccess: () => {
            setOpenModal(false)
            setHasErrors(false);
            setLoading(false)
        },
    });


    const onSubmit = async (data: any) => {
        setLoading(true);
        setHasErrors(undefined)
        try {
            await saveMutation.mutateAsync({ ...data, contributorId: String(contributor?.id) })
            AlertSuccessNotification({
                text: 'Role update successfully',
                className: 'info',
                position: 'center',
            })
        } catch (error: any) {
            AlertDangerNotification({ text: `${error?.response?.data?.message}`, className: 'info', position: 'center' })
        }

    };

    console.log('data =======>', contributor?.role?.name)
    return (
        <>
            <div
                className='modal fade show d-block'
                id='kt_modal_1'
                role='dialog'
                tabIndex={-1}
                aria-modal='true'
            >
                {/* begin::Modal dialog */}
                <div className='modal-dialog modal-dialog-centered mw-600px'>
                    {/* <div className='modal-dialog modal-dialog-centered mw-600px modal-dialog-scrollable'> */}
                    {/* begin::Modal content */}
                    <div className='modal-content'>
                        <div className="modal-header pb-0 border-0 justify-content-end">
                            <div onClick={() => { setOpenModal(false) }} className="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal">
                                <KTSVG
                                    path="/media/icons/duotune/arrows/arr061.svg"
                                    className="svg-icon svg-icon-2x"
                                />
                            </div>
                        </div>
                        <form className="form fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit(onSubmit)}>
                            {/* begin::Modal body */}

                            <div className='mx-5 mx-xl-15 my-7'>
                                <div className="d-flex flex-stack py-4 border-bottom border-gray-300 border-bottom-dashed">
                                    <div className="d-flex align-items-center">

                                        {contributor?.profile?.image ?
                                            <div className="symbol symbol-35px symbol-circle">
                                                <img src={contributor?.profile?.image} alt={`${contributor?.profile?.firstName} ${contributor?.profile?.lastName}`} className="symbol symbol-35px symbol-circle" />
                                            </div> :
                                            <div className="symbol symbol-35px symbol-circle" title={`${contributor?.profile?.firstName} ${contributor?.profile?.lastName}`}>
                                                <span className={`symbol-label fw-bold bg-light-${contributor?.profile?.color} text-${contributor?.profile?.color}`}>
                                                    {capitalizeFirstLetter(String(contributor?.profile?.lastName), String(contributor?.profile?.firstName))}
                                                </span>
                                            </div>
                                        }

                                        <div className="ms-5">
                                            <a href={void (0)} className="fs-5 fw-bold text-gray-900 text-hover-primary mb-2">
                                                {contributor?.profile?.lastName} {contributor?.profile?.firstName}
                                            </a>

                                            <div className="fw-semibold text-muted">{contributor?.profile?.email}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='mx-5 mx-xl-15 my-7'>



                                <div className="fv-row fv-plugins-icon-container">
                                    <SelectValueNameInput
                                        dataItem={optionsRoles}
                                        className="form-control"
                                        labelFlex="Role"
                                        register={register}
                                        errors={errors}
                                        inputName="role"
                                        validation={{ required: true }}
                                        isRequired={true}
                                        required="required"
                                    />
                                </div>
                            </div>
                            {/* end::Modal body */}
                            <div className="modal-footer flex-center">
                                <button type="button" onClick={() => { setOpenModal(false) }} className="btn btn-light me-3">Cancel</button>
                                <button type='submit' className='btn btn-lg btn-primary fw-bolder'
                                    disabled={loading || !isDirty || !isValid || isSubmitted}
                                >
                                    {!loading && <span className='indicator-label'>Submit</span>}
                                    {loading && (
                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                            Please wait...
                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* end::Modal content */}
                </div>
                {/* end::Modal dialog */}
            </div>
            {/* begin::Modal Backdrop */}
            <div className='modal-backdrop fade show'></div>
            {/* end::Modal Backdrop */}
        </>
    )
}