/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useEffect, useState } from 'react'
import { PageTitle } from '../../../_metronic/layout/core'
import { HelmetSite, capitalizeOneFirstLetter } from '../utils'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { KTSVG } from '../../../_metronic/helpers'
import { getPostsBy } from '../posts/core/_requests'
import { PostModel } from '../posts/core/_models'
import PostList from '../posts/hook/PostList'
import { PaginationItem } from '../utils/pagination-item'
import { useDebounce } from '../utils/use-debounce'
import { PostCreateFormModal } from '../posts/hook/PostCreateFormModal'
import { ListsWidget2 } from '../../../_metronic/partials/widgets'
import ContributorMiniList from '../contributors/hook/ContributorMiniList'
import { ContributorModel } from '../contributors/core/_models'
import { getContributorsGroup } from '../contributors/core/_requests'

const MessageGroupMini: FC = () => {


  return (
    <>
   
    </>
  )
}

export default MessageGroupMini
