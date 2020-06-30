import React, { useContext, useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
//import {checkJsom} from './checkJson'
import './PropertyType.css';
import axios from 'axios';
import '../../App.css'; 

import {PropertyContext} from '../PropertyContext';


function PropertyType(props) { 

    
    //const [propertyType, setPropertyType] = useContext(PropertyContext);
   const [selectValue,setSelectValue] = useState('4')  
   const[gardenClicked,setGardenClicked] = useState('')
   const[parkingClicked,setParkingClicked] = useState('')
   //const[receptionClicked,setReceptionClicked] = useState('')
   const[garageClicked,setGarageClicked] = useState('')
   const[keyFeature,setKeyFeature]= useState();
   const[test,setTest]=useState();
   const [checkvalues,setCheckvalues]= useState();
   const [extvalues,setExtvalues]= useState();





   const [propertyTypeDetails, setPropertyTypeDetails] = useContext(PropertyContext);
   const postURL = 'https://findmybuyer.co.uk/test/api/property-form-step2-headlines';







 
      
       
         
           

            useEffect( () => {
              
                axios.get("https://findmybuyer.co.uk/test/api/property-form-step2")
                .then(res=>{
                    setPropertyTypeDetails(res.data);
                    //console.log(res.data)
                
                })
               
                
                
                            },[]);

                            // checkJsom.map(checkJsom=>{
                            //     return(
                            //         <li key={checkJsom.id}>
                            //             <input type="checkbox" id={checkJsom.id} className="check-boxes" onClick={onCheckHandler}/>
                            //             <label>{checkJsom.name}</label>
                            //         </li>
                            //     )
                            //     })





            
          
     
        //console.log(propertyTypeDetails)

        

        const departmentdata = propertyTypeDetails.map(propertyTypeDetail=>{
            return(
                propertyTypeDetail.Departments.map(Department=>{
                    return(
                        <option value={Department.id} key={Department.id}>{Department.type_name}</option>
                    )
                })
            )
        })




        const instructionType = propertyTypeDetails.map(propertyTypeDetail=>{
            return(
                propertyTypeDetail.InstructionType.map(instructionType=>{
                    return(
                        <option value={instructionType.id} key={instructionType.id}>{instructionType.type_name}</option>
                    )
                })
            )
        })       


       

      const propertytype = propertyTypeDetails.map(propertyTypeDetail=>{
            return(
                propertyTypeDetail.PropertyType.reverse().map(PropertyType=>{                    
                    return(                       
                        <option  value={PropertyType.id}  key={PropertyType.id} selected="selected">{PropertyType.type_name}</option>
                    )
                })
            )
        })

      // console.log(propertyTypeDetails)


       const saleAvailability = propertyTypeDetails.map(propertyTypeDetail=>{
            return(
                propertyTypeDetail.SaleAvailability.map(SaleAvailability=>{
                    return(
                        <option value={SaleAvailability.id} key={PropertyType.id}>{SaleAvailability.type_name}</option>
                    )
                })
            )
        })
     
        const rentAvailability = propertyTypeDetails.map(propertyTypeDetail=>{
            return(
                propertyTypeDetail.LettingAvailability.map(LettingAvailability=>{
                    return(
                        <option value={LettingAvailability.id} key={LettingAvailability.id}>{LettingAvailability.type_name}</option>
                    )
                })
            )
        })

     const tenureOption = propertyTypeDetails.map(propertyTypeDetail=>{
         return(
            propertyTypeDetail.Tenure.map(Tenure=>{
                 return(
                    <option value={Tenure.id} key={Tenure.id}>{Tenure.type_name}</option>
                 )
             })
         )
     })


    //  useEffect(()=>{
    //      document.getElementById('prop-type').value = localStorage.getItem('property-type');         
    //      document.getElementById('sub-prop').value = localStorage.getItem('property-subtype')
    //  }) 


   
useEffect(()=>{
    
    //document.getElementById('prop-type').value = localStorage.getItem('property-type');
    document.getElementById('sub-prop').value = localStorage.getItem('property-subtype');
    //document.getElementById('department').value = localStorage.getItem('department');
    //document.getElementById('instruction-type').value = localStorage.getItem('instruction-type');
   // document.getElementById('availability').value = localStorage.getItem('availability');
    //document.getElementById('tenure').value = localStorage.getItem('tenure');
   // document.getElementById('reception').value = localStorage.getItem('reception');
    //document.getElementById('parking').value = localStorage.getItem('parking');
    //document.getElementById('garden').value = localStorage.getItem('garden');
    // document.getElementById('energyFrom').value = localStorage.getItem('energyFrom');
    // document.getElementById('energyTo').value = localStorage.getItem('energyTo');
    // document.getElementById('env-rating-from').value = localStorage.getItem('env-rating-from');
    // document.getElementById('env-rating-to').value = localStorage.getItem('env-rating-to');
    document.getElementById('bedRoom').value = localStorage.getItem('bedRoom');
    document.getElementById('Livingroom').value = localStorage.getItem('Livingroom');
    document.getElementById('bathRoom').value = localStorage.getItem('bathRoom');
    //setSelectValue(document.querySelector('#instruction-type').value)
    const propId = document.querySelector('#prop-type').value;
     //console.log(value)
    if(document.querySelector('#prop-type').value!=0){
        axios.get(`https://findmybuyer.co.uk/test/api/get-sub-property/${propId}`)
    .then(res=>{        
       
        
       const cc = res.data.map(data=>{
            return(
               `<option value = '${data.sub_static_id}'>${data.name}</option>`
            )
        })
        document.getElementById("sub-prop").innerHTML= cc;
        
    })
    }

},[])
     const onChangeHandler=()=>{
           //setSelectValue(document.querySelector('#instruction-type').value)
    const propId = document.querySelector('#prop-type').value;
    //console.log(value)
   axios.get(`https://findmybuyer.co.uk/test/api/get-sub-property/${propId}`)
   .then(res=>{        
      
       
      const cc = res.data.map(data=>{
           return(
              `<option value = '${data.sub_static_id}'>${data.name}</option>`
           )
       })
       document.getElementById("sub-prop").innerHTML= cc;
       
   })
     }
  
 const onChange = () => {
  


    localStorage.setItem('property-type',document.getElementById('prop-type').value);
    localStorage.setItem('property-subtype',document.getElementById('sub-prop').value);
    //localStorage.setItem('department',document.getElementById('department').value);
    //localStorage.setItem('instruction-type',document.getElementById('instruction-type').value);
    //localStorage.setItem('availability',document.getElementById('availability').value);
   // localStorage.setItem('tenure',document.getElementById('tenure').value);
    //localStorage.setItem('reception',document.getElementById('reception').value);
    //localStorage.setItem('parking',document.getElementById('parking').value);
    //localStorage.setItem('garden',document.getElementById('garden').value);
    // localStorage.setItem('energyFrom',document.getElementById('energyFrom').value);
    // localStorage.setItem('energyTo',document.getElementById('energyTo').value);
    // localStorage.setItem('env-rating-from',document.getElementById('env-rating-from').value);
    // localStorage.setItem('env-rating-to',document.getElementById('env-rating-to').value);
    localStorage.setItem('bedRoom',document.getElementById('bedRoom').value);
    //localStorage.setItem('garage',document.getElementById('garage').value);
    localStorage.setItem('bathRoom',document.getElementById('bathRoom').value);
    localStorage.setItem('Livingroom',document.getElementById('Livingroom').value);


    


 }
//    localStorage.setItem('garden','0')
//    localStorage.setItem('parking','0')
//    localStorage.setItem('Reception','0')
//    localStorage.setItem('Garage','0')
   
   const custGardenClicked = () =>{
    if(document.getElementById('garden-check').checked){
        localStorage.setItem('gardenOk','gardenOk')
        //setGardenClicked('1')       
        localStorage.setItem('garden','1')
    }else{
        localStorage.removeItem('gardenOk')
        localStorage.removeItem('garden')
        //setGardenClicked('0')    
        localStorage.setItem('garden','0')
    }
   }

   const custParkingClicked = () =>{
    if(document.getElementById('parking-check').checked){  
        localStorage.setItem('parkingOk','parkingOk')
        //setParkingClicked('1')      
        localStorage.setItem('parking','1')
    }else{
        localStorage.removeItem('parking')
         localStorage.removeItem('parkingOk')
       // setParkingClicked('0')
        localStorage.setItem('parking','0')
    }
   }

//    const custReceptionClicked = () =>{
//     if(document.getElementById('Reception-check').checked){ 
//         localStorage.setItem('receptionOk','receptionOk')
//         //setReceptionClicked('1')       
//         localStorage.setItem('Reception','1')
//     }else{
//         localStorage.removeItem('receptionOk')
//         localStorage.removeItem('Reception')
//         //setReceptionClicked('0')
//         localStorage.setItem('Reception','0')
//     }
//    }

  const custGarageClicked = () =>{
    if(document.getElementById('Garage-check').checked){ 
       localStorage.setItem('garageOk','garageOk')
        //setGarageClicked('1')       
        localStorage.setItem('Garage','1')
    }else{
       localStorage.removeItem('garageOk')
        localStorage.removeItem('Garage')
        //setGarageClicked('0')
        localStorage.setItem('Garage','0')
    }
   }

//   useEffect(()=>{
//     const dd = document.querySelectorAll('.check-boxes')
//     for (let i = 0; i < dd.length; i++){
//         const cc = dd[i].getAttribute("id");
//         if(!localStorage.getItem(`checkbox${cc}`)){
//             localStorage.setItem(`checkbox${cc}`)
//         }
//     }

//   },[])


       
    
   const keyArray = []  
   
  const onCheckHandler=(e)=>{
      if(e.target.checked){
          localStorage.setItem(`keyFeature${e.target.id}`,e.target.id);
          keyArray.push(e.target.id)
          localStorage.setItem('keyArray',keyArray)
      }else{
        localStorage.setItem(`keyFeature${e.target.id}`,0)
        const index = keyArray.indexOf(e.target.id);
       if (index > -1) {
        keyArray.splice(index, 1);
        }
        localStorage.setItem('keyArray',keyArray)
      }
  }


const extKeyArray = []
const externalChange = (e) => {
    if(e.target.checked){
        localStorage.setItem(`extKeyFeature${e.target.id}`,e.target.id);
        extKeyArray.push(e.target.id)
        localStorage.setItem('extKeyArray',extKeyArray)
    }else{
      localStorage.setItem(`extKeyFeature${e.target.id}`,0)
      const index = extKeyArray.indexOf(e.target.id);
     if (index > -1) {
        extKeyArray.splice(index, 1);
      }
      localStorage.setItem('extKeyArray',extKeyArray)
    }
}

useEffect(()=>{
    const keyfetClasses = document.querySelectorAll('.check-boxes')    
    keyfetClasses.forEach(function(el) {
        //console.log(localStorage.getItem(`keyFeature${el.id}`));
        if(localStorage.getItem(`keyFeature${el.id}`)!=0 && localStorage.getItem(`keyFeature${el.id}`)!=null){
            document.getElementById(el.id).checked = true;
        }
        keyArray.push(localStorage.getItem(`keyFeature${el.id}`))
             
    });


    const extkeyfetClasses = document.querySelectorAll('.external-features')     
    extkeyfetClasses.forEach(function(el) {
        //console.log(localStorage.getItem(`extKeyFeature${el.id}`));
        if(localStorage.getItem(`extKeyFeature${el.id}`)!=0 && localStorage.getItem(`extKeyFeature${el.id}`)!=null){
            document.getElementById(el.id).checked = true;
        }
        extKeyArray.push(localStorage.getItem(`extKeyFeature${el.id}`))
    });

   
})



console.log(localStorage.getItem('kf'))







  useEffect(()=>{
   


   
    //localStorage.setItem('keyfeature',keyFeature)
    
//console.log(localStorage.getItem('keyFeatures'))






      if(localStorage.getItem('gardenOk')){
        document.getElementById('garden-check').checked=true 
        localStorage.setItem('garden','1')
      }
    if(localStorage.getItem('parkingOk')){
        document.getElementById('parking-check').checked=true
        localStorage.setItem('parking','1')
    }
    // if(localStorage.getItem('receptionOk')){
    //     document.getElementById('Reception-check').checked=true  
    //     localStorage.setItem('Reception','1')
    // }
    if(localStorage.getItem('garageOk')){
        document.getElementById('Garage-check').checked=true 
        localStorage.setItem('Garage','1')
    }




   


  })



  
  


   
  

//getting the keyfeature items



 
    

   const onSubmit = (e) => {
       e.preventDefault();
     
      var propertySelect = (document.querySelector('#prop-type'));
   //var selectedd = propertySelect.options[propertySelect.selectedIndex].text;//uncomment on monday
  
   
   //localStorage.setItem('prop-type', selectedd);
   //propertySelect.options[propertySelect.selectedIndex].text = localStorage.getItem('prop-type'); 
   
   var err = 0;
   if(document.getElementById('prop-type').value == 0) {
    document.getElementById('prop-type').classList.add('border-red');
      err = 1;
   }else{
    document.getElementById('prop-type').classList.remove('border-red')
   }

   if(document.getElementById('sub-prop').value == 0) {
    document.getElementById('sub-prop').classList.add('border-red');
      err = 1;
   }else{
    document.getElementById('sub-prop').classList.remove('border-red')
   }

//    if(document.getElementById('department').value == 0) {
//     document.getElementById('department').classList.add('border-red');
//       err = 1;
//    }else{
//     document.getElementById('department').classList.remove('border-red')
//    }

//    if(document.getElementById('instruction-type').value == 0) {
//     document.getElementById('instruction-type').classList.add('border-red');
//       err = 1;
//    }else{
//     document.getElementById('instruction-type').classList.remove('border-red')
//    }

//    if(document.getElementById('availability').value == 0) {
//     document.getElementById('availability').classList.add('border-red');
//       err = 1;
//    }else{
//     document.getElementById('availability').classList.remove('border-red')
//    }

//    if(document.getElementById('parking').value == 0) {
//     document.getElementById('parking').classList.add('border-red');
//       err = 1;
//    }else{
//     document.getElementById('parking').classList.remove('border-red')
//    }

//    if(document.getElementById('garden').value == 0) {
//     document.getElementById('garden').classList.add('border-red');
//       err = 1;
//    }else{
//     document.getElementById('garden').classList.remove('border-red')
//    }


   if(err==0){
    const fullValue = {
        propertyid:localStorage.getItem('property-id'),
        subtype:document.getElementById('sub-prop').value,
        // department:document.getElementById('department').value,
        // instruction_type:document.getElementById('instruction-type').value,
        // availability:document.getElementById('availability').value,
        // tenure:document.getElementById('tenure').value,
        prop_type:document.getElementById('prop-type').value,
       // receptions:localStorage.getItem('Reception'),
        bedrooms:document.getElementById('bedRoom').value,
        bathrooms:document.getElementById('bathRoom').value,
        gardens:localStorage.getItem('garden'),
        Livingroom:document.getElementById('Livingroom').value,
        parking: localStorage.getItem('parking'),
        garage:localStorage.getItem('Garage'),
       keyFeatures:localStorage.getItem('keyArray'),
       ExternalKeyFeature:localStorage.getItem('extKeyArray')
        // energy_efficiency_current:document.getElementById('energyFrom').value,
        // energy_efficiency_potential:document.getElementById('energyTo').value,
        // environmental_impact_current:document.getElementById('env-rating-from').value,
        // environmental_impact_potential:document.getElementById('env-rating-to').value
       
    }   
    console.log(fullValue)
    axios.post(postURL,fullValue)
    .then(res=>console.log(res))
    props.history.push("/property-value");
   }

      
   }

  
  
    
    return(  
        <div>  
            <section className="progress-outer">
                    <div className="progress-wrap">
                       <ul>
                            <li>
                                 <div className="first-ready first-finished"></div>
                                 <div className="second-ready"></div>
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
        <h1>Property type</h1>
        <form onSubmit={onSubmit}>
            <div className="row property-type-row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Select property type</label>
                        <select className="form-control" onChange={onChangeHandler} id="prop-type">
                           {propertytype}
                        </select>
                       
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Select property sub type</label> 
                        <select className="form-control" id="sub-prop" onChange={onChange} value={localStorage.getItem('sub-prop')}>
                            
                        </select>
                    </div>
                </div>                                         
                {/* <div className="col-md-6">
                    <div className="form-group">
                        <label>Department</label> 
                        <select className="form-control" id="department" onChange={onChange}>
                         {departmentdata}
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Instruction type</label> 
                        <select className="form-control" id="instruction-type" onChange = {onChange}>
                        {instructionType}
                        </select>
                    </div>
                </div>                     
                <div className="col-md-6" id="instruction-retated">
                   <div className="form-group">
                       <label>Availability</label> 
                       <select className="form-control" id="availability" onChange={onChange}>
                           {
                              selectValue == 4 ? saleAvailability : rentAvailability
                           }                             
                       </select>
                   </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Tenure</label> 
                        <select className="form-control" id="tenure" onChange={onChange}>
                            {tenureOption}
                        </select>
                    </div>
                </div>               */}
                
                <div className="col-md-6">
               <div className="form-group">
                   <label>Bedroom</label>
                   <select class="form-control" id="bedRoom" onChange={onChange}>
                       <option value="0">0</option>
                       <option value="1">1</option>
                       <option value="2">2</option>
                       <option value="3">3</option>
                       <option value="4">4</option>
                       <option value="5">5</option>
                       <option value="6">6</option>
                       <option value="7">7</option>
                       <option value="8">8</option>
                   </select>
               </div>
           </div>
           <div className="col-md-6">
               <div className="form-group">
                   <label>Livingroom</label>
                   <select class="form-control" id="Livingroom" onChange={onChange}>
                       <option value="0">0</option>
                       <option value="1">1</option>
                       <option value="2">2</option>
                       <option value="3">3</option>
                       <option value="4">4</option>
                       <option value="5">5</option>
                       <option value="6">6</option>
                       <option value="7">7</option>
                       <option value="8">8</option>
                   </select>
               </div>
           </div>
           <div className="col-md-6">
               <div className="form-group">
                   <label>Bathroom</label>
                   <select class="form-control" id="bathRoom" onChange={onChange}>
                       <option value="0">0</option>
                       <option value="1">1</option>
                       <option value="2">2</option>
                       <option value="3">3</option>
                       <option value="4">4</option>
                       <option value="5">5</option>
                       <option value="6">6</option>
                       <option value="7">7</option>
                       <option value="8">8</option>
                   </select>
               </div>
           </div>
           {/* <div className="col-md-6">
                    <div className="form-group">
                        <label>Reception</label> 
                        <select className="form-control" id="reception" onChange={onChange}>
                            <option value = "notSelected">select</option>
                            <option value = "1">Yes</option>
                            <option value = "0">No</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Parking</label> 
                        <select className="form-control" id="parking" onChange={onChange}>
                            <option value = "notSelected">select</option>
                            <option value = "1">Yes</option>
                            <option value = "0">No</option>
                        </select>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Garden</label> 
                        <select className="form-control" id="garden" onChange={onChange}>
                            <option value = "notSelected">select</option>
                            <option value = "1">Yes</option>
                            <option value = "0">No</option>
                        </select>
                    </div>
                </div>                 */}
                {/* <div className="col-md-6">
                    <div className="form-group">
                        <label>Energy Efficiency Rating</label>
                        <p>For Energy Performance Certificates (1-100)</p>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" class="form-control" id="energyFrom" onChange={onChange}/>
                            </div>
                            <div className="col-md-6">
                                <input type="text" class="form-control"id="energyTo" onChange={onChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label>Environmental Impact Rating</label>
                        <p>For Energy Performance Certificates (1-100)</p>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" class="form-control" id="env-rating-from" onChange={onChange}/>
                            </div>
                            <div className="col-md-6">
                                <input type="text" class="form-control" id="env-rating-to" onChange={onChange}/>
                            </div>
                        </div>
                    </div>
                </div> */}

                 <div className="special_requirement col-md-12">
                     <h5>Keyfeatures</h5>
                     <h6 className="features-subhead">Tick internal key features</h6>
                 <ul className="check-outer">
                    {
                           propertyTypeDetails.map(propertyTypeDetail=>{
                            return(
                                propertyTypeDetail.KeyFeatures.map(KeyFeature=>{
                                    return(
                                        <li key={KeyFeature.id}>
                                        <input type="checkbox" id={KeyFeature.id} className="check-boxes" onChange={onCheckHandler}/>
                                        <label>{KeyFeature.type_name}</label>
                                    </li>
                                    )
                                })
                            )
                        })
                    }
                    </ul>
                 </div>
                 <div className="col-md-12">
                 <h6 className="features-subhead">Tick external key features</h6>
                 <div className="custom-req-buttons-outer">
                
                 <div className="custom-req-buttons-inner">
                    <div className="form-group custom-made-check">
                            <input type="checkbox" id="garden-check" onClick={custGardenClicked}/>
                       <label className="check-wrap"> Garden</label>
                    </div>
                </div>

                <div className="custom-req-buttons-inner">
                    <div className="form-group custom-made-check">                       
                            <input type="checkbox" id="parking-check" onClick={custParkingClicked}/> 
                        <label className="check-wrap">Parking


</label>
                    </div>
                </div>

                {/* <div className="custom-req-buttons-inner">
                    <div className="form-group custom-made-check">                        
                            <input type="checkbox" id="Reception-check" onClick={custReceptionClicked}/>                           
                            <label className="check-wrap"> Reception</label>
                    </div>
                    </div> */}
                    <div className="custom-req-buttons-inner">
                    <div className="form-group custom-made-check">                        
                            <input type="checkbox" id="Garage-check" onClick={custGarageClicked}/>
                        <label className="check-wrap">Garage</label>    
                        
                    </div>
                   </div>

                   {
                           propertyTypeDetails.map(propertyTypeDetail=>{
                            return(
                                propertyTypeDetail.ExternalKeyFeatures.map(ExternalKeyFeature=>{
                                    return(
                                        <div className="custom-req-buttons-inner">
                    <div className="form-group custom-made-check">                        
                            <input type="checkbox" id={ExternalKeyFeature.id} className="external-features" onChange={externalChange}/>
                                    <label className="check-wrap">{ExternalKeyFeature.type_name}</label>    
                        
                    </div>
                   </div>
                                    )
                                })
                            )
                        })
                    }

                          
                     
                 </div> 
                 {/* <div class="key-features-outer">
                 <h1>Key features</h1>
                 <div class="key-features-inner">
                    
                 <div className="custom-req-buttons-inner">
                    <div className="form-group custom-made-check">
                        <label className="check-wrap">
                            <input type="checkbox" id="Garage-check" onClick={custGarageClicked}/>
                            <span className="cust-check-wrap">
                            <svg xmlns="http://www.w3.org/2000/svg"
                            width="50" height="50"
                            viewBox="0 0 185 122">
                            <path id="Selection"
                            fill="none" stroke="#000" stroke-width="5"
                            d="M 0.00,0.00
                            C 0.00,0.00 0.00,122.00 0.00,122.00
                            0.00,122.00 185.00,122.00 185.00,122.00
                            185.00,122.00 185.00,0.00 185.00,0.00
                            185.00,0.00 0.00,0.00 0.00,0.00 Z" />
                            </svg>
                            <span>Conservatory</span>
                            </span>
                        </label>
                    </div>
                 </div>

                 <div className="custom-req-buttons-inner">
                    <div className="form-group custom-made-check">
                        <label className="check-wrap">
                            <input type="checkbox" id="Garage-check" onClick={custGarageClicked}/>
                            <span className="cust-check-wrap">
                            <svg xmlns="http://www.w3.org/2000/svg"
     width="1.85in" height="1.22in"
     viewBox="0 0 185 122">
  <path id="Selection"
        fill="none" stroke="black" stroke-width="1"
        d="M 0.00,0.00
           C 0.00,0.00 0.00,122.00 0.00,122.00
             0.00,122.00 185.00,122.00 185.00,122.00
             185.00,122.00 185.00,0.00 185.00,0.00
             185.00,0.00 0.00,0.00 0.00,0.00 Z" />
</svg>
                            <span>Designated Parking</span>
                            </span>
                        </label>
                    </div>
                 </div>
              



















                 </div>
                 </div> */}
            </div>                           
           
           </div> 
           <div className="saperater"></div>                 
           <div className="row">
                   <div className="col-md-12">
                        <div className="form-submit back-btn-outer">
                           <Link to="/" className="form-custom-back-btn" id="screen-two-bk-btn"><i class="fa fa-angle-left" aria-hidden="true"></i>Back</Link>
                           <button className="form-custom-btn">Save and continue</button>
                        </div>
                   </div>
              </div>                
        </form>
   </div> 
   </div> 
   
    )
} 

export default PropertyType;