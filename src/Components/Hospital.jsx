import { Card, Container, Table,TableBody, TableCell, TableRow, Typography } from "@mui/material";

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



export default function Hospital(){

     const [userAdress,setUserAddress]=useState([])
     const [dierctions,setDirections]=useState([])

    const location=useLocation()
    const {properties}=location.state

    useEffect(()=>{
      const geoCodingAPI='https://api.geoapify.com/v1/geocode/reverse?lat=17.4424064&lon=78.4334848&format=json&apiKey=00493b688a84445abd6ab90ee50ff347'
      axios.get(geoCodingAPI).then(res=>{
        setUserAddress(res.data.results)
        //  console.log(res.data.results);

          
         
      })
  },[])
  

  useEffect(()=>{
    const geoRoutingAPI=`https://api.geoapify.com/v1/routing?waypoints=17.4424064,78.4334848|${properties.lat},${properties.lon}&mode=drive&apiKey=00493b688a84445abd6ab90ee50ff347`
    axios.get(geoRoutingAPI).then(res=>{
       setDirections(res.data.features[0].properties.legs[0].steps);

        
       
    })
},[])


    return(
        <div >
          <Container style={{padding:0,marginTop:10}}>
            <Table> 
            <TableBody>
            <TableRow>
                <TableCell style={{display:"flex",justifyItems:"start", borderBottom:'none'}} >
                  <Card style={{padding:10,height:'75vh',width:'100vh'}}>
                    <Typography variant="h4" style={{fontWeight:750,color:'Teal'}}>{properties.name}</Typography>
                    <hr />
                    <Typography><span >User Latitude :</span> 17.4424064</Typography>
                    <Typography><span >User Longitude :</span> 78.4334848</Typography>
                    <Typography><span >User Formatted Address :</span> {userAdress[0]?.formatted}</Typography>
                    <hr />
                    <Typography><span >Hospital Latitude :</span> {properties.lat}</Typography>
                    <Typography><span >Hospital Longitude :</span> {properties.lon}</Typography>
                    <Typography><span >Hospital Formatted Address :</span> {properties.formatted}</Typography>
                    <hr />
                    <Typography><span >Hospital State :</span> {properties.state}</Typography>
                    <Typography><span >Hospital City :</span> {properties.country}</Typography>
                  </Card>
                </TableCell>
                <TableCell style={{ borderBottom:'none'}}>
                 <Card style={{padding:10,height:'auto',width:'100vh'}}>
                   <h1 style={{textAlign:'center',color:'#2C3E50'}}><em>Directions to Hospital</em></h1>
                    {
                      dierctions.map((direction,index)=>{
                        return(
                          <div key={index}>
                            <Timeline >
                              <TimelineItem key={index}>
                                <TimelineSeparator>
                                  <TimelineDot />
                                        {index !== dierctions.length - 1 && <TimelineConnector />} {/* Remove line after last item */}
                                </TimelineSeparator>
                                   <TimelineContent>
                                     <Typography>{direction.instruction.text}</Typography>
                                   </TimelineContent>
                              </TimelineItem>
                            </Timeline>
                          </div>
                        )
                      })
                    }
                  </Card>
                </TableCell>
            </TableRow>
            </TableBody>
            </Table>
          </Container>
        </div>
    )
}