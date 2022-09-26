import React, { useContext } from "react";
import { UserContext } from "../components/AppContext";
import UpdateProfile from "../components/Profile/UpdateProfile";

const Profile = () => {
  const userId = useContext(UserContext).dataProfile.userId;
  if (!userId) {
    window.location = "/connection";
  }

  return (
    <div>
      <div className="profile-page">
        <UpdateProfile /> 
      </div>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@md">add post </button>



<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">New Post</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="col-form-label">Title:</label>
            <input type="text" class="form-control" id="recipient-name"/>
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">content:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
          <div class="form-group">
            <label for="message-text" class="col-form-label">Image:</label>
            <input type="file"/>
          </div>
        </form>
      </div>
      <div class="modal-footer">
       
        <button type="button" class="btn btn-primary">Post</button>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default Profile;