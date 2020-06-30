import React, { useState, useEffect,useContext } from 'react';
import axios from 'axios';
import './PropertyDetails.css';




     
function PropertyDetail(props){
     
const[userData,setUserData] = useState([])
const[countryData,setCountryData]=useState([]) 
const [newAddress,setnewAddress]= useState('')
const [postcodeVal,setPostcodeVal]= useState('')
//const [checkValue,setCheckValue]=useState(false)  
const constURL = 'https://findmybuyer.co.uk/test'
const stepurlpost = `${constURL}/api/property-form-step1`    
const stepurlget = `${constURL}/api/property-form/test`    

   useEffect(()=>{      
     fetch(stepurlget)
     .then(res => res.json())
     .then (data => {
          console.log(data.users)
          setUserData(data.users);
          setCountryData(data.country); 
          // console.log(data.users)
     })   
     // setUserData(Users.users);
     // setCountryData(Users.country);
   //localStorage.setItem('userId', "2") 

     
   },[])

   useEffect(()=>{
     //document.querySelector('#service').value = localStorage.getItem('property-type')   
    if(document.querySelector('#cust-select')){
     document.querySelector('#cust-select').value = localStorage.getItem('user-value')
    }
     document.querySelector('#country').value = localStorage.getItem('country-value')
     document.querySelector('#AddressLineOne').value = localStorage.getItem('address1-value')
     document.querySelector('#AddressLineTwo').value = localStorage.getItem('address2-value')
     document.querySelector('#AddressLineThree').value = localStorage.getItem('address3-value')
     //document.querySelector('#AddressLineFour').value = localStorage.getItem('address4-value')
     document.querySelector('#town').value = localStorage.getItem('town')
     document.querySelector('#county').value = localStorage.getItem('county')
     document.querySelector('#postcode').value = localStorage.getItem('postcode') 
          
     document.querySelector('#firstName').value = localStorage.getItem('first-name')
     document.querySelector('#lastName').value = localStorage.getItem('last-name')
     document.querySelector('#mobileNumber').value = localStorage.getItem('mobile-number')
     document.querySelector('#email').value = localStorage.getItem('email')
     if(document.querySelector('#address-select').value){
          document.querySelector('#address-select').value = localStorage.getItem('address-select')
     }
        // localStorage.setItem('userids','2')
    
         //var test = document.querySelector('.all-address-textarea li');
        
        
    
   })
console.log(userData)


   const userID = localStorage.getItem('userId')
   const userDataOption = userData.map(userData=>{
        return(       
          <option value={userData.id} id={userData.id}>{userData.fore_name}</option>       
        )
   })

//    const countryDataOption = countryData.map(countryData=>{
//           return(
//           <option value={countryData.id} id={countryData.id} >{countryData.name}</option>
//           )
//      })

     const onChangeHandler =()=>{  
          //localStorage.setItem('property-type',document.querySelector('#service').value);        
         // localStorage.setItem('user-value',document.querySelector('#cust-select').value);
         if(document.querySelector('#cust-select')){
          localStorage.setItem('user-value',document.querySelector('#cust-select').value);
         }
          localStorage.setItem('country-value',document.querySelector('#country').value);
          localStorage.setItem('address1-value',document.querySelector('#AddressLineOne').value);
          localStorage.setItem('address2-value',document.querySelector('#AddressLineTwo').value);
          localStorage.setItem('address3-value',document.querySelector('#AddressLineThree').value);
          //localStorage.setItem('address4-value',document.querySelector('#AddressLineFour').value);          
          localStorage.setItem('town',document.querySelector('#town').value);
          localStorage.setItem('county',document.querySelector('#county').value);
          localStorage.setItem('postCode',document.querySelector('#postcode').value);
          if(document.getElementById('custom-checkbox').checked){
             document.querySelector('.second-owner').classList.remove('display-none')
                      
          }else {
               document.querySelector('.second-owner').classList.add('display-none') 
          }
          
          localStorage.setItem('first-name',document.querySelector('#firstName').value);
          localStorage.setItem('last-name',document.querySelector('#lastName').value);
          localStorage.setItem('mobile-number',document.querySelector('#mobileNumber').value);
          localStorage.setItem('email',document.querySelector('#email').value);  
     //     setTimeout(()=>{
     //      localStorage.setItem('address-select',document.querySelector('#address-select').value);
     //     },1000)

          
        
          


     }
     const onAddressChangeHandler = () => {
          const addressvalue = document.getElementById('address-select').value
          axios.get(`https://findmybuyer.co.uk/test/api/property-form-getAddress/${addressvalue}`)
          .then(res=>{
               console.log(res.data)
               // document.getElementById('AddressLineOne').value = res.data.line1;
               // document.getElementById('AddressLineTwo').value = res.data.line2;
               // document.getElementById('AddressLineThree').value = res.data.line3;
               // document.getElementById('town').value = res.data.town;
               // document.getElementById('county').value = res.data.county;
               // document.getElementById('country').value = res.data.country;

          })
          setTimeout(()=>{
               localStorage.setItem('country-value',document.querySelector('#country').value);
          localStorage.setItem('address1-value',document.querySelector('#AddressLineOne').value);
          localStorage.setItem('address2-value',document.querySelector('#AddressLineTwo').value);
          localStorage.setItem('address3-value',document.querySelector('#AddressLineThree').value);
         // localStorage.setItem('address4-value',document.querySelector('#AddressLineFour').value);          
          localStorage.setItem('town',document.querySelector('#town').value);
          localStorage.setItem('county',document.querySelector('#county').value);
          localStorage.setItem('postcode',document.querySelector('#postcode').value);
          

          },1000)
     
     }

     

     const onPostcodeChangeHandler = () =>{

         
          setTimeout(()=>{
               localStorage.setItem('postCode',document.querySelector('#postcode').value)
               setPostcodeVal(document.querySelector('#postcode').value)
          },2000)
         
          var config = {
               headers: {'Access-Control-Allow-Origin': '*'}
           };
          if(document.getElementById('postcode').value.length>=6){

               const postCodeValue = document.getElementById('postcode').value;
               axios.get(`https://findmybuyer.co.uk/test/api/property-form-postcode/${postCodeValue.replace(/\s/g,'')}`)                             
               .then(res => {
                console.log(res.data)
                setnewAddress(res.data.records);
                if(res.data.records.length==0){
                    document.getElementById('postcode').classList.add('border-red');
                }else{
                    document.getElementById('postcode').classList.remove('border-red'); 
                }
                
                     //const dataRes = JSON.parse(res.data.records)
                     const ds= res.data.records.map(record=>{
                          return(
                              
                                          `<option value=${record.id}>${record.l}</option>`
                                    
                             
                               //console.log(record.id)
                          )
                     })
                     document.getElementById('address-select').innerHTML = `<option>select</option>`+ds
                     const newSelectedAddress = res.data.records.map(record=>{
                          return(
                               `<li id=${record.id}>${record.l}</li>`
                          )
                     }).join('')
                     document.getElementById('all-address-textarea-ul').innerHTML = newSelectedAddress
                     setTimeout(()=>{
                         var selectedLi = document.querySelectorAll('#all-address-textarea-ul li');
                         for (var i = 0; i < selectedLi.length; ++i) {
                          selectedLi[i].addEventListener('click',function(){
                              
                               axios.get(`https://findmybuyer.co.uk/test/api/property-form-getAddress/${this.id}`)
                               .then(res=>{                         
                                   
                                    document.getElementById('fullAddressOne').innerHTML = res.data.line1;
                                    document.getElementById('fullAddressTwo').innerHTML = res.data.line2;
                                    document.getElementById('fullAddressThree').innerHTML = res.data.line3;
                                    document.getElementById('fulltown').innerHTML = res.data.town;
                                    document.getElementById('fullCounty').innerHTML = res.data.county;
                                    document.getElementById('fullCountry').innerHTML = res.data.country;
           
                                    document.getElementById('AddressLineOne').value = res.data.line1;
                                    document.getElementById('AddressLineTwo').value = res.data.line2;
                                    document.getElementById('AddressLineThree').value = res.data.line3;
                                    document.getElementById('town').value = res.data.town;
                                    document.getElementById('county').value = res.data.county;
                                    document.getElementById('country').value = res.data.country;
           
                               })
                          })
                        }
                     },500)
                     
               })
             

          }
         
         
     }

   
 
     console.log(newAddress) 
    
     console.log(localStorage.getItem('postCode.value'))
    const onSubmit=(e)=>{

     // localStorage.setItem('property-type',document.querySelector('#service').value);        
     // localStorage.setItem('user-value',document.querySelector('#cust-select').value);
     // localStorage.setItem('country-value',document.querySelector('#country').value);
     // if(document.querySelector('#AddressLineOne').value.length!=0){
     //      localStorage.setItem('address1-value',document.querySelector('#AddressLineOne').value);
     // }
     // if(document.querySelector('#AddressLineTwo').value.length!=0){
     //      localStorage.setItem('address2-value',document.querySelector('#AddressLineTwo').value);
     // }
     // if(document.querySelector('#AddressLineThree').value.length!=0){
     //      localStorage.setItem('address3-value',document.querySelector('#AddressLineThree').value);
     // }
     // if(document.querySelector('#AddressLineFour').value.length!=0){
     //      localStorage.setItem('address4-value',document.querySelector('#AddressLineFour').value); 
     // }
     // if(document.querySelector('#town').value.length!=0){
     //      localStorage.setItem('town',document.querySelector('#town').value);
     // }
     // if(document.querySelector('#county').value.length!=0){
     //      localStorage.setItem('county',document.querySelector('#county').value);
     // }
     // if(document.querySelector('#postcode').value.length!=0){
     //      localStorage.setItem('postcode',document.querySelector('#postcode').value);
     // }

     
     
     
              
    
    
     
     localStorage.setItem('first-name',document.querySelector('#firstName').value);
     localStorage.setItem('last-name',document.querySelector('#lastName').value);
     localStorage.setItem('mobile-number',document.querySelector('#mobileNumber').value);
     localStorage.setItem('email',document.querySelector('#email').value);  








     
         e.preventDefault()
         var letters = /^[A-Za-z]+$/;
         var err = 0;
         var email = document.getElementById('email');
         var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     //     if(document.getElementById('service').value.length==0){
     //      document.getElementById('service').classList.add('border-red');
     //         err=1;
     //     }else{
     //      document.getElementById('service').classList.remove('border-red');
     //     }
     //     if(document.getElementById('cust-select').value.length==0){
     //      document.getElementById('cust-select').classList.add('border-red');
     //      err=1;
     //      }else{
     //           document.getElementById('cust-select').classList.remove('border-red');
     //      }
          // if(document.getElementById('AddressLineOne').value.length==0){
          //      document.getElementById('AddressLineOne').classList.add('border-red');
          // err=1;
          // }else{
          //      document.getElementById('AddressLineOne').classList.remove('border-red'); 
          // }
          // if(document.getElementById('AddressLineTwo').value.length==0){
          //      document.getElementById('AddressLineTwo').classList.add('border-red');
          // err=1;
          // }else{
          //      document.getElementById('AddressLineTwo').classList.remove('border-red');
          // }
          // if(document.getElementById('town').value.length==0){
          //      document.getElementById('town').classList.add('border-red');
          // err=1;
          // }else{
          //      document.getElementById('town').classList.remove('border-red');
          // }
          // if(document.getElementById('county').value.length==0){
          //      document.getElementById('county').classList.add('border-red');
          // err=1;
          // }else{
          //      document.getElementById('county').classList.remove('border-red');
          // }
          // if(document.getElementById('postcode').value.length == 0 || document.getElementById('postcode').value.replace(/\s/g,'').length >= 7 ){
          //      document.getElementById('postcode').classList.add('border-red');
          // err=1;
          // }else{
          //      document.getElementById('postcode').classList.remove('border-red');
          // }
          // if(document.getElementById('country').value.length == 0 ){
          //      document.getElementById('country').classList.add('border-red');
          // err=1;
          // }else{
          //      document.getElementById('country').classList.remove('border-red');
          // }
         
          if(document.getElementById('custom-checkbox').checked){
               if(document.getElementById('firstName').value.length == 0 || document.getElementById('firstName').value.length >= 7 ){
                    document.getElementById('firstName').classList.add('border-red');
               err=1;
               }else{
                    document.getElementById('firstName').classList.remove('border-red');
               }
               if(document.getElementById('lastName').value.length == 0 || document.getElementById('lastName').value.length >= 7 ){
                    document.getElementById('lastName').classList.add('border-red');
               err=1;
               }else{
                    document.getElementById('lastName').classList.remove('border-red');
               }
               if(document.getElementById('mobileNumber').value.length  !==11 ){
                    document.getElementById('mobileNumber').classList.add('border-red');
               err=1;
               }else if(isNaN(document.getElementById('mobileNumber').value)){
                    document.getElementById('mobileNumber').classList.add('border-red');
               
               err=1;
               }else{
                    document.getElementById('mobileNumber').classList.remove('border-red');
               }
               
               if (!filter.test(email.value)){
                    document.getElementById('email').classList.remove('border-red'); 
               err = 1;   
               }else{
                    document.getElementById('email').classList.remove('border-red');  
               }
          } 

          if(document.getElementById('postcode').classList.contains('border-red')){
               err=1
          }
          if(document.querySelector('#full-address-textarea li').innerHTML==0){
               err=1
               document.querySelector('#full-address-textarea').classList.add('border-red')
          }else{
               err=0
               document.querySelector('#full-address-textarea').classList.remove('border-red')
          }
          if(err==0){
               //alert('submited')
//                "service": "3",
//     "users": "2",
//     "AddressLineOne": "Twin Tower",
//     "AddressLineTwo": "First Floor",
//     "AddressLineThree": "3 Lane",
//     "AddressLineFour": "New York",
//     "town": "New York",
//     "county": "Test County",
//     "postcode": "NK 125",
//     "country": "1"

if (!document.querySelector('#cust-select')){
     const stepOnedetails = {
          //service:document.querySelector('#service').value,
          user:localStorage.getItem('userids'),
          country:document.querySelector('#country').value,
          AddressLineOne:document.querySelector('#AddressLineOne').value,
          AddressLineTwo:document.querySelector('#AddressLineTwo').value,
          AddressLineThree:document.querySelector('#AddressLineThree').value,
          //AddressLineFour:document.querySelector('#AddressLineThree').value,
          town:document.querySelector('#town').value,
          county:document.querySelector('#county').value,
          postCode:postcodeVal,
          firstName:localStorage.getItem('first-name'),
          lastName:localStorage.getItem('last-name'),
          mobileNumber:localStorage.getItem('mobile-number'),
          email:localStorage.getItem('email'),

          
     }
     //console.log("step-1" ,stepOnedetails);
     axios.post(stepurlpost,stepOnedetails)
     .then(res=>{
          localStorage.setItem('property-id',res.data.property_id)
          //console.log(res)
     })
      props.history.push('/property-type')
}else {
     const stepOnedetails2 = {
          //service:document.querySelector('#service').value,
          user:document.querySelector('#cust-select').value,
          country:document.querySelector('#country').value,
          AddressLineOne:document.querySelector('#AddressLineOne').value,
          AddressLineTwo:document.querySelector('#AddressLineTwo').value,
          AddressLineThree:document.querySelector('#AddressLineThree').value,
          //AddressLineFour:document.querySelector('#AddressLineThree').value,
          town:document.querySelector('#town').value,
          county:document.querySelector('#county').value,
          postCode:postcodeVal,
          firstName:localStorage.getItem('first-name').value,
          lastName:localStorage.getItem('last-name').value,
          mobileNumber:localStorage.getItem('mobile-number').value,
          email:localStorage.getItem('email').value,

}
console.log(localStorage.getItem('postCode').value)
//console.log(stepOnedetails2);
axios.post(stepurlpost,stepOnedetails2)
.then(res=>{
     localStorage.setItem('property-id',res.data.property_id)
     console.log(res)
})
 props.history.push('/property-type')

               
}
          
            }  
                       
          }
          
         
   
     

     return(
          
          
          <div>
               <section className="progress-outer">                   
                    <div className="progress-wrap">
                       <ul>
                            <li>
                                 <div className="first-ready"></div>
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
               <h1>Property details</h1>
               <form onSubmit={onSubmit}>
                   <div className="row">
                        {/* <div className="col-md-6">
                             <div className="form-group service-outer">
                                  <label>Service</label>
                                  <select className="form-control" id="service" onChange={onChangeHandler} >
                                  <option value="3">Findmybuyer (Full Estate Service)</option>
                                  <option value="4">Findmybuyer (Hybrid)</option>
                                  </select>
                                  <p class="error"></p>
                                  
                             </div>
                        </div> */}
                        {localStorage.getItem('userids')==1?<div className="col-md-6">
                             <div className="form-group user-outer">
                                  <label>Users</label>
                                  <select className="form-control" id="cust-select" onChange={onChangeHandler}>
                                       {userDataOption}                                   
                                  </select>
                                  <p class="error"></p>
                             </div>
                        </div>:""}
                        <div className="col-md-12">
                             <div className="form-group postcode-outer">
                                  <label>Postcode(if applicable)</label>
                                  <span>
                                    <input type="text" id="postcode" className="form-control" onChange={onChangeHandler}/>
                                    <i class="fa fa-search" aria-hidden="true" onClick={onPostcodeChangeHandler}></i>
                                  </span>
                                  <p class="error"></p>
                             </div>
                        </div>
                        <div className="col-md-6 no-see">
                             <div className="form-group user-outer">
                                  <label>Select address</label>
                                  <select className="form-control" id="address-select" onChange={onAddressChangeHandler}>
                                                                      
                                  </select>
                                  <p class="error"></p>
                             </div>
                        </div>
                        <div className="col-md-6">
                             <div className="form-group all-adress">
                                 <label>Select Address</label>                                 
                                 <div class="form-control all-address-textarea" id="all-address-textarea">
                                      <ul id="all-address-textarea-ul" className="all-address-textarea-ul">
                                         <li></li>
                                      </ul>
                                 </div>                           
                             </div>
                        </div>
                        <div className="col-md-6">
                             <div className="form-group">
                             <label>Full Address</label>     
                             <div class="form-control full-address-textarea" id="full-address-textarea">
                                      <ul id="full-address-textarea-ul" className="full-address-textarea-ul">
                                         <li id="fullAddressOne"></li>
                                         <li id="fullAddressTwo"></li>
                                         <li id="fullAddressThree"></li>
                                         <li id="fulltown"></li>
                                         <li id="fullCounty"></li>
                                         <li id="fullCountry"></li>
                                      </ul>
                                 </div>    
                             </div>
                        </div>
                        <div className="col-md-6 address-mega-outer no-see">
                             <div className="form-group address1-outer">
                                  <label>Address line 1</label>                                  
                                   <input type="text" id="AddressLineOne" className="form-control" onChange={onChangeHandler}/>
                                  <p class="error"></p>
                             </div>
                        </div>
                        <div className="col-md-6 address-mega-outer no-see">
                             <div className="form-group address2-outer">
                                  <label>Address line 2</label>
                                  <input type="text" id="AddressLineTwo" className="form-control" onChange={onChangeHandler}/>
                                  <p class="error"></p>
                             </div>
                        </div>
                        <div className="col-md-6 address-mega-outer no-see">
                             <div className="form-group">
                                  <label>Address line 3</label>
                                  <input type="text" id="AddressLineThree" className="form-control" onChange={onChangeHandler}/>
                                 
                             </div>
                        </div>
                        {/* <div className="col-md-6">
                             <div className="form-group">
                                  <label>Address line 4</label>
                                  <input type="text" id="AddressLineFour" className="form-control" onChange={onChangeHandler}/>
                             </div>
                        </div> */}
                        <div className="col-md-6 address-mega-outer no-see">
                             <div className="form-group town-outer">
                                  <label>Town</label>
                                  <input type="text"  id="town" className="form-control" onChange={onChangeHandler}/>
                                  <p class="error"></p>
                             </div>
                        </div>
                        <div className="col-md-6 address-mega-outer no-see">
                             <div className="form-group county-outer">
                                  <label>County</label>
                                  <input type="text" id="county" className="form-control" onChange={onChangeHandler}/>
                                  <p class="error"></p>
                             </div>
                        </div>                        
                        <div className="col-md-6 address-mega-outer no-see">
                             <div className="form-group country-outer">
                                  <label>Country</label>                                  
                                  <input className="form-control" id="country" onChange={onChangeHandler}/>
                                  <p class="error"></p>
                             </div>
                        </div>
                   </div>
                   <div className="row">
                        <div className="col-md-12">
                             <div className="form-group">
                                  <input type="checkbox" className="custom-checkbox" id="custom-checkbox" onClick={onChangeHandler}/>
                                  <label className="custom-check-label">This property has second owner</label>
                                  <span className="custom-tooltip-wrap">
                                       <i className="fa fa-question-circle" aria-hidden="true"></i>
                                       <span className="custom-tooltip-content">
                                            Does this house of multyple owner?if so please tick 'this property has multyple owners' and fill in the details
                                       </span>
                                  </span>
                             </div>
                        </div>
                   </div>                   
                        <div className="second-owner display-none">
                         <div className="row">
                              <div className="col-md-6">
                                   <div className="form-group firstName-outer">
                                        <label>First name</label>
                                        <input type="text" className="form-control" id="firstName" onChange={onChangeHandler}/>
                                        <p className="error"></p>
                                   </div>
                              </div>
                              <div className="col-md-6">
                                   <div className="form-group lastName-outer">
                                        <label>Last name</label>
                                        <input type="text" className="form-control" id="lastName" onChange={onChangeHandler}/>
                                        <p className="error"></p>
                                   </div>
                              </div>
                              <div className="col-md-6">
                                   <div className="form-group mobileNumber-outer">
                                        <label>Mobile number</label>
                                        <input type="text" className="form-control" id="mobileNumber" onChange={onChangeHandler}/>
                                        <p class="error"></p>
                                   </div>
                              </div>
                              <div className="col-md-6">
                                   <div className="form-group email-outer">
                                        <label>Email address</label>
                                        <input type="text" className="form-control" id="email" name="email" onChange={onChangeHandler}/>
                                        <p class="error"></p>
                                   </div>
                              </div>
                         </div>
                  </div>
                   <div className="row">
                        <div className="col-md-12">
                             <div className="form-submit">
                                <button className="form-custom-btn">Save and continue</button>
                             </div>
                        </div>
                   </div>
               </form>
          </div>          
          </div>
          
     
      )
}
export default PropertyDetail;