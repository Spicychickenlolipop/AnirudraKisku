import { useLocation } from "react-router-dom";

const Search = () => {
  const query = new URLSearchParams(useLocation().search).get("q");

  const results = [
    {
      title: "React Documentation",
      link: "https://react.dev",
    },
    {
      title: "MDN Web Docs",
      link: "https://developer.mozilla.org",
    },
    {
      title: "Your Portfolio Projects",
      link: "/projects",
    },
  ];

  return (
    <div className="p-10 bg-white h-full">
      <h1 className="text-2xl font-bold mb-5">
        Results for "{query}"
      </h1>

      {results.map((r, i) => (
        <div key={i} className="mb-4">
          <p className="text-blue-600 cursor-pointer">
            {r.title}
          </p>
          <span className="text-sm text-gray-500">
            {r.link}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Search;