import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { request } from '@/app-config/http-request/axios-config'

import { useLSUserCredentials } from '@/composables/ls_userCredentials'
import { Encryption } from '@/composables/encryption'
import { useRequestHashKey } from '@/composables/userRequestHashKey'

import type {
  AddNewCustomer_Interface,
  ChangeDefaultPassword_Interface,
  ChangePassword_Interface,
  CustomerActivation_Interface,
  UserData_Interface
} from '@/interface/authentication'

import { useResponseMessageStore } from '@/stores/common/responseMessage'

const { updateResponse } = useResponseMessageStore()

export const useAuthenticationStore = defineStore('authentication', () => {
  // state
  const user_data = ref<UserData_Interface | null>(null)
  const isLogoutMenuClicked = ref<boolean>(false)
  const isUserIdle = ref<boolean>(false)

  // getters
  const getUser = computed(() => user_data)
  const getIsLogoutMenuClicked = computed(() => isLogoutMenuClicked)
  const getIsUserIdle = computed(() => isUserIdle)

  // actions
  function saveUserCredentials(data: string) {
    const user_json = JSON.stringify(data)

    // save user data
    localStorage.setItem('@', user_json)
  }
  
  function updateUserDataRef() {
    const userData = useLSUserCredentials()

    // update user ref    
    user_data.value = userData
  }

  function updateIsLogoutMenuClicked(state: boolean) {
    isLogoutMenuClicked.value = state
  }

  async function AddNewCustomer(payload: AddNewCustomer_Interface) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.email,
        payload.phoneNo
      ])
    )
      .post('Customer/PostCustomers', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // update notification
            updateResponse('Sign Up', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Sign Up', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Sign Up', 'error', error.message)
      })
  }

  async function CustomerActivation(payload: CustomerActivation_Interface) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.email,
        payload.customerReferece,
        payload.token,
      ])
    )
      .post('Customer/CustomerActivation', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful activation
          case '00':
            // update notification
            updateResponse('Account Activation', 'success', responseMessage)
            break

          // awaiting password change
          case '88':
            // update notification
            updateResponse('Account Activation', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Account Activation', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Account Activation', 'error', error.message)
      })
  }
  
  async function ChangeDefaultPassword(payload: ChangeDefaultPassword_Interface) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.email,
        payload.customerReferece,
        payload.token,
        payload.password
      ])
    )
      .post('Customer/ChangeSelfServiceDefaultPassword', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // update notification
            updateResponse('Default Password Change', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Default Password Change', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Default Password Change', 'error', error.message)
      })
  }

  async function ResetPassword(payload: { email: string }) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.email,
        // payload.customerReferece
      ])
    )
      .post('Customer/ChangePassword', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // update notification
            updateResponse('Password Change', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Password Change', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Password Change', 'error', error.message)
      })
  }

  async function ChangePassword(payload: ChangePassword_Interface) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.email,
        payload.customerReferece,
        payload.token,
        payload.password
      ])
    )
      .post('Customer/ChangePassword', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        switch (responseCode) {
          // successful logout
          case '00':
            // update notification
            updateResponse('Password Change', 'success', responseMessage)
            break

          default:
            // update notification
            updateResponse('Password Change', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Password Change', 'error', error.message)
      })
  }

  async function CustomerAuthentication(payload: { email: string, password: string }) {
    return await request(
      'selfService',
      useRequestHashKey('selfService', [
        payload.email,
        payload.password
      ])
    )
      .post('Customer/CustomeerAuthentication', payload)
      .then(response => {
        const responseData = response.data
        const { responseCode, responseMessage } = responseData

        const data = Encryption.encrypt(JSON.stringify(responseData))

        switch (responseCode) {
          // successful login
          case '00':
            saveUserCredentials(data)
            break
          
          // authentication error
          default:
            // update notification
            updateResponse('Authentication', 'error', responseMessage)
            break
        }

        return responseData
      })
      .catch(error => {
        // update notification
        updateResponse('Authentication', 'error', error.message)
      })
  }

  async function Logout() {
    return new Promise((resolve) => {
      // clear local stroage
      localStorage.removeItem('@')

      const responseData = {
        responseCode: '00',
        responseMessage: 'Logged out successfully'
      }

      setTimeout(() => resolve(responseData), 2000);
    })
  }

  async function Unauthorized() {
    // logout
    await Logout()
      .finally(() => location.replace('/'))
  }

  return {
    getUser,
    getIsLogoutMenuClicked,
    getIsUserIdle,
    saveUserCredentials,
    updateUserDataRef,
    updateIsLogoutMenuClicked,
    AddNewCustomer,
    CustomerActivation,
    ChangeDefaultPassword,
    ResetPassword,
    ChangePassword,
    CustomerAuthentication,
    Logout,
    Unauthorized
  }
})
