import { useEffect, useState } from "react"
import { Button, Space, Divider } from 'antd';

const Register = props => {
    const [selectedRegistrationType,SetselectedRegistrationType] = useState("")

useEffect(()=> {
    if (selectedRegistrationType === "ss") {
        window.location.replace("https://ofs-auth.auth.eu-west-1.amazoncognito.com/login?client_id=4075uhsoq1mlmpsr7ekiatemio&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ofs-platform.com/confirmation/ss")
    }

    if (selectedRegistrationType === "fs") {
        window.location.replace("https://ofs-auth.auth.eu-west-1.amazoncognito.com/login?client_id=1jtts78b0cqdkt0ual269pfu51&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ofs-platform.com/confirmation/fs");
    }
    
}, [selectedRegistrationType])

return (
 <Space>
    <div style={{marginLeft:'150px',width: '500px',height:'300px', maxHeight: '100%'}}>
    <Button type="primary"  style={{width: '100%',height:'100%'}} onClick={()=> SetselectedRegistrationType("fs")}>Register as freelancer</Button>
    </div>
    
    <Divider type="vertical" style={{height: '100%'}}/>

    <div style={{width: '500px',height:'300px', maxHeight: '100%'}}>
        <Button type="primary"  style={{width: '100%',height:'100%'}} onClick={()=> SetselectedRegistrationType("ss")}>Register as service seeker</Button>
    </div>
  </Space>
)}

export default Register;