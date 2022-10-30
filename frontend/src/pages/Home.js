import NewPostForm from "../components/Post/NewPostForm";
import Thread from "../components/Thread";

const Home = () => {
  return (
    <div>
      <div className="home">
        <div className="main">
          <NewPostForm />
          <Thread />
        </div>
        <img
          className="logo"
          src="./assets/logos/icon-left-font-monochrome-black.png"
          alt="logo"
        />
      </div>
    </div>
  );
};

export default Home;
