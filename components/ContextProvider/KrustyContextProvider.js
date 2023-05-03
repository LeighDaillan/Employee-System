import { createContext, useState } from "react";

export const KrustyContext = createContext();

const KrustyProvider = function (props) {
  const [showForm, setShowForm] = useState(false);
  const [employeeData, setEmployeeData] = useState();
  const [employee, setEmployee] = useState([]);
  const getUser = async () => {
    const reqData = await fetch(
      "http://localhost/krustykrabemployee/employees.php"
    );
    const resData = await reqData.json();
    setEmployee(resData);
  };

  return (
    <KrustyContext.Provider
      value={{
        getUser,
        setEmployee,
        employee,
        setShowForm,
        showForm,
        employeeData,
        setEmployeeData,
      }}
    >
      {props.children}
    </KrustyContext.Provider>
  );
};

export default KrustyProvider;
