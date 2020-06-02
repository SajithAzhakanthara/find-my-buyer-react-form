import React,{useEffect,useState} from 'react';
import {HashRouter as Router, Switch,Route,} from "react-router-dom";
import PropertyDetail from './components/propertyDetails/PropertyDetails';
import PropertyType from './components/propertyType/PropertyType';
import PropertyValuation from './components/PropertyValuation';
import PropertyPhotograph from './components/PropertyPhotograph';
import DocumentUpload from './components/DocumentUpload';
import FloorPlan from './components/FloorPlan';
import Video from './components/Video';
import Headlines from './components/Headlines';
import SelectedItems from './components/SelectedItems';
import './bootstrap.min.css';
import { PropertyProvider } from './components/PropertyContext';
import './App.css';
import axios from 'axios';
import $ from 'jquery';
import logo from './home.png'


function App() {
  const [header,setHeader]= useState('');
//  const userValue = 'sruthi';
//  localStorage.setItem('username',userValue)
   useEffect(()=>{
    //!localStorage.getItem('userids')?
    //  if(!localStorage.getItem('userids')){
    //   window.location.replace('https://findmybuyer.co.uk/home')
    //  }
   },[])
  useEffect(()=>{
//     axios.get('https://findmybuyer.co.uk/api/header-design')
//     .then(res=>{
//       setHeader(res.data);
//       document.querySelector('.header-wrap').innerHTML= res.data;
//     })  
// axios.get('https://findmybuyer.co.uk/api/footer-design')
// .then(res=>{
//   document.querySelector('.footer-wrap').innerHTML= res.data;
// })




    setTimeout(()=>{
      // ===========================mobile menu script===============================
    //   document.querySelector(".mobile-toggle span").addEventListener("click", function () {    
    //   document.querySelector(".main-menu-outer").classList.add("main-menu-visible");
  
  
    //   });
    //   document.querySelector(".menu-close").addEventListener("click", function () {
    //   document.querySelector(".main-menu-outer").classList.remove("main-menu-visible");
    //   });
    //   $('.drop-toggle').click(function(){
    //     $(this).toggleClass('fa-plus fa-minus');
    //    $(this).next().slideToggle();
    //  });
  // ===========================mobile menu script===============================
      },1000)

  },[])
  
 

  return (
    <PropertyProvider>
       <div className="App">  
       <section className="header-wrap"></section>     
         <section className="banner-outer">
           <img src={logo}/>
           <h3>Hi {
             localStorage.getItem('username')?
             <span>{localStorage.getItem('username')}</span>:
             <span>Paul</span>
           }, welcome</h3>
         </section>
         
        <Router>
          <Switch>
            <Route exact path="/" component={PropertyDetail}/>
            <Route exact path="/property-type" component={PropertyType}/>
            {/* <Route exact path="/property-type" component={PropertyType}/> */}
            <Route exact path="/property-value" component={PropertyValuation}/>
            <Route exact path="/property-photo" component={PropertyPhotograph}/>
            <Route exact path="/property-floor" component={FloorPlan}/>
            <Route exact path="/property-video" component={Video}/>
            <Route exact path="/property-document" component={DocumentUpload}/>
            <Route exact path="/property-headlines" component={Headlines}/>
            <Route exact path="/selectedItems" component={SelectedItems}/>
          </Switch>
        </Router> 
        <div className="footer-wrap"></div>
      </div>
    </PropertyProvider>
  );
}

export default App;
