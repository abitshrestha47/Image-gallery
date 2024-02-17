import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage} from 'mdb-react-ui-kit';
import Navbar from './Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState({});
  const [image,setImage]=useState();
  useEffect(() => {
    const parseData = localStorage.getItem('auth');
    console.log(parseData);
    if (parseData) {
      const userData = JSON.parse(parseData).user;
      setUserInfo(userData);
    }
  }, []);
  const handleChange = async (event) => {
    const selectedImage = event.target.files[0];
    const imageUrl = URL.createObjectURL(selectedImage);
    try {
      const response=await axios.put(`http://localhost:8000/user`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    setImage(imageUrl);
  }
  return (
    <div className="vh-100">
      <Navbar />
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="9" lg="7" xl="5" className="mt-5">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="p-4">
                <div className="d-flex text-black">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: '200px', height: '200px', borderRadius: '10px' }}
                      src={image || 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'}

                      alt='Generic placeholder image'
                      fluid />
                    <input
                      type="file"
                      id="profile-image-input"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleChange}
                    />
                    <br/>
                    <label htmlFor="profile-image-input" style={{ cursor: 'pointer', textDecoration: 'underline' }}>Edit</label>
                    <br />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <MDBCardTitle>{userInfo.username}</MDBCardTitle>
                    <MDBCardText>{userInfo.about}</MDBCardText>

                    <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                      style={{ backgroundColor: '#efefef' }}>
                      <div>
                        <p className="small text-muted mb-1">Articles</p>
                        <p className="mb-0">41</p>
                      </div>
                      <div className="px-3">
                        <p className="small text-muted mb-1">Followers</p>
                        <p className="mb-0">976</p>
                      </div>
                      <div>
                        <p className="small text-muted mb-1">Rating</p>
                        <p className="mb-0">8.5</p>
                      </div>
                    </div>
                    <div className="d-flex pt-1">
                        <label className='btn btn-success'>Change</label>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default ProfilePage