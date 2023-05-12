import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
const Layout = ({ children, title, description, keywords, auther }) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={auther} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

Layout.defaultProps = {
  title: "Ecommerce App - Shop Now",
  description: "eCommerce App",
  keywords: "React, Node, MongoDb",
  autho: "Kaushal Shah",
};

export default Layout;
