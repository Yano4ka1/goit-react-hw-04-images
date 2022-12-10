import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { apiSearch } from "./Api/apiSearch";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar";

export const App = () => { 
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [saveSearchQuery, setSaveSearchQuery] = useState('');
  const [loadMore, setLoadMore] = useState(false);
  const [currentPic, setCurrentPic] = useState('');
  const [modalShow, setModalShow] = useState(false);

  
    const onFormSubmit = (e) => {
      e.preventDefault();
      const searchQuery = e.target.elements.searchBar.value;
      if (searchQuery === '') {
        return toast.error('First enter a value in the field');
      }
      setLoadMore(true);
      setIsLoaded(true);
      setPage(1);
 
        apiSearch(searchQuery, 1)
          .then(res => {
            if (res.hits.length === 0) {
            setLoadMore(false);
            return toast.error('Nothing found for this query');
            }
            toast.success(`Hooray! We found ${res.totalHits} images.`)
            setImages(selectedProp(res.hits));
            loadBtnHide(res);
          }).catch(error => {
            toast.error('Something has gone wrong(')
            console.log(error)
          })
          .finally(() => {
            setIsLoaded(false);
            setSearchInput('');
            setSaveSearchQuery(searchQuery);
            setPage(page => page + 1);
          })
      }
      const onSearchInput = (e) => {
          const queryValue = e.target.value;
          setSearchInput({queryValue})
    }

      const selectedProp = (hits) => {
      return hits.map(({ id, largeImageURL, webformatURL }) => {
        return { id, largeImageURL, webformatURL }
      })
    }
     const onImgClick = (e) => {
        if (e.target.nodeName !== 'IMG') {
        return;
      }

        const currentPic = e.target;

        const saveCurrentPic = images.filter(img => img.webformatURL === currentPic.src);
        setCurrentPic(saveCurrentPic[0].largeImageURL);
        modalToggle();
    }

      const modalToggle = () => {
        setModalShow(modalShow =>!modalShow);
    }

      function onLoadBtnClick () {
        setIsLoaded(true);
        apiSearch(saveSearchQuery, page)
            .then(res => {
            const correctlyHits = selectedProp(res.hits);
            setImages(prev => [...prev, ...correctlyHits])
            loadBtnHide(res);
        })
        .catch(error => console.log(error))
        .finally(() => {
          setIsLoaded(false)
          setPage(page => page + 1);
        }
        )
    }
    
      const loadBtnHide = (res) => {
        const totalPages = Math.ceil(res.totalHits / 12);
          if (totalPages <= page) {
            setLoadMore(false);
            return toast.error("We're sorry, but you've reached the end of search results.");
          }
      }

      return <>
        <Searchbar onSubmit={onFormSubmit}
          onInput={onSearchInput}
          searchValue={searchInput} />
        <ImageGallery
          imgs={images}
          onImgClick={onImgClick } />
        {loadMore && <Button
          loadMoreFunc={onLoadBtnClick}
          status={ isLoaded } />
        }
        {modalShow && <Modal
          currentPic={currentPic}
          toggleFunc={modalToggle} />}
        <ToastContainer />
      </>
    }
  