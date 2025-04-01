import { Card, CardContent, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Home(){
    
    const navigate=useNavigate()

    const [latLng,setLatLng]=useState({})
    const [hospitals,setHospitals]=useState([])
    
    useEffect(()=>{
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition((position)=>{
                setLatLng({
                    lat:position.coords.latitude,
                    lng:position.coords.longitude
                })
              
            })
        }
        
    },[])

    // console.log(latLng)
     

    useEffect(()=>{
        if(Object.keys(latLng).length>0){
        const geoAPI=`https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${latLng.lng},${latLng.lat},5000&bias=proximity:78.45906407265181,17.3826284&limit=20&apiKey=00493b688a84445abd6ab90ee50ff347`
        axios.get(geoAPI).then(res=>{
            setHospitals(res.data.features)

            // console.log(res.data.features)
           
        })

        }
    },[latLng])

    const handleClick=(hospital)=>{
        navigate('/hospital',{state:hospital}) 
       
    }

    return (

        
        <div style={{padding:28,display:'flex',flexWrap:'wrap'}}>

            {hospitals.map((hospital,index)=>{
                return(
                    <div key={index}>
                       <Card onClick={()=>handleClick(hospital)} style={{ width: '35.2rem' ,padding:5,height:130,overflow:"hidden",margin:10}}>
                        <CardContent>
                            <Typography  style={{fontSize:24,color:'#0D47A1',fontWeight:700}}>
                                {hospital.properties.name}
                            </Typography>
                            <hr/>
                            <Typography>
                                {hospital.properties.formatted}
                            </Typography>
                        </CardContent>
                       </Card>
                    </div>
                )
            })}
            
        </div>
    )
}
