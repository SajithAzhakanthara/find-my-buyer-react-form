import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import sample from '../images/P1055525.jpg';
import sample2 from '../images/P1055784.jpg';
import sample3 from '../images/P1055785.jpg';
import sample4 from '../images/P1055788.jpg';
import sample5 from '../images/P1055789.jpg';
import sample6 from '../images/P1055790.jpg';
import sample7 from '../images/P1055791.jpg';
import sample8 from '../images/P1055797.jpg';
import sample9 from '../images/P1055798.jpg';
import sample10 from '../images/P1055800.jpg';



function PropertyPhotograph(props){

    const sliderImage = [{"image":sample},{"image":sample2},{"image":sample3},{"image":sample4},{"image":sample5},{"image":sample6},{"image":sample7},{"image":sample8},{"image":sample9},{"image":sample10}]
    
    const[photoDetails, setPhotoDetails] = useState([]);
    const[loading,setLoading]= useState(false);
    const[photo, setPhoto] = useState('');
    const[upImages,setUpImages]=useState([])
    const maxSize = 100000000
    const prop_id = localStorage.getItem('property-id')   
    const allImgURL = "https://findmybuyer.co.uk/api/property-step4-allPhotos/";
    const imgURL = 'https://findmybuyer.co.uk/storage/app/public/propertyImages/thumb/';
    const deleteImgURL = 'https://findmybuyer.co.uk/api/property-step4-deletePhotos';
    const baseURL = "https://findmybuyer.co.uk/api/property-form-step4";
    const photograbperURL = 'https://findmybuyer.co.uk/api/property-form-step4-photographer-select';
    const photoDetailsURL = 'https://findmybuyer.co.uk/api/property-step4-photographer';




    const onTabchangeOne = ()=> {
        document.querySelector(".no-photographer").classList.remove("active");
        document.querySelector(".need-photographer").classList.add("active");
        document.querySelector(".need-photographer-content-outer").classList.remove("display-none");
        document.querySelector(".no-photographer-content").classList.add("display-none");
        document.querySelector(".photogallery-btn-outer").classList.remove("display-none");
    }
    
    const onTabchangeTwo = () => {
        document.querySelector(".need-photographer").classList.remove("active");
        document.querySelector(".no-photographer").classList.add("active");
        document.querySelector(".no-photographer-content").classList.remove("display-none");
        document.querySelector(".need-photographer-content-outer").classList.add("display-none");  
        document.querySelector(".photogallery-btn-outer").classList.add("display-none");
    }
    
     useEffect(()=>{
        axios.get(allImgURL+prop_id)
        .then(res=>{
            setUpImages(res.data.Images);
            console.log(res.data.Images)
        })
        axios.get(photoDetailsURL)
        .then(res=>{
            res.data.PhotographerData.map(PhotographerData=>{
                setPhotoDetails(PhotographerData)
            })
            
        })
       
     },[])
 
     useEffect(()=>{
         if( localStorage.getItem('photo-checked')){
          document.getElementById('need-photographer').checked = true;   
         }

//popup script
const trigger = document.querySelector('.photopopup-trigger');
const popup = document.querySelector('.photograph-popup-outer');
const close = document.querySelector('.popup-close');
trigger.addEventListener('click',function(){
    popup.classList.add('show')
})
close.addEventListener('click',function(){
    popup.classList.remove('show')
})


         
     })
     

    // }
    const onDrop = (files) => { 
        setLoading(true)      
       // setFileupload(files)
        console.log(files)       
        const fd = new FormData();
        
        files.map((file)=>{
            fd.append('image[]',file,file.name)   
            fd.append('property_id',prop_id)  
        })
        async function get(){
            const response = await axios.post(baseURL,fd,prop_id)
            const data = await response;
            
            setUpImages(upImages.concat(data.data.Images));
            setLoading(false)           
            console.log(response)
         
        }                    
        // axios.post(baseURL,fd,prop_id)        
        // .then(res =>{  
        //     setUpImages(res.data.Images);          
        //     console.log(res)
        // })
        get();
        
    }
    const onDeletehandler = (e) =>{
       // alert(e.target.id)
        //property_id, image_id
        
        axios.post(deleteImgURL,{property_id:prop_id,image_id:e.target.id})
        .then(res=>console.log(res))

        setTimeout(()=>{
            axios.get(allImgURL+prop_id)
        .then(res=>{
            setUpImages(res.data.Images);
        })
        },1000)
    }
    const onChangeHandler = (e) =>{
       if(e.target.checked){
        setPhoto(photoDetails.price_range_id);
        localStorage.setItem('photo-checked','photo');
        axios.post(photograbperURL,{property_id:prop_id,photographer:photoDetails.price_range_id})
        console.log(photo);
       }else {
        localStorage.removeItem('photo-checked');
        axios.post(photograbperURL,{property_id:prop_id,photographer:null})
        setPhoto(null)  ;
        console.log(photo)
       }
    }
    const onSubmitHandler = () =>{
        // e.preventDefault();
        //  console.log(photo)
        // if(   document.querySelector('.loaded-Images ul').innerHTML == null){
        //     alert('one of the field required')
        // }else{
        //     axios.post(photograbperURL,{property_id:prop_id,photographer:photo})
        //     .then(res=>console.log(res))
            
        // }

        // if(document.getElementById('need-photographer').checked){            
        //     axios.post(photograbperURL,{property_id:prop_id,photographer:photoDetails.price_range_id})            
        //    }else{
        //     axios.post(photograbperURL,{property_id:prop_id,photographer:null})
        //    }
           props.history.push('/property-video')
    }
    
    const loadedImages = upImages.map(upImage=>{
       return(          
               <li>
                   <span className="allImage-outer">
                      <i class="fa fa-times-circle-o" aria-hidden="true" id={upImage.image_id} onClick={onDeletehandler}></i>
                       {loading?<p>loading</p>:<img src={imgURL+upImage.image_name}/>}
                    </span>
               </li>           
       )
   })
  
    return(
        <div>
            <section className="progress-outer">
                    <div className="progress-wrap">
                       <ul>
                            <li>
                                 <div className="first-ready first-finished"></div>
                                 <div className="second-ready second-finished"></div>
                                 <div className="third-ready third-finshed"></div>
                                 <div className="four-ready"></div>

                                 <h4>1</h4>
                            </li>
                            <li>
                               <h4>2</h4>
                            </li>
                            <li>
                               <h4>3</h4>
                            </li>
                       </ul>
                    </div>
               </section>
        <div className="upload-property-outer">
            <div className="photograph-tabs-outer">
                                <ul className="photograph-tabs">
                                    <li className="need-photographer active" onClick={onTabchangeOne}><span>I need a photographer</span></li>
                                    <li className="no-photographer" onClick={onTabchangeTwo}><span>Upload own images</span></li>
                                </ul>
                                <div className="photographer-content-outer">
                                    <div className="need-photographer-content-outer">
                                        <div className="professional-photographer">
                                            <div className="camera-img">
                                            <i class="fa fa-camera" aria-hidden="true"></i>
                                            </div>
                                            <div className="photographer-description-outer">
                                                <div className="photographer-description">
                                                    <h5>Professional photographer</h5>
                                                    <p>{photoDetails.description}</p>
                                                </div>
                                                <div className="photographer-price">
                                                    <h4>£{photoDetails.amount}</h4>
                                                    <input type="checkbox" id="need-photographer" onChange={onChangeHandler}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="photogallery-btn-outer">
                                       <h6>Sample photograph</h6>
                                       <img src={sample} className="photopopup-trigger"/>
                                    </div>
                                    </div>                                    
                                    
                                </div>
                                <div class="no-photographer-content display-none">
                                <div className="dropzone-outer"> 
                                <Dropzone
                                onDrop={onDrop}
                                accept="image/*"
                                minSize={0}
                                maxSize={maxSize}
                                multiple
                                
                                   
                                   
                                >
        {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
          const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
          return (
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive && 'Click here or drop a file to upload!'}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">
                  File is too large.
                </div>
              )}
            </div>
          )}
        }
      </Dropzone>
      </div>   
      <div className="loaded-Images">
      
     <ul>{loading?<p className="spinner"></p>:loadedImages}</ul>
      
      </div>
                                    <div className="upload-condition">
                                        <p>NOTE: Suggested image orientation is landscape</p>
                                        <p>Make sure that you photograph your property from as many angles as you can</p>
                                        <p>Ensure that your photographs are not misleading or hide any important information from buyer</p>
                                    </div>
                                </div>
                                <div className="saperater"></div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-submit back-btn-outer">
                                             <Link to = '/property-value' className="form-custom-back-btn" id="screen-four-bk-btn"><i class="fa fa-angle-left" aria-hidden="true"></i>Back</Link>
                                            <button onClick={onSubmitHandler}  className="form-custom-btn" id="screen-four-btn">Save & continue</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
        </div>

        <div className="photograph-popup-outer">
            <div className="photo-popup">
            <i className="fa fa-close popup-close" aria-hidden="true"></i>
            <div className="pop-slider-wrap">
            <Carousel>
                {
                    sliderImage.map(sliderImage=>{
                        return(   
                                <div className="pop-image">
                                   <img src={sliderImage.image}/>
                                </div>                           
                        )
                    })
                }
                 </Carousel>
            </div>
            </div>
        </div>
        </div>
    )
}

export default PropertyPhotograph;