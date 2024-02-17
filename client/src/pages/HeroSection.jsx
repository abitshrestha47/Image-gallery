import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate(); 
  const searchHandle=async (e)=>{
    if(e.key==='Enter' && e.target.value.trim()!==''){
      try {
        const tags=e.target.value.toLowerCase();
        navigate(`/search/${encodeURIComponent(tags)}`); 
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <>
        <div className="hero-section">
            <div className="contents">
                <p>The best free stock photos, royalty free<br/> images & videos shared by creators.</p>
                <input className="form-control me-2 searchBtn" type="search" placeholder="Search for free photos . . ." aria-label="Search" onKeyDown={searchHandle}/>
            </div>
        </div>
    </>
  )
}

export default HeroSection