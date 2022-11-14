import { useEffect } from "react";


export function QrCamera(){
    useEffect(()=>{
        const fileInput = document.getElementById('file-input');

        fileInput.addEventListener('change', (e) =>
          console.log(e.target.files),
        );
    })
    
    return <input type="file" accept="image/*" id="file-input" capture/>
}