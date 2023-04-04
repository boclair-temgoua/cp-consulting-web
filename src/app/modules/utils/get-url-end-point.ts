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
  getOneUser: {
    endpoint: `${baseUrl}/users/show/:userId`,
    method: GET,
  },
  getOrganizationsContributes: {
    endpoint: `${baseUrl}/organizations/contributes`,
    method: GET,
  },
  getOneOrganization: {
    endpoint: `${baseUrl}/organizations/:organizationId`,
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
    endpoint: `${baseUrl}/contributors/:organizationId`,
    method: DELETE,
  },
}
