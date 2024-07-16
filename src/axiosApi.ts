import axios from 'axios';

const axiosApi = axios.create({
    baseURL: 'https://nurdin-blog-project-default-rtdb.europe-west1.firebasedatabase.app/',
});

export default axiosApi;