import axios from "axios";




const getHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `Bearer ${token}`
    };
}



const getHeadersForImage = () => {
    const token = localStorage.getItem("token");
    return {
        'Authorization': `Bearer ${token}`
    };
}

export const createModel = async (url, data) => {
    try {
        
        const response = await axios.post(url, data, {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
       console.log(error)
       
       
    }
};

export const readAllModel = async (url) => {
    try {
        const token=localStorage.getItem("token")
        console.log(token)
        const response = await axios.get(url, {
            headers: getHeaders()
        });
        console.log('test')
        console.log(response)
        return response.data.data;
    } catch (error) {
        console.log(error)
    }
};

export const readModel = async (url, id) => {
    try {
        console.log("inside this function mate")
        const response = await axios.get(`${url}/${id}`, {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
       
        throw error
       
    }
};

export const updateModel = async (url, id, data) => {
    try {
        const response = await axios.patch(`${url}/${id}`, data, {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const deleteModel = async (url, id) => {
    try {
        const response = await axios.delete(`${url}/${id}`, {
            headers: getHeaders()
        });
        return response.data;
    } catch (error) {
       console.log(error)
    }
};


export const updateWithoutId = async (url, data) => {
    try {
        const response = await axios.patch(url, data, {
            headers: getHeadersForImage()
        });
        return response.data;
    } catch (error) {
       console.log(error)
    }
};

 