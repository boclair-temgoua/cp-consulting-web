import { FC, createRef, useCallback, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { AlertDangerNotification, AlertSuccessNotification, HelmetSite } from '../utils'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getOnePost } from './core/_requests'
import { KTSVG } from '../../../_metronic/helpers'
import ReactQuill, { Quill } from 'react-quill'
import { CreateOrUpdateOnePostMutation, PostRequestModel } from './core/_models'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form"
import { TextInput } from '../utils/forms'
const mainRef = createRef<ReactQuill>();

const schema = yup.object({
  title: yup.string().min(3, 'Minimum 3 symbols').required(),
  description: yup.string().min(10, 'Minimum 3 symbols').required(),
});

const PostPageWrapperCreateOrUpdate: FC = () => {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | string | undefined>(undefined)
  const { control, setValue, register, handleSubmit, reset,
    formState: { errors, isDirty, isValid }
  } = useForm<PostRequestModel>({ resolver: yupResolver(schema), mode: "onChange" });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams()
  const takeValue: number = 6
  const { groupId } = useParams<string>()
  const { postId } = useParams<string>()

  const fetchOnePost = async () => await getOnePost({ postId: String(postId) })
  const {
    data: postItem,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchOnePost(),
    enabled: Boolean(postId),
  })

  const saveMutation = CreateOrUpdateOnePostMutation({
    onSuccess: () => {
      setHasErrors(false);
      // if (!postItem) { reset() }
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
      await saveMutation.mutateAsync({ ...data, groupId, postId: postItem?.data?.id })
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
      <HelmetSite title={`${postItem?.data?.title || 'Post'}`} />
      <PageTitle
        breadcrumbs={[
          {
            title: `${postItem?.data?.title || 'Group'} |`,
            path: `/posts/${postId}`,
            isSeparator: false,
            isActive: false,
          },
        ]}
      >
        Group
      </PageTitle>

      <a href="#back" className='btn-flex btn-light-primary fw-bolder'
        onClick={() => { navigate(-1) }} style={{ cursor: 'pointer' }}>
        <KTSVG path='/media/icons/duotune/arrows/arr063.svg' className='svg-icon-2' />
      </a>
      <a href="#next" className='btn-flex btn-light-primary fw-bolder'
        onClick={() => { navigate(1) }} style={{ cursor: 'pointer' }}>
        <KTSVG path='/media/icons/duotune/arrows/arr001.svg' className='svg-icon-2' />
      </a>


      <div className="mb-5 mb-xl-8 ">

        <form className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework" onSubmit={handleSubmit(onSubmit)}>

          {/* <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">

            <div className="card card-flush py-4">
              <div className="card-header">
                <div className="card-title">
                  <h2>Details</h2>
                </div>
              </div>

              <div className="card-body pt-0">
                <label className="form-label">Categories</label>
                <select className="form-select mb-2 select2-hidden-accessible">
                  <option disabled>Choose category</option>
                  <option value="Computers">Computers</option>
                  <option value="Watches">Watches</option>
                  <option value="Headphones">Headphones</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Cameras">Cameras</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Household">Household</option>
                  <option value="Wines">Wines</option>
                  <option value="Sandals">Sandals</option>
                </select>
                <span className="select2 select2-container select2-container--bootstrap5" dir="ltr" data-select2-id="select2-data-13-sy8p">
                  <span className="selection">
                    <span className="select2-selection select2-selection--multiple form-select mb-2" role="combobox" aria-haspopup="true" aria-expanded="false">
                      <ul className="select2-selection__rendered" id="select2-auqo-container">
                      </ul>
                      <span className="select2-search select2-search--inline">
                        <textarea className="select2-search__field" placeholder="Select an option">

                        </textarea>
                      </span>
                    </span>
                  </span>
                </span>

                <div className="text-muted fs-7 mb-7">Add product to a category.</div>
                <a href="/metronic8/demo1/../demo1/apps/ecommerce/catalog/add-category.html" className="btn btn-light-primary btn-sm mb-10">
                  <i className="ki-duotone ki-plus fs-2"></i>            Create new category
                </a>

              </div>
            </div>

          </div> */}

          <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <div className="d-flex flex-column gap-7 gap-lg-10">


                    <div className="card card-flush py-4">
                      <div className="card-body pt-0">
                        <div className="d-flex flex-column mb-6">
                          <TextInput
                            className="form-control form-control-lg"
                            labelFlex="Title"
                            register={register}
                            errors={errors}
                            inputName={'title'}
                            type="text"
                            autoComplete="one"
                            placeholder="Enter title"
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button onClick={() => navigate(-1)} id="kt_ecommerce_add_product_cancel" className="btn btn-sm btn-light me-5">
                  Cancel
                </button>
                <button type='submit' className='btn btn-lg btn-primary btn-sm fw-bolder'
                  disabled={!isDirty || !isValid || loading || saveMutation.isLoading}
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
            </div>
          </div>

        </form>

      </div>



    </>
  )
}

export default PostPageWrapperCreateOrUpdate
