import { DELETE_BLOGS, GET_BLOGS, ADD_BLOGS, UPDATE_BLOGS } from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";

// CRUD -> create (post), read (get), update (patch), delete (delete)

// Read Blogs
export const getBlogs = () => (dispatch, getState) => {
  axios
    .get("https://p4backend-production.up.railway.app/api/blogs/", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_BLOGS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Delete Blogs
export const deleteBlogs = (id) => (dispatch, getState) => {
  axios
    .delete(`https://p4backend-production.up.railway.app/api/blogs/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: DELETE_BLOGS,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

// Add Blogs
export const addBlogs = (blog) => (dispatch, getState) => {
  axios
    .post("hhttps://p4backend-production.up.railway.app/api/blogs/", blog, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: ADD_BLOGS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Update/Edit Blogs
export const updateBlogs = (id, blog) => (dispatch, getState) => {
  console.log("Action recieved", id, blog);
  axios
    .patch(
      `https://p4backend-production.up.railway.app/api/blogs/${id}/`,
      blog,
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: UPDATE_BLOGS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
