export const useAppKey = (api: string) => {
  const authorizationKey = import.meta.env.VITE_AUTHORIZATION_KEY
  const publicKey = import.meta.env.VITE_PUBLIC_KEY
  const privateKey = import.meta.env.VITE_PRIVATE_KEY
  // ------------------------------------------------------------
  const walletAuthorizationKey = import.meta.env.VITE_WALLET_AUTHORIZATION_KEY
  const walletPublicKey = import.meta.env.VITE_WALLET_PUBLIC_KEY
  const walletPrivateKey = import.meta.env.VITE_WALLET_PRIVATE_KEY
  // ------------------------------------------------------------

  const selfServiceKeys = {
    authorizationKey,
    publicKey,
    privateKey
  }

  const walletKeys = {
    authorizationKey: walletAuthorizationKey,
    publicKey: walletPublicKey,
    privateKey: walletPrivateKey
  }

  return (api === 'selfService') ? selfServiceKeys : walletKeys
}
