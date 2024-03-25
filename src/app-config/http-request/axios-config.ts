import axios from 'axios'
import { RequestAppKeys } from '../app-keys/requestAppKeys'

const collectionApiBaseUrl = import.meta.env.VITE_COLLECTION_API_BASE_URL
const walletApiBaseUrl = import.meta.env.VITE_WALLET_API_BASE_URL

const config = (api: string, hashKey: string) => {
  const apiBaseUrl = api === 'selfService' ? collectionApiBaseUrl : walletApiBaseUrl
  
  return ({
    baseURL: `${apiBaseUrl}/api/`,
    headers: {
      AuthorizationKey: RequestAppKeys.apiAppKeys(api).authorizationKey,
      PublicKey: RequestAppKeys.apiAppKeys(api).publicKey,
      HashKey: hashKey
    }
  })
}

export const request = (api?: string, hashKey?: string) =>
  (api && hashKey) ? axios.create(config(api, hashKey)) : axios
