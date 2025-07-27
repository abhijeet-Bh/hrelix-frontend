export default function ErrorSessionExpired({ error, callBack, text }) {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {error}
      <div
        className={`
          shadow-md hover:bg-red-500 transition-all delay-75 
        "w-full px-8 justify-between"
          text-white font-bold
          h-150 mt-6 py-2 flex flex-row cursor-pointer items-center bg-red-400 rounded-md
        `}
        onClick={callBack ? callBack : null}
      >
        {text ? text : "Login"}
      </div>
    </div>
  );
}
