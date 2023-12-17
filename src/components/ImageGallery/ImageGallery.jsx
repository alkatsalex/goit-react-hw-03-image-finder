import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem.jsx";
import Button from "../Button/Button.jsx";
import { Audio } from 'react-loader-spinner';
import fetchAPI from "../API/fetchAPI.js";



export default class ImageGallery extends Component {

    state = {
        searchResult: [],
        caunter: 1,
        loading: false,
        searchNow:""
    }


    async componentDidUpdate(prevProps, prevState) {
        
        if (prevProps.searchTag !== this.props.searchTag || prevState.caunter !== this.state.caunter) {
            this.fetchImg(this.props.searchTag)
        } 
   
    }


    // fatchResp = async () => {
    //     const { caunter } = this.state
    //         const teg = this.props.searchTag
            
    //         const data = await fetchAPI(teg, caunter)
    //         this.setState(p => {
    //             searchResult: 
    //         })
    //         console.log(data);
    // }


    fetchImg = async (teg) => {
        const { caunter, searchResult, searchNow } = this.state;
        

 

        this.setState({ loading: true });
        

    if (searchNow !== this.props.searchTag) {
        this.setState({searchResult: []})
    }

    try {
      const { hits, total } = await fetchAPI(teg, caunter);

      if (total) {
        const uniqueImages = hits.filter(
          newImage =>
            !searchResult.some(existingImage => existingImage.id === newImage.id)
        );

        this.setState(prevState => ({
          searchResult: [...prevState.searchResult, ...uniqueImages],
          total,
        }));
      } else {
        alert('Nothing found, try again!');
          }
        
        // this.setState(prevState => ({
        //   searchResult: [...prevState.searchResult, ...hits]
        // }))
    } catch (error) {
      throw error;
    } finally {
        this.setState({ loading: false, searchNow: teg });
    }
  };

    hendleClickOnBtnLoadeMore = () => {
    this.setState(prevState => ({caunter: prevState.caunter + 1}))
  }

    render() {
        const { searchResult, loading } = this.state
        const onClick = this.props.onClick
        return (
            <>
            <ul className="ImageGallery">
                {searchResult && searchResult.map(({ id, webformatURL, largeImageURL }) => {
                    return <ImageGalleryItem key={id}
                        webformatURL={webformatURL}
                        onClick={onClick}
                        largeImageURL={largeImageURL} />
                })}
                    {loading && <Audio
                      height="80"
                      width="80"
                      radius="9"
                      color="blue"
                      ariaLabel="loading"
                      wrapperStyle
                      wrapperClass
                    />}
                </ul>
   
                { searchResult.length > 0 && <Button onClick={this.hendleClickOnBtnLoadeMore} />}

            </>
        )
     }
}