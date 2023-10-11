import { Helmet } from "react-helmet-async";
import useClassesData from "../hooks/useClassesData";
import LoadingSpinner from "../ui/LoadingSpinner";
import SectionHeading from "../ui/SectionHeading";
import AdminFeedback from "../features/admin/AdminFeedback";

const ManageClassesPage = () => {
  const { classesData, classesLoading, classesError, isClassesError, refetch } =
    useClassesData();
  // console.log(classesData);

  const userRoleHandler = (id, status) => {
    // console.log(id);
    // console.log(status);
    fetch(`https://fashion-verse-server.vercel.app/classes/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // const denyHandler=(item)=>{}

  if (classesLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  if (isClassesError) {
    return (
      <p className="text-center text-red-600">
        something went wrong {classesError}
      </p>
    );
  }
  return (
    <div className=" ml-2">
      <Helmet>
        <title>Bistro | My selected class</title>
      </Helmet>
      <div>
        <SectionHeading
          subHeading={`manage`}
          heading={`all classes`}
        ></SectionHeading>
        <div className="text-3xl ">
          <div className="">
            <span>Total classes: </span>
            <span>{classesData?.length}</span>
          </div>
        </div>

        {/* table */}
        <div className="mt-8 overflow-x-auto">
          <table className="table border border-success">
            {/* head */}
            <thead className="">
              <tr className="border border-success">
                <th>image</th>
                <th>class</th>
                <th>instructor</th>
                <th>instructor email</th>
                <th>seats</th>
                <th>price</th>
                <th>status</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row start */}
              {classesData?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={item.classImage} />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="">{item.className}</td>
                  <td className="">{item.user.userName}</td>
                  <td className="">{item.user.userEmail}</td>
                  <td className="">{item.seats}</td>
                  <td className="">{item.price}</td>
                  <td className="capitalize">{item.status}</td>

                  <th className="flex flex-col gap-2">
                    <button
                      disabled={
                        item.status === "approved" || item.status === "denied"
                      }
                      onClick={() => userRoleHandler(item._id, "approved")}
                      className="btn-success btn-xs btn "
                    >
                      approve
                    </button>
                    <button
                      disabled={
                        item.status === "approved" || item.status === "denied"
                      }
                      onClick={() => userRoleHandler(item._id, "denied")}
                      className="btn-error btn-xs btn "
                    >
                      deny
                    </button>
                    <button
                      className="btn-warning btn-xs btn"
                      onClick={() => window.my_modal_3.showModal()}
                    >
                      feedback
                    </button>
                  </th>
                </tr>
              ))}
              {/* row end */}
            </tbody>
          </table>
        </div>
      </div>
      {/* modal */}
      <AdminFeedback />
    </div>
  );
};

export default ManageClassesPage;
