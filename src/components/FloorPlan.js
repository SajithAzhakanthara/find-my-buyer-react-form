
import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import sample from '../images/floorplan.jpg';

function FloorPlan (props){

    const[floorDetails, setFloorDetails] = useState([]);
    const[loading,setLoading]= useState(false);
    const[floor, setFloor] = useState('');
    const[upImages,setUpImages]=useState([])
    const maxSize = 100000000
     const prop_id = localStorage.getItem('property-id')
    //const prop_id = 22
    const allfloorURL = "https://findmybuyer.co.uk/api/property-step6-floorPlan/";
    const imgURL = 'https://findmybuyer.co.uk/storage/app/properties/floorplan/';
    const deleteImgURL = 'https://findmybuyer.co.uk/api/property-step6-floorPlan-delete';
    const baseURL = "https://findmybuyer.co.uk/api/property-form-step6-floorplan-upload"
    const floorURL = 'https://findmybuyer.co.uk/api/property-form-step6-floorplan-select';
    const floorplanDetailsURL = 'https://findmybuyer.co.uk/api/property-step6-floorplan';

  


    const onTabchangeOne = ()=> {
        document.querySelector(".no-photographer").classList.remove("active");
        document.querySelector(".floor-deside-tab").classList.remove("active");
        document.querySelector(".need-photographer").classList.add("active");
        document.querySelector(".need-photographer-content-outer").classList.remove("display-none");
        document.querySelector(".no-photographer-content").classList.add("display-none");
        document.querySelector(".floorplan-deside-later").classList.add("display-none");
        document.querySelector(".floor-plan-save-btn").classList.remove("display-none");
        document.querySelector(".continue-without-btn").classList.add("display-none");
        //document.querySelector(".photogallery-btn-outer").classList.remove("display-none");
    }
    
    const onTabchangeTwo = () => {
        document.querySelector(".need-photographer").classList.remove("active");
        document.querySelector(".floor-deside-tab").classList.remove("active");
        document.querySelector(".no-photographer").classList.add("active");
        document.querySelector(".no-photographer-content").classList.remove("display-none");
        document.querySelector(".need-photographer-content-outer").classList.add("display-none");
        document.querySelector(".floorplan-deside-later").classList.add("display-none"); 
        document.querySelector(".floor-plan-save-btn").classList.remove("display-none"); 
        document.querySelector(".continue-without-btn").classList.add("display-none");
        //document.querySelector(".photogallery-btn-outer").classList.add("display-none");
    }

    const onTabchangeThree = () =>{
        document.querySelector(".no-photographer").classList.remove("active");
        document.querySelector(".need-photographer").classList.remove("active");
        document.querySelector(".floor-deside-tab").classList.add("active");
        document.querySelector(".need-photographer-content-outer").classList.add("display-none");
        document.querySelector(".no-photographer-content").classList.add("display-none");
        document.querySelector(".floorplan-deside-later").classList.remove("display-none");
        document.querySelector(".floor-plan-save-btn").classList.add("display-none");
        document.querySelector(".continue-without-btn").classList.remove("display-none");
    }
    
     useEffect(()=>{
        axios.get(allfloorURL+prop_id)
        .then(res=>{
            setUpImages(res.data.floorplan);
            console.log(res.data)
        })

        axios.get(floorplanDetailsURL)
        .then(res=>{
            res.data.FloorPlanData.map(FloorPlanData=>{
                setFloorDetails(FloorPlanData)
            })
           
        })
     },[])
    
     
     

    // }
    const onDrop = (files) => { 
        setLoading(true)         
       // setFileupload(files)
       console.log(files)       
        const fd = new FormData();
        
        files.map((file)=>{
            fd.append('floorplan',file,file.name)   
            fd.append('property_id',prop_id)  
        })
                            
        axios.post(baseURL,fd,prop_id)        
        .then(res =>{  
            setUpImages(res.data.floor_plan);          
            console.log(res.data.floor_plan)
            setLoading(false)
        })
        setTimeout(()=>{
            axios.get(allfloorURL+prop_id)
        .then(res=>{
            setUpImages(res.data.floorplan);
            console.log(res.data)
        })
        },1000)
       
    }
    useEffect(()=>{
        console.log(upImages.floorplan)
        if(localStorage.getItem('floor-checked')){
            document.getElementById('need-photographer').checked = true; 
        }
    })

  





 
    const onChangeHandler = (e) =>{
       if(e.target.checked){
        setFloor(floorDetails.price_range_id);
        localStorage.setItem('floor-checked','floorChecked');
        axios.post(floorURL,{property_id:prop_id,floorplan:floorDetails.price_range_id})
       }else{
        localStorage.removeItem('floor-checked')  ;
        axios.post(floorURL,{property_id:prop_id,floorplan:null})
        setFloor(null);
       }
    }

    const onDeletehandler=()=>{
        axios.post(deleteImgURL,{property_id:prop_id})
        
        .then(res=>{
            console.log(res)
        })

        setTimeout(()=>{
            axios.get(allfloorURL+prop_id)
            .then(res=>{
                setUpImages(res.data);
                console.log(res.data)
            })
        },1000)
    }





    const onSubmitHandler = () =>{
        // e.preventDefault();
        // console.log(photo)
        //axios.post(floorURL,{property_id:prop_id,floorplan:floor})
        //.then(res=>console.log(res))
       


        // if(document.getElementById('need-photographer').checked){            
        //     axios.post(floorURL,{property_id:prop_id,floorplan:floorDetails.price_range_id})
        //    }else{
        //     //axios.post(floorURL,{property_id:prop_id,floorplan:floorDetails.price_range_id})
        //     axios.post(floorURL,{property_id:prop_id,floorplan:null})
        //    }
           props.history.push('/property-document')
    }
    
//     const loadedImages = upImages.map(upImage=>{
//        return(          
                          
//        )
//    })

const loadedImages = upImages.length ? upImages.map(upImage=>{
    return(          
        upImage.floor_plan != null?<li>
                <span className="allImage-outer">
                   <i class="fa fa-times-circle-o" aria-hidden="true" id={upImage.image_id} onClick={onDeletehandler}></i>
                    {loading?<p>loading</p>:<img src={imgURL+upImage.floor_plan}/>}
                 </span>
            </li>:<li></li>           
    )
}):<div></div>




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
                        <div className="first-ready first-finished"></div>
                        <div className="second-ready"></div>
                        
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
                                <li className="need-photographer active" onClick={onTabchangeOne}><span>I need a floorplan</span></li>
                                <li className="no-photographer" onClick={onTabchangeTwo}><span>Upload own floorplan</span></li>
                                <li className="floor-deside-tab" onClick={onTabchangeThree}><span>Decide later</span></li>
                            </ul>
                            <div className="photographer-content-outer">
                                <div className="need-photographer-content-outer">
                                    <div className="professional-photographer">
                                        <div className="camera-img">
                                        <i class="fa fa-map-o" aria-hidden="true"></i>
                                        </div>
                                        <div className="photographer-description-outer">
                                            <div className="photographer-description">
                                                <h5>Professional floorplan</h5>
                                                <p>{floorDetails.description}</p>
                                            </div>
                                            <div className="photographer-price">
                                                <h4>£{floorDetails.amount}</h4>
                                                <input type="checkbox" id="need-photographer" onChange={onChangeHandler}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="photogallery-btn-outer">
                                       <h6>Sample floorplan</h6>
                                       <img src={sample}/>
                                    </div>
                            </div>
                                </div>
                                
                            <div className="no-photographer-content display-none">
                                
                            <div className="dropzone-outer">
                            <Dropzone
                            onDrop={onDrop}
                            accept="image/*"
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
  <div className="loaded-Images">
  <ul>{loading?<p className="spinner"></p>:loadedImages}</ul>
   {/* <ul>
   {loading?<p className="spinner"></p>:
 <li>
                   
                      
                       { upImages.floorplan?
                       <span className="allImage-outer">
                           <i class="fa fa-times-circle-o" aria-hidden="true" id={upImages.floorplan} onClick={onDeletehandler}></i>
                           <img src={imgURL+upImages.floorplan}/>
                          
                           </span>:
                           <p></p > 
                       }
                   
               </li>
               
               }
   


   </ul> */}
  </div>
  <div className="sample-floorplan">
                                            {/* <h5>Sample image</h5>
                                            <img src="images/sample-floorplan.png" alt=""/> */}
                                        </div>
                            </div>
                            <div className="floorplan-deside-later display-none">
                                        <h5>No problem</h5>
                                        <p>Continue without floorplan and deside later (although we wouldnt recomment it)                                           
                                        </p>
                                        <p>You can always add a floorplan as an option extra later</p>
                                    </div>
                                    <div className="saperater"></div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-submit back-btn-outer">
                                                <Link to="/property-video" className="form-custom-back-btn" id="screen-five-bk-btn"><i className="fa fa-angle-left" aria-hidden="true"></i>Back</Link>
                                                <Link to="/property-document" className="form-custom-btn continue-without-btn screen-five-without display-none">Skip</Link>
                                                <button onClick={onSubmitHandler} className="form-custom-btn floor-plan-save-btn" id="screen-five-btn">Save & continue</button>
                                            </div>
                                        </div>
                                    </div>
                        </div>
    </div>
    </div>
    )
}

export default FloorPlan;