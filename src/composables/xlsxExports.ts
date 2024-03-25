import * as XLSX from 'xlsx'

// import type { ApproveApplication_Interface } from '@/interface/fundOrFinancialAid'

export const jsonToExcel = (sheetColumns: string[], sheetRows: any[], sheetName: string, fileName: string) => {
  /* generate workbook */
  const workbook = XLSX.utils.book_new()
  /* generate worksheet */
  const worksheet = XLSX.utils.json_to_sheet(sheetRows)

  // insert worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName)

  /* customise worksheet headers */
  XLSX.utils.sheet_add_aoa(worksheet, [sheetColumns], { origin: "A1" })

  /* customise column width */
  // worksheet["!cols"] = [{ wch: max_width }]

  /* create an XLSX file and save with the 'sheetName' */
  XLSX.writeFile(workbook, `${fileName}.xlsx`, { compression: true })
}
