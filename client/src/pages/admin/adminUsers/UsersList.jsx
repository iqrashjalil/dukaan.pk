import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  clearErrors,
  deleteUser,
  getAllUsers,
} from "../../../actions/userAction";
import { Button } from "@mui/material";
import SideBar from "../sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { DELETE_PROFILE_RESET } from "../../../constants/userConstant";

const UsersList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteBtnHandler = (id) => {
    dispatch(deleteUser(id));
    dispatch(getAllUsers());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_PROFILE_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, navigate, isDeleted, message]);
  const columns = [
    { field: "id", headerName: "User Id", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 0.5 },
    { field: "email", headerName: "Email", minWidth: 350, flex: 1 },
    {
      field: "role",
      headerName: "Role",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.value === "admin" ? "green" : "red";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      flex: 0.3,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <NavLink to={`/admin/user/${params.id}`}>
              <MdModeEdit />
            </NavLink>

            <Button onClick={() => deleteBtnHandler(params.id)}>
              <MdDeleteForever />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });
  return (
    <>
      <section className="dashboard">
        <SideBar />
        <div className="product-list-container">
          <h1 id="product-list-heading">All Users</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
            className="product-list-table"
          />
        </div>
      </section>
    </>
  );
};

export default UsersList;
