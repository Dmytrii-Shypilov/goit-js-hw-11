import Notiflix, { Notify } from 'notiflix';
import { fetchPictures } from "./js/pictures-service.js";
const axios = require('axios');

let page = 1;

const refs = {
    form: document.querySelector(".search-form"),
    galleryList: document.querySelector(".gallery-list"),
    gallery: document.querySelector(".gallery"),
    loadBtn: document.querySelector(".load-more")
}

refs.form.addEventListener('submit', onSubmit)
refs.loadBtn.addEventListener('click', loadMore)


function onSubmit (event) {
    event.preventDefault();
    resetMarkup()  
    hideButton()

    const form = event.currentTarget;
    const searchedValue = form.searchQuery.value
    
    if(!searchedValue) {
      return  Notify.warning("Enter what you're looking for!")
    }
    
    fetchPictures(searchedValue)
    .then((response) => {
        if (response.data.totalHits === 0) {
            return Notify.failure("Pictures are not found!")
        }

        renderMarkup(response.data.hits)
        Notify.info(`Hooray! We found ${response.data.total} images!`)
        console.log(response)

        if (response.data.total > 40) {
        showButton() 
        }
    })
}


function renderMarkup (pictures) {
    pictures.map((picture) => {

    const markup = 
        `<div class="photo-card">
            <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
            <div class="info">
            <p class="info-item">
                <span class="item-title">Likes</span>
                <span>${picture.likes}</span>
            </p>
            <p class="info-item">
                <span class="item-title">Views</span>
                <span>${picture.views}</span>
            </p>
            <p class="info-item">
                <span class="item-title">Comments</span>
                <span>${picture.comments}</span>
            </p>
            <p class="info-item">
                <span class="item-title">Downloads</span>
                <span>${picture.downloads}</span>
            </p>
            </div>
        </div>`

  refs.gallery.insertAdjacentHTML('beforeend', markup)
    })   
}

function loadMore () { 
    const searchedValue = refs.form.searchQuery.value
    page+=1

    fetchPictures(searchedValue, page)
    .then((response) => {
        renderMarkup(response.data.hits)
        if (page > Math.floor(response.data.total / 40)) {
            page = 1;
            return hideButton();
        }
        showButton();
    })
} 

function resetMarkup() {
   return refs.gallery.innerHTML = " ";
}

function showButton () {
    refs.loadBtn.classList.remove("invisible")
}

function hideButton () {
    refs.loadBtn.classList.add("invisible")
}

