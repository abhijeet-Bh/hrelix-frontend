import ErrorScreen from "../ErrorScreen";
import LoadingScreen from "../LoadingScreen";
import NoResult from "./NoResult";
import SearchResult from "./SearchResult";
import { useEmployee } from "./use-employee";

export default function EmployeesContent() {
  const { searchResult, loading, error, searchEmployee } = useEmployee();

  async function searchEmp(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    await searchEmployee(email);
  }

  return (
    <div className="flex flex-col pb-8 px-2 ">
      <div className="sticky top-0 z-10 bg-[#f5f3ff] pt-8">
        <div className="flex flex-row justify-between items-center">
          <p className="text-primaryDark font-bold text-2xl">
            Employees Management
          </p>
          <div className="mr-4 cursor-pointer hover:bg-primaryDark/70 flex flex-row items-center justify-between gap-2 bg-primaryDark py-2 px-5 rounded-lg drop-shadow-button">
            <img src="icons/add-emp-icon.svg" alt="" />
            <p className="text-accent text-sm font-semibold">Add Employee</p>
          </div>
        </div>
        <div className="my-5 w-full bg-white/50 border-white border-1 p-3 rounded-xl">
          <form
            onSubmit={searchEmp}
            className="flex flex-row justify-between items-center"
          >
            <input
              type="text"
              name="email"
              className="rounded-lg w-full px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primaryLight bg-secondary text-primaryDark placeholder:text-primaryLight"
              placeholder="Enter employee email to search..."
            />
            <button
              className="px-20 text-sm text-primaryDark font-semibold py-2 rounded-md ml-4 drop-shadow-button cursor-pointer bg-accent"
              type="submit"
            >
              Go
            </button>
          </form>
        </div>
      </div>
      <div className="w-full min-h-[600px] bg-white/50 border-white border-1 p-5 rounded-xl flex flex-col justify-center">
        <SearchResultSection
          loading={loading}
          error={error}
          searchResult={searchResult}
        />
      </div>
    </div>
  );
}

export function SearchResultSection({ loading, error, searchResult }) {
  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} />;
  if (!searchResult) return <NoResult />;

  return <SearchResult searchResult={searchResult} />;
}
