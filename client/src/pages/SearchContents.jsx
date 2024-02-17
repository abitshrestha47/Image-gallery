import { useEffect, useState } from "react"
import axios from "axios";
import FileDownload from 'js-file-download';
import styled from 'styled-components';
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

const StyledName = styled.h5`
  color:white;
  font-weight:bold;
`;


const SearchContents = () => {
    const [imagesData, setImagesData] = useState([]);
    const [authors, setAuthors] = useState([]);
    const { query } = useParams();

    useEffect(() => {
        async function getImages() {
            try {
                const response = await axios.get(`http://localhost:8000/search/${query}`);
                // console.log(response);
                const images = response.data;
                setImagesData(images);
            } catch (error) {
                console.log(error.message);
            }
        }
        getImages();
    }, [query]);

    useEffect(() => {
        async function getProfile() {
            try {
                const response = await axios.get(`http://localhost:8000/authors`);
                // console.log(response);
                setAuthors(response.data.users);
            } catch (error) {
                console.log(error);
            }
        }
        getProfile();
    }, []);

    const downloadImage = async (imageName) => {
        try {
            const response = await axios.get(`http://localhost:8000/download/${imageName}`, {
                responseType: 'blob'
            });
            FileDownload(response.data, imageName);
        } catch (error) {
            console.log(error);
        }
    }

    const findAuthorName = (authorId) => {
        const author = authors.find(author => author._id === authorId);
        return author ? author.username : "Unknown";
    }

    return (
        <>
            <Navbar showSearchBar={true} />
            <div className="imageSection">
                <p className="ms-4 fs-3">Free Stock Photos </p>
                <div className="card-container d-flex ms-4 flex-wrap">
                    {imagesData.map((image, index) => (
                        <div className="card me-4 mb-4" key={index} style={{ width: '28rem' }}>
                            <img src={`http://localhost:8000/images/${image.imageName}`} className="card-img-top" alt="..." />
                            <div className="card-info">
                                <div className="infos">
                                    <StyledName className="card-title">{findAuthorName(image.author)}</StyledName>
                                    <button className="btn downloadBtn btn-success" onClick={() => downloadImage(image.imageName)}>Download</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default SearchContents