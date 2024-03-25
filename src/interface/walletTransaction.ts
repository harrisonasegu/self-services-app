export interface InitiateWalletTransaction_Interface {
  merchantName: string
  customerName: string
  accountNo: string
  phoneNo: string
  emailAddress: string
  address: string
  transactionReference: string
  amount: number
  narration: string
  billingCode: string
  productCode: string
  transactionDate: string
  responseUrl: string
  param1?: string
  param2?: string
  param3?: string
}

export interface TransactionResponse_Interface {
  paymentRef: string
  transactionReference: string
  responseCode: string
  responseMessage: string
  amount: number
  accountNo: string
  hashKey: string
  hashKeyResponse: string
  callBackUrl: string
  param1?: string
  param2?: string
  param3?: string
}
