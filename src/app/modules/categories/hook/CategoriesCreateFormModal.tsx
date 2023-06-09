import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'


import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from '../../utils/forms';
import { TextareaInput } from '../../utils/forms/TextareaInput';
import { CreateOrUpdateOneCategoryMutation, CategoryRequestModel } from '../core/_models';
import { AlertDangerNotification, AlertSuccessNotification } from '../../utils';
import { CategoryModel } from '../core/_models';

interface Props {
  setOpenCreateOrUpdateModal: any,
  category?: any
}

const schema = yup.object({
  name: yup.string().min(3, 'Minimum 3 symbols').required(),
});

export const CategoriesCreateFormModal: React.FC<Props> = ({ setOpenCreateOrUpdateModal, category }) => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { register, handleSubmit, setValue, reset,
    formState: { errors, isDirty, isValid }
  } = useForm<CategoryRequestModel>({ resolver: yupResolver(schema), mode: "onChange" });


  useEffect(() => {
    if (category) {
      const fields = ['name', 'description', 'organizationId'];
      fields?.forEach((field: any) => setValue(field, category[field]));
    }
  }, [category, setValue]);

  const saveMutation = CreateOrUpdateOneCategoryMutation({
    onSuccess: () => {
      setHasErrors(false);
      setLoading(false)
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    }
  });


  const onSubmit = async (data: CategoryRequestModel) => {
    setLoading(true);
    setHasErrors(undefined)
    try {
      await saveMutation.mutateAsync({ ...data, categoryId: category?.id })
      if (!category) { reset() }
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
        <div className='modal-dialog modal-dialog-centered mw-500px'>
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
                <h1 className="mb-3">{category?.id ? `${category?.name || ''}` : 'Create Category'}</h1>
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

                <div className="d-flex flex-column mb-6">
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
                    isRequired={true}
                  />
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
