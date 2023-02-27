import React, { Component } from "react";
import { connect } from "react-redux";
import { getBlogs, deleteBlogs } from "../actions/blogs";
import EditBlogs from "./EditBlogs";
import NewPage from "./NewPage";

export class Blogs extends Component {
  // managing state for update functionality
  state = {
    cloneId: 0,
    cloneTitle: "",
    cloneImageLink: "",
    cloneDescription: "",
    editing: false,
    hideBlogsDuringUpdate: false,
    openNewPage: false,
    MAX_LENGTH: 100, // per blog
  };

  // new page
  newPage = (blog) => {
    this.setState({
      cloneId: blog.id,
      cloneTitle: blog.title,
      cloneImageLink: blog.ImageLink,
      cloneDescription: blog.description,
      openNewPage: true,
    });
  };

  // toggle hideBlogsDuringUpdate state
  toggleHideOnUpdate = () => {
    console.log("toggle hide on update", this.state.hideBlogsDuringUpdate);
    this.setState({
      hideBlogsDuringUpdate: !this.state.hideBlogsDuringUpdate,
    });
  };

  // calling the api to fetch items
  componentDidMount() {
    console.log("fetching blogs from api...");
    this.props.getBlogs();
  }

  // handle edits function
  handleEdits = (blog) => {
    this.setState({
      cloneId: blog.id,
      cloneTitle: blog.title,
      cloneImageLink: blog.ImageLink,
      cloneDescription: blog.description,
      editing: !this.state.editing,
    });
    console.log("edit button contains", blog);
  };

  // toggle form Editing
  toggleEditing = () => {
    this.setState({
      editing: false,
    });
  };

  // toggle open new page
  toggleOpenNewPage = () => {
    this.setState({
      openNewPage: false,
    });
  };

  render() {
    return (
      <div className="container">
        {this.state.editing ? (
          <EditBlogs
            cloneId={this.state.cloneId}
            cloneTitle={this.state.cloneTitle}
            cloneImageLink={this.state.cloneImageLink}
            cloneDescription={this.state.cloneDescription}
            toggleEditing={this.toggleEditing}
            toggleHideOnUpdate={this.toggleHideOnUpdate}
            toggleOpenNewPage={this.toggleOpenNewPage}
          />
        ) : (
          ""
        )}
        {this.state.hideBlogsDuringUpdate || this.props.hideAllBlogs ? (
          ""
        ) : (
          <div>
            {this.state.openNewPage ? (
              <NewPage
                cloneId={this.state.cloneId}
                cloneTitle={this.state.cloneTitle}
                cloneImageLink={this.state.cloneImageLink}
                cloneDescription={this.state.cloneDescription}
                handleEdits={this.handleEdits}
                toggleHideOnUpdate={this.toggleHideOnUpdate}
              />
            ) : (
              <div style={{marginLeft: "-105px"}}>
               <center> <h3>All Blogs</h3></center>


              
                
         <table className ="">
          <tr>
          {this.props.blogs.map((blog) => (
         <td>
           <div style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                                fontFamily: "cursive", width: "350px", height: "550px"}}
                    className="card card-spacing"
                    key={blog.id}
                  >
                    <h4 style={{color: "black"}}>{blog.title}</h4>
                 
                    <br />
                    <img src={blog.ImageLink} alt="imagelink" height="250px" width="320px"/>
                    <br />
                    <hr className="new1"></hr>
                    {blog.description.length > this.state.MAX_LENGTH ? (
                      <div>
                        {`${blog.description.substring(
                          0,
                          this.state.MAX_LENGTH
                        )}...`}
                        <span onClick={this.toggleBlogLength}></span>
                      </div>
                    ) : (
                      <p className="justify-description-css">
                        {blog.description}
                      </p>
                    )}

                    {/* Edit Blog */}

                    <span
                      className="span-button"
                      onClick={() => {
                        this.handleEdits(blog);
                        this.toggleHideOnUpdate();
                      }}
                    >
                      <i className="edit-button far fa-edit fa-2x button-css" />
                    </span>

                    {/* full blog */}
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        this.newPage(blog);
                      }}
                    >
                      view blog
                    </button>

                    {/* Delete Blog */}

                    <span
                      className="span-button"
                      onClick={this.props.deleteBlogs.bind(this, blog.id)}
                    >
                      <i className="delete-button fas fa-trash fa-2x ml-2 button-css" />
                    </span>
                    
                          </div>
         </td>
                             ))}
          </tr>
         </table>
                  
             
              </div>
            )}
            
          </div>
        )}
      
      </div>
     
    );
  }
}

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs, // from combine reducer and initial state of reducer
});

export default connect(mapStateToProps, { getBlogs, deleteBlogs })(Blogs);