import React, {useState, useEffect} from 'react'

export default function Captcha() {

    // let captchaText:string
    const [captchaText, setCaptchaText] = useState('')
    
    const canvasCapthaText = captchaText.split('').join(' ')

    const generateCaptchaText = () => {
        let r = (Math.random() + 1).toString(36).substring(6);
        r = r.toUpperCase()
        setCaptchaText(r)
    }

    const loadCaptchaCanvas = () => {
        let canvas:any = document.getElementById('canv')
        let ctx = canvas.getContext('2d')
       
        ctx.canvas.width =  230;
        ctx.canvas.height = 50;

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        
        ctx.textBaseline = "middle";
        ctx.font = "30px Arial Rounded";
        ctx.fillStyle = "black";

       

        ctx.fillText(canvasCapthaText  , 10, 30);
    }
    useEffect(() => {
        generateCaptchaText()
    }, [])

    useEffect(() => {
        
        loadCaptchaCanvas()

    }, [captchaText])

    

    const reloadCaptcha = () => {
        generateCaptchaText()
    }
    

    const validateCaptcha = (userInput:string) => {
        return userInput === captchaText
    }

    const loadCaptcha = () => {
        return (
            <>
                {/* <input type="text" disabled value={captchaText}/> */}
                <div>
                    <canvas id="canv" style={{verticalAlign: "middle"}}></canvas>
                    <span className="captcha-refresh-icon" onClick={reloadCaptcha}><i className="fa fa-refresh" aria-hidden="true"></i></span>
                </div>
            </>
        )
    }
    
    return { validateCaptcha, loadCaptcha}
   


}
