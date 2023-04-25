import React, { FC } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite } from '../utils'

const ProjectPageWrapperCreate: FC = () => {
  return (
    <>
      <HelmetSite title={`Projects Create`} />
      <PageTitle breadcrumbs={[]}>Projects create</PageTitle>


      <div className="mb-5 mb-xl-8">

        <form className="form d-flex flex-column flex-lg-row fv-plugins-bootstrap5 fv-plugins-framework">

          <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7 me-lg-10">

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
            <div className="card card-flush py-4">
              <div className="card-header">
                <div className="card-title">
                  <h2>Product Template</h2>
                </div>
              </div>
              <div className="card-body pt-0">
                <label className="form-label">Select a product template</label>

                <select className="form-select mb-2 select2-hidden-accessible" data-control="select2" data-hide-search="true" data-placeholder="Select an option" id="kt_ecommerce_add_product_store_template" data-select2-id="select2-data-kt_ecommerce_add_product_store_template" aria-hidden="true" data-kt-initialized="1">
                  <option></option>
                  <option value="default" data-select2-id="select2-data-15-gjg1">Default template</option>
                  <option value="electronics">Electronics</option>
                  <option value="office">Office stationary</option>
                  <option value="fashion">Fashion</option>
                </select><span className="select2 select2-container select2-container--bootstrap5" dir="ltr" data-select2-id="select2-data-14-7njd" ><span className="selection"><span className="select2-selection select2-selection--single form-select mb-2" role="combobox" aria-haspopup="true" aria-expanded="false" aria-disabled="false" aria-labelledby="select2-kt_ecommerce_add_product_store_template-container" aria-controls="select2-kt_ecommerce_add_product_store_template-container"><span className="select2-selection__rendered" id="select2-kt_ecommerce_add_product_store_template-container" role="textbox" aria-readonly="true" title="Default template">Default template</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>


                <div className="text-muted fs-7">Assign a template from your current theme to define how a single product is displayed.</div>
              </div>
            </div>


          </div>

          <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="kt_ecommerce_add_product_general">
                  <div className="d-flex flex-column gap-7 gap-lg-10">


                    <div className="card card-flush py-4">
                      <div className="card-header">
                        <div className="card-title">
                          <h2>General</h2>
                        </div>
                      </div>
                      <div className="card-body pt-0">
                        <div className="mb-10 fv-row fv-plugins-icon-container">
                          <label className="required form-label">Product Name</label>
                          <input type="text" name="product_name" className="form-control mb-2" placeholder="Product name" value="" />
                          <div className="text-muted fs-7">A product name is required and recommended to be unique.</div>

                          <div className="fv-plugins-message-container invalid-feedback"></div></div>


                      </div>
                    </div>
                    <div className="card card-flush py-4">
                      <div className="card-header">
                        <div className="card-title">
                          <h2>Media</h2>
                        </div>
                      </div>
                      <div className="card-body pt-0">
                        <div className="fv-row mb-2">
                          <div className="dropzone dz-clickable" id="kt_ecommerce_add_product_media">
                            <div className="dz-message needsclick">
                              <i className="ki-duotone ki-file-up text-primary fs-3x"><span className="path1"></span><span className="path2"></span></i>
                              <div className="ms-4">
                                <h3 className="fs-5 fw-bold text-gray-900 mb-1">Drop files here or click to upload.</h3>
                                <span className="fs-7 fw-semibold text-gray-400">Upload up to 10 files</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-muted fs-7">Set the product media gallery.</div>
                      </div>
                    </div>
                    <div className="card card-flush py-4">
                      <div className="card-header">
                        <div className="card-title">
                          <h2>Pricing</h2>
                        </div>
                      </div>
                      <div className="card-body pt-0">
                        <div className="mb-10 fv-row fv-plugins-icon-container">
                          <label className="required form-label">Base Price</label>

                          <input type="text" name="price" className="form-control mb-2" placeholder="Product price" value="" />

                          <div className="text-muted fs-7">Set the product price.</div>
                          <div className="fv-plugins-message-container invalid-feedback"></div></div>

                        <div className="fv-row mb-10">
                          <label className="fs-6 fw-semibold mb-2">
                            Discount Type


                            <span className="ms-1" >
                              <i className="ki-duotone ki-information-5 text-gray-500 fs-6">
                                <span className="path1"></span>
                                <span className="path2"></span>
                                <span className="path3"></span>
                              </i>
                            </span>
                          </label>

                          <div className="row row-cols-1 row-cols-md-3 row-cols-lg-1 row-cols-xl-3 g-9">

                            <div className="col">
                              <label className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6 active`}>
                                <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                  <input className="form-check-input" type="radio" name="discount_option" value="1" />
                                </span>
                                <span className="ms-5">
                                  <span className="fs-4 fw-bold text-gray-800 d-block">No Discount</span>
                                </span>
                              </label>
                            </div>

                            <div className="col">
                              <label className={`btn btn-outline btn-outline-dashed btn-active-light-primary  d-flex text-start p-6`}>
                                <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                  <input className="form-check-input" type="radio" name="discount_option" value="2" />
                                </span>
                                <span className="ms-5">
                                  <span className="fs-4 fw-bold text-gray-800 d-block">Percentage %</span>
                                </span>
                              </label>
                            </div>

                            

                            <div className="col">
                              <label className={`btn btn-outline btn-outline-dashed btn-active-light-primary d-flex text-start p-6`}>
                                <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                  <input className="form-check-input" type="radio" name="discount_option" value="3" />
                                </span>
                                <span className="ms-5">
                                  <span className="fs-4 fw-bold text-gray-800 d-block">Fixed Price</span>
                                </span>
                              </label>
                            </div>

                          </div>
                        </div>
                        <div className="d-none mb-10 fv-row" id="kt_ecommerce_add_product_discount_percentage">

                          <label className="form-label">Set Discount Percentage</label>


                          <div className="text-muted fs-7">Set a percentage discount to be applied on this product.</div>
                        </div>
                        <div className="d-none mb-10 fv-row" id="kt_ecommerce_add_product_discount_fixed">

                          <label className="form-label">Fixed Discounted Price</label>

                          <input type="text" name="dicsounted_price" className="form-control mb-2" placeholder="Discounted price" />

                          <div className="text-muted fs-7">Set the discounted product price. The product will be reduced at the determined fixed price</div>
                        </div>
                        <div className="d-flex flex-wrap gap-5">
                          <div className="fv-row w-100 flex-md-root fv-plugins-icon-container">
                            <label className="required form-label">Tax className</label>

                            <select className="form-select mb-2 select2-hidden-accessible" name="tax" data-control="select2" data-hide-search="true" data-placeholder="Select an option" data-select2-id="select2-data-16-w9ug" aria-hidden="true" data-kt-initialized="1">
                              <option data-select2-id="select2-data-18-mf43"></option>
                              <option value="0">Tax Free</option>
                              <option value="1">Taxable Goods</option>
                              <option value="2">Downloadable Product</option>
                            </select>

                            <div className="text-muted fs-7">Set the product tax className.</div>
                            <div className="fv-plugins-message-container invalid-feedback"></div></div>
                          <div className="fv-row w-100 flex-md-root">
                            <label className="form-label">VAT Amount (%)</label>
                            <input type="text" className="form-control mb-2" value="" />
                            <div className="text-muted fs-7">Set the product VAT about.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="tab-pane fade" id="kt_ecommerce_add_product_advanced" role="tab-panel">
                    <div className="d-flex flex-column gap-7 gap-lg-10">


                      <div className="card card-flush py-4">
                        <div className="card-header">
                          <div className="card-title">
                            <h2>Inventory</h2>
                          </div>
                        </div>
                        <div className="card-body pt-0">
                          <div className="mb-10 fv-row fv-plugins-icon-container">
                            <label className="required form-label">SKU</label>

                            <input type="text" name="sku" className="form-control mb-2" placeholder="SKU Number" value="" />

                            <div className="text-muted fs-7">Enter the product SKU.</div>
                            <div className="fv-plugins-message-container invalid-feedback"></div></div>

                          <div className="mb-10 fv-row fv-plugins-icon-container">
                            <label className="required form-label">Barcode</label>
                            <input type="text" name="sku" className="form-control mb-2" placeholder="Barcode Number" value="" />
                            <div className="text-muted fs-7">Enter the product barcode number.</div>
                            <div className="fv-plugins-message-container invalid-feedback"></div></div>
                          <div className="mb-10 fv-row fv-plugins-icon-container">
                            <label className="required form-label">Quantity</label>
                            <div className="d-flex gap-3">
                              <input type="number" name="shelf" className="form-control mb-2" placeholder="On shelf" value="" />
                              <input type="number" name="warehouse" className="form-control mb-2" placeholder="In warehouse" />
                            </div>
                            <div className="text-muted fs-7">Enter the product quantity.</div>
                            <div className="fv-plugins-message-container invalid-feedback"></div></div>
                          <div className="fv-row">
                            <label className="form-label">Allow Backorders</label>
                            <div className="form-check form-check-custom form-check-solid mb-2">
                              <input className="form-check-input" type="checkbox" value="" />
                              <label className="form-check-label">
                                Yes
                              </label>
                            </div>
                            <div className="text-muted fs-7">Allow customers to purchase products that are out of stock.</div>
                          </div>
                        </div>
                      </div>
                      <div className="card card-flush py-4">
                        <div className="card-header">
                          <div className="card-title">
                            <h2>Variations</h2>
                          </div>
                        </div>
                        <div className="card-body pt-0">
                          <div className="" data-kt-ecommerce-catalog-add-product="auto-options">
                            <label className="form-label">Add Product Variations</label>
                            <div id="kt_ecommerce_add_product_options">
                              <div className="form-group">
                                <div data-repeater-list="kt_ecommerce_add_product_options" className="d-flex flex-column gap-3">
                                  <div data-repeater-item="" className="form-group d-flex flex-wrap align-items-center gap-5">

                                    <div className="w-100 w-md-200px">
                                      <select className="form-select select2-hidden-accessible" name="kt_ecommerce_add_product_options[0][product_option]" data-placeholder="Select a variation" data-kt-ecommerce-catalog-add-product="product_option" data-select2-id="select2-data-127-i1p6" aria-hidden="true">
                                        <option data-select2-id="select2-data-129-8m3r"></option>
                                        <option value="color">Color</option>
                                        <option value="size">Size</option>
                                        <option value="material">Material</option>
                                        <option value="style">Style</option>
                                      </select><span className="select2 select2-container select2-container--bootstrap5" dir="ltr" data-select2-id="select2-data-128-qshp" ><span className="selection"><span className="select2-selection select2-selection--single form-select" role="combobox" aria-haspopup="true" aria-expanded="false" aria-disabled="false" aria-labelledby="select2-kt_ecommerce_add_product_options0product_option-kw-container" aria-controls="select2-kt_ecommerce_add_product_options0product_option-kw-container"><span className="select2-selection__rendered" id="select2-kt_ecommerce_add_product_options0product_option-kw-container" role="textbox" aria-readonly="true" title="Select a variation"><span className="select2-selection__placeholder">Select a variation</span></span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                    <input type="text" className="form-control mw-100 w-200px" name="kt_ecommerce_add_product_options[0][product_option_value]" placeholder="Variation" />

                                    <button type="button" data-repeater-delete="" className="btn btn-sm btn-icon btn-light-danger">
                                      <i className="ki-duotone ki-cross fs-1"><span className="path1"></span><span className="path2"></span></i>                            </button>
                                  </div>
                                </div>
                              </div>
                              <div className="form-group mt-5">
                                <button type="button" data-repeater-create="" className="btn btn-sm btn-light-primary">
                                  <i className="ki-duotone ki-plus fs-2"></i> Add another variation
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card card-flush py-4">
                        <div className="card-header">
                          <div className="card-title">
                            <h2>Shipping</h2>
                          </div>
                        </div>
                        <div className="card-body pt-0">
                          <div className="fv-row">
                            <div className="form-check form-check-custom form-check-solid mb-2">
                              <input className="form-check-input" type="checkbox" id="kt_ecommerce_add_product_shipping_checkbox" value="1" />
                              <label className="form-check-label">
                                This is a physical product
                              </label>
                            </div>
                            <div className="text-muted fs-7">Set if the product is a physical or digital item. Physical products may require shipping.</div>
                          </div>
                          <div id="kt_ecommerce_add_product_shipping" className="d-none mt-10">
                            <div className="mb-10 fv-row">
                              <label className="form-label">Weight</label>
                              <input type="text" name="weight" className="form-control mb-2" placeholder="Product weight" value="" />
                              <div className="text-muted fs-7">Set a product weight in kilograms (kg).</div>
                            </div>
                            <div className="fv-row">
                              <label className="form-label">Dimension</label>
                              <div className="d-flex flex-wrap flex-sm-nowrap gap-3">
                                <input type="number" name="width" className="form-control mb-2" placeholder="Width (w)" value="" />
                                <input type="number" name="height" className="form-control mb-2" placeholder="Height (h)" value="" />
                                <input type="number" name="length" className="form-control mb-2" placeholder="Lengtn (l)" value="" />
                              </div>
                              <div className="text-muted fs-7">Enter the product dimensions in centimeters (cm).</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card card-flush py-4">
                        <div className="card-header">
                          <div className="card-title">
                            <h2>Meta Options</h2>
                          </div>
                        </div>
                        <div className="card-body pt-0">
                          <div className="mb-10">
                            <label className="form-label">Meta Tag Title</label>

                            <input type="text" className="form-control mb-2" name="meta_title" placeholder="Meta tag name" />

                            <div className="text-muted fs-7">Set a meta tag title. Recommended to be simple and precise keywords.</div>
                          </div>
                          <div>
                            <label className="form-label">Meta Tag Keywords</label>
                            <input id="kt_ecommerce_add_product_meta_keywords" name="kt_ecommerce_add_product_meta_keywords" className="form-control mb-2" />
                            <div className="text-muted fs-7">Set a list of keywords that the product is related to. Separate the keywords by adding a comma <code>,</code> between each keyword.</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

              </div>

              <div className="d-flex justify-content-end">
                <a href="/metronic8/demo1/../demo1/apps/ecommerce/catalog/products.html" id="kt_ecommerce_add_product_cancel" className="btn btn-light me-5">
                  Cancel
                </a>
                <button type="submit" id="kt_ecommerce_add_product_submit" className="btn btn-primary">
                  <span className="indicator-label">
                    Save Changes
                  </span>
                  <span className="indicator-progress">
                    Please wait... <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>

      </div>

    </>
  )
}

export default ProjectPageWrapperCreate
