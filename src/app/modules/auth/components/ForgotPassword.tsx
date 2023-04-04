import { useState } from 'react'
import { Link } from 'react-router-dom'
import { requestPassword } from '../core/_requests'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toastify from 'toastify-js'
import { LoginModel } from '../core/_models'
import { TextInput } from '../../utils/forms'
import { HelmetSite } from '../../utils/helmet-site';
import { AlertDangerNotification, AlertSuccessNotification } from '../../utils';

const schema = yup.object().shape({
  email: yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const [hasSuccess, setHasSuccess] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, reset,
    formState: { errors, isDirty, isValid }
  } = useForm<{ email: string }>({ resolver: yupResolver(schema), mode: "onChange" });

  // Functions
  const onSubmit = async (data: { email: string }) => {
    setLoading(true);
    setHasErrors(undefined)
    setHasSuccess(undefined)
    const { email } = data

    try {
      const response = await requestPassword({ email })
      setHasErrors(false)
      setLoading(false)
      reset()
      AlertSuccessNotification({ text: response.data, position: 'center', className: 'info' })
    } catch (error: any) {
      setHasErrors(true)
      setLoading(false)
      setHasErrors(error.response.data.message);
      AlertDangerNotification({ text: 'An error has occurred.', className: 'info' })
    }
  }

  return (
    <>
      <HelmetSite title={`Forgot password`} />
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_password_reset_form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='text-center mb-10'>
          {/* begin::Title */}
          <h1 className='text-dark fw-bolder mb-3'>Forgot Password ?</h1>
          {/* end::Title */}

          {/* begin::Link */}
          <div className='text-gray-500 fw-semibold fs-6'>
            Enter your email to reset your password.
          </div>
          {/* end::Link */}
        </div>

        {/* begin::Title */}
        {hasErrors === true && (
          <div className='mb-lg-15 alert alert-danger'>
            <div className='alert-text font-weight-bold'>
              Sorry, looks like there are some errors detected, please try again.
            </div>
          </div>
        )}

        {hasErrors === false && (
          <div className='mb-10 bg-light-info p-8 rounded'>
            <div className='text-info'>Sent password reset. Please check your email</div>
          </div>
        )}
        {/* end::Title */}

        {/* begin::Form group */}
        <div className='fv-row mb-8'>
          {/* <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label> */}
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Email"
            register={register}
            errors={errors}
            name="email"
            type="email"
            autoComplete="off"
            placeholder={'Email address'}
            validation={{ required: true }}
            isRequired={true}
            required="required"
          />
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='d-flex flex-wrap justify-content-center pb-lg-0'>
          <button
            type='submit'
            id='kt_password_reset_submit'
            className='btn btn-primary me-4'
            disabled={loading}
          >
            {!loading && <span className='indicator-label'>Continue</span>}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
          <Link to='/login'>
            <button
              type='button'
              id='kt_login_password_reset_form_cancel_button'
              className='btn btn-light'
              disabled={!isValid || loading}
            >
              Cancel
            </button>
          </Link>{' '}
        </div>
        {/* end::Form group */}
      </form>
    </>
  )
}
