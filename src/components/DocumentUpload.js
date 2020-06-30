import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function DocumentUpload(props){

    const epcURL = 'https://findmybuyer.co.uk/test/api/property-form-step7-epc-document-upload';
    const propScheduleURL = 'https://findmybuyer.co.uk/test/api/property-form-step7-ps-document-upload';
    const homeReportURL = 'https://findmybuyer.co.uk/test/api/property-form-step7-hr-document-upload';
    const prop_id = localStorage.getItem('property-id')
    

    const[epcName,setEpcName] = useState('')
     const[scheduleName,setScheduleName] = useState('')
     const[homereport,setHomereportName] = useState('')
  
    useEffect(()=>{
        
        // document.querySelector('.epcName').innerHTML =  localStorage.getItem('epc-detail')        
        // document.querySelector('.scheduleName').innerHTML =  localStorage.getItem('schedule-detail')
        document.querySelector('.homeReport').innerHTML =  localStorage.getItem('report-detail')
    })   
        
       
    
    
    // const EPCuploadHandler = (e)=>{
    //        const file = e.target.files[0]
          
    //        localStorage.setItem('epc-detail',file.name)         
    //        setEpcName(file.name)           
    //        const fd = new FormData();
    //         fd.append('epc_document',file,file.name)   
    //         fd.append('property_id',prop_id)
    //         axios.post(epcURL,fd,prop_id)
    //         .then(res=>console.log(res)) 
           
    // }

    
    // const propertyScheduleHandler = (e)=>{
    //        const file = e.target.files[0]
          
    //        localStorage.setItem('schedule-detail',file.name)         
    //        setScheduleName(file.name)           
    //        const fd = new FormData();
    //         fd.append('property_schedule',file,file.name)   
    //         fd.append('property_id',prop_id)
    //         axios.post(propScheduleURL,fd,prop_id)
    //         .then(res=>console.log(res)) 
           
    // }
    const homeReportHandler = (e)=>{
        const file = e.target.files[0]
          
        localStorage.setItem('report-detail',file.name)         
        setHomereportName(file.name)           
        const fd = new FormData();
         fd.append('home_report',file,file.name)   
         fd.append('property_id',prop_id)
         axios.post(homeReportURL,fd,prop_id)
         .then(res=>console.log(res)) 
           
    }

    const onFormSubmit = (e)=>{
        e.preventDefault();
        props.history.push('/property-headlines')
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
                        <div className="third-ready"></div>
                        
                        <h4>2</h4>
                    </li>
                    <li>
                        <h4>3</h4>
                    </li>
                </ul>
            </div>
        </section>
        <div className="upload-property-outer">
            <div className="document-upload-outer">
                <h1>Home Report</h1>
                <p>It is a legal requirement in Scotland to provide prior to placing the property onto the open market.You MUST upload a home report that has been completed within the last three months, all documenttions should be checked prior to going live</p>
                <form onSubmit={onFormSubmit}>
                <div className="row">
                    {/* <div className="col-md-4">
                        <div className="form-group">
                            <label>EPC document</label>
                            <span className="file-upload-wrap">
                              <input type="file" className="form-control" onChange = {EPCuploadHandler} id="epc-input"/>
                            </span>
                            <p className="epcName"></p>
                        </div>
                    </div>
                    <div className="col-md-4">
                      <label>Property schedule</label>
                      <span className="file-upload-wrap">
                        <input type="file" className="form-control" onChange={propertyScheduleHandler}/>
                      </span>
                      <p className="scheduleName"></p>
                    </div> */}
                    <div className="col-md-4">
                      <label>Home report</label>
                      <span className="file-upload-wrap">
                        <input type="file" className="form-control" onChange={homeReportHandler}/>
                      </span>
                      <p className="homeReport"></p>
                    </div>
                </div>
                <div className="saperater"></div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-submit back-btn-outer">
                                <Link to='/property-floor' className="form-custom-back-btn" id="screen-five-bk-btn"><i className="fa fa-angle-left" aria-hidden="true"></i>Back</Link>
                                <Link href="#" className="form-custom-btn continue-without-btn screen-five-without display-none">Skip</Link>
                                <button className="form-custom-btn floor-plan-save-btn" id="screen-five-btn">Save & continue</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default DocumentUpload;