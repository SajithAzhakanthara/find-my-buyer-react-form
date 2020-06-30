import React,{useContext,useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';



function PropertyValuation(props) {
    
    const[pricePrefix,setPricePrefix] = useState([])
    // const[povValue,setPovValue] = useState('')
    // const[portUpdate,setPortUpdate] = useState('')


  useEffect(()=>{
    document.getElementById('price').value = localStorage.getItem('price');
    //document.getElementById('sellingPrice').value = localStorage.getItem('sellingPrice')
    document.getElementById('pricePrefix').value = localStorage.getItem('pricePrefix')
    //document.getElementById('priceDescription').value = localStorage.getItem('priceDescription')
    })

    const onChangeHandler=()=>{
        localStorage.setItem('price',document.getElementById('price').value)
       // localStorage.setItem('sellingPrice',document.getElementById('sellingPrice').value)
        localStorage.setItem('pricePrefix',document.getElementById('pricePrefix').value)
        //localStorage.setItem('priceDescription',document.getElementById('priceDescription').value)
    }

   // ${localStorage.getItem('property_id')}
    useEffect(()=>{
        axios.get(`https://findmybuyer.co.uk/test/api/property-step3/${localStorage.getItem('property-id')}`)

        .then(res => {
            setPricePrefix(res.data)
            
        })
        
    
    },[])

    // const povClickHandler = () => {
    //     if(document.getElementById('pov').checked){
    //         setPovValue('1')
    //     }else{
    //         setPovValue('2')
    //     }
    // }

    // const portUpdateClickHandler = () => {
    //     if(document.getElementById('PortalUpload').checked){
    //         setPortUpdate('1')
    //     }else{
    //         setPortUpdate('2')
    //     }
    // }



    console.log(pricePrefix.PricePrefix)

    const prefixValue = pricePrefix.map(pricePrefix=>{
        return(
            pricePrefix.PricePrefix.map(PricePrefix=>{
                return(
                    <option value={PricePrefix.id}>{PricePrefix.type_name}</option>
                )
            })
        )
    })

   
    const onSubmit = () => {
        var err = 0;
        if(document.getElementById('price').value == 0){
            err = 1;
            document.getElementById('price').classList.add('border-red');
        }else{
            document.getElementById('price').classList.remove('border-red');
        }




        if(err==0){
            const valueData = {
                asking_price:document.getElementById('price').value,               
                price_prefix:document.getElementById('pricePrefix').value,              
                property_id:localStorage.getItem('property-id'),
                // is_POA:povValue,
                // disable_portal_upload:portUpdate

                
            }
            axios.post('https://findmybuyer.co.uk/test/api/property-form-step3',valueData)
            props.history.push('./property-photo')
        }

        
    }


    return (
        <div>
        <section className="progress-outer">
                    <div className="progress-wrap">
                       <ul>
                            <li>
                                 <div className="first-ready first-finished"></div>
                                 <div className="second-ready second-finished"></div>
                                 <div className="third-ready"></div>
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
            <h1>ASKING PRICE</h1>
            <form>
               <div>
                   <p>
                   Please enter your asking price here, we recommend that you put a figure just below the home report value to generate interest.
                   </p>
               </div>
               <div className="row">
                   <div className="col-md-6">
                       <div className="form-group">
                       <label>Asking price (£)</label>
                           <input className="form-control" placeholder="price" id="price" onChange={onChangeHandler}/>
                       </div>
                   </div>
                   {/* <div className="col-md-6">
                       <div className="form-group">
                           <label>Selling price (£)</label>
                           <input className="form-control" placeholder="price" id="sellingPrice" onChange={onChangeHandler}/>
                       </div>
                   </div> */}
                   <div className="col-md-6">
                       <div className="form-group">
                           <label>Price prefix</label>
                           <select className="form-control" placeholder="price" id="pricePrefix" onChange={onChangeHandler}>
                               {prefixValue}
                           </select>
                       </div>
                   </div>
                   {/* <div className="col-md-6">
                       <div className="form-group">
                           <input type="checkbox" id="pov" onClick={povClickHandler}/>POV
                       </div>
                   </div>
                   <div className="col-md-6">
                       <div className="form-group">
                           <input type="checkbox" id="PortalUpload" onClick={portUpdateClickHandler}/>Disable Portal upload
                       </div>
                   </div> */}
                   {/* <div className="col-md-6">
                       <div className="form-group">
                           <label>Price text</label>
                           <input className="form-control" placeholder="For a more textual description of the price" id="priceDescription" onChange={onChangeHandler}/>
                       </div>
                   </div> */}
               </div>
               <div className="saperater"></div>
               <div className="row">
                    <div className="col-md-12">
                            <div className="form-submit back-btn-outer">
                            <Link to="/property-type" class="form-custom-back-btn" id="screen-two-bk-btn"><i class="fa fa-angle-left" aria-hidden="true"></i>Back</Link>
                            <button onClick = {onSubmit} className="form-custom-btn">Save and continue</button>
                            </div>
                    </div>
                </div> 
            </form>
        </div>
        </div>
    )
}

export default PropertyValuation;