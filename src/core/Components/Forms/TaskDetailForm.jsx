import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Label from "./Label/Label";
import TextArea from "antd/es/input/TextArea";
import CUSTOMER_SERVICE from "../../services/customerServ";
import { nanoid } from "@reduxjs/toolkit";
import USER_SERVICE from "../../services/userServ";

import Notification from "../Notification/Notification";

const TaskDetailForm = ({
  layout = "vertical",
  size = "large",
  taskInfo,
  userInfo,
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  let initialValues = { ...taskInfo, specialNote: "" };

  const [customerInfo, setCustomerInfo] = useState({});

  useEffect(() => {
    CUSTOMER_SERVICE.getCustomerInfo(taskInfo.customer_id)
      .then((res) => {
        setCustomerInfo(res);
      })
      .catch((err) => {});
  }, []);

  const handleFinish = (values) => {
    let completeDateTime = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    let newOrderHistory = {
      order_id: nanoid(6),
      order: values.order,
      note: values.note,
      complete_date: completeDateTime.toLocaleDateString("en-US", options),
    };

    let newCustomerData = {
      ...customerInfo,
      order_history: [...customerInfo.order_history, newOrderHistory],
    };
    taskInfo.completed = true;

    let taskIdx = userInfo.tasks.findIndex((task) => task.id === taskInfo.id);

    if (taskIdx > -1) {
      userInfo.tasks[taskIdx] = { ...taskInfo };
      let newUserData = { ...userInfo };
      Promise.all([
        CUSTOMER_SERVICE.updateCustomer(taskInfo.customer_id, newCustomerData),
        USER_SERVICE.updateUser(userInfo.id, newUserData),
      ])
        .then((res) => {
          Notification("success", `Complete`, `Task ${taskInfo.id} completed`);
          setTimeout(() => {
            navigate("/user/task-tracking");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const labelItem = (labelText) => (
    <Label className="text-sm font-medium text-[#67748e] capitalize">
      {labelText}
    </Label>
  );
  const renderForm = () => {
    let mapCoordinate = initialValues.map.split(",");
    let latitude = mapCoordinate[0].trim();
    let longtitude = mapCoordinate[1].trim();
    initialValues.map = `https://www.google.pt/maps/dir//${latitude},${longtitude}/@${latitude},${longtitude},20z`;
    return (
      <Form
        form={form}
        name="user-task-detail"
        layout={layout}
        size={size}
        onFinish={handleFinish}
        className="user-task-detail-form"
        initialValues={initialValues}
      >
        <Form.Item name="sdt" label={labelItem("S??? ??i???n tho???i kh??ch h??ng")}>
          <Input placeholder="S??? ??i???n tho???i kh??ch h??ng" disabled />
        </Form.Item>
        <Form.Item name="fullname" label={labelItem("T??n kh??ch h??ng")}>
          <Input placeholder="T??n kh??ch h??ng" disabled />
        </Form.Item>
        <Form.Item name="address" label={labelItem("?????a ch??? kh??ch h??ng")}>
          <Input placeholder="?????a ch???" disabled />
        </Form.Item>
        <div className="google-map-action">
          <Form.Item name="map" label={labelItem("Google map")}>
            <Input placeholder="Google map" disabled />
          </Form.Item>
          <div className="action">
            <a
              href={`https://www.google.pt/maps/dir//${latitude},${longtitude}/@${latitude},${longtitude},20z`}
              target="_blank"
            >
              <img
                src="https://templates.envytheme.com/joxi/default/assets/images/icon/maximize.svg"
                alt="map"
              />
            </a>
          </div>
        </div>
        <Form.Item label={labelItem("????n h??ng")} name="order">
          <TextArea placeholder="????n h??ng" disabled />
        </Form.Item>
        <Form.Item label={labelItem("Ghi ch??")} name="note">
          <TextArea placeholder="Ghi ch??:" disabled />
        </Form.Item>
        <Form.Item label={labelItem("Ghi ch?? ?????c bi???t")} name="specialNote">
          <TextArea placeholder="Ghi ch?? ?????c bi???t:" disabled />
        </Form.Item>
        <Form.Item className="form-btn-groups">
          <Button
            type="primary"
            htmlType="submit"
            className="btn-update bg-[#0d6efd] hover:bg-[#0b5ed7] text-white rounded-[4px] font-semibold text-sm transition-all duration-[400ms]"
          >
            Complete
          </Button>
          <Button
            htmlType="button"
            className="btn-cancel bg-[#dc3545] hover:bg-[#bb2d3b] rounded-[4px] text-white text-sm transition-all duration-[400ms] ml-3"
            onClick={() => {
              navigate("/user/task-tracking/");
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  };
  if (Object.keys(customerInfo).length) {
    initialValues = { ...initialValues, specialNote: customerInfo.note };
    return renderForm();
  }
};

export default TaskDetailForm;
