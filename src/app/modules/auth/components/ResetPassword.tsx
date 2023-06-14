import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AlertDangerNotification, AlertSuccessNotification, HelmetSite } from '../../utils';
import { TextInput } from '../../utils/forms';
import { ResetPasswordModel } from '../core/_models';
import { resetPassword } from '../core/_requests';


const schema = yup
    .object({
        password: yup.string().min(8).max(200).required(),
        passwordConfirm: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match').required()
    })
    .required();

export function ResetPassword() {
    const { token } = useParams<string>()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [hasSuccess, setHasSuccess] = useState<boolean | string | undefined>(undefined)
    const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
    const { register, handleSubmit,
        formState: { errors, isSubmitted, isDirty, isValid }
    } = useForm<ResetPasswordModel>({ resolver: yupResolver(schema), mode: "onChange" });


    const onSubmit = async (data: ResetPasswordModel) => {
        setLoading(true);
        setHasErrors(undefined)
        setHasSuccess(undefined)
        const { password, passwordConfirm } = data
        try {
            const response = await resetPassword({ password, passwordConfirm, token })
            setHasErrors(false)
            setLoading(false)
            navigate(`/login`, { replace: true });
            AlertSuccessNotification({ text: response.data, position: 'center', className: 'info' })
        } catch (error: any) {
            setHasErrors(true)
            setLoading(false)
            setHasErrors(error.response.data.message);
            AlertDangerNotification({ text: 'An error has occurred.', className: 'info', position: 'center' })
        }

    };

    return (
        <>
            <HelmetSite title={`Reset password`} />
            <form
                className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
                noValidate
                id='kt_login_password_reset_form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className='text-center mb-10'>
                    {/* begin::Title */}
                    <h1 className='text-dark mb-3'>Reset Password</h1>
                    {/* end::Title */}
                </div>

                {/* begin::Title */}
                {hasErrors && (
                    <div className='mb-lg-15 alert alert-danger text-center'>
                        <div className='alert-text font-weight-bold'>
                            Sorry, looks like there are some errors detected, please try again.
                        </div>
                    </div>
                )}

                {hasErrors === false && (
                    <div className='mb-10 bg-light-info p-8 rounded'>
                        <div className='text-info'>Password reset.</div>
                    </div>
                )}
                {/* end::Title */}

                {/* begin::Form group */}
                <div className='fv-row mb-10'>
                    <TextInput
                        className="form-control form-control-lg"
                        labelFlex="New Password"
                        register={register}
                        errors={errors}
                        inputName="password"
                        type="password"
                        autoComplete="off"
                        placeholder="Enter your password"
                        validation={{ required: true }}
                        isRequired={true}
                        required="required"
                    />
                </div>
                <div className='fv-row mb-10'>
                    <TextInput
                        className="form-control form-control-lg"
                        labelFlex="Confirm Password"
                        register={register}
                        errors={errors}
                        inputName="passwordConfirm"
                        type="password"
                        autoComplete="off"
                        placeholder="Confirm your password"
                        validation={{ required: true }}
                        isRequired={true}
                        required="required"
                    />
                </div>
                {/* end::Form group */}

                {/* begin::Form group */}
                <div className='text-center'>
                    <button
                        type='submit'
                        id='kt_sign_in_submit'
                        className='btn btn-lg btn-primary w-100 mb-5'
                        disabled={loading || !isDirty || !isValid}
                    >
                        {!loading && <span className='indicator-label'>Reset password</span>}
                        {loading && (
                            <span className='indicator-progress' style={{ display: 'block' }}>
                                Please wait...
                                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                            </span>
                        )}
                    </button>
                </div>
                {/* end::Form group */}
            </form>
        </>
    )
}