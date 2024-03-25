import { RequestAppKeys } from "@/app-config/app-keys/requestAppKeys"
import { Encryption } from "./encryption"

export const useRequestHashKey = (api: string, hashParams?: any[]) => {
  const authorizationKey = atob(RequestAppKeys.apiAppKeys(api).authorizationKey)
  const publicKey = atob(RequestAppKeys.apiAppKeys(api).publicKey)
  const privateKey = atob(RequestAppKeys.apiAppKeys(api).privateKey)

  const hashParamsStr = [
    authorizationKey,
    publicKey,
    privateKey,
    ...hashParams ?? ''
  ].join('')
  
  const sha512Hash = Encryption.sha512Encrypt(hashParamsStr)

  return sha512Hash
}
