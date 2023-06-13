import React from 'react';
import "../../../styles/adminLayout.css";
import AdminHeader from '../../../components/admin/AdminHeader';
import AdminSidebar from '../../../components/admin/AdminSidebar';
import AdminFooter from '../../../components/admin/Adminfooter';


const AdminLayout = ({ children, title, subTitle }) => {
  return (
    <>

      <AdminHeader />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <AdminSidebar />
        </div>
        <div id="layoutSidenav_content">
          <div className="container-fluid px-4">
            <h1 className="mt-4">{title}</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">{subTitle}</li>
            </ol>
            {children}
          </div>
          <AdminFooter />
        </div>
      </div>



    </>
  )
}

export default AdminLayout
