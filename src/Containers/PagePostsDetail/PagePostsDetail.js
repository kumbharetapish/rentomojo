import React, { Component } from "react";
import { postsDetailLinkPage, postsLinkPage } from "../../Services/Utils";
import WebServices from "../../Services/WebServices";
import PostsDetailStyle from "./PagePostsDetail.module.css";

class PagePostsDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
      commentsList: [],
    };
    this.viewCommentsHandler = this.viewCommentsHandler.bind(this);
    this.deletePost = this.deletePost.bind(this);
  }

  componentDidMount() {
    window.scroll(0, 0);
    if (
      this.props &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.postId
    ) {
      const postId = this.props.match.params.postId;
      WebServices.getPostDetail(postId)
        .then((res) => {
          if (res && res.data) {
            this.setState({
              postDetail: res.data,
            });
          }
        })
        .catch((err) => {
          console.log(err + "in get Post listing");
        });
    }
  }

  viewCommentsHandler(postId) {
    if (postId) {
      WebServices.getComments(postId)
        .then((res) => {
          if (res && res.data) {
            this.setState({
              commentsList: res.data,
            });
          }
        })
        .catch((err) => {
          console.log(err + "error in get comments services.");
        });
    }
  }

  deletePost(postId, userId) {
    if (postId && userId) {
      WebServices.deletePost(postId)
        .then((res) => {
          if (res && res.data) {
            this.setState({
              deleteVisible: false,
            });
            this.props.history.push(`${postsLinkPage}/${userId}`);
          }
        })
        .catch((err) => {
          console.log(err + "error in get comments services.");
        });
    }
  }
  render() {
    return (
      <div className={PostsDetailStyle.Container}>
        <div className="pageHeading">Post Detail </div>
        {this.state.postDetail ? (
          <>
            <div className={PostsDetailStyle.cardWrapper}>
              <div className={PostsDetailStyle.title}>{this.state.postDetail.title}</div>
              <div>{this.state.postDetail.body}</div>
            </div>

            <div className={PostsDetailStyle.btnWrapper}>
              <div
                className={PostsDetailStyle.viewBtn}
                onClick={() => {
                  this.viewCommentsHandler(this.state.postDetail.id);
                }}
              >
                View Comments
              </div>
              <div
                className={PostsDetailStyle.delBtn}
                onClick={() => {
                  this.setState({
                    deleteVisible: true,
                  });
                }}
              >
                Delete Post
              </div>
            </div>
            {this.state.commentsList.map((el) => {
              return (
                <div className={PostsDetailStyle.commentWrapper}>
                  <div className={PostsDetailStyle.emailtext}>{el.email} </div>
                  <div>{el.body}</div>
                </div>
              );
            })}

            {this.state.deleteVisible ? (
              <div className={PostsDetailStyle.deletepopupwrapper}>
                <div className={PostsDetailStyle.popupwrapper}>
                  <div>Are you sure ?</div>
                  <div className={PostsDetailStyle.btnWrapper}>
                    <div
                      className={PostsDetailStyle.viewBtn}
                      onClick={() => {
                        this.setState({
                          deleteVisible: false,
                        });
                      }}
                    >
                      No
                    </div>
                    <div
                      className={PostsDetailStyle.delBtn}
                      onClick={() => {
                        this.deletePost(this.state.postDetail.id, this.state.postDetail.userId);
                      }}
                    >
                      Yes
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

export default PagePostsDetail;
