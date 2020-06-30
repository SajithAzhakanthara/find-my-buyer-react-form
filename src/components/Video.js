
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';

function Video (props){

    const[videoDetails, setVideoDetails] = useState([]);
    const[loading,setLoading]= useState(false);
    const[video, setVideo] = useState('');
    const[upVideo,setUpVideo]=useState([])
    const maxSize = 100000000
    const prop_id = localStorage.getItem('property-id')
    const allImgURL = "https://findmybuyer.co.uk/test/api/property-step5-uploaded-video/";
    const imgURL = 'https://findmybuyer.co.uk/test/storage/app/properties/propertyVideos/';
    const deleteImgURL = 'https://findmybuyer.co.uk/test/api/property-step5-video-delete';
    const baseURL = "https://findmybuyer.co.uk/test/api/property-step5-video-upload";
    const videograbperURL = 'https://findmybuyer.co.uk/test/api/property-form-step5-videographer-select';
    const vedioDetailsURL = 'https://findmybuyer.co.uk/test/api/property-step5-videographer';




    const onTabchangeOne = ()=> {
        //document.querySelector(".no-photographer").classList.remove("active");
        document.querySelector(".floor-deside-tab").classList.remove("active");
        document.querySelector(".need-photographer").classList.add("active");
        document.querySelector(".need-photographer-content-outer").classList.remove("display-none");
        document.querySelector(".no-photographer-content").classList.add("display-none");
        document.querySelector(".floorplan-deside-later").classList.add("display-none");
        document.querySelector(".floor-plan-save-btn").classList.remove("display-none");
        document.querySelector(".continue-without-btn").classList.add("display-none");
        //document.querySelector(".photogallery-btn-outer").classList.remove("display-none");
    }
    
    // const onTabchangeTwo = () => {
    //     document.querySelector(".need-photographer").classList.remove("active");
    //     document.querySelector(".floor-deside-tab").classList.remove("active");
    //     document.querySelector(".no-photographer").classList.add("active");
    //     document.querySelector(".no-photographer-content").classList.remove("display-none");
    //     document.querySelector(".need-photographer-content-outer").classList.add("display-none");
    //     document.querySelector(".floorplan-deside-later").classList.add("display-none"); 
    //     document.querySelector(".floor-plan-save-btn").classList.remove("display-none"); 
    //     document.querySelector(".continue-without-btn").classList.add("display-none");
    //     //document.querySelector(".photogallery-btn-outer").classList.add("display-none");
    // }

    const onTabchangeThree = () =>{
       // document.querySelector(".no-photographer").classList.remove("active");
        document.querySelector(".need-photographer").classList.remove("active");
        document.querySelector(".floor-deside-tab").classList.add("active");
        document.querySelector(".need-photographer-content-outer").classList.add("display-none");
        document.querySelector(".no-photographer-content").classList.add("display-none");
        document.querySelector(".floorplan-deside-later").classList.remove("display-none");
        document.querySelector(".floor-plan-save-btn").classList.add("display-none");
        document.querySelector(".continue-without-btn").classList.remove("display-none");
    }
    
     useEffect(()=>{
        // axios.get(allImgURL+prop_id)
        // .then(res=>{
        //     setUpImages(res.data.Images);
        // })
        axios.get(vedioDetailsURL)
        .then(res=>{
            res.data.VideographerData.map(VideographerData=>{
                setVideoDetails(VideographerData)
            })
            
        })
        axios.get(allImgURL+prop_id)
        .then(res=>{
            setUpVideo(res.data);
            console.log(res.data)
        })
     },[])
    
     useEffect(()=>{
        if( localStorage.getItem('video-checked')){
            document.getElementById('need-photographer').checked = true;   
           }
     })
     

    // }
    const onDrop = (files) => { 
      if (!document.getElementById('vemio-video').value){
        setLoading(true)       
        // setFileupload(files)
        console.log(files[0].type)       
         const fd = new FormData();
         setUpVideo(files[0])
         localStorage.setItem('added-video',upVideo)
       
         files.map((file)=>{
             fd.append('video',file,file.name)   
             fd.append('property_id',prop_id)  
         })
                             
         axios.post(baseURL,fd,prop_id,{type:1})        
         .then(res =>{  
             setUpVideo(res.data); 
             setLoading(false)           
             console.log(res.data.filename)
         })
 
         setTimeout(()=>{
             axios.get(allImgURL+prop_id)
         .then(res=>{
             setUpVideo(res.data);
         })
         },1000)
      }else {
          document.querySelector('.error').innerHTML = "Only one field is allowed"
      }
        
    }
    console.log(upVideo)
    const onDeletehandler = (e) =>{
       // alert(e.target.id)
        //property_id, image_id
        
        axios.post(deleteImgURL,{property_id:prop_id,image_id:e.target.id})
        .then(res=>console.log(res))

        setTimeout(()=>{
            axios.get(allImgURL+prop_id)
        .then(res=>{
            setUpVideo(res.data);
        })
        },1000)
    }
    const onChangeHandler = (e) =>{

       if(e.target.checked){
        setVideo(videoDetails.price_range_id);
        localStorage.setItem('video-checked','videoChecked')
        axios.post(videograbperURL,{property_id:prop_id,videographer:videoDetails.price_range_id})
       }else{
           localStorage.removeItem('video-checked') ;
           axios.post(videograbperURL,{property_id:prop_id,videographer:null})
           setVideo(null);
       }
    }
    const onSubmitHandler = () =>{
        // e.preventDefault();
        // console.log(photo)
        if (document.getElementById('vemio-video').value){
            axios.post(baseURL,prop_id,{type:0,videoURI:document.getElementById('vemio-video').value})        
            .then(res =>{  
                setUpVideo(res.data);                   
                console.log(res.data.filename)
            })
        }
        // axios.post(videograbperURL,{property_id:prop_id,videographer:video})
        // .then(res=>console.log(res))
       

        // if(document.getElementById('need-photographer').checked){            
        //     axios.post(videograbperURL,{property_id:prop_id,videographer:videoDetails.price_range_id})
        //    }else{
        //     axios.post(videograbperURL,{property_id:prop_id,videographer:null})
        //    }
           props.history.push('/property-floor')
    }
    
//     const loadedImages = upVideo.map(upVideo=>{
//        return(          
                        
//        )
//    })

    return(
        <div>
        <section className="progress-outer">
            <div className="progress-wrap">
                <ul>
                    <li>
                            <div className="first-ready first-finished"></div>
                            <div className="second-ready second-finished"></div>
                            <div className="third-ready third-finshed"></div>
                            <div className="four-ready four-finished"></div>

                            <h4>1</h4>
                    </li>
                    <li>
                        <div className="first-ready"></div>
                        
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
                                <li className="need-photographer active" onClick={onTabchangeOne}><span>I need a videographer</span></li>
                                {/* <li className="no-photographer" onClick={onTabchangeTwo}><span>Upload own videos</span></li> */}
                                <li className="floor-deside-tab" onClick={onTabchangeThree}><span>Decide later</span></li>
                            </ul>
                            <div className="photographer-content-outer">
                                <div className="need-photographer-content-outer">
                                    <div className="professional-photographer">
                                        <div className="camera-img">
                                        <i class="fa fa-video-camera" aria-hidden="true"></i>
                                        </div>
                                        <div className="photographer-description-outer">
                                            <div className="photographer-description">
                                                <h5>Professional videographer</h5>
                                                <p>{videoDetails.description}</p>
                                            </div>
                                            <div className="photographer-price">
                                                <h4>£{videoDetails.amount}</h4>
                                                <input type="checkbox" id="need-photographer" onChange={onChangeHandler}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="photogallery-btn-outer">
                                    <h6>Sample video</h6>
                                    <iframe src="https://player.vimeo.com/video/386783693"></iframe>
                                </div>
                                </div>
                                
                            </div>
                            <div className="no-photographer-content display-none">
                            <div className="vemio-outer">
                                <div className="form-group">
                                    <label>Vemio video URL</label>
                                    <input id="vemio-video" type="text" className="form-control"/>
                                </div>
                            </div>
                             <h5 className="or-saperator">OR</h5>
                            <div className="dropzone-outer">
                            <Dropzone
                            onDrop={onDrop}
                            //accept="image/*"
                            minSize={0}
                            maxSize={maxSize}
                            
                            
                               
                               
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
  <p className="error"></p>   
  <div className="loaded-Images">
   <ul>
       { loading?<p className="spinner"></p>:<li>
       {
           upVideo.filename?
           <span className="allImage-outer">
       <i class="fa fa-times-circle-o" aria-hidden="true" id={upVideo.filename} onClick={onDeletehandler}></i>
        <video autoPlay muted>
         <source src={imgURL+upVideo.filename} type="video/webm"/>   
         <source src={imgURL+upVideo.filename} type="video/ogg"/>         
          <source src={imgURL+upVideo.filename} type="video/mp4"/>      
        </video>  
        </span> :<li></li>
       }
            
                   
               </li> } 
   </ul>
  </div>
  <div className="sample-floorplan">
                                            {/* <h5>Sample image</h5>
                                            <img src="images/sample-floorplan.png" alt=""/> */}
                                        </div>
                            </div>
                            <div className="floorplan-deside-later display-none">
                                        <h5>No problem</h5>
                                        <p>Continue without video and deside later</p>                                       
                                        
                                        <p>You can always add a video as an option extra later</p>
                                    </div>
                                    <div className="saperater"></div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-submit back-btn-outer">
                                                <Link to="/property-photo" className="form-custom-back-btn" id="screen-five-bk-btn"><i className="fa fa-angle-left" aria-hidden="true"></i>Back</Link>
                                                <Link to="/property-floor" className="form-custom-btn continue-without-btn screen-five-without display-none">Skip</Link>
                                                <button onClick={onSubmitHandler} className="form-custom-btn floor-plan-save-btn" id="screen-five-btn">Save & continue</button>
                                            </div>
                                        </div>
                                    </div>
                        </div>
    </div>
    </div>
    )
}

export default Video;