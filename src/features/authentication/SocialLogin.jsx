import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
  const { authenticationUsingGoogle, authenticationUsingGithub } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  // google authentication handler
  const authenticationUsingGoogleHandler = async () => {
    try {
      const result = await authenticationUsingGoogle();
      const loggedInUser = result.user;
      const userData = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };
      await fetch("https://fashion-verse-server.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  // github authentication handler
  const authenticationUsingGithubHandler = async () => {
    try {
      const result = await authenticationUsingGithub();
      const loggedInUser = result.user;
      const userData = {
        name: loggedInUser.displayName,
        email: loggedInUser.email,
      };

      await fetch("https://fashion-verse-server.vercel.app/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      navigate(from, { replace: true });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-6 rounded-md border p-3">
        {/* <button className="avatar">
          <div className="w-5 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://i.ibb.co/Y7nTmxp/facebook.png" />
          </div>
        </button> */}

        <button onClick={authenticationUsingGoogleHandler} className="avatar">
          <div className="w-5 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            <img src="https://i.ibb.co/72bXZqD/google.png" />
          </div>
        </button>

        <button onClick={authenticationUsingGithubHandler} className="avatar">
          <div className="w-5 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
            <img src="https://i.ibb.co/JHJ7PMt/github.png" />
          </div>
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
