export interface InitiateTransaction_Interface {
  merchantId: number
  customerReference: string
  totalamount: number
  paymentMethod: string
  asseessmentReference: string
  paymentPeriod: string
  narration: string
  email: string
  firstName: string
  middleName: string
  lastName: string
  address: string
  otherInfo: string
  sessionManager: string
  isLogedin: boolean
  transactionReferenceNo: string
  mobileNo: string
  paymentItemDetails: {
    amount: number
    paymentItemId: string
    paymentItem: string
  }[]
}

export interface CompleteTransaction_Interface {
  merchantId: number
  paymentReference: string
  transactionReference: string
  statuscode: string
  amount: number
  debitReference: string
  statusMessage: string
}

export interface TransactionReportPayload_Interface {
  paymentReference?: string
  transactionReference?: string
  name?: string
  customerReference: string
  dateFrom?: string
  dateTo?: string
}

export interface TransactionItem_Interface {
  transactionId: number
  merchantName: string
  paymentReference: string
  transactionReference: string
  customerReference: string
  fullName: string
  amount: number
  paymentMethod: string
  statusCode: string
  status: string
  email: string
  address: string
  telephone: string
  otherInfo: string
  narration: string
  transactionDate: string
}

export interface PaidItem_Interface {
  itemId: number
  paymentReference: string
  amount: string
  paymentItem: string
}
