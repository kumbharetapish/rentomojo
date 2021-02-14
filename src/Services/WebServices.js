import axios from "axios";
const DEFAULT_API = "https://jsonplaceholder.typicode.com";

class WebServices {
  getAxios() {
    return axios;
  }

  getUsersList() {
    return this.getAxios().get(`${DEFAULT_API}/users`);
  }

  getPost(userId) {
    return this.getAxios().get(`${DEFAULT_API}/posts?userId=${userId}`);
  }

  getPostDetail(postId) {
    return this.getAxios().get(`${DEFAULT_API}/posts/${postId}`);
  }

  getComments(postId) {
    return this.getAxios().get(`${DEFAULT_API}/posts/${postId}/comments`);
  }

  deletePost(postId) {
    return this.getAxios().delete(`${DEFAULT_API}/posts/${postId}`);
  }
}

export default new WebServices();
