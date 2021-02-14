import React, { Component } from "react";
import { postsLinkPage } from "../../Services/Utils";
import WebServices from "../../Services/WebServices";
import UsersStyle from "./PageUsersStyle.module.css";

class PageUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList: [],
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    WebServices.getUsersList()
      .then((res) => {
        if (res && res.data) {
          this.setState({
            usersList: res.data,
          });
        }
      })
      .catch((err) => {
        console.log(err + " in product listing");
      });
  }

  render() {
    return (
      <div className={UsersStyle.Container}>
        <div className="pageHeading">Home</div>
        <div className={UsersStyle.cardWrapper}>
          <div className={UsersStyle.tblHeading}>Name</div>
          <div className={UsersStyle.tblHeading}>Company Name </div>
          <div className={UsersStyle.viewHeading}>View </div>
        </div>
        {this.state.usersList ? (
          <>
            {this.state.usersList.map((el) => {
              return (
                <div className={UsersStyle.cardWrapper}>
                  <div className={UsersStyle.title}>{el.name ? el.name : ""}</div>
                  <div className={UsersStyle.companyName}>
                    {el.company && el.company.name ? el.company.name : ""}
                  </div>
                  <div className={UsersStyle.viewBtn}>
                    <div
                      // className={UsersStyle.viewBtn}
                      onClick={() => {
                        this.props.history.push(`${postsLinkPage}/${el.id}`);
                      }}
                    >
                      View{" "}
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

export default PageUsers;
