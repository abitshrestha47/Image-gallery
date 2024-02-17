import axios from "axios";
import Navbar from "./Navbar"
import { useEffect, useState } from "react";
import styled from 'styled-components';

const StyledNavbar = styled.nav`
`;

const StyledForm = styled.form`
    margin-top: 20px;
    margin:2rem;
`;

const FormGroup = styled.div`
    margin-bottom: 15px;
`;

const Label = styled.label`
    font-weight: bold;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const ImagePreview = styled.img`
    height:65vh;
    margin-top: 10px;
`;

const SubmitButton = styled.button`
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const Upload = () => {
    const [image, setImage] = useState('');
    const [tags,setTags]=useState('');
    const [imagePreview, setImagePreview] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const storedToken = localStorage.getItem('auth');
            const headers = {};
            if (storedToken) {
                const parsedToken = JSON.parse(storedToken);
                headers.Authorization = `Bearer ${parsedToken.token}`;
            }
            const formData = new FormData();
            formData.append('image', image);
            formData.append('tags',tags);
            const response = await axios.post(`http://localhost:8000/uploads`, formData, { headers });
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
        const imageUrl = URL.createObjectURL(selectedImage);
        setImagePreview(imageUrl);
    }
    useEffect(() => {
        async function validateUser() {
            try {
                const storedToken = localStorage.getItem('auth');
                const headers = {};
                if (storedToken) {
                    const parsedToken = JSON.parse(storedToken);
                    headers.Authorization = `Bearer ${parsedToken.token}`;
                }

                const response = await axios.get(`http://localhost:8000/user-auth`, { headers });
                console.log(response);
                if (response.data.message === "rquires JWT") {
                    window.location.href = '/login';
                } else if (response.data.message === 'jwt expired') {
                    window.location.href = '/login';
                }
                else if (response.data.message === 'invalid token') {
                    window.location.href = '/login';
                }else if(response.data.message==='invalid signature'){
                    window.location.href = '/login';
                }else if(response.data.message==='internal error'){
                    window.location.href = '/login';
                }
                else {
                    console.log('fsd');
                }
            } catch (error) {
                console.log(error);
            }
        }
        validateUser();
    }, []);
    return (
        <>
            <StyledNavbar>
                <Navbar />
            </StyledNavbar>
            <StyledForm onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="upload">Upload Image</Label>
                    <Input type='text' name='tags' placeholder="enter image tags . . ." onChange={(e)=>setTags(e.target.value)}/>
                    <Input
                        type="file"
                        id="upload"
                        accept="image/jpeg, image/png, image/gif"
                        name="image"
                        onChange={handleImageChange}
                    />
                    {imagePreview && <ImagePreview src={imagePreview} alt="Image Preview" />}
                </FormGroup>
                <SubmitButton type="submit">Submit</SubmitButton>

            </StyledForm>
        </>
    )
}

export default Upload