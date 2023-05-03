import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Card from "@/components/card";
import Form from "@/components/form";
import { KrustyContext } from "@/components/ContextProvider/KrustyContextProvider";

const Home = function () {
  const { getUser, employee, showForm, setShowForm, setEmployeeData } =
    useContext(KrustyContext);

  useEffect(() => {
    // Fetch User
    getUser();
  }, []);

  return (
    <main className="h-screen mx-20 my-10">
      <Toaster />
      <header>
        <ul className="grid grid-cols-5 justify-items-center bg-[#002147] p-5 text-[#F5F5F5] rounded-md">
          <li>Employee ID</li>
          <li className="">Name</li>
          <li>Job Position</li>
          <li>Email</li>
          <li>Mobile</li>
        </ul>
      </header>

      <section className="mt-6 overflow-auto max-h-[450px]">
        {employee.map((data, index) => {
          return <Card data={data} index={index} key={data.employee_id} />;
        })}
      </section>

      <div className="my-10 flex justify-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#002147] text-[#F5F5F5] px-5 py-3 rounded-md"
        >
          Add Employee
        </button>
      </div>
      {showForm ? (
        <>
          <div
            onClick={() => {
              setShowForm(!showForm);
              setEmployeeData("");
            }}
            className="bg-black opacity-80 inset-0 max-h-screen bg-coverbg-center z-80 fixed"
          ></div>
          <Form></Form>
        </>
      ) : (
        ""
      )}
    </main>
  );
};

export default Home;
