import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UsersPage = () => {
  const { data } = useSWR("http://localhost:3000/Users", fetcher);

  const [user, setUser] = useState({});

  useEffect(() => {
    data?.map((item) => setUser(item));
  }, [data]);

  return (
    <>
      <table className="w-full">
        <thead className="bg-gray-50 border-b-2 border-gray-200">
          <tr>
            {Object.keys(user).map((title, idx) => {
              return (
                <th
                  key={idx}
                  className="uppercase p-3 text-sm font-semibold text-center"
                >
                  {title}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data?.map((user, idx) => {
            return (
              <>
                <tr className="bg-gray-100 border border-neutral-600 text-center h-10 text-xs">
                  <td key={idx} className="">
                    {user.name}
                  </td>
                  <td key={idx} className="">
                    {user.age}
                  </td>
                  <td key={idx} className="">
                    {user.active === false ? (
                      <span className="bg-rose-500 text-white p-1 rounded-md">
                        Off
                      </span>
                    ) : (
                      <span className="bg-emerald-500 text-white p-1 rounded-md">
                        On
                      </span>
                    )}
                  </td>
                  <td key={idx} className="">
                    $ {user.salary}
                  </td>
                  <td key={idx} className="flex items-center flex-col">
                    {user?.skill?.length ? (
                      <>
                        {user?.skill?.map((userSkill, idx) => {
                          return (
                            <td
                              key={idx}
                              className="bg-neutral-200 rounded-md p-1 my-1"
                            >
                              {userSkill}
                            </td>
                          );
                        })}
                      </>
                    ) : (
                      <span>No Skill</span>
                    )}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UsersPage;
