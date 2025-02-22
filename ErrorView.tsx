

function ErrorView(){

    const reload = () => {
        window.location.reload();
    }
   

    return(<div style={{ textAlign: "center", paddingTop: 50, fontSize: 14 }}>
    <h3 style={{color:'#0b59a1'}}>500 Server Error</h3>         
    <h4>Sorry, we are not able to load the page. Please reload.</h4>
    <input type='button' style={{width:'100px',fontSize: '1rem',border:'0',cursor:'pointer',borderRadius: '5px',backgroundColor:'#007dc6',color: '#fff',padding: '5px'}} onClick={() => reload()} value='Reload'/>
    </div> )
}

export default ErrorView;
