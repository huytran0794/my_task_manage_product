import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CustomerAvatarInfo from "../../core/Components/TableAvatar/CustomerAvatarInfo";
import USER_SERVICE from "../../core/services/userServ";
import UserActionButtons from "./UserActionButtons";

const UserManageTable = () => {
  const [userList, setUserList] = useState(null);
  // fetch api
  useEffect(() => {
    let returnedData = [];
    USER_SERVICE.getUserInfo()
      .then((res) => {
        returnedData = res.map((item, idx) => ({
          key: idx,
          ...item,
        }));
        setUserList(returnedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const columns = [
    {
      title: "Full Name",
      dataIndex: "username",
      className: "username font-semibold text-[#292d32] text-base",
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "sdt",
      className: "sdt text-[#292d32] text-base",
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, user) => {
        return <UserActionButtons userData={user} />;
      },
    },
  ];

  if (userList) {
    return (
      <Table
        showHeader={false}
        rowKey={(user) => user.id.toString()}
        columns={columns}
        dataSource={userList}
        pagination={false}
        className="user-manage-table"
      />
    );
  }
};

export default UserManageTable;
