import { Encryption } from "./encryption"

import type { UserData_Interface } from "@/interface/authentication"

export function useLSUserCredentials(): UserData_Interface | null {
  const user_json = localStorage.getItem('@') as string

  if (user_json) {
    const user_info_parsed = JSON.parse(user_json)

    const user_data_decrypted: UserData_Interface = JSON.parse(JSON.parse(Encryption.decrypt(user_info_parsed as string)))

    const user_data = {
      customerReference: user_data_decrypted.customerReference,
      email: user_data_decrypted.email,
      name: user_data_decrypted.name,
      lastLoginDate: user_data_decrypted.lastLoginDate,
      logginSession: user_data_decrypted.logginSession,
      accountNo: user_data_decrypted.accountNo,
      successfulTranxValue: user_data_decrypted.successfulTranxValue,
      pendingTranxValue: user_data_decrypted.pendingTranxValue
    }

    return user_data
  }

  // no user item in local storage
  return null
}
