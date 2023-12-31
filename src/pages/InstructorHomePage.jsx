import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { FaBook, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useInstructorMyClassData from "../hooks/useInstructorMyClassData";

const InstructorHomePage = () => {
  const { instructorMyClassData } = useInstructorMyClassData();
  const { user } = useAuth();

  const approvedClasses = instructorMyClassData?.filter(
    (item) => item.status === "approved",
  );
  const deniedClasses = instructorMyClassData?.filter(
    (item) => item.status === "denied",
  );

  // console.log(instructorMyClassData);
  return (
    <div className="px-5">
      <Helmet>
        <title>FashionVerse | InstructorHomePage</title>
      </Helmet>
      <div>
        <div className="mb-4">
          <h2 className="text-2xl capitalize">Welcome {user?.displayName}</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded bg-green-200 px-24 py-8 capitalize text-white">
            <div className="text-2xl text-orange-700">
              <FaBook></FaBook>
            </div>
            <div className="flex flex-col items-center justify-end">
              <div className="badge badge-secondary text-white">
                +{instructorMyClassData?.length || 0}
              </div>
              <div className="font-semibold text-secondary">Classes</div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded bg-orange-200 px-24 py-8 capitalize text-white">
            <div className="text-2xl text-orange-700">
              <FaCheckCircle />
            </div>
            <div className="flex flex-col items-center justify-end ">
              <div className="badge badge-secondary text-white">
                +{approvedClasses?.length || 0}
              </div>
              <div className="font-semibold text-secondary">Approved</div>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded bg-purple-200 px-24 py-8 capitalize text-white">
            <div className="text-2xl text-orange-700">
              <FaTimesCircle />
            </div>
            <div className="flex flex-col items-center justify-end ">
              <div className="badge badge-secondary text-white">
                +{deniedClasses?.length || 0}
              </div>
              <div className="font-semibold text-secondary">Denied</div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded border-orange-300 bg-blue-50 p-8 sm:border-l-2">
            <div className="flex justify-center">
              <div className="text-center">
                <div className="avatar ">
                  <div className="w-24 rounded-full ring-2 ring-offset-2">
                    <img src={user?.photoURL} />
                  </div>
                </div>
                <div className="font-semibold uppercase text-secondary">
                  {user?.displayName}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded border-orange-300 bg-cyan-100 p-8 shadow-lg sm:border-l-2">
            <h3 className="text-2xl font-semibold text-secondary">Summary</h3>
            <div className="flex items-center gap-4 text-blue-500">
              <span>
                <FaBook />
              </span>
              <span>Classes={instructorMyClassData?.length || 0}</span>
            </div>

            <div className="flex items-center gap-4 text-yellow-500">
              <span>
                <FaCheckCircle />
              </span>
              <span>Approved={approvedClasses?.length || 0}</span>
            </div>

            <div className="flex items-center gap-4 text-orange-500">
              <span>
                <FaTimesCircle />
              </span>
              <span>Denied={deniedClasses?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorHomePage;
