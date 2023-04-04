import jwt_decode from 'jwt-decode'

export const getCurrentUserFormToken = () => {
  const token = window.localStorage.getItem(String(process.env.REACT_APP_BASE_NAME_TOKEN))
  if (token !== null) {
    const user: any = jwt_decode(token)
    return user
  } else {
    return
  }
}

const getAuth = () => {
  if (!localStorage) {
    return
  }

  // const token = window.localStorage.getItem(String(process.env.REACT_APP_BASE_NAME_TOKEN))
  const lsValue: string | null = localStorage.getItem(String(process.env.REACT_APP_BASE_NAME_TOKEN))
  if (!lsValue) {
    return
  }

  try {
    // const auth: any = JSON.parse(lsValue) as AuthModel
    const api_token: any = JSON.parse(lsValue)
    if (api_token) {
      // You can easily check auth_token expiration also
      return api_token
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    (config: {headers: {Authorization: string}}) => {
      const api_token = getAuth()
      if (api_token) {
        config.headers.Authorization = api_token
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export {getAuth}
