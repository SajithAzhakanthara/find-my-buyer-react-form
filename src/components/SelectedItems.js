import React,{useEffect,useState} from 'react';
import axios from 'axios';
import './SelectedItems.css';
import{Link, Redirect} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import {toast} from 'react-toastify';

toast.configure();

function SelectedItems(props){

     const [photoDetails,setPhotoDetails] = useState();
     const [floorDetails,setFloorDetails] = useState();
     const [videoDetails,setVideoDetails] = useState();
     const [contentDetails,setContentDetails] = useState();

     const [photoAmount,setPhotoAmount] = useState();
     const [floorAmount,setFloorAmount] = useState();
     const [videoAmount,setVideoAmount] = useState();
     const [contentAmount,setContentAmount] = useState();











    

     const propId = localStorage.getItem('property-id');
     const allDetailURL = 'https://findmybuyer.co.uk/test/api/property-featured-list/'
     const deleteURL = 'https://findmybuyer.co.uk/test/api/property-featured-delete'

    useEffect(()=> {
      axios.get(allDetailURL+propId)
      .then(res=>{
          console.log(res.data)
          setContentAmount(res.data.TotalAmount)

          if(res.data.PropertyFeatures.photo.price_range_id != null){
              setPhotoDetails(res.data.PropertyFeatures.photo)
          }
          if(res.data.PropertyFeatures.floor.price_range_id != null){
            setFloorDetails(res.data.PropertyFeatures.floor)
          }
          if(res.data.PropertyFeatures.video.price_range_id != null){
            setVideoDetails(res.data.PropertyFeatures.video)
          }
          if(res.data.PropertyFeatures.content.price_range_id != null){
            setContentDetails(res.data.PropertyFeatures.content)
          }
          console.log(res.data.PropertyFeatures.video.price_range_id)
          
      })

     
     
    },[])

    console.log(contentAmount)

    const photoDeleteHandler = () =>{
        const deleteDetails = {
            property_id:propId,
            item:photoDetails.name
        }
        axios.post(deleteURL,deleteDetails)
        .then(res=>{
            console.log(res)
            setPhotoDetails(null)
            setContentAmount(res.data.TotalAmount)
            localStorage.removeItem('photo-checked') 
        })
        localStorage.removeItem('photo-checked')

    }

    const floorDeleteHandler = () =>{
        const deleteDetails = {
            property_id:propId,
            item:floorDetails.name
        }
        axios.post(deleteURL,deleteDetails)
        .then(res=>{
            console.log(res)           
            setFloorDetails(null)
            setContentAmount(res.data.TotalAmount)
            localStorage.removeItem('floor-checked') 
        })
        localStorage.removeItem('floor-checked')
    }

    const videoDeleteHandler = () =>{
        const deleteDetails = {
            property_id:propId,
            item:videoDetails.name
        }
        axios.post(deleteURL,deleteDetails)
        .then(res=>{
            console.log(res)    
            setVideoDetails(null)
            setContentAmount(res.data.TotalAmount)        
            localStorage.removeItem('video-checked')         
        })
    }

    const contentDeleteHandler = () =>{
        const deleteDetails = {
            property_id:propId,
            item:contentDetails.name
        }
        axios.post(deleteURL,deleteDetails)
        .then(res=>{
            console.log(res)            
            setContentDetails(null)
            setContentAmount(res.data.TotalAmount)
            localStorage.removeItem('content-detal')
        })
        localStorage.removeItem('content-detal')
    }


//   useEffect(()=>{
//     if(photoDetails){
//         setPhotoAmount(photoDetails.amount)
//     }
//     if(floorDetails){
//         setFloorAmount(floorDetails.amount)
//     }
//     if(videoDetails){
//         setVideoAmount(videoDetails.amount)
//     }
//     if(contentDetails){
//         setVideoAmount(videoDetails.amount)
//     }
//     console.log(photoAmount)
  
//   })
     const removeDialog = (e)=>{
         e.preventDefault()
         document.querySelector('.err-outer').classList.add('err-none')
     }
  
  const payHandler = () =>{
      if(document.querySelector('#payHandler').checked){
          document.querySelector('.payMent').classList.remove('payment-none')
      }else{
        document.querySelector('.payMent').classList.add('payment-none')
      }
  }

    const tockenHandler = (token) => {

        
      const stripeToken = token    
      const totalAmount = contentAmount
      const propertyId  = localStorage.getItem('property-id')
      const stripeDetails = {
        totalAmount,
        stripeToken,
        propertyId
       }

       
        axios.post('https://findmybuyer.co.uk/test/api/stripePost',stripeDetails)
        .then(res=>{
            console.log(res.data.status)
            if(res.data.status ==='success'){
                //props.history.push('')
                window.location.replace('https://findmybuyer.co.uk/test/api/property-payment-success')
                localStorage.clear();
               
            }else{
                document.querySelector('.err-outer').classList.remove('err-none')
               
            }
        })
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
                        <div className="four-ready four-finished"></div>
                        
                        <h4>2</h4>
                    </li>
                    <li>
                       <div className="first-ready"></div>
                        <h4>3</h4>
                    </li>
                </ul>
            </div>
        </section>
            <div className="upload-property-outer">
            <h1>Selected services</h1>
            <div className="selected-items-outer">
                <div className="need-photographer-content-outer">
                        <div className="professional-photographer">
                            <div className="camera-img">
                            <i class="fa fa-camera" aria-hidden="true"></i>
                            </div>
                            <div className="photographer-description-outer">
                                <div className="photographer-description">
                                    <h5>Property Upload</h5>                                                    
                                </div>
                                <div className="photographer-price">
                                   <h4>£199</h4>                                                   
                                </div>
                                <button onClick = {photoDeleteHandler} className="delete new-delete">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
                {
                   photoDetails != null?
                   <div className="selected-items-outer">
                <div className="need-photographer-content-outer">
                        <div className="professional-photographer">
                            <div className="camera-img">
                            <i class="fa fa-camera" aria-hidden="true"></i>
                            </div>
                            <div className="photographer-description-outer">
                                <div className="photographer-description">
                                    <h5>{photoDetails.name}</h5>                                                    
                                </div>
                                <div className="photographer-price">
                                   <h4>£{photoDetails.amount}</h4>                                                   
                                </div>
                                <button onClick = {photoDeleteHandler} className="delete">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>:
                <div></div>
                }
                {
                   floorDetails != null?
                   <div className="selected-items-outer">
                <div className="need-photographer-content-outer">
                        <div className="professional-photographer">
                            <div className="camera-img">
                            <i class="fa fa-map-o" aria-hidden="true"></i>
                            </div>
                            <div className="photographer-description-outer">
                                <div className="photographer-description">
                                    <h5>{floorDetails.name}</h5>                                                    
                                </div>
                                <div className="photographer-price">
                                    {<h4>£{floorDetails.amount}</h4>}                                                    
                                </div>
                                <button onClick={floorDeleteHandler} className="delete">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>:
                <div></div>
                }
                {
                   videoDetails != null?
                   <div className="selected-items-outer">
                <div className="need-photographer-content-outer">
                        <div className="professional-photographer">
                            <div className="camera-img">
                            <i class="fa fa-video-camera" aria-hidden="true"></i>
                            </div>
                            <div className="photographer-description-outer">
                                <div className="photographer-description">
                                    <h5>{videoDetails.name}</h5>                                                    
                                </div>
                                <div className="photographer-price">
                                    {<h4>£{videoDetails.amount}</h4>}                                                    
                                </div>
                                <button onClick={videoDeleteHandler} className="delete">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>:
                <div></div>
                }
                {
                   contentDetails != null?
                   <div className="selected-items-outer">
                <div className="need-photographer-content-outer">
                        <div className="professional-photographer">
                            <div className="camera-img">
                            <i class="fa fa-file" aria-hidden="true"></i>
                            </div>
                            <div className="photographer-description-outer">
                                <div className="photographer-description">
                                    <h5>{contentDetails.name}</h5>                                                    
                                </div>
                                <div className="photographer-price">
                                    {<h4>£{contentDetails.amount}</h4>}                                                    
                                </div>
                                <button onClick={contentDeleteHandler} className="delete">Remove</button>
                            </div>
                        </div>
                    </div>
                </div>:
                <div></div>
                }

                <div className="iagree">
                    <p>Prior to purchase you hereby agree to our terms and conditions and privacy policy</p>
                    <input id="payHandler" type="checkbox" onClick={payHandler}/>I agree
                </div>
                <div className="saperater"></div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-submit back-btn-outer">
                                <Link to="/property-headlines" className="form-custom-back-btn" id="screen-five-bk-btn"><i className="fa fa-angle-left" aria-hidden="true"></i>Back</Link>                               
                                {/* <a href="http://developerhire.com/project/fmb/public/home" className="form-custom-btn floor-plan-save-btn" id="screen-five-btn">Save & continue</a> */}
                                <div className="payMent payment-none">
                                <StripeCheckout
                                stripeKey = "pk_live_oQBPDXWS9mp95zu7cZ0Q74jp008UucB616"
                                token={tockenHandler}
                                billingAddress
                                shippingAddress
                                amount={contentAmount*100}
                                currency="GBP"
                                />
                                </div>
                            </div>
                        </div>
                    </div>
               </div>

               <div className="err-outer err-none">
               <div className="err-dialoge">
               <h1>Payment failed, please try again</h1>               
               <button class="btn " onClick={removeDialog}>Try again</button>
               </div>
               </div>
        </div>
    )
}

export default SelectedItems;

