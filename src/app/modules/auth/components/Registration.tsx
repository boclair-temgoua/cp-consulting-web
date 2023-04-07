/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { registerApi } from '../api';
// import { RegisterModel } from '../core/_models';
import { useIntl } from 'react-intl';
import { AlertDangerNotification, HelmetSite } from '../../utils';
import { RegisterModel } from '../core/_models';
import { registerUser } from '../core/_requests';
import { TextInput } from '../../utils/forms/TextInput';


const schema = yup.object().shape({
  firstName: yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  lastName: yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  email: yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  password: yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  passwordConfirm: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match'),
  confirm: yup.boolean().oneOf([true], 'Please check the box to deactivate your account').required(),
})


export function Registration() {
  // eslint-disable-next-line no-restricted-globals
  //const { codeVoucher } = queryString.parse(location.search);
  const intl = useIntl()
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const navigate = useNavigate();
  const { register, handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<RegisterModel>({ resolver: yupResolver(schema), mode: "onChange" });

  // Functions
  const onSubmit = async (data: RegisterModel) => {
    setLoading(true);
    setHasErrors(undefined)
    const { email, firstName, lastName, password, passwordConfirm } = data
    try {
      await registerUser({ email, firstName, lastName, password, passwordConfirm })
      setHasErrors(false)
      setLoading(false)
      navigate(`/login`, { replace: true });
    } catch (error: any) {
      setHasErrors(true)
      setLoading(false)
      setHasErrors(error.response.data.message);
      AlertDangerNotification({ text: 'An error has occurred.', className: 'info', position: 'center' })
    }
  };


  return (
    <>
      <HelmetSite title={`Register`} />
      <form
        className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
        noValidate
        id='kt_login_signup_form'
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* begin::Heading */}
        <div className='mb-10 text-center'>
          {/* begin::Title */}
          <h1 className='text-dark mb-3'>Create an Account</h1>
          {/* end::Title */}

          {/* begin::Link */}
          {/* <div className='text-gray-400 fw-bold fs-4'>
            Already have an account?
            <Link to='/login' className='link-primary fw-bolder' style={{ marginLeft: '5px' }}>
              Login
            </Link>
          </div> */}
          {/* end::Link */}
        </div>
        {/* end::Heading */}

        {/* begin::Action */}
        {hasErrors && (
          <div className="text-center alert alert-danger">
            <div className="d-flex flex-column">
              <h4 className="mb-1 text-danger">Error</h4>
              <span>{hasErrors}</span>
            </div>
          </div>
        )}

        {/* begin::Form group Firstname */}
        <div className='fv-row mb-5'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="First name"
            register={register}
            errors={errors}
            name="firstName"
            type="text"
            autoComplete="one"
            placeholder="Enter first name"
            validation={{ required: true }}
            required="required"
            isRequired={true}
          />
        </div>
        <div className='fv-row mb-5'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Last name"
            register={register}
            errors={errors}
            name="lastName"
            type="text"
            autoComplete="one"
            placeholder="Enter last name"
            validation={{ required: true }}
            required="required"
            isRequired={true}
          />
        </div>
        {/* end::Form group */}

        {/* begin::Form group Email */}
        <div className='fv-row mb-5'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Email address"
            register={register}
            errors={errors}
            name="email"
            type="email"
            autoComplete="one"
            placeholder="Enter your email address"
            validation={{ required: true }}
            required="required"
            isRequired={true}
          />
        </div>
        {/* end::Form group */}
        <div className='fv-row mb-5'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Password"
            register={register}
            errors={errors}
            name="password"
            type="password"
            autoComplete="off"
            placeholder={intl.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
            validation={{ required: true }}
            isRequired={true}
            required="required"
          />
        </div>

        <div className='fv-row mb-5'>
          <TextInput
            className="form-control form-control-lg"
            labelFlex="Confirm password"
            register={register}
            errors={errors}
            name="passwordConfirm"
            type="password"
            autoComplete="off"
            placeholder={intl.formatMessage({ id: 'AUTH.INPUT.PASSWORD' })}
            validation={{ required: true }}
            isRequired={true}
            required="required"
          />
        </div>

        {/* begin::Form group */}
        <div className='fv-row mb-10'>
          <div className='form-check form-check-custom form-check-solid'>
            <input
              className='form-check-input'
              type='checkbox'
              id='confirm'
              {...register('confirm')}
            />
            <label
              className='form-check-label fw-bold text-gray-700 fs-6'
              htmlFor='kt_login_toc_agree'
            >
              I Agree the{' '}
              <Link to='/auth/terms' className='ms-1 link-primary'>
                terms and conditions
              </Link>
              .
            </label>
          </div>
          {errors?.confirm && (
            <div className='fv-plugins-message-container'>
              <div className='fv-help-block'>{errors.confirm?.message}</div>
            </div>
          )}
        </div>
        {/* end::Form group */}

        {/* begin::Form group */}
        <div className='text-center'>
          <button
            type='submit'
            id='kt_sign_in_submit'
            className='btn btn-lg btn-primary w-100 mb-5'
            disabled={!isDirty || !isValid || loading}
          >
            {!loading && <span className='indicator-label'>{intl.formatMessage({ id: 'AUTH.LOGIN.BUTTON' })}</span>}
            {loading && (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Please wait...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            )}
          </button>
        </div>
        <div className='text-gray-500 text-center fw-semibold fs-6'>
          Member yet?{' '}
          <Link to='/login' className='link-primary'>
            Sign in
          </Link>
        </div>
        {/* end::Form group */}
      </form>
    </>

  )
}