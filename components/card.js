import { motion } from "framer-motion";
import { KrustyContext } from "./ContextProvider/KrustyContextProvider";
import Form from "./form";
import { useContext, useState } from "react";

const Card = function ({ data, index }) {
  const { showForm, setShowForm, setEmployeeData } = useContext(KrustyContext);

  return (
    <>
      <motion.div
        transition={{ delay: 0.1 * index }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="p-6 bg-gray-900 rounded-lg my-3 cursor-pointer"
        onClick={() => {
          setShowForm(!showForm);
          setEmployeeData(data);
        }}
      >
        <div className="grid grid-cols-5 justify-items-center  text-blue-100  transition ease-in-out delay-150 hover:scale-105 duration-300">
          <p># {data.employee_id}</p>
          <p>{data.employee_name}</p>
          <p>{data.employee_position}</p>
          <p>{data.employee_email}</p>
          <p>{data.employee_mobile}</p>
        </div>
      </motion.div>
      {showForm ? (
        <>
          <div
            onClick={() => {
              setShowForm(!showForm);
              setEmployeeData("");
            }}
            className="bg-black opacity-80 inset-0 max-h-screen bg-coverbg-center z-80 fixed"
          ></div>
          <Form />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Card;
