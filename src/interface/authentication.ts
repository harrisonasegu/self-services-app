export interface AddNewCustomer_Interface {
  firstname: string
  lastname: string
  email: string
  phoneNo: string
  customerAddress: string
  acceptTerms: boolean
}
export interface CustomerActivation_Interface {
  customerReferece: string
  email: string
  token: string
}
export interface ChangeDefaultPassword_Interface {
  token: string
  customerReferece: string
  email: string
  password: string
}
export interface ChangePassword_Interface {
  token: string
  customerReferece: string
  email: string
  password: string
}
export interface Login_Interface {
  email: string
  password: string
}

export interface UserData_Interface {
  customerReference: string
  email: string
  name: string
  lastLoginDate: string
  logginSession: string
  accountNo: string
  successfulTranxValue: number
  pendingTranxValue: number
}
