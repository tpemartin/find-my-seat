import {TextField, Button, Avatar, Alert, Link, FormControl, FormHelperText, InputLabel, Input} from '@mui/material'
// import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode'
import config from "./config.json"
import logo from './favicon-32x32.png'
// import { useHtml5QrCodeScanner, useAvailableDevices } from 'react-html5-qrcode-reader';
import { CameraAlt, CompareSharp } from '@mui/icons-material'
import { useEffect, useState } from 'react';
import Html5QrcodePlugin from './Html5QrcodePlugin';

export function Form({children}){
   return <FormControl>
  {children}
  <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
</FormControl>

}
export default function UrlInput({onClick, chartLink}){

    var submitStatus = (chartLink==="")?"":chartLink
    // function  onNewScanResult(decodedText, decodedResult) {
    //     // Handle the result here.
    //     var inputEl =  document.getElementById("outlined-basic")
    //     console.log(decodedText)
    //     inputEl.value = decodedText
    //     setShrink(true)
    // }
    var [shrink, setShrink] = useState(submitStatus==="")

    return <div className="vertical-center">
        <Avatar alt="Find-My-Seat" src={logo} style={{margin: "auto"}}/>
        <div className="title">Find My Seat Setup</div>
        <Form>
            <>
            <div className="input" >
                    <TextField id="url" label="Seating chart Google sheets url" variant="outlined"
                    InputLabelProps={{shrink: shrink}} />
                    
                </div>
                <div className="input">
                    <TextField id="email" label="Your email" variant="outlined"/>
                
                    
                </div>
            </>

        </Form>
        <Button variant="outlined" onClick={onClick}>Submit</Button>
                
                {/* <Html5QrcodePlugin 
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}/> */}

                <Alert severity="warning">Make suer the link is shared as Everyone with the Link being an Editor</Alert>
                <div id="submitStatus">
                   {submitStatus}
                </div>
            </div>


}
