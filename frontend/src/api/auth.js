import axios from 'axios'

const login=async(data)=>{
    let userData,error
    await axios.post('/api/v1/user/login', {
         email:data.email,
         password:data.password,
      })
      .then(function (response) {
        console.log(response.data?.data);
        userData=response.data?.data
        // console.log(userData)

      })
      .catch(function (err) {
        console.log("authservive :: login ",err);
        error=err 

      });


    //   console.log(userData)
    return {userData,error}
}

const createAccount=async(data)=>{
    let userData,error
    const formData={
        ...data,
        // avatar:data.avatar[0]
    }
    console.log(formData)
    await axios.post('/api/v1/user/register',formData

      )
      .then(function (response) {
        console.log(response.data?.data);
        userData=response.data?.data
        // console.log(userData)

      })
      .catch(function (err) {
        console.log("authservive :: register ",err);
        error=err 

      });


    //   console.log(userData)
    return {userData,error}

}


const logout=async()=>{
    let message
    try {
        message=await axios.post('/api/v1/user/logout')
    } catch (error) {
        message=error.message
    }
    console.log(message)

    return message.data.message;

    
}
export {login,createAccount,logout}