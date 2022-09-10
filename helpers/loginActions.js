import AsyncStorage from "@react-native-async-storage/async-storage";
import { api, storage } from "../constants/Backend";


export const handleLogin = async () => {
    const clientUsername = await AsyncStorage.getItem(storage.clientUsername)
    const clientPassword = await AsyncStorage.getItem(storage.clientPassword)

    if (!!clientUsername && !!clientPassword) {
        let request = {
            account: clientUsername,
            password: clientPassword
        }
        let response = await fetch(api.user.login, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(request)
        })

        if (!response.ok) {
            console.warn('err,handleLogin')
            handleRegister()
        } else {
            let res = await response.json()
            await AsyncStorage.removeItem('token')
            await AsyncStorage.setItem('token', JSON.stringify(res?.data))
        }

    } else {
        handleRegister()
    }

}

export const handleRegister = async () => {
    let nowTime = new Date().getTime()
    let request = {
        account: `Temp${nowTime}`,
        name: `Temp${nowTime}`,
        password: `Pwd${nowTime}`,
        password_confirmation: `Pwd${nowTime}`
    }


    let response = await fetch(api.user.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(request)
    })


    if (!response.ok) {
        let res = await response.text()
        console.warn('err,handleRegister', res, response.status)
    } else {
        let res = await response.json()
        await AsyncStorage.removeItem('token')
        await AsyncStorage.setItem(storage.clientUsername, request.account)
        await AsyncStorage.setItem(storage.clientPassword, request.password)
        await AsyncStorage.setItem('token', JSON.stringify(res?.data))
    }


}