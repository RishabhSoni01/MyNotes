import React from 'react'


function Alert(props) {

    const capitalised=(word)=>{
        if(word==="danger"){
            word= "error"
        }
        let cap = word.charAt(0).toUpperCase();
        return cap + word.slice(1);
    }
    
      return (
        <div style={{height:"35px"}} > 
        {props.alert && 
         <div className={`alert alert-${props.alert.type} `} role="alert">
            <div> <strong>{capitalised(props.alert.type)}</strong> {props.alert.msg}</div>
          </div>}
          </div>
        
      );
    }
    
    export default Alert;