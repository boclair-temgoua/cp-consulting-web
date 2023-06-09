import axios from 'axios'

export interface ClientApiMethods {
  [key: string]: {
    endpoint: string
    method: string
  }
}

export type IntegrationApiCall = {
  action: string
  body?: Object
  urlParams?: Object
  queryParams?: Object
}

const user = JSON.parse(String(localStorage.getItem(String(process.env.REACT_APP_BASE_NAME_TOKEN))))

export const makeApiCall = async ({
  action,
  body,
  urlParams = {},
  queryParams = {},
}: IntegrationApiCall): Promise<any> => {
  const getURLEndpoint = (options: {endpoint: string; urlParams: any; queryParams: any}) => {
    const {endpoint, urlParams, queryParams} = options

    //replace params in url
    let url = endpoint
    if (urlParams) {
      Object.keys(urlParams).forEach((key: string) => {
        url = url.replace(`:${key}`, urlParams[key])
      })
    }

    //add query params
    if (queryParams) {
      url += '?'
      Object.keys(queryParams).forEach((key: string) => {
        if (queryParams[key]) {
          url += `${key}=${queryParams[key]}&`
        }
      })
      url = url.slice(0, -1)
    }

    return url
  }

  const url = getURLEndpoint({
    endpoint: apiEndpoints[action].endpoint,
    urlParams: urlParams,
    queryParams: queryParams,
  })

  axios.defaults.headers.common['Authorization'] = `${user && user ? user : {}}`
  const response = await axios.request({
    method: apiEndpoints[action].method,
    url: url,
    data: body,
  })

  return response
}

const POST = 'post'
const GET = 'get'
const DELETE = 'delete'
const PUT = 'put'

const baseUrl = process.env.REACT_APP_API_SERVER
export const apiEndpoints: ClientApiMethods = {
  loginUser: {
    endpoint: `${baseUrl}/login`,
    method: POST,
  },
  registerUser: {
    endpoint: `${baseUrl}/register`,
    method: POST,
  },
  passwordReset: {
    endpoint: `${baseUrl}/password/reset`,
    method: POST,
  },
  resetPassword: {
    endpoint: `${baseUrl}/password/update/:token`,
    method: PUT,
  },

  /************ Users routes **************/
  getOneUser: {
    endpoint: `${baseUrl}/users/show/:userId`,
    method: GET,
  },
  getUsers: {
    endpoint: `${baseUrl}/users`,
    method: GET,
  },

  /************ Categories routes **************/
  getCategoriesBy: {
    endpoint: `${baseUrl}/categories`,
    method: GET,
  },
  getOneCategory: {
    endpoint: `${baseUrl}/categories/show/:categoryId`,
    method: GET,
  },
  createOneCategory: {
    endpoint: `${baseUrl}/categories`,
    method: POST,
  },
  updateOneCategory: {
    endpoint: `${baseUrl}/categories/:categoryId`,
    method: PUT,
  },
  deleteOneCategory: {
    endpoint: `${baseUrl}/categories/delete/:categoryId`,
    method: DELETE,
  },

  /************ Discounts routes **************/
  getDiscountsBy: {
    endpoint: `${baseUrl}/discounts`,
    method: GET,
  },
  getOneDiscount: {
    endpoint: `${baseUrl}/discounts/show/:discountId`,
    method: GET,
  },
  createOneDiscount: {
    endpoint: `${baseUrl}/discounts`,
    method: POST,
  },
  updateOneDiscount: {
    endpoint: `${baseUrl}/discounts/:discountId`,
    method: PUT,
  },
  changeStatusOneDiscount: {
    endpoint: `${baseUrl}/discounts/status`,
    method: GET,
  },
  deleteOneDiscount: {
    endpoint: `${baseUrl}/discounts/:discountId`,
    method: DELETE,
  },

  /************ Organizations routes **************/
  getOrganizationsContributes: {
    endpoint: `${baseUrl}/organizations/contributes`,
    method: GET,
  },
  updateOneOrganization: {
    endpoint: `${baseUrl}/organizations/:organizationId`,
    method: PUT,
  },
  getOneOrganization: {
    endpoint: `${baseUrl}/organizations/show`,
    method: GET,
  },
  getOneContributor: {
    endpoint: `${baseUrl}/contributors/show/:organizationId`,
    method: GET,
  },
  getContributorsOrganization: {
    endpoint: `${baseUrl}/contributors/organization`,
    method: GET,
  },
  deleteOneContributor: {
    endpoint: `${baseUrl}/contributors/delete/:contributorId`,
    method: DELETE,
  },
  getProjectsContributes: {
    endpoint: `${baseUrl}/projects/contributes`,
    method: GET,
  },
  createOneContributorOrganization: {
    endpoint: `${baseUrl}/contributors/organization`,
    method: POST,
  },
  getPostsBy: {
    endpoint: `${baseUrl}/posts`,
    method: GET,
  },
  getOnePost: {
    endpoint: `${baseUrl}/posts/show`,
    method: GET,
  },
  createOnePost: {
    endpoint: `${baseUrl}/posts`,
    method: POST,
  },
  updateOnePost: {
    endpoint: `${baseUrl}/posts/:postId`,
    method: PUT,
  },
  deleteOnePost: {
    endpoint: `${baseUrl}/posts/:postId`,
    method: DELETE,
  },
}
