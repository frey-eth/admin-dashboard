import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { MdProductionQuantityLimits } from "react-icons/md";
import {
  TbBrandBlogger,
  TbCategory,
  TbColorFilter,
  TbBrandAdobe,
} from "react-icons/tb";
import { BsChatLeftHeart, BsPatchQuestion } from "react-icons/bs";
import { ImBlog } from "react-icons/im";
import { FaClipboardList, FaBlog } from "react-icons/fa";
import { Layout, Menu, Button, theme } from "antd";
import { useNavigate, Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white text-center fs-5 py-3 mb-0">
            <span className="sm-logo">
              <TbBrandAdobe />
            </span>
            <span className="lg-logo">
              <TbBrandAdobe />
              mazune
            </span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key == "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <UserOutlined />,
              label: "Customers",
            },
            {
              key: "catalog",
              icon: <ShoppingCartOutlined />,
              label: "Catalog",
              children: [
                {
                  key: "product",
                  icon: <MdProductionQuantityLimits />,
                  label: "Add Product",
                },
                {
                  key: "list-product",
                  icon: <MdProductionQuantityLimits />,
                  label: "Product List",
                },
                {
                  key: "brand",
                  icon: <TbBrandBlogger />,
                  label: "Brand",
                },
                {
                  key: "list-brand",
                  icon: <TbBrandBlogger />,
                  label: "Brand List",
                },
                {
                  key: "category",
                  icon: <TbCategory />,
                  label: "Category",
                },
                {
                  key: "list-category",
                  icon: <TbCategory />,
                  label: "Category List",
                },

                {
                  key: "color",
                  icon: <TbColorFilter />,
                  label: "Color",
                },
                {
                  key: "list-color",
                  icon: <TbColorFilter />,
                  label: "Color List",
                },
              ],
            },
            {
              key: "order",
              icon: <FaClipboardList />,
              label: "Orders",
            },
            {
              key: "blog",
              icon: <BsChatLeftHeart />,
              label: "Blogs",
              children: [
                {
                  key: "blog",
                  icon: <ImBlog />,
                  label: "Add Blog",
                },
                {
                  key: "blog-list",
                  icon: <FaBlog />,
                  label: "Blog List",
                },
                {
                  key: "blog-category",
                  icon: <BsChatLeftHeart />,
                  label: "Blog Category",
                },
                {
                  key: "blog-category-list",
                  icon: <BsChatLeftHeart />,
                  label: "Blog Category List",
                },
              ],
            },
            {
              key: "enquiries",
              icon: <BsPatchQuestion />,
              label: "Enquiries",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between align-items-center p-lg-3"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="">
            <h3>Admin</h3>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
