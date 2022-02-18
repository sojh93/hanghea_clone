import axios from "axios";
import { getCookie } from "./cookie";


const apis = axios.create({
    baseURL:
        "http://15.164.251.132:8080", //*요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록*/
});

apis.interceptors.request.use(function (config) {
    const token = getCookie("token");
    config.headers["Content-Type"] = "application/json;charset=UTF-8; charset=UTF-8";
    config.headers.common["authorization"] = `${token}`;
    return config;
});


export const userApis = {
    //로그인요청
    login: (username, password) =>
        apis.post("/login", {username:username, password:password})
    ,
    // 회원가입 요청
    signup: (username, nickname, password) =>
        apis.post("/signup", {
            username:username,
            nickname:nickname, 
            password:password
        })
    ,
    //유저정보 백단에서 가져오기
    getUser: () => apis.get("/user/loginInfo"),

    logout: () => 
        apis.post("/user/logout")
    ,
  
}

export const commentApis = {
    // 게시물 불러오기
    getComment: (post_id) => apis.get(`/comment/${post_id}`),
    // 게시물 작성하기
    createComment: (post_id, comment) =>
      apis.post(`/comment/${post_id}`, comment),
    // 게시물 수정하기
    editComment: (comment_id, comment) =>
      apis.put(`/comment/${comment_id}`, comment),
    // 게시물 삭제하기
    deleteComment: (comment_id) => apis.delete(`/comment/${comment_id}`),
  };

export const mypageApis = {
    mypost: () => apis.get("/user/mypost"),
    
  };