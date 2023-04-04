/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { getUserByToken, loginUser } from '../core/_requests'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { useAuth } from '../core/Auth'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Toastify from 'toastify-js'
import { LoginModel } from '../core/_models'
import { TextInput } from '../../utils/forms'
import { HelmetSite } from '../../utils/helmet-site';
import { AlertDangerNotification } from '../../utils'

const schema = yup.object().shape({
  email: yup.string().email()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

export function Login() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const navigate = useNavigate();
  const { register, handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<LoginModel>({ resolver: yupResolver(schema), mode: "onChange" });

  // Functions
  const onSubmit = async (data: LoginModel) => {
    setLoading(true);
    setHasErrors(undefined)
    const { email, password } = data

    try {
      const response = await loginUser({ email, password })
      localStorage.setItem(
        String(process.env.REACT_APP_BASE_NAME_TOKEN),
        JSON.stringify(response?.data)
      );
      setHasErrors(false)
      setLoading(false)
      navigate(`/dashboard`, { replace: true });
      window.location.reload();
    } catch (error: any) {
      setHasErrors(true)
      setLoading(false)
      setHasErrors(error.response.data.message);
      setHasErrors(error.response.data.message);
      AlertDangerNotification({ text: 'An error has occurred.', className: 'info' })
    }
  }

  return (
    <>
      <HelmetSite title={`Sign in to your account`} />
      <form
        className='form w-100'
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        id='kt_login_signin_form'
      >
        {/* begin::Heading */}
        <div className='text-center mb-11'>
          <h1 className='text-dark fw-bolder mb-3'>Sign In</h1>
          <div className='text-gray-500 fw-semibold fs-6'>Your Social Campaigns</div>
        </div>
        {/* begin::Heading */}

        {hasErrors && (
          <div className="text-center alert alert-danger">
            <div className="d-flex flex-column">
              <h4 className="mb-1 text-danger">Error</h4>
              <span>{hasErrors}</span>
            </div>
          </div>
        )}

        {/* begin::Form group */}
        <div className='fv-row mb-8'>
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
        <div className='fv-row mb-3'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Password"
            register={register}
            errors={errors}
            name="password"
            type={'password'}
            autoComplete="off"
            placeholder={'Password'}
            validation={{ required: true }}
            isRequired={true}
            required="required"
          />
        </div>
        {/* end::Form group */}

        {/* begin::Wrapper */}
        <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
          <div />

          {/* begin::Link */}
          <Link to='/forgot-password' className='link-primary'>
            Forgot Password ?
          </Link>
          {/* end::Link */}
        </div>
        {/* end::Wrapper */}

        {/* begin::Action */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
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
        </div>
        {/* end::Action */}

        <div className='text-gray-500 text-center fw-semibold fs-6'>
          Not a Member yet?{' '}
          <Link to='/registration' className='link-primary'>
            Sign up
          </Link>
        </div>
      </form>
    </>
  )
}
