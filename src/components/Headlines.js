import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';



const onTabchangeOne = ()=> {
    document.querySelector(".no-photographer").classList.remove("active");
    // document.querySelector(".floor-deside-tab").classList.remove("active");
    document.querySelector(".need-photographer").classList.add("active");
    document.querySelector(".need-photographer-content-outer").classList.remove("display-none");
    document.querySelector(".no-photographer-content").classList.add("display-none");
    // document.querySelector(".floorplan-deside-later").classList.add("display-none");
    document.querySelector(".floor-plan-save-btn").classList.remove("display-none");
    // document.querySelector(".continue-without-btn").classList.add("display-none");
    //document.querySelector(".photogallery-btn-outer").classList.remove("display-none");
}

const onTabchangeTwo = () => {
    document.querySelector(".need-photographer").classList.remove("active");
    // document.querySelector(".floor-deside-tab").classList.remove("active");
    document.querySelector(".no-photographer").classList.add("active");
    document.querySelector(".no-photographer-content").classList.remove("display-none");
    document.querySelector(".need-photographer-content-outer").classList.add("display-none");
    // document.querySelector(".floorplan-deside-later").classList.add("display-none"); 
    document.querySelector(".floor-plan-save-btn").classList.remove("display-none"); 
    // document.querySelector(".continue-without-btn").classList.add("display-none");
    //document.querySelector(".photogallery-btn-outer").classList.add("display-none");
}

// const onTabchangeThree = () =>{
//     document.querySelector(".no-photographer").classList.remove("active");
//     document.querySelector(".need-photographer").classList.remove("active");
//     document.querySelector(".floor-deside-tab").classList.add("active");
//     document.querySelector(".need-photographer-content-outer").classList.add("display-none");
//     document.querySelector(".no-photographer-content").classList.add("display-none");
//     document.querySelector(".floorplan-deside-later").classList.remove("display-none");
//     document.querySelector(".floor-plan-save-btn").classList.add("display-none");
//     document.querySelector(".continue-without-btn").classList.remove("display-none");
// }

function Headlines(props){

     const contentDetailsURL = 'https://findmybuyer.co.uk/api/property-step8-contentwriter'
     const postContentURL = 'https://findmybuyer.co.uk/api/property-step8-contentwriter-select'
     const descURL = 'https://findmybuyer.co.uk/api/property-step8-contentwriter-content'
     const propId = localStorage.getItem('property-id');
     const[contentDetails,setContentDetails] = useState('')
     const [content,setContent] = useState('')

 useEffect(()=>{
     axios.get(contentDetailsURL)
     .then(res=>{
        setContentDetails(res.data.ContentwriterData[0])
        console.log(res.data.ContentwriterData[0])
     })
     
     
 },[])

 useEffect(()=>{
    document.querySelector('.description-textarea').value = localStorage.getItem('main-description');
    if(localStorage.getItem('content-detal')){
        document.getElementById('need-photographer').checked = true;  
    }
    console.log(contentDetails.price_range_id)
 })

const headchange = ()=>{
    localStorage.setItem('main-description',document.querySelector('.description-textarea').value)
}

 const checkBoxChecked = (e) => {
    
     if(e.target.checked){        
        setContent(contentDetails.price_range_id)
         localStorage.setItem('content-detal','contentDetal')
         axios.post(postContentURL,{property_id:propId,content:contentDetails.price_range_id})
     }else {
        axios.post(postContentURL,{property_id:propId,content:null})
        setContent(null)
        localStorage.removeItem('content-detal')
     }
     
    //alert(document.getElementById('need-photographer').checked)
    //  if(document.getElementById('need-photographer').checked){
    //     axios.post(postContentURL,{property_id:propId,content:contentDetails.price_range_id})
    //     .then(res=>{
    //         console.log(res)
            
    //     })

    // }else{
    //     axios.post(postContentURL,{property_id:propId,content:null})
    //     .then(res=>{
    //         console.log(res)
    //     })
    // }


    //  if(e.target.checked){
       
    //     localStorage.setItem('desc-checked','descChecked')
    //    }else {
    //     localStorage.removeItem('desc-checked')
    //     setPhoto(null)  
    //    }
 }

const onSubmitHandler = () => {
    // if(document.getElementById('need-photographer').checked){
    //     axios.post(postContentURL,{property_id:propId,content:contentDetails.price_range_id})
    //     .then(res=>{
    //         console.log(res)
            
    //     })

    // }else{
    //     axios.post(postContentURL,{property_id:propId,content:null})
    //     .then(res=>{
    //         console.log(res)
    //     })
    // }



    // if(document.querySelector('.description-textarea').value == 0) {
    //     document.querySelector(".need-photographer-content-outer").classList.add("display-none");
    //     document.querySelector(".no-photographer-content").classList.remove("display-none"); 
    //     document.querySelector(".need-photographer").classList.remove("active");
    //     document.querySelector(".no-photographer").classList.add("active");
    //     document.querySelector('.error').innerHTML = 'field required'
    // }else
    
        document.querySelector('.error').innerHTML = '';
        const descdetails = {
            content:localStorage.getItem('main-description'),
            property_id:propId
        }
        axios.post(descURL,descdetails)
        .then(res=>{
            console.log(res)
        })

        
       
        props.history.push('/selectedItems')
   
   
   
}


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
                        <div className="second-ready second-finished"></div>
                        <div className="third-ready third-finshed"></div>
                        <div className="four-ready"></div>
                        
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
                                <li className="need-photographer active" onClick={onTabchangeOne}><span>I need a Content writer</span></li>
                                <li className="no-photographer" onClick={onTabchangeTwo}><span>Write own content</span></li>
                                {/* <li className="floor-deside-tab" onClick={onTabchangeThree}><span>Deside later</span></li> */}
                            </ul>
                            <div className="photographer-content-outer">
                                <div className="need-photographer-content-outer">
                                    <div className="professional-photographer">
                                        <div className="camera-img">
                                      <i class="fa fa-file" aria-hidden="true"></i>
                                        </div>
                                        <div className="photographer-description-outer">
                                            <div className="photographer-description">
                                                <h5>Professional writer</h5>
                                                <p>{contentDetails.description}</p>
                                            </div>
                                            <div className="photographer-price">
                                                <h4>£{contentDetails.amount}</h4>
                                                <input type="checkbox" id="need-photographer" onChange={checkBoxChecked}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="photogallery-btn-outer">
                                    <a href="#" className="photo-gallery-btn">View sample</a>
                                    <p className="photographer-note">Our photographer will be in touch shortly to arrange a convenient time to visit your property</p>
                                </div> */}
                            </div>
                            <div className="no-photographer-content display-none">
                                <div className="row">                                   
                                    <div className="col-md-12">
                                        <div className="form-group">
                                        <label>Main description</label>                                 
                                  
                                  <textarea className="description-textarea form-control" onChange={headchange}></textarea>
                                  <p className="error"></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="loaded-Images">
                                <ul>
                                {/* {loadedImages} */}
                                </ul>
                                </div>
                               
                            </div>
                            {/* <div className="floorplan-deside-later display-none">
                                        <h5>No problem</h5>
                                        <p>Continue without floorplan and deside later (although we wouldnt recomment it)                                           
                                        </p>
                                        <p>You can always add a floorplan as an option extra later</p>
                                    </div> */}
                                    <div className="saperater"></div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-submit back-btn-outer">
                                                <Link to="/property-document" className="form-custom-back-btn" id="screen-five-bk-btn"><i className="fa fa-angle-left" aria-hidden="true"></i>Back</Link>
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

export default Headlines;