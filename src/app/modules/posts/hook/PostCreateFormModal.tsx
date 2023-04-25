import { useEffect, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'


import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextInput } from '../../utils/forms';
import { AlertDangerNotification, AlertSuccessNotification } from '../../utils';
import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill'
import { CreateOrUpdateOnePostMutation, PostRequestModel } from '../core/_models';

interface Props {
  setOpenCreateOrUpdateModal: any,
  post?: any
  groupId: string
}

const schema = yup.object({
  title: yup.string().min(3, 'Minimum 3 symbols').required(),
  description: yup.string().min(10, 'Minimum 3 symbols').required(),
});

export const PostCreateFormModal: React.FC<Props> = ({ setOpenCreateOrUpdateModal, post, groupId }) => {
  // const [categories, setCategories] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { control, setValue, register, handleSubmit, reset,
    formState: { errors, isDirty, isValid }
  } = useForm<PostRequestModel>({ resolver: yupResolver(schema), mode: "onChange" });

  useEffect(() => {
    if (post) {
      const fields = ['title', 'description'];
      fields?.forEach((field: any) => setValue(field, post[field]));
    }
  }, [post, setValue]);

  const saveMutation = CreateOrUpdateOnePostMutation({
    onSuccess: () => {
      setHasErrors(false);
      if (!post) { reset() }
      setLoading(false)
    },
    onError: (error?: any) => {
      setHasErrors(true);
      setHasErrors(error.response.data.message);
    }
  });

  const onSubmit = async (data: PostRequestModel) => {
    setLoading(true);
    setHasErrors(undefined)
    try {
      await saveMutation.mutateAsync({ ...data, groupId, postId: post?.id })
      AlertSuccessNotification({
        text: 'Post save successfully',
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
        <div className='modal-dialog modal-dialog-centered mw-850px'>
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
            <div className="mx-5 mx-xl-18 pt-0 pb-8">
              <div className="mb-13 text-center">
                <h1 className="mb-3">{post?.id ? `${post?.title}` : 'Create Post'}</h1>
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
                    labelFlex="Title post"
                    register={register}
                    errors={errors}
                    inputName={'title'}
                    type="text"
                    autoComplete="off"
                    placeholder="Title post"
                    validation={{ required: true }}
                    isRequired={true}
                  />
                </div>



                <div className="d-flex flex-column mb-6">
                  <label htmlFor={'description'} className={`form-label fs-6 fw-bolder text-dark required `}>Description</label>
                  <Controller
                    name="description"
                    control={control}
                    rules={{
                      required: "Please enter post description"
                    }}
                    render={({ field }) => (
                      <ReactQuill
                        {...field}
                        theme="snow"
                        placeholder={"Write Description"}
                        modules={{
                          toolbar: {
                            container: [
                              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                              ['bold', 'italic', 'underline'],
                              [{ 'align': [] }],
                              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                              [{ 'color': [] }, { 'background': [] }],
                            ],
                          },
                        }}
                      />
                    )}
                  />
                  {errors.description && (
                    <span className='invalid-feedback'>
                      <strong>{errors.description?.message}</strong>
                    </span>
                  )}
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
