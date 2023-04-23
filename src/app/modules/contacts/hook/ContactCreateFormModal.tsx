import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'


import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from '../../utils/forms';
import { TextareaInput } from '../../utils/forms/TextareaInput';
import { ContactRequestModel, CreateOrUpdateOneContactMutation } from '../core/_models';
import { AlertDangerNotification, AlertSuccessNotification } from '../../utils';
import { ContactModel } from '../core/_models';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesBy } from '../../categories/core/_requests';
import { SelectValueNameInput } from '../../utils/forms/SelectValueNameInput';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllCategories } from '../../../redux/actions/category.action';

interface Props {
  setOpenCreateOrUpdateModal: any,
  contact?: any
  organizationId: string
}

const schema = yup.object({
  firstName: yup.string().min(3, 'Minimum 3 symbols').required(),
  lastName: yup.string().min(3, 'Minimum 3 symbols').required(),
  categoryId: yup.string().required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
});

export const ContactCreateFormModal: React.FC<Props> = ({ setOpenCreateOrUpdateModal, contact, organizationId }) => {
  // const [categories, setCategories] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, setValue, reset,
    formState: { errors }
  } = useForm<ContactRequestModel>({ resolver: yupResolver(schema), mode: "onChange" });
  const dispatch = useDispatch<any>()

  useEffect(() => {
    if (contact) {
      const fields = [
        'firstName',
        'lastName',
        'email',
        'address',
        'phone',
        'otherPhone',
        'organizationId',
        'projectId',
        'categoryId',
        'description'
      ];
      fields?.forEach((field: any) => setValue(field, contact[field]));
    }
  }, [contact, setValue]);

  useEffect(() => {
    const loadItems = async () => {
      await dispatch(loadAllCategories({
        take: 10,
        page: 1,
        sort: 'DESC',
        is_paginate: false,
        organizationId: String(organizationId),
      }))
    }
    loadItems()
  }, [organizationId, dispatch])
  const { categories } = useSelector((state: any) => state?.categories)

  const saveMutation = CreateOrUpdateOneContactMutation({
    onSuccess: () => {
      setHasErrors(false);
      if (!contact) { reset() }
      setLoading(false)
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    }
  });

  const onSubmit = async (data: ContactRequestModel) => {
    setLoading(true);
    setHasErrors(undefined)
    try {
      await saveMutation.mutateAsync({ ...data, contactId: contact?.id, organizationId })
      AlertSuccessNotification({
        text: 'Contact save successfully',
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
        <div className='modal-dialog modal-dialog-centered mw-650px'>
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
                <h1 className="mb-3">{contact?.id ? `${contact?.firstName} ${contact?.lastName}` : 'Create Contact'}</h1>
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

                <div className="row mb-5">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="First name"
                      register={register}
                      errors={errors}
                      inputName={'firstName'}
                      type="text"
                      autoComplete="off"
                      placeholder="First name"
                      validation={{ required: true }}
                      isRequired={true}
                    />
                  </div>

                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Last name"
                      register={register}
                      errors={errors}
                      inputName={'lastName'}
                      type="text"
                      autoComplete="off"
                      placeholder="Last name"
                      validation={{ required: true }}
                      isRequired={true}
                    />
                  </div>
                </div>

                <div className="d-flex flex-column mb-6">
                  <TextInput
                    className="form-control form-control-lg"
                    labelFlex="Email"
                    register={register}
                    errors={errors}
                    inputName={'email'}
                    type="email"
                    autoComplete="off"
                    placeholder="Email address"
                    validation={{ required: true }}
                    isRequired={true}
                  />
                </div>

                <div className="d-flex flex-column mb-6">
                  <TextInput
                    className="form-control form-control-lg"
                    labelFlex="Address"
                    register={register}
                    errors={errors}
                    inputName={'address'}
                    type="text"
                    autoComplete="off"
                    placeholder="Address"
                    validation={{ required: true }}
                    isRequired={true}
                  />
                </div>
                <div className="row mb-5">
                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Phone"
                      register={register}
                      errors={errors}
                      inputName={'phone'}
                      type="text"
                      autoComplete="off"
                      placeholder="Phone"
                      validation={{ required: true }}
                      isRequired={true}
                    />
                  </div>

                  <div className="col-md-6 fv-row fv-plugins-icon-container">
                    <TextInput
                      className="form-control form-control-lg"
                      labelFlex="Other phone"
                      register={register}
                      errors={errors}
                      inputName={'otherPhone'}
                      type="text"
                      autoComplete="off"
                      placeholder="Other phone"
                      validation={{ required: false }}
                      isRequired={false}
                    />
                  </div>
                </div>


                <div className="d-flex flex-column mb-6">
                  <SelectValueNameInput
                    dataItem={categories}
                    className="form-control"
                    labelFlex="Category"
                    register={register}
                    errors={errors}
                    inputName="categoryId"
                    validation={{ required: true }}
                    isRequired={true}
                    isValueInt={true}
                    required="required"
                  />
                  <small className="text-muted fw-semibold fs-5">
                    Categories don't exist? <a href="#" className="fw-bold link-primary">Create</a>.
                  </small>
                </div>

                <div className="d-flex flex-column mb-6">
                  <TextareaInput
                    label="Description"
                    className="form-control"
                    register={register}
                    errors={errors}
                    inputName="description"
                    rows={2}
                    placeholder="Description coupon (optional)"
                    validation={{ required: false }}
                  />
                </div>

                <div className="text-center">
                  <button type="button" onClick={() => { setOpenCreateOrUpdateModal(false) }} className="btn btn-light me-3">Close</button>
                  <button type='submit' className='btn btn-lg btn-primary fw-bolder'
                    disabled={loading}
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
