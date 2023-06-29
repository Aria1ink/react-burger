import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import OrderElement from "../OrderElement/OrderElement";
import OrderModal from "../OrderModal/OrderModal";
import Modal from "../../Modal/Modal";
import { getSelectedOrderFromStore } from "../../../utils/tools/storeTools";
import { delSelectedOrder } from "../../../services/actions/selectedOrder";
import { clearSelectedOrder } from "../../../services/slices/selectedOrder";
import style from "./OrderList.module.css";

export default function OrderList({orders}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const selectedOrder = useSelector(getSelectedOrderFromStore);
  const closeModal = () => {
    dispatch(clearSelectedOrder());
    if (location.pathname.startsWith("/feed")) {
      navigate("/feed", {state: {from: "modal"}} );
    }
    if (location.pathname.startsWith("/profile/orders")) {
      navigate("/profile/orders", {state: {from: "modal"}});
    } 
  };
  
  return(
    <div className={style.OrderListContainer}>
      {
        orders.length > 0 && orders.map((order) => {
          return( <OrderElement order={order} key={order._id} />)
        })
      }
      {
        selectedOrder && 
          <Modal title={"#" + selectedOrder.number} close={closeModal}>
            <OrderModal />
          </Modal>
      }
    </div>
  )
}

OrderList.propTypes = {
  orders: PropTypes.array.isRequired
}; 