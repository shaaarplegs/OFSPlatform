import { useState } from "react"
import { Breadcrumb, Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;


const LayoutFS = props => {
    const [itemName, setItemName] = useState("Home");
    const items = [
      { label: 'Home', key: 'item-1' },
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
          <Content style={{ padding: '0 50px', height: '900px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Welcome, freelancer</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-content"> 

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>All copyrights reserved © 2022 to Oman freelancing service platform</Footer>
    </Layout>
    )
}

export default LayoutFS