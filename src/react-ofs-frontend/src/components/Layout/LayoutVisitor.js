import { useState } from "react"
import { Breadcrumb, Layout, Menu } from 'antd';
import Register from "../Register.js";
import PrivacyPolicy from "./PrivacyPolicy.js";
import Home from "../Home.js";
const { Header, Content, Footer } = Layout;


const LayoutVisitor = props => {
    let showPrivacyPolicyOnTopNav = false
    const [itemName, setItemName] = useState("Home");
    const items = [
      { label: 'Home', key: 'item-1' },
      { label: 'Login', key: 'auth-menu-Login' },
      { label: 'Register', key: 'auth-menu-Register' },
      showPrivacyPolicyOnTopNav === true & { label: 'Privacy Policy', key: 'item-6' }
    ];

    if (itemName === "Login") {
      window.location.replace("https://ofs-auth.auth.eu-west-1.amazoncognito.com/login?client_id=sb0e32a732jiavhei5nkesl3m&response_type=token&scope=profile+aws.cognito.signin.user.admin+openid+email+phone&redirect_uri=https://ofs-platform.com/login");
    }

    return (
    <Layout className="layout">
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items= {items}
              onClick={({ key }) => {
                setItemName(items.find((elm) => elm.key === key).label);
                console.log(items.find((elm) => elm.key === key).label)
            }}
            />
          </Header>
          <Content style={{ padding: '0 50px', height: 'auto', minHeight: '100vh' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Welcome, Visitor</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content"> 
                {
                  itemName === "Register" && (
                    <Register />
                  )
                }
                {
                  itemName === "Home" && (
                    <Home />
                  )
                }
                                 {
                  itemName === "Privacy Policy" && (
                    <PrivacyPolicy />
                  )
              }

            </div>
          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor:'black', color: 'white'}}>
            <a href="#privacy-policy" style={{color: 'white',marginRight:'10px',marginLeft:'10px'}} onClick={() => setItemName("Privacy Policy")}>Privacy Policy</a> | 
            <a href="https://www.linkedin.com/in/mohammed-saleh-said-alharbi-510079229/" target="_blank" rel="noopener noreferrer" style={{color: 'white',marginRight:'10px',marginLeft:'10px'}}>LinkedIn Profile</a> | 
            <a href="https://github.com/shaaarplegs" target="_blank" rel="noopener noreferrer" style={{color: 'white',marginRight:'10px',marginLeft:'10px'}}>Github Profile</a> | 
            <a href="mailto:mohammed.al.harbi@insify.io" style={{color: 'white',marginRight:'10px',marginLeft:'10px'}}>Mohammed.al.harbi@insify.io</a> |
          All copyrights reserved © 2022 to Oman freelancing service platform
          </Footer> 
    </Layout>
    )
}

export default LayoutVisitor