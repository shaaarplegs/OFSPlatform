import { useState } from "react"
import { Breadcrumb, Layout, Menu } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import PrivacyPolicy from "./PrivacyPolicy";
import { useNavigate } from 'react-router-dom';
import { logoutUser } from "../../features/auth/authSlice";
import PricingEstimator from "../PricingEstimator";
import FreelancingServices from "../FreelancingServices";
import Home from "../Home";

const { Header, Content, Footer } = Layout;
const LayoutSS = props => {
    let showPrivacyPolicyOnTopNav = false
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.userData);
    const [itemName, setItemName] = useState("Home");
    const items = [
      { label: 'Home', key: 'item-1' },
      { label: 'Service price estimator', key: 'item-2' },
      { label: 'Freelancing services', key: 'item-3' },
      { label: 'Log out', key: 'item-4' },
      showPrivacyPolicyOnTopNav === true & { label: 'Privacy Policy', key: 'item-5' }
    ];

    if (itemName === "Log out") {
      dispatch(logoutUser());
      navigate('/');
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
          <Content style={{ padding: '0 50px', height: 'auto', minHeight: '100vh'}}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Service seeker</Breadcrumb.Item>
              <Breadcrumb.Item>Welcome, {userData.name}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content"> 
            {
                  itemName === "Home" && (
                    <Home />
                  )
                }

            {
                  itemName === "Service price estimator" && (
                    <PricingEstimator />
                  )
              }
              {
                  itemName === "Freelancing services" && (
                    <FreelancingServices />
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

export default LayoutSS