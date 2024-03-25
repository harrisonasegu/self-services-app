export interface PaymentCategory_Interface {
  id: number
  categoryName: string
}

export interface RevenueItem_Interface {
  id: number
  revenueItemCode: string
  revenueItemName: string
  revenueItemCategoryId: number
  isValidationRequired: boolean
}
