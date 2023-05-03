import { KrustyContext } from "@/components/ContextProvider/KrustyContextProvider";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Form = function () {
  const [method, setMethod] = useState();
  const { employeeData, getUser, showForm, setShowForm, setEmployeeData } =
    useContext(KrustyContext);
  const [inputData, setInputData] = useState(
    employeeData || {
      employee_name: "",
      employee_position: "",
      employee_email: "",
      employee_mobile: "",
      employee_birthdate: "",
      employee_age: "",
      employee_gender: "",
      employee_hired_date: "",
    }
  );

  const handleSubmitEvent = async function (event, method) {
    event.preventDefault();

    let fData = new FormData();
    if (method === "post update") {
      fData.append("id", inputData.employee_id);
      fData.append("name", inputData.employee_name);
      fData.append("position", inputData.employee_position);
      fData.append("email", inputData.employee_email);
      fData.append("mobile", inputData.employee_mobile);
      fData.append("birthdate", inputData.employee_birthdate);
      fData.append("age", inputData.employee_age);
      fData.append("gender", inputData.employee_gender);
      fData.append("hired_date", inputData.employee_hired_date);

      await axios({
        method: "POST",
        url: "http://localhost/krustykrabemployee/update.php",
        data: fData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((response) => {
          // notify the user
          toast.success(`#${response.data.employee_id} has been updated`);

          // re-render the employee list
          getUser();

          // set variable to empty
          setEmployeeData();

          // close the modal form
          setShowForm(!showForm);
        })
        .catch((error) => toast.error(error));
    } else if (method === "delete") {
      await axios({
        method: "DELETE",
        url: `http://localhost/krustykrabemployee/delete.php/${inputData.employee_id}`,
        data: { id: inputData.employee_id },
        config: { headers: { "Content-Type": "multipart/form-data" } },
      }).then((response) => {
        // notify the user
        toast.success(`#${response.data.employee_id} has been deleted`);

        // re-render the employee list
        getUser();

        // set variable to empty
        setEmployeeData();

        // close the modal form
        setShowForm(!showForm);
      });
    } else if (method === "post add") {
      fData.append("name", inputData.employee_name);
      fData.append("position", inputData.employee_position);
      fData.append("email", inputData.employee_email);
      fData.append("mobile", inputData.employee_mobile);
      fData.append("birthdate", inputData.employee_birthdate);
      fData.append("age", inputData.employee_age);
      fData.append("gender", inputData.employee_gender);
      fData.append("hired_date", inputData.employee_hired_date);

      console.log(inputData);

      await axios({
        method: "POST",
        url: "http://localhost/krustykrabemployee/add.php",
        data: fData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then((response) => {
          console.log(response.data);
          // notify the user
          toast.success(`${response.data.employee_name} has been added`);

          // re-render the employee list
          getUser();

          // set variable to empty
          setEmployeeData();

          // close the modal form
          // setShowForm(!showForm);
        })
        .catch((error) => toast.error(error));
    }
  };

  return (
    <>
      <form
        onSubmit={(event) => handleSubmitEvent(event, method)}
        // action="http://localhost/krustykrabemployee/update.php"
        // method="post"
        className="top-0 left-0 right-0 bg-[#1A1110] fixed z-90  rounded-lg p-5 text-xl max-w-sm sm:max-w-md md:max-w-xl mx-auto mt-20 flex flex-col"
        autoComplete="off"
      >
        <h2 className="text-white text-center my-5 text-2xl">
          Personal Informations
        </h2>
        {employeeData ? (
          <div className="relative w-full mb-6 group">
            <input
              type="text"
              name="id"
              defaultValue={+employeeData.employee_id}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              readOnly={true}
            />
            <label
              htmlFor="id"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Employee ID
            </label>
          </div>
        ) : (
          ""
        )}

        {/* Fullname */}
        <div className="flex justify-evenly gap-5">
          <div className="relative w-full mb-6 group">
            <input
              type="text"
              name="fullname"
              defaultValue={employeeData?.employee_name}
              onChange={(e) =>
                setInputData((prev) => {
                  return { ...prev, employee_name: e.target.value };
                })
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="fullname"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>

          {/* Position */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="position"
              defaultValue={employeeData?.employee_position}
              onChange={(e) =>
                setInputData((prev) => {
                  return { ...prev, employee_position: e.target.value };
                })
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="position"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Position
            </label>
          </div>
        </div>

        {/* Email */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="email"
            name="email"
            defaultValue={employeeData?.employee_email}
            onChange={(e) =>
              setInputData((prev) => {
                return { ...prev, employee_email: e.target.value };
              })
            }
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>

        <div className="flex justify-evenly gap-5">
          {/* Mobile */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="mobile"
              defaultValue={employeeData?.employee_mobile}
              onChange={(e) =>
                setInputData((prev) => {
                  return { ...prev, employee_mobile: +e.target.value };
                })
              }
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="mobile"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Mobile
            </label>
          </div>

          {/* Birthdate */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="date"
              name="birthdate"
              defaultValue={employeeData?.employee_birthdate}
              onChange={(e) =>
                setInputData((prev) => {
                  return { ...prev, employee_birthdate: e.target.value };
                })
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="birthdate"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Birthdate
            </label>
          </div>
        </div>

        <div className="flex justify-evenly gap-5">
          {/* age */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              name="age"
              defaultValue={employeeData?.employee_age}
              onChange={(e) =>
                setInputData((prev) => {
                  return { ...prev, employee_age: +e.target.value };
                })
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="age"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Age
            </label>
          </div>

          {/* Gender */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="gender"
              defaultValue={employeeData?.employee_gender}
              onChange={(e) =>
                setInputData((prev) => {
                  return { ...prev, employee_gender: e.target.value };
                })
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="gender"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Gender
            </label>
          </div>
        </div>

        {/* Hired Date */}
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="date"
            name="hireddate"
            defaultValue={employeeData?.employee_hired_date}
            onChange={(e) =>
              setInputData((prev) => {
                return { ...prev, employee_hired_date: e.target.value };
              })
            }
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="hireddate"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Hired Date
          </label>
        </div>
        {employeeData ? (
          <div className="grid grid-cols-2 gap-5 justify-evenly">
            <button
              type="submit"
              onClick={() => setMethod("post update")}
              className="order-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
            <button
              type="submit"
              onClick={() => setMethod("delete")}
              className="text-white bg- hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            type="submit"
            onClick={() => setMethod("post add")}
            className="order-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
        )}
      </form>
    </>
  );
};

export default Form;
