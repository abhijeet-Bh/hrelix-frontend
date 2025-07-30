import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import CustomInputField from "./CustomInputField";
import CTCTab from "./CTCTab";
import DeductionTab from "./DeductionTab";
import BankDetailsTab from "./BankDetailsTab";
import PersonalDetailsTab from "./PersonalDetailsTab";
import { searchEmployeeByEmail } from "../../api/employeeApi";

export default function EditEmployee({ defaultEmail = "" }) {
  const { email: emailParam } = useParams();
  const [email, setEmail] = useState(defaultEmail || emailParam || "");
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (emailParam) {
      handleSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailParam]);

  const handleSearch = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    try {
      setLoading(true);
      const data = await searchEmployeeByEmail(email);
      setEmployeeData(data);
    } catch (err) {
      console.error(err);
      setEmployeeData(null);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    {
      id: "ctc",
      label: "CTC",
      content: (
        <CTCTab employeeData={employeeData} setEmployeeData={setEmployeeData} />
      ),
    },
    {
      id: "deductions",
      label: "Deductions",
      content: (
        <DeductionTab
          employeeData={employeeData}
          setEmployeeData={setEmployeeData}
        />
      ),
    },
    {
      id: "bank-details",
      label: "Bank Details",
      content: (
        <BankDetailsTab
          employeeData={employeeData}
          setEmployeeData={setEmployeeData}
        />
      ),
    },
    // {
    //   id: "personal-info",
    //   label: "Personal Info",
    //   content: (
    //     <PersonalDetailsTab
    //       employeeData={employeeData}
    //       setEmployeeData={setEmployeeData}
    //     />
    //   ),
    // },
  ];

  return (
    <div className="p-8">
      <form onSubmit={handleSearch} className="mb-6 flex gap-4">
        <CustomInputField
          label="Search by Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-primaryDark text-white font-semibold mt-auto"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {employeeData && (
        <Tabs aria-label="Employee Tabs" items={tabs}>
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <Card>
                <CardBody>{item.content}</CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      )}
    </div>
  );
}
