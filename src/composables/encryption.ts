import CryptoJS from 'crypto-js'

export class Encryption {
  static sha512Encrypt(value: any): string {
    return CryptoJS.SHA512(value).toString()
  }

  static encrypt(value: any): string {
    return CryptoJS.AES.encrypt(
      JSON.stringify(value),
      "CentralVAS1234!"
    ).toString()
  }

  static decrypt(value: string): string {
    return CryptoJS.AES.decrypt(value, "CentralVAS1234!").toString(
      CryptoJS.enc.Utf8
    )
  }
}
