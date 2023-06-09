import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import dayjs from 'dayjs';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from '../../utils/forms';
import { TextareaInput } from '../../utils/forms/TextareaInput';
import { CreateOrUpdateOneDiscountMutation, DiscountRequestModel } from '../core/_models';
import { AlertDangerNotification, AlertSuccessNotification } from '../../utils';
import DatePicker from 'react-datepicker';

interface Props {
  setOpenCreateOrUpdateModal: any,
  discount?: any
}

const schema = yup.object({
  name: yup.string().min(3, 'Minimum 3 symbols').required(),
  startedAt: yup.date().min(new Date(), 'Please choose future date').required(),
  expiredAt: yup.date().min(yup.ref("startedAt"), "End date has to be more than start date").required(),
});

export const DiscountsCreateFormModal: React.FC<Props> = ({ setOpenCreateOrUpdateModal, discount }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { control, register, handleSubmit, setValue, reset,
    formState: { errors, isDirty, isValid }
  } = useForm<DiscountRequestModel>({ resolver: yupResolver(schema), mode: "onChange" });


  useEffect(() => {
    if (discount) {
      const fields = ['name', 'expiredAt', 'startedAt', 'percent', 'description'];
      fields?.forEach((field: any) => setValue(field, discount[field]));
    }
  }, [discount, setValue]);

  const saveMutation = CreateOrUpdateOneDiscountMutation({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false)
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    }
  });


  const onSubmit = async (data: DiscountRequestModel) => {
    setLoading(true);
    setHasErrors(undefined)
    try {
      await saveMutation.mutateAsync({ ...data, discountId: discount?.id })
      if (!discount) { reset() }
      AlertSuccessNotification({
        text: 'Discount save successfully',
        className: 'info',
        position: 'center',
      })
    } catch (error: any) {
      AlertDangerNotification({ text: `${error?.response?.data?.message}`, className: 'info', position: 'center' })
    }

  };

  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered mw-700px'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className="modal-header pb-0 border-0 justify-content-end">
              <div onClick={() => { setOpenCreateOrUpdateModal(false) }} className="btn btn-icon btn-sm btn-active-light-primary ms-2">
                <KTSVG
                  path="/media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            {/* begin::Modal body */}
            <div className="mx-5 mx-xl-18 pt-0 pb-15">
              <div className="mb-13 text-center">
                <h1 className="mb-3">{discount?.id ? `${discount?.name || ''}` : 'Create Discount'}</h1>
                {hasErrors && (
                  <div className="text-center alert alert-danger">
                    <div className="d-flex flex-column">
                      <h4 className="mb-1 text-danger">Error</h4>
                      <span>{hasErrors}</span>
                    </div>
                  </div>
                )}
              </div>
              <form className="w-100 position-relative mb-5" onSubmit={handleSubmit(onSubmit)}>

                <div className="row mb-6">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Name"
                      register={register}
                      errors={errors}
                      inputName={'name'}
                      type="text"
                      autoComplete="off"
                      placeholder="Enter name"
                      validation={{ required: true }}
                      required="required"
                      isRequired={true}
                    />
                  </div>
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Percent %"
                      register={register}
                      errors={errors}
                      inputName="percent"
                      type="number"
                      pattern="[0-9]*"
                      min="1"
                      step="1"
                      isNumber={true}
                      inputMode="numeric"
                      autoComplete="off"
                      placeholder="Percent coupon %"
                      validation={{ required: true }}
                      required="required"
                      isRequired={true}
                    />
                  </div>
                </div>

                <div className="row mb-6">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label htmlFor='startedAt' className="form-label fw-bolder text-dark fs-6 mb-2">
                      <span className={'required'}>Started date</span>
                    </label>
                    <Controller
                      name={"startedAt"}
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            onChange={onChange}
                            className="form-control"
                            locale="it-IT"
                            minDate={new Date()}
                            isClearable={true}
                            // withPortal
                            selected={value ? dayjs(value).toDate() : null}
                            placeholderText="Enter started date"
                          />
                        );
                      }}
                    />
                    {errors?.startedAt && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors?.startedAt?.message}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <label htmlFor='expiredAt' className="form-label fw-bolder text-dark fs-6 mb-2">
                      <span className={'required'}>Expired date</span>
                    </label>
                    <Controller
                      name={"expiredAt"}
                      control={control}
                      render={({ field: { onChange, value } }) => {
                        return (
                          <DatePicker
                            dateFormat="dd/MM/yyyy"
                            onChange={onChange}
                            className="form-control"
                            locale="it-IT"
                            minDate={new Date()}
                            isClearable={true}
                            // withPortal
                            selected={value ? dayjs(value).toDate() : null}
                            placeholderText="Enter expired date"
                          />
                        );
                      }}
                    />
                    {errors?.expiredAt && (
                      <strong className='fv-plugins-message-container text-danger'>
                        <div className='fv-help-block'>
                          <span role='alert'>{errors?.expiredAt?.message}</span>
                        </div>
                      </strong>
                    )}
                  </div>
                </div>

                <div className="d-flex flex-column mb-6">
                  <TextareaInput
                    label="Description"
                    className="form-control"
                    register={register}
                    errors={errors}
                    inputName="description"
                    rows={2}
                    placeholder="Description (optional)"
                    validation={{ required: false }}
                  />
                </div>
                <div className="text-center">
                  <button type="button" onClick={() => { setOpenCreateOrUpdateModal(false) }} className="btn btn-light me-3">Close</button>
                  <button type='submit' className='btn btn-lg btn-primary fw-bolder'
                    disabled={!isDirty || !isValid || loading}
                  >
                    {!loading && <span className='indicator-label'>Save</span>}
                    {loading && (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Please wait...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
                <div>
                </div>
              </form>
            </div>
            {/* end::Modal body */}
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
