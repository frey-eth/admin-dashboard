import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  MdProductionQuantityLimits,
  MdOutlineNotifications,
} from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
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
import { useNavigate, Outlet, Link } from "react-router-dom";

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
            if (key === "signout") {
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
              key: "orders",
              icon: <FaClipboardList />,
              label: "Orders",
            },
            {
              key: "coupons",
              icon: <RiCoupon2Line />,
              label: "Coupons",
              children: [
                {
                  key: "coupon",
                  icon: <ImBlog />,
                  label: "Add Coupon",
                },
                {
                  key: "coupon-list",
                  icon: <RiCoupon2Line />,
                  label: "Coupon List",
                },
              ],
            },
            {
              key: "blogs",
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
                  label: "Add Blog Category",
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
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
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
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <MdOutlineNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <UserOutlined className="fs-4" />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Phạm Văn Dương</h5>
                <p className="mb-0">example@example.com</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    View Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
                </li>
              </div>
            </div>
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
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
