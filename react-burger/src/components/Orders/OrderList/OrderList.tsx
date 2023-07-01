import React from "react";
import OrderElement from "../OrderElement/OrderElement";
import OrderModal from "../OrderModal/OrderModal";
import Modal from "../../Modal/Modal";
import { getSelectedOrderFromStore } from "../../../utils/tools/storeTools";
import { clearSelectedOrder } from "../../../services/slices/selectedOrder";
import style from "./OrderList.module.css";
import { Orders } from "../../../services/types/store";
import { useAppDispatch, useAppLocation, useAppNavigate, useAppSelector } from "../../../utils/tools/hooks";

type Props = {
  orders: Orders;
};

export default function OrderList({orders}: Props) {
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();
  const location = useAppLocation();
  const selectedOrder = useAppSelector(getSelectedOrderFromStore);
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