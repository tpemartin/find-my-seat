import {TextField, Button} from '@mui/material'

export default function UrlInput({onClick}){
   
    return <div>
                <div id="input-holder">
                    <TextField id="outlined-basic" label="Seating chart Google sheets url" variant="outlined" />
                    <Button variant="outlined" onClick={onClick}>Submit</Button>
                </div>
                <div id="submitStatus"></div>
            </div>


}
