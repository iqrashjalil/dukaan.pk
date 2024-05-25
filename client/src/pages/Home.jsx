import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import Product from "../components/cards/Product";
import { clearErrors, getProduct } from "../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/layout/loader/Loader";
import { toast } from "react-toastify";
const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );
  function scrollToDiv(divId) {
    var element = document.getElementById(divId);
    if (element) {
      var topPos = element.offsetTop;
      window.scrollTo({
        top: topPos,
        behavior: "smooth",
      });
    }
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error, toast]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <section className="banner d-flex align-items-center justify-content-center">
            <div className="banner-text">
              <h1 className="py-4">
                Welcome! To <span>Dukaan.pk </span>
              </h1>
              <h3 className="py-4">Find And Purchase Any Product Below</h3>
            </div>
            <button
              onClick={() => scrollToDiv("feature-products")} // Corrected onClick syntax
              className="d-flex scroll-btn align-items-center"
            >
              Scroll <CgMouse />
            </button>
          </section>
          <section id="feature-products" className="feature-products">
            <div className="section-header">
              <h2>
                Feature Products <hr />
              </h2>
            </div>
            <div className="cards d-flex ">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
