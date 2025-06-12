import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCircleUser } from "react-icons/fa6";
import { RiHome2Fill } from "react-icons/ri";
import { FaDiscourse } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/logo.png";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../Util/util";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.log("error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      toast.error(error.response.data.errors || "Error in logging out");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <button
        className="md:hidden fixed top-4 left-4 z-20 text-3xl text-gray-800"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX /> : <HiMenu />}
      </button>

      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-gray-100 p-5 transform transition-transform duration-300 z-20 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center mb-10 mt-10 md:mt-0">
          <img src={logo} alt="Logo" className="rounded-full h-12 w-12" />
        </div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/" className="flex items-center">
                <RiHome2Fill className="mr-2" /> Home
              </Link>
            </li>
            <li className="mb-4">
              <span className="flex items-center text-blue-500">
                <FaDiscourse className="mr-2" /> Courses
              </span>
            </li>
            <li className="mb-4">
              <Link to="/purchases" className="flex items-center">
                <FaDownload className="mr-2" /> Purchases
              </Link>
            </li>
            <li className="mb-4">
              <span className="flex items-center">
                <IoMdSettings className="mr-2" /> Settings
              </span>
            </li>
            <li>
              {isLoggedIn ? (
                <Link to="/" className="flex items-center" onClick={handleLogout}>
                  <IoLogOut className="mr-2" /> Logout
                </Link>
              ) : (
                <Link to="/login" className="flex items-center">
                  <IoLogIn className="mr-2" /> Login
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      <main className="ml-0 md:ml-64 w-full bg-white p-6 sm:p-8">
        <header className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Courses</h1>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full sm:w-64 border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 transition">
                <FiSearch className="text-xl text-gray-600" />
              </button>
            </div>
            <FaCircleUser className="text-3xl text-blue-600" />
          </div>
        </header>

        <section className="h-[75vh] overflow-y-auto pr-2">
          {loading ? (
            <p className="text-center text-gray-500 text-lg">Loading...</p>
          ) : courses.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No courses posted yet by admin.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition duration-300 p-4 flex flex-col"
                >
                  <img
                    src={course.image.url}
                    alt={course.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{course.price}
                    </span>
                    <span className="text-green-600 text-sm">20% off</span>
                  </div>
                  <Link
                    to={`/buy/${course._id}`}
                    className="mt-auto bg-orange-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition duration-300"
                  >
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Courses;
