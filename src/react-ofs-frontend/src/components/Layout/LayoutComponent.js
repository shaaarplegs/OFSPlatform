import { useState } from "react"
import { Breadcrumb, Layout, Menu } from 'antd';
import TestJWT from "../JWT Experiment/TestJWT";

const { Header, Content, Footer } = Layout;
const LayoutComponent = props => {
  
    const [itemName, setItemName] = useState("Select User Name");
    const items = [
      { label: 'Home', key: 'item-1' },
      { label: 'Authenticate', key: 'auth-menu' },
    ];

    if (itemName === "Authenticate") {
      window.location.replace("https://ofs-auth.auth.eu-west-1.amazoncognito.com/login?client_id=1jtts78b0cqdkt0ual269pfu51&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https://ofs-platform.com/");
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
          <Content style={{ padding: '0 50px', height: '900px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Welcome, Mohammed Al harbi (test)</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content">Content</div>
            <TestJWT />
          </Content>
          <Footer style={{ textAlign: 'center' }}>All copyrights reserved © 2022 to Oman freelancing service platform</Footer>
    </Layout>
    )
}

export default LayoutComponent