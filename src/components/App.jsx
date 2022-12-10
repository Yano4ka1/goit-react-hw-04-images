import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { apiSearch } from "./Api/apiSearch";
import { Button } from "./Button/Button";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar/Searchbar";

export class App extends Component{
    state = {
      isLoaded: false,
      images: [],
      page: 1,
      searchInput: '',
      saveSearchQuery: '',
      loadMore: false,
      currentPic: '',
      modalShow: false,
    }
  
    onFormSubmit = (e) => {
      e.preventDefault();
      const searchQuery = e.target.elements.searchBar.value;
      if (searchQuery === '') {
        return toast.error('First enter a value in the field');
      }
      this.setState({
        loadMore: true,
        isLoaded: true,
        page: 1,
          })
        apiSearch(searchQuery, 1)
          .then(res => {
            if (res.hits.length === 0) {
              this.setState({
              loadMore: false,
            })
            return toast.error('Nothing found for this query');
            }
            toast.success(`Hooray! We found ${res.totalHits} images.`)
          this.setState({
            images: this.selectedProp(res.hits),
          })
          this.loadBtnHide(res);
          }).catch(error => {
            toast.error('Something has gone wrong(')
            console.log(error)
          })
        .finally(() => this.setState({
          isLoaded: false,
        searchInput: '',
        saveSearchQuery: searchQuery,
        }))
    }
    onSearchInput = (e) => {
          const queryValue = e.target.value;
          this.setState({searchInput: queryValue,})
    }
    selectedProp = (hits) => {
      return hits.map(({ id, largeImageURL, webformatURL }) => {
        return { id, largeImageURL, webformatURL }
      })
    }
    onImgClick = (e) => {
      if (e.target.nodeName !== 'IMG') {
      return;
    }
      const currentPic = e.target;
      const saveCurrentPic = this.state.images.filter(img => img.webformatURL === currentPic.src);
      this.setState({
        currentPic: saveCurrentPic[0].largeImageURL,
      })
      this.modalToggle();
    }
    modalToggle = () => {
      this.setState(({modalShow})=>({
        modalShow: !modalShow,
      }))
    }
    onLoadBtnClick = async () => {
        await this.setState(prev => ({
          page: prev.page + 1,
          isLoaded: true,
        }))
          apiSearch(this.state.saveSearchQuery, this.state.page)
            .then(res => {
              const correctlyHits = this.selectedProp(res.hits);
          this.setState((prev) => ({
            images: [...prev.images, ...correctlyHits],
          }))
          this.loadBtnHide(res);
        })
        .catch(error => console.log(error))
        .finally(this.setState({
        isLoaded:false,
        }))
    }
    loadBtnHide = (res) => {
        const totalPages = Math.ceil(res.totalHits / 12);
          if (totalPages <= this.state.page) {
            this.setState({
              loadMore: false,
            })
            return toast.error("We're sorry, but you've reached the end of search results.");
          }
      }
    render() {
      return <>
        <Searchbar onSubmit={this.onFormSubmit}
          onInput={this.onSearchInput}
          searchValue={this.state.searchInput} />
        <ImageGallery
          imgs={this.state.images}
          onImgClick={this.onImgClick } />
        {this.state.loadMore && <Button
          loadMoreFunc={this.onLoadBtnClick}
          status={ this.state.isLoaded } />
        }
        {this.state.modalShow && <Modal
          currentPic={this.state.currentPic}
          toggleFunc={this.modalToggle} />}
        <ToastContainer />
      </>
    }
  }