export interface FileProp_Interface {
  name: string
  size: number
}

export interface File_Interface {
  id: string
  batchId: string
  name: string
  status: string
  percentage: number
  file: FileProp_Interface
  url: string | null
  type: string
  thumbnailUrl: any
  fullPath: string
}

export interface FileUpload_Interface {
  file: File_Interface
  fileList: []
}
