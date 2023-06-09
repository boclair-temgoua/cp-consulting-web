/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect, FC } from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from 'react-intl';
import { useAuth } from '../../auth';
import { TextInput } from '../../utils/forms';
import { OrganizationRequestModel } from '../core/_models';
import { AlertDangerNotification, AlertSuccessNotification } from '../../utils';
import { updateOneOrganization } from '../core/_requests';

const schema = yup.object().shape({
  email: yup.string()
    .email()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  name: yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
})

const OrganizationSettingCard: FC<{ organization: any }> = ({ organization }) => {
  const intl = useIntl()
  const userItem = useAuth();
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const [showForm, setShowForm] = useState<boolean>(false)
  const { register, setValue, handleSubmit,
    formState: { errors, isValid }
  } = useForm<OrganizationRequestModel>({ resolver: yupResolver(schema), mode: "onChange" });


  useEffect(() => {
    if (organization) {
      const fields = ['name', 'email', 'phone', 'firstAddress', 'secondAddress'];
      fields?.forEach((field: any) => setValue(field, organization[field]));
    }
  }, [organization, setValue]);

  const onSubmit = async (data: OrganizationRequestModel) => {
    setLoading(true);
    setHasErrors(undefined)

    try {
      const response = await updateOneOrganization({ ...data, organizationId: organization?.id })
      setHasErrors(false)
      setLoading(false)
      AlertSuccessNotification({ text: response.data, position: 'center', className: 'info' })
    } catch (error: any) {
      setHasErrors(true)
      setLoading(false)
      setHasErrors(error.response.data.message);
      AlertDangerNotification({ text: 'An error has occurred.', className: 'info', position: 'center' })
    }
  }

  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Organization Details</h3>
        </div>
      </div>

      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>

          <div className='d-flex flex-wrap align-items-center'>
            <div id='kt_signin_email' className={' ' + (showForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>Name</div>
              <div className='fw-bold text-gray-600'>{organization?.name}</div>
            </div>

            <div
              id='kt_signin_email_edit'
              className={'flex-row-fluid ' + (!showForm && 'd-none')}
            >

              {hasErrors && (
                <div className="text-center alert alert-danger">
                  <div className="d-flex flex-column">
                    <h4 className="mb-1 text-danger">Error</h4>
                    <span>{hasErrors}</span>
                  </div>
                </div>
              )}

              <form
                id='kt_signin_change_email'
                className='form'
                noValidate
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className='row mb-6'>
                  <div className='col-lg-6 mb-4 mb-lg-0'>
                    <div className='fv-row mb-0'>
                      <TextInput
                        className="form-control form-control-lg"
                        labelFlex="Name"
                        register={register}
                        errors={errors}
                        inputName="name"
                        type="text"
                        autoComplete="one"
                        placeholder="Enter name"
                        validation={{ required: true }}
                        required="required"
                        isRequired={true}
                      />
                    </div>
                  </div>
                  <div className='col-lg-6 mb-4 mb-lg-0'>
                    <div className='fv-row mb-0'>
                      <TextInput
                        className="form-control form-control-lg"
                        labelFlex="Phone number"
                        register={register}
                        errors={errors}
                        inputName="phone"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter phone"
                        validation={{ required: false }}
                        isRequired={false}
                      />
                    </div>
                  </div>
                </div>
                <div className='row mb-6'>
                  <div className='col-lg-4 mb-4 mb-lg-0'>
                    <div className='fv-row mb-0'>
                      <TextInput
                        className="form-control form-control-lg"
                        labelFlex="Name"
                        register={register}
                        errors={errors}
                        inputName="email"
                        type="email"
                        autoComplete="one"
                        placeholder="Enter email"
                        validation={{ required: true }}
                        required="required"
                        isRequired={true}
                      />
                    </div>
                  </div>
                  <div className='col-lg-4 mb-4 mb-lg-0'>
                    <div className='fv-row mb-0'>
                      <TextInput
                        className="form-control form-control-lg"
                        labelFlex="First address"
                        register={register}
                        errors={errors}
                        inputName="firstAddress"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter first address"
                        validation={{ required: false }}
                        isRequired={false}
                      />
                    </div>
                  </div>
                  <div className='col-lg-4 mb-4 mb-lg-0'>
                    <div className='fv-row mb-0'>
                      <TextInput
                        className="form-control form-control-lg"
                        labelFlex="Second address"
                        register={register}
                        errors={errors}
                        inputName="secondAddress"
                        type="text"
                        autoComplete="off"
                        placeholder="Enter second address"
                        validation={{ required: false }}
                        isRequired={false}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className='row mb-6'>
                  {currencies?.length > 0 && (
                    <div className='col-lg-6 mb-4 mb-lg-0'>
                      <div className='fv-row mb-0'>
                        <SelectCurrencyInput
                          firstOptionName="Choose value"
                          dataItem={currencies}
                          isValueInt={true}
                          className="form-control form-select select2-hidden-accessible"
                          labelFlex="Currency"
                          register={register}
                          errors={errors}
                          name="currencyId"
                          validation={{ required: false }}
                          isRequired={false}
                        />
                      </div>
                    </div>
                  )}
                  <div className='col-lg-6'>
                    <div className='fv-row mb-0'>
                      <TextInput
                        className="form-control form-control-lg"
                        labelFlex="Url site"
                        register={register}
                        errors={errors}
                        inputName="url"
                        type="url"
                        autoComplete="one"
                        placeholder="Url site"
                        validation={{ required: false }}
                        isRequired={false}
                      />
                    </div>
                  </div>
                </div> */}

                <div className='card-footer d-flex justify-content-end py-6 px-9'>
                  <button id='kt_password_cancel' type='button'
                    className='btn btn-white btn-active-light-primary me-2'
                    onClick={() => { setShowForm(false) }}>
                    Cancel
                  </button>
                  <button type='submit' className='btn btn-primary me-2' disabled={!isValid || loading}>
                    {!loading && 'Save Changes'}
                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Please wait...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>

              </form>
            </div>

            <div id='kt_signin_email_button' className={'ms-auto ' + (showForm && 'd-none')}>
              <button
                onClick={() => {
                  setShowForm(true)
                }}
                className='btn btn-light btn-active-light-primary'
              >
                Edit Organization
              </button>
            </div>
          </div>

          <div className='separator separator-dashed my-6'></div>

        </div>
      </div>
    </div>
  )
}

export { OrganizationSettingCard }
