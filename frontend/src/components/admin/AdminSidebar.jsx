import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Core</div>
          <Link className="nav-link" to="/admin/dashboard">
            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
            Dashboard
          </Link>
          <div className="sb-sidenav-menu-heading">Interface</div>
          <Link className="nav-link collapsed" to="" data-bs-toggle="collapse" data-bs-target="#categories" aria-expanded="false" aria-controls="collapseLayouts">
            <div className="sb-nav-link-icon"><i className="fas fa-columns" /></div>
            Categories
            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
          </Link>
          <div className="collapse" id="categories" data-bs-parent="#sidenavAccordion">
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to="/admin/categories">All Categories</Link>
              <Link className="nav-link" to="/admin/categories/add">Add New</Link>
            </nav>
          </div>
          <Link className="nav-link collapsed" to="" data-bs-toggle="collapse" data-bs-target="#products" aria-expanded="false" aria-controls="collapseLayouts">
            <div className="sb-nav-link-icon"><i className="fas fa-columns" /></div>
            Products
            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
          </Link>
          <div className="collapse" id="products" data-bs-parent="#sidenavAccordion">
            <nav className="sb-sidenav-menu-nested nav">
              <Link className="nav-link" to="/admin/products">All Products</Link>
              <Link className="nav-link" to="/admin/products/add">Add New</Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        eCommerce
      </div>
    </nav>
  )
}

export default AdminSidebar
