import { Notify } from 'notiflix';
const axios = require('axios');

axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';

const parametersLine = '?key=27144751-892a725032099e3eb90bcbf85&image_type=photo&orientation=horizontal&safesearch=true'

async function fetchPictures (value, page = 1) {
    try {
        const response = await axios.get(`https://pixabay.com/api/${parametersLine}&per_page=40&page=${page}&q=${value}`);     
        console.log(response)    
        return response;
  } catch (error) { 
    console.error(error);
    }
}

export {fetchPictures}