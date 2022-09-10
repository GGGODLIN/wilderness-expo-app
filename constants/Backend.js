import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  clientAccessToken: 'token',
  clientUsername: 'clientUsername',
  clientPassword: 'clientPassword'
}


export const baseUrl = 'https://echo.estiginto.dev'


export const api = {
  baseUrl,
  user: {
    register: `${baseUrl}/api/user/register`,
    login: `${baseUrl}/api/user/login`,
    broadcasts: `${baseUrl}/api/user/broadcasts`,
    userProfile: `${baseUrl}/api/user/me`,
    updateUserProfile: `${baseUrl}/api/user/myself`,
    pointFormula: `${baseUrl}/api/user/formula-arguments`,
    broadcastTypes: `${baseUrl}/api/user/broadcast-types`,
    broadcastOptions: `${baseUrl}/api/user/broadcast-options`,
    getStrengths: `${baseUrl}/api/user/to-be-consumed-strengths`,
    postStrengths: `${baseUrl}/api/user/my-strength/fill`,
  },
}

export const getToken = async () => {

  token = await AsyncStorage.getItem(storage.clientAccessToken)


  return JSON.parse(token)
}

export const removeToken = async () => {
  await AsyncStorage.removeItem(storage.clientAccessToken)
}



export const dispatchFetchRequest = async (
  endpoint,
  payload,
  successCallback,
  failCallback
) => {

  return dispatchFetchRequestWithOption(endpoint, payload, { defaultMessage: true }, successCallback, failCallback)
}

export const dispatchFetchRequestWithOption = async (
  endpoint,
  payload,
  options,
  successCallback,
  failCallback
) => {
  try {

    let token = await AsyncStorage.getItem(storage.clientAccessToken)


    if (token != null) {
      const tokenObj = JSON.parse(token)
      payload.headers.Authorization = payload?.headers?.Authorization ?? `Bearer ${tokenObj.access_token}`

      const response = await fetch(endpoint, payload)

      if (!response.ok) {

        if (failCallback !== undefined) {
          failCallback(response)
        }
      } else {

        !!successCallback && successCallback(response)
      }

      return response
    } else {
      const errorMessage = 'Token does not exist. Please consult your service provider.'

      console.warn(errorMessage)
    }
  } catch (error) {
    console.error('Token Err', error)
  }
}


