export const getJsonHeaders = (...additionalHeaders)=>{
    return {
        headers:{
            'Content-Type':'application/json',
            'Accept': 'application/json',
            ...additionalHeaders
        },
        withCredentials: true
    }
}


export const getFormDataHeaders = (...additionalHeaders) => {
    return {
      headers: {
        "Content-Type": "multipart/form-data",
        ...additionalHeaders, 
      },
      withCredentials: true
    }
  }