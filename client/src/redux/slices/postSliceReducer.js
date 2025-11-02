import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helper/axiosInstance";
import {toast} from "react-hot-toast"

const getErrorMessage = (err) => {
if (!err) return 'Unknown error';
if (err.response && err.response.data && err.response.data.message) return err.response.data.message;
if (err.message) return err.message;
return String(err);
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async({limit =10 , skip = 0 }={},thunkAPI)=>{
        try{
            const res = await axiosInstance.get('/posts?limit=${limit}& skip=${skip}');
            return res.data;
        }catch(err){
            return thunkAPI.rejectWithValue(getErrorMessage(err));
        }
    }
);

export const fetchPost = createAsyncThunk(
'posts/fetchPost',
async (id, thunkAPI) => {
try {
const res = await axios.get(`/posts/${id}`);
return res.data;
} catch (err) {
return thunkAPI.rejectWithValue(getErrorMessage(err));
}
}
);

export const createPost = createAsyncThunk(
'posts/createPost',
async ({ communityId, content, file }, thunkAPI) => {
try {
let config = {};
let body = { communityId, content };


if (file) {
const fd = new FormData();
fd.append('communityId', communityId);
fd.append('content', content ?? '');
fd.append('file', file);
body = fd;
config.headers = { 'Content-Type': 'multipart/form-data' };
}


const res = await axios.post('/posts', body, config);
return res.data;
} catch (err) {
return thunkAPI.rejectWithValue(getErrorMessage(err));
}
}
);