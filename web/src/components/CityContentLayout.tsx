import React, { ReactElement, ReactNode } from 'react'

import { CityModel } from 'shared/api'
import { POIS_ROUTE } from 'shared/routes'

import buildConfig from '../constants/buildConfig'
import useWindowDimensions from '../hooks/useWindowDimensions'
import { RouteType } from '../routes'
import ChatContainer from './ChatContainer'
import CityContentFooter from './CityContentFooter'
import CityContentHeader from './CityContentHeader'
import Layout from './Layout'

export type CityContentLayoutProps = {
  Toolbar?: ReactNode
  children?: ReactNode
  route: RouteType
  languageChangePaths: { code: string; path: string | null; name: string }[] | null
  isLoading: boolean
  city: CityModel
  languageCode: string
  fullWidth?: boolean
  disableScrollingSafari?: boolean
  showFooter?: boolean
}

const CityContentLayout = (props: CityContentLayoutProps): ReactElement => {
  const { viewportSmall } = useWindowDimensions()

  const {
    children,
    languageCode,
    languageChangePaths,
    isLoading,
    route,
    Toolbar,
    fullWidth = false,
    disableScrollingSafari = false,
    showFooter = true,
    city,
  } = props

  const isChatEnabled = buildConfig().featureFlags.chat && route !== POIS_ROUTE && city.chatEnabled
  // to avoid jumping issues for desktop, isLoading is only checked on mobile viewport
  const isLoadingMobile = isLoading && viewportSmall
  return (
    <Layout
      disableScrollingSafari={disableScrollingSafari}
      fullWidth={fullWidth}
      header={
        <CityContentHeader
          cityModel={city}
          languageChangePaths={languageChangePaths}
          languageCode={languageCode}
          route={route}
        />
      }
      footer={
        !isLoading && showFooter && !viewportSmall ? (
          <CityContentFooter city={city.code} language={languageCode} />
        ) : null
      }
      chat={isChatEnabled ? <ChatContainer city={city.code} language={languageCode} /> : undefined}
      toolbar={!isLoadingMobile && Toolbar}>
      {children}
    </Layout>
  )
}

export default CityContentLayout
