import axios from 'axios'

export type PageType = 'SUBPROJECT' | 'ORGANIZATION' | 'PROJECT'

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
    endpoint: `${baseUrl}/contributors/delete/:contributorId`,
    method: DELETE,
  },
  getOneProject: {
    endpoint: `${baseUrl}/projects/:projectId`,
    method: GET,
  },
  getProjectsContributes: {
    endpoint: `${baseUrl}/projects/contributes`,
    method: GET,
  },
  getContributorsProject: {
    endpoint: `${baseUrl}/contributors/project`,
    method: GET,
  },
  getContributorsSubProject: {
    endpoint: `${baseUrl}/contributors/sub-project`,
    method: GET,
  },
  createOneSubProject: {
    endpoint: `${baseUrl}/sub-projects`,
    method: POST,
  },
  getContactsBy: {
    endpoint: `${baseUrl}/contacts`,
    method: GET,
  },
  getOneContact: {
    endpoint: `${baseUrl}/contacts/show/:contactId`,
    method: GET,
  },
  deleteOneContact: {
    endpoint: `${baseUrl}/contacts/:contactId`,
    method: DELETE,
  },
  deleteMultipleContact: {
    endpoint: `${baseUrl}/contacts/delete/multiples`,
    method: DELETE,
  },
  createOneContact: {
    endpoint: `${baseUrl}/contacts`,
    method: POST,
  },
  getOneSubProject: {
    endpoint: `${baseUrl}/sub-projects/show`,
    method: GET,
  },
  createOneProject: {
    endpoint: `${baseUrl}/projects`,
    method: POST,
  },
  updateOneProject: {
    endpoint: `${baseUrl}/projects/:projectId`,
    method: PUT,
  },
  getSubProjectsContributes: {
    endpoint: `${baseUrl}/sub-projects/contributes`,
    method: GET,
  },
  deleteOneSubProject: {
    endpoint: `${baseUrl}/sub-projects/:subProjectId`,
    method: DELETE,
  },
  deleteOneSubSubProject: {
    endpoint: `${baseUrl}/sub-sub-projects/:subSubProjectId`,
    method: DELETE,
  },
  updateOneSubProject: {
    endpoint: `${baseUrl}/sub-projects/:subProjectId`,
    method: PUT,
  },
  getOneSubSubProject: {
    endpoint: `${baseUrl}/sub-sub-projects/show`,
    method: GET,
  },
  getSubSubProjectsContributes: {
    endpoint: `${baseUrl}/sub-sub-projects/contributes`,
    method: GET,
  },
  getContributorsSubSubProject: {
    endpoint: `${baseUrl}/contributors/sub-sub-project`,
    method: GET,
  },
  createOneSubSubProject: {
    endpoint: `${baseUrl}/sub-sub-projects`,
    method: POST,
  },
  updateOneSubSubProject: {
    endpoint: `${baseUrl}/sub-sub-projects/:subSubProjectId`,
    method: PUT,
  },
  updateRoleContributor: {
    endpoint: `${baseUrl}/contributors/role`,
    method: PUT,
  },
}
