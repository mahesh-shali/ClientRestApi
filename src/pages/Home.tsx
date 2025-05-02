import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { useTitle } from "../hooks/useTitle";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faUsers } from "@fortawesome/free-solid-svg-icons";

export const Home: React.FC = () => {
  useTitle("Home");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden ">
      {/* Navbar with Scrollbar */}
      <Navbar
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      />

      {/* Main Content */}
      <div
        className="flex-grow overflow-auto scrollbar-thin scrollbar-thumb-gray-400 
           scrollbar-track-transparent scrollbar-thumb-rounded-md"
      >
        <div
          className="flex-grow overflow-auto pt-16 scrollbar-thin scrollbar-thumb-gray-400 
           scrollbar-track-transparent scrollbar-thumb-rounded-md 
           bg-radial-background"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 50%, white 70%, #90CDF4 100%)",
          }}
        >
          <div className="container flex flex-col mx-auto px-4">
            <section className="flex flex-col text-center mt-[10rem] mb-[20rem]">
              <h1 className="text-black space-y-4">
                Make your business systematic <br /> and easy to manage.
              </h1>
              <div className="mt-6">
                <p className="mt-4">
                  we provide our clients with a wide range of services,
                  including enterprise-wide organizational structure,
                  <span>
                    <br />
                    personal management, task management, finance and warehouse
                    management, and many other facilities.
                  </span>
                </p>
              </div>

              <div className="mt-10 flex flex-col items-center justify-center">
                <div className="bg-blue-500 w-full md:w-[20rem] rounded-xl h-[3rem] flex items-center justify-center">
                  <Link to={""} className="text-lg text-white">
                    Request a Demo
                  </Link>
                </div>
              </div>

              <div className="mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Link
                      to={""}
                      className="bg-white rounded-xl h-[3rem] flex items-center justify-center ring-2 
                      hover:bg-blue-400 cursor-pointer hover:text-white w-full"
                    >
                      Task Management
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={""}
                      className="bg-white rounded-xl h-[3rem] flex items-center justify-center ring-2 
                      hover:bg-blue-400 cursor-pointer hover:text-white w-full"
                    >
                      HR Management
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={""}
                      className="bg-white rounded-xl h-[3rem] flex items-center justify-center ring-2 
                      hover:bg-blue-400 cursor-pointer hover:text-white w-full"
                    >
                      Finance
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={""}
                      className="bg-white rounded-xl h-[3rem] flex items-center justify-center ring-2 
                      hover:bg-blue-400 cursor-pointer hover:text-white w-full"
                    >
                      Contracts
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={""}
                      className="bg-white rounded-xl h-[3rem] flex items-center justify-center ring-2 
                      hover:bg-blue-400 cursor-pointer hover:text-white w-full"
                    >
                      Warehouse
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={""}
                      className="bg-white rounded-xl h-[3rem] flex items-center justify-center ring-2 
                      hover:bg-blue-400 cursor-pointer hover:text-white w-full"
                    >
                      LMS
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <div>
          <section className="mt-[5rem]">
            <div className="">
              <div className="">
                <div className="flex items-center justify-center ">
                  <h1 className="text-black text-5xl">
                    Problems that complicate <br /> business management
                  </h1>
                </div>
              </div>
            </div>

            <div className="mt-[2rem] space-y-4">
              <div className="ml-[2rem] ">
                <div className=" rounded-lg ring-1 bg-gray-50 ring-gray-200 p-6 w-1/2">
                  <div className="flex">
                    <div className="flex items-center justify-center mr-[2rem]">
                      <h1 className="text-7xl">1</h1>
                    </div>
                    <div className="flex flex-col">
                      <div className="">
                        <p className="text-2xl font-bold text-black">
                          Issues With The Organizational Structure.
                        </p>
                      </div>

                      <div className="mt-[1rem]">
                        <p className="text-gray-700 text-sm">
                          Many business owners overlook the importance of
                          properly distributing tasks among employees. In many
                          cases, the establishment of a organizational structure
                          based on standards and clear definition of employee
                          positions is not carried out.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-end mr-[2rem]">
                <div className="bg-gray-50 rounded-lg ring-1 ring-gray-200 p-6 w-1/2">
                  <div className="flex">
                    <div className="flex items-center justify-center mr-[2rem]">
                      <h1 className="text-7xl">2</h1>
                    </div>
                    <div className="flex flex-col">
                      <div className="">
                        <p className="text-2xl font-bold text-black">
                          Lack of control and monitor over employee tasks
                        </p>
                      </div>

                      <div className="mt-[1rem]">
                        <p className="text-gray-700 text-sm">
                          Within the organizational structure of the enterprise,
                          department heads face difficulties in assigning tasks
                          to their employees and monitoring the time spent on
                          those tasks. Employees struggle to determine their
                          productivity.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-[2rem]">
                <div className="bg-gray-50 rounded-lg ring-1 ring-gray-200 p-6 w-1/2">
                  <div className="flex">
                    <div className="flex items-center justify-center mr-[2rem]">
                      <h1 className="text-7xl">3</h1>
                    </div>
                    <div className="flex flex-col">
                      <div className="">
                        <p className="text-2xl font-bold text-black">
                          No clear plan or system for employee skill
                          development.
                        </p>
                      </div>

                      <div className="mt-[1rem]">
                        <p className="text-gray-700 text-sm">
                          The lack of opportunity to familiarize employees with
                          the necessary knowledge and requirements for each
                          position, to acquaint them with new information to be
                          acquired, and to evaluate the results of training.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-end mr-[2rem]">
                <div className="bg-gray-50 rounded-lg ring-1 ring-gray-200 p-6 w-1/2">
                  <div className="flex">
                    <div className="flex items-center justify-center mr-[2rem]">
                      <h1 className="text-7xl">4</h1>
                    </div>
                    <div className="flex flex-col">
                      <div className="">
                        <p className="text-2xl font-bold text-black">
                          Failure to keep track of enterprise expenses.
                        </p>
                      </div>

                      <div className="mt-[1rem]">
                        <p className="text-gray-700 text-sm">
                          Failure to organize cot optimization efforts includes
                          not recording every expense made by the enterprise and
                          not conducting periodic analysis of expenses. This is
                          one of the main factors that leads to the company
                          being trapped in a cycle of financial difficulties.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section>
          <div className="p-10 ">
            <div className="p-[6rem] ring-1 ring-orange-100 bg-orange-100 rounded-md">
              <div className="p-4 flex gap-[10rem]">
                <div className="p-2 space-y-4">
                  <div>
                    <div className="text-red-500 text-xl">HR Management</div>
                  </div>
                  <div className=" text-black">
                    <h2 className="text-bold">
                      Make Your HR management easier by skills.
                    </h2>
                    <h2 className="text-bold">improving your management</h2>
                  </div>

                  <div>
                    By enhancing your abilities, you can streamline HR Process,
                    effectively handle <br /> employee relations, and foster a
                    positive work environment. This will not result <br /> in
                    smoother operations but also contribute to the overall
                    success of your <br /> organization.
                  </div>
                </div>
                <div>
                  <div className="ring-1 ring-white  rounded-md bg-white">
                    <div className="flex justify-between items-center p-[1rem]">
                      <div>Code: 001</div>
                      <div className="flex gap-2 items-center">
                        <div>
                          <span>
                            <FontAwesomeIcon
                              icon={faPaperclip}
                              className="mr-1"
                              style={{ transform: "rotate(138deg)" }}
                            />
                            1
                          </span>
                        </div>
                        <div>
                          <span>
                            <FontAwesomeIcon icon={faUsers} className="mr-1" />
                          </span>
                          1
                        </div>
                      </div>
                    </div>
                    <div className="p-[1rem] space-y-4">
                      <div className="">
                        <div className="text-lg text-black font-bold">
                          Design, construction, and renovation
                          <div>company.</div>
                        </div>
                      </div>

                      <div className="">
                        <div className="mb-1 text-lg text-black font-bold">
                          Department function:
                        </div>
                        <div>
                          Promptly and qualitatively prepare projects,
                          <div>
                            construct and repair premises and buildings, and
                          </div>{" "}
                          <div>maintain their quality.</div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="px-4">
                      <div className="text-blue-400 font-bold">Director:</div>
                      <div>
                        <div className="border-l-2">
                          <div className="flex">
                            <div className="border-b-2 space-x-10">
                              <div className="space-x-10">Hello</div>
                            </div>
                          </div>
                          <div className="flex">
                            <div className="border-b-2">
                              <div>Hello</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-[10rem] mb-[10rem]">
          <div className="">
            <div className="flex flex-row justify-center items-center">
              <div
                className="p-[10rem] rounded-lg"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #90CDF4, white 10%, #90CDF4)",
                }}
              >
                <div>
                  <h1 className="text-black text-center">Tour the product</h1>
                </div>
                <div className="m-1 text-gray-500">
                  One of our specialist will walk you through the platform and
                  demonstrate how our solution can help!
                </div>
                <div className="mt-10 flex flex-col items-center justify-center">
                  <div className="bg-blue-500 w-full md:w-[20rem] rounded-xl h-[3rem] flex items-center justify-center">
                    <Link to={""} className="text-lg text-white">
                      Request a Demo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="bg-gray-100 p-[10rem] bottom-0 left-0">
            <div></div>
          </div>
        </section>
      </div>
    </div>
  );
};
