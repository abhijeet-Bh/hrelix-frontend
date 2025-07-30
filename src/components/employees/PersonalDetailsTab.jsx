import { Formik, Form } from "formik";
import CustomInputField from "./CustomInputField";
import { updatePersonalDetails } from "../../api/employeeApi";

export default function PersonalDetailsTab({ employeeData, setEmployeeData }) {
  const { employee } = employeeData || {};

  return (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: employee?.firstName || "",
        lastName: employee?.lastName || "",
        email: employee?.email || "",
        phone: employee?.phone || "",
        joiningDate: employee?.joiningDate || "",
      }}
      onSubmit={async (values) => {
        try {
          const updated = await updatePersonalDetails(employee.id, values);
          setEmployeeData((prev) => ({
            ...prev,
            employee: { ...prev.employee, ...updated },
          }));
          alert("Personal details updated.");
        } catch (err) {
          console.error(err);
          alert("Failed to update.");
        }
      }}
    >
      {({ values, handleChange }) => (
        <Form className="space-y-6">
          <CustomInputField
            label="First Name"
            value={values.firstName}
            onChange={handleChange("firstName")}
            editable
          />
          <CustomInputField
            label="Last Name"
            value={values.lastName}
            onChange={handleChange("lastName")}
            editable
          />
          <CustomInputField
            label="Email"
            value={values.email}
            editable={false}
          />
          <CustomInputField
            label="Phone"
            value={values.phone}
            onChange={handleChange("phone")}
            editable
          />
          <CustomInputField
            label="Joining Date"
            value={values.joiningDate}
            onChange={handleChange("joiningDate")}
            editable
          />
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-primaryDark text-white font-semibold mt-4"
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
}
