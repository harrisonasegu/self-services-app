import { AppKeys } from "./appKeys"

interface RequestKey_Interface {
  authorizationKey: string
  publicKey: string
  privateKey: string
}

export class RequestAppKeys extends AppKeys {
  static selfServiceKeys = (): RequestKey_Interface => ({
    authorizationKey: AppKeys.authorizationKey,
    publicKey: AppKeys.publicKey,
    privateKey: AppKeys.privateKey
  })

  static walletKeys = (): RequestKey_Interface => ({
    authorizationKey: AppKeys.walletAuthorizationKey,
    publicKey: AppKeys.walletPublicKey,
    privateKey: AppKeys.walletPrivateKey
  })

  static apiAppKeys = (api: string): RequestKey_Interface => (api === 'selfService') ? this.selfServiceKeys() : this.walletKeys()
}
