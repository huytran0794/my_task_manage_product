import { Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import EditCustomerForm from "../../../core/Components/Forms/EditCustomerForm";
import SectionWrapper from "../../../core/Components/SectionWrapper/SectionWrapper";

import CUSTOMER_SERVICE from "../../../core/services/customerServ";
import Header from "../../../core/Components/Header/Header";
import { isValidUrl } from "../../../core/utils/utils";
import avatar from "../../../core/assets/images/avatar.svg";
const EditCustomerPage = () => {
  const { id } = useParams();

  let [customerInfo, setCustomerInfo] = useState({});
  useEffect(() => {
    CUSTOMER_SERVICE.getCustomerInfo(id)
      .then((res) => {
        setCustomerInfo(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderPage = (customerInfo) => {
    const avatarDiv = (
      <div className="col p-[20px] flex justify-center items-center w-full">
        <div className="avatar">
          <Avatar
            size={300}
            src={isValidUrl(customerInfo.avatar) ? customerInfo.avatar : avatar}
          />
        </div>
      </div>
    );
    return (
      <>
        <Header />
        {avatarDiv}
        <div className="col w-full">
          <EditCustomerForm customerInfo={customerInfo} />
        </div>
      </>
    );
  };

  if (Object.keys(customerInfo).length) {
    return (
      <SectionWrapper
        sectionClass={"edit-customer"}
        title={`Edit info:  ${customerInfo.fullname}`}
        content={renderPage(customerInfo)}
        contentClass={"flex flex-col justify-between"}
      />
    );
  }
};

export default EditCustomerPage;
