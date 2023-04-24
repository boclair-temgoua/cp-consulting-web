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
  updateOneContact: {
    endpoint: `${baseUrl}/contacts/:contactId`,
    method: PUT,
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
  createOneContributorOrganization: {
    endpoint: `${baseUrl}/contributors/organization`,
    method: POST,
  },
  createOneContributorProject: {
    endpoint: `${baseUrl}/contributors/project`,
    method: POST,
  },
  createOneContributorSubProject: {
    endpoint: `${baseUrl}/contributors/sub-project`,
    method: POST,
  },
  createOneContributorSubSubProject: {
    endpoint: `${baseUrl}/contributors/sub-sub-project`,
    method: POST,
  },
  createOneContributorSubSubSubProject: {
    endpoint: `${baseUrl}/contributors/sub-sub-sub-project`,
    method: POST,
  },
  createOneContributorGroup: {
    endpoint: `${baseUrl}/contributors/group`,
    method: POST,
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
  getContributorsSubSubSubProject: {
    endpoint: `${baseUrl}/contributors/sub-sub-sub-project`,
    method: GET,
  },
  getContributorsGroup: {
    endpoint: `${baseUrl}/contributors/group`,
    method: GET,
  },
  getUsers: {
    endpoint: `${baseUrl}/users`,
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
  createOneSubSubSubProject: {
    endpoint: `${baseUrl}/sub-sub-sub-projects`,
    method: POST,
  },
  updateOneSubSubSubProject: {
    endpoint: `${baseUrl}/sub-sub-sub-projects/:subSubSubProjectId`,
    method: PUT,
  },
  deleteOneSubSubSubProject: {
    endpoint: `${baseUrl}/sub-sub-sub-projects/:subSubSubProjectId`,
    method: DELETE,
  },
  createOneGroup: {
    endpoint: `${baseUrl}/groups`,
    method: POST,
  },
  updateOneGroup: {
    endpoint: `${baseUrl}/groups/:groupId`,
    method: PUT,
  },
  deleteOneGroup: {
    endpoint: `${baseUrl}/groups/:groupId`,
    method: DELETE,
  },
  updateRoleContributor: {
    endpoint: `${baseUrl}/contributors/role`,
    method: PUT,
  },
  getSubSubSubProjectsContributes: {
    endpoint: `${baseUrl}/sub-sub-sub-projects/contributes`,
    method: GET,
  },
  getOneSubSubSubProject: {
    endpoint: `${baseUrl}/sub-sub-sub-projects/show`,
    method: GET,
  },
  getDocumentsBy: {
    endpoint: `${baseUrl}/documents`,
    method: GET,
  },
  getCategoriesBy: {
    endpoint: `${baseUrl}/categories`,
    method: GET,
  },
  getContactProjectsBy: {
    endpoint: `${baseUrl}/contact_projects`,
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
  createOneContactProject: {
    endpoint: `${baseUrl}/contact_projects`,
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
}
