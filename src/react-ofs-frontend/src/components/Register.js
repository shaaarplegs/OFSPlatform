import { useEffect, useState } from "react"
import { Button, Space } from 'antd';

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
     <Space wrap>
        <Button type="primary" onClick={()=> SetselectedRegistrationType("fs")}>Register as freelancer</Button>
        <Button type="primary" onClick={()=> SetselectedRegistrationType("ss")}>Register as service seeker</Button>
      </Space>
    )
}

export default Register