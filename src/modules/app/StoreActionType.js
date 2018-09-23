// @flow

import { offlineActionTypes } from 'react-native-offline'

type MetaType = {| retry?: boolean, dismiss?: string[] |}

export type FetchCitiesRequestActionType = {| type: 'FETCH_CITIES_REQUEST', params: {| language: string |}, meta: MetaType |}
export type CitiesFetchSucceededActionType = {| type: 'CITIES_FETCH_SUCCEEDED', payload: any |}
export type CitiesFetchFailedActionType = {| type: 'CITIES_FETCH_FAILED', message: string |}
export type CitiesFetchActionType =
  FetchCitiesRequestActionType
  | CitiesFetchSucceededActionType
  | CitiesFetchFailedActionType


export type FetchCategoriesRequestActionType = {| type: 'FETCH_CATEGORIES_REQUEST', params: {| prioritisedLanguage: string, city: string |}, meta: MetaType |}
export type FetchCategoriesCancelActionType = {| type: 'FETCH_CATEGORIES_CANCEL' |}
export type CategoriesFetchPartiallySucceededActionType = {| type: 'CATEGORIES_FETCH_PARTIALLY_SUCCEEDED', payload: any, city: string, language: string |}
export type CategoriesFetchSucceededActionType = {| type: 'CATEGORIES_FETCH_SUCCEEDED', city: string |}
export type CategoriesFetchFailedActionType = {| type: 'CATEGORIES_FETCH_FAILED', city: string, message: string |}
export type CategoriesFetchActionType =
  FetchCategoriesRequestActionType
  | CategoriesFetchPartiallySucceededActionType
  | CategoriesFetchSucceededActionType
  | CategoriesFetchFailedActionType
  | FetchCategoriesCancelActionType

export type ConnectionChangeActionType = {| type: offlineActionTypes.CONNECTION_CHANGE, payload: boolean |}

export type DownloadResourcesRequestActionType = {| type: 'DOWNLOAD_RESOURCES_REQUEST' |}
export type ResourcesDownloadPartiallySucceededActionType = {| type: 'RESOURCES_DOWNLOAD_PARTIALLY_SUCCEEDED', city: string, files: { [url: string]: string } |}
export type ResourcesDownloadSucceededActionType = {| type: 'RESOURCES_DOWNLOAD_SUCCEEDED', city: string |}
export type ResourcesDownloadFailedActionType = {| type: 'RESOURCES_DOWNLOAD_FAILED', city: string, message: string |}
export type ResourcesDownloadActionType =
  DownloadResourcesRequestActionType
  | ResourcesDownloadSucceededActionType
  | ResourcesDownloadPartiallySucceededActionType
  | ResourcesDownloadFailedActionType

export type StoreActionType =
  ConnectionChangeActionType
  | CitiesFetchActionType
  | CategoriesFetchActionType
  | ResourcesDownloadActionType
