import React, { Component } from "react";
import { postsDetailLinkPage } from "../../Services/Utils";
import WebServices from "../../Services/WebServices";
import PostsStyle from "./PagePosts.module.css";

class PagePosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postsList: [],
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    if (
      this.props &&
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.userId
    ) {
      const userId = this.props.match.params.userId;
      WebServices.getPost(userId)
        .then((res) => {
          if (res && res.data) {
            this.setState({
              postsList: res.data,
            });
          }
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err + "in get Post listing");
        });
    }
  }

  render() {
    return (
      <div className={PostsStyle.Container}>
        <div className="pageHeading">Posts</div>
        <div className={PostsStyle.cardWrapper}>
          <div className={PostsStyle.tblHeading}>Title</div>
          <div className={PostsStyle.viewHeading}>Post Details</div>
        </div>
        {this.state.postsList ? (
          <>
            {this.state.postsList.map((el) => {
              return (
                <div className={PostsStyle.cardWrapper}>
                  <div className={PostsStyle.title}>{el.title ? el.title : ""}</div>
                  <div className={PostsStyle.viewBtn}>
                    <div
                      onClick={() => {
                        this.props.history.push(`${postsDetailLinkPage}/${el.id}`);
                      }}
                    >
                      View Post Details
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

export default PagePosts;
