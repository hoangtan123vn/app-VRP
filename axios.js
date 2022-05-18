axios.defaults.baseURL = 'http://localhost:2711/api/auth/';

axios.interceptors.response.use(resp=>resp,async error =>{
    if(error.response.status === 401){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
        const response = await axios.get('userinfo');
        if(response.status === 200){
            axios.defaults.headers.common['Authorization'] =`Bearer ${localStorage.getItem("accessToken")}`;
            return axios(error.config);
        }
    }
    return error;
});