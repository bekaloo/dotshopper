import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';

const sleep = () => new Promise(resolve=>setTimeout(resolve, 500));

axios.defaults.baseURL = 'https://localhost:5001/'
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => { 
    await sleep();
    return response; 
},
    (error: any) => {
         const { data, status } = error.response;

        switch (status) {
            case 400:
                if(data.errors){
                    const modelStateErrors: string[] = [];
                    for(const key in data.errors){
                        modelStateErrors.push(data.errors[key]);
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data.title);
                break;
            case 401:
                toast.error(data.title);
                break;
            case 500:
                history.push('/Buggy/server-error', {error:data})
                toast.error(data.title);
                break;
            default:
                break;
        }
        return Promise.reject(error.response);
          
    })

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get("Products"),
    details: (id: number) => requests.get(`Products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('Buggy/bad-request'),
    get401Error: () => requests.get('Buggy/unauthorized'),
    get404Error: () => requests.get('Buggy/not-found'),
    get500Error: () => requests.get('Buggy/server-error'),
    getValidationError: () => requests.get('Buggy/validation-error'),
}

const Basket = {
    get: ()=> requests.get('Basket'),
    addItem: (productId: number, quantity = 1)=> requests.post(`Basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem: (productId: number, quantity:number)=> requests.delete(`Basket?productId=${productId}&quantity=${quantity}`)
}

const agent = {
    Catalog,
    TestErrors,
    Basket
}
export default agent