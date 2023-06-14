import {SortModel} from '../../utils/pagination-item'

export interface LoginModel {
  email: string
  password: string
}

export type ResetPasswordModel = {
  password: string
  passwordConfirm: string
  newPassword?: string
  token?: string
}

export type RegisterModel = {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
  confirm: boolean
}

export interface UserAddressModel {
  addressLine: string
  city: string
  state: string
  postCode: string
}

export interface UserCommunicationModel {
  email: boolean
  sms: boolean
  phone: boolean
}

export interface UserEmailSettingsModel {
  emailNotification?: boolean
  sendCopyToPersonalEmail?: boolean
  activityRelatesEmail?: {
    youHaveNewNotifications?: boolean
    youAreSentADirectMessage?: boolean
    someoneAddsYouAsAsAConnection?: boolean
    uponNewOrder?: boolean
    newMembershipApproval?: boolean
    memberRegistration?: boolean
  }
  updatesFromKeenthemes?: {
    newsAboutKeenthemesProductsAndFeatureUpdates?: boolean
    tipsOnGettingMoreOutOfKeen?: boolean
    thingsYouMissedSindeYouLastLoggedIntoKeen?: boolean
    newsAboutStartOnPartnerProductsAndOtherServices?: boolean
    tipsOnStartBusinessProducts?: boolean
  }
}

export interface UserSocialNetworksModel {
  linkedIn: string
  facebook: string
  twitter: string
  instagram: string
}

export type ResponseUserModel = {
  total: number
  per_page: number
  current_page: number
  last_next: number
  skip: number
  sort: SortModel
  total_page: number
  total_value: number
  value: Array<OneUserModel>
}

export interface OneUserModel {
  id: string
  confirmedAt: Date
  email: string
  profileId: string
  organizationInUtilizationId: string
  profile: {
    id: string
    url: string
    color: string
    image: string
    userId: string
    lastName: string
    countryId: string
    firstName: string
    currencyId: string
  }
  organizationTotal: number
  role: {
    name: string
  }
  organization: {
    id: string
    name: string
    color: string
    userId: string
  }
}

export interface UserModel {
  id: number
  username: string
  password: string | undefined
  email: string
  first_name: string
  last_name: string
  fullname?: string
  occupation?: string
  companyName?: string
  phone?: string
  roles?: Array<number>
  pic?: string
  language?: 'en' | 'de' | 'es' | 'fr' | 'ja' | 'zh' | 'ru'
  timeZone?: string
  website?: 'https://keenthemes.com'
  emailSettings?: UserEmailSettingsModel
  auth?: any
  communication?: UserCommunicationModel
  address?: UserAddressModel
  socialNetworks?: UserSocialNetworksModel
}
