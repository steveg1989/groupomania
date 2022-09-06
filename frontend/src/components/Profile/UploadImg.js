import React, { useEffect, useState } from "react";
import axios from "axios";

const UploadImg = ({ userId, userFirstName }) => {
	const [file, setFile] = useState();
	const [userPic, setUserPic] = useState();

	// get pic
	useEffect(() => {
		const getPicAndNAme = async () => {
			await axios({
				method: "get",
				url: `${process.env.REACT_APP_API_URL}api/user/${userId}`,
				withCredentials: true,
			})
				.then((res) => {
					setUserPic(res.data.user_picture);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		getPicAndNAme();

		if (userPic);
	}, [userId, userPic]);

	// change pic
	const handlePicture = (e) => {
		const formData = new FormData();
		formData.append("name", userFirstName);
		formData.append("userId", userId);
		formData.append("file", file);

		axios({
			method: "post",
			baseURL: `${process.env.REACT_APP_API_URL}api/user/upload`,
			withCredentials: true,
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data: formData,
		})
			.then((res) => {
				if (res.err) {
					console.log(res.err);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="profile-picture">
			<div className="profile-img">{userPic ? <img className="profile-pic" src={userPic} alt="profile-pic" /> : <img className="profile-pic" src="./assets/img/default.jpg" alt="profile-pic" />}</div>
			<div></div>

			<form action="" onSubmit={handlePicture} className="upload-pic">
				<input type="file" id="file" name="file" accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} />
				<br />
				<input className="change-pic" type="submit" value="Change profile picture" />
			</form>
		</div>
	);
};

export default UploadImg;