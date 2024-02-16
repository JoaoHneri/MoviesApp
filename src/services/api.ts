import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: "2b14f2fcb2634c2f226cbc2483183663",
        language: "pt-BR",
        
    },
})