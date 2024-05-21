import { useState } from "react";
import Image from "next/image";
import clipboard from "clipboard";
import logo from "../assets/logo-removebg-preview.png";
import url from "../assets/short-url-logo-removebg-preview.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";

export default function Home({ textToCopy }) {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const response = await fetch("/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl }),
    });

    const data = await response.json();
    setShortUrl(data.shortUrl);
    setLoading(false);
  };

  function getValidURL(url) {
    if (url.includes("http://") || url.includes("https://")) return url;

    return "http://" + url;
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Successfully Copied!");
      // alert('Copied to clipboard!');
    } catch (err) {
      toast.error("Toast generated using react-toastify!");
      // console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-gradient-to-bl from-orange-200 to-slate-200">
      <div className="min-h-screen flex flex-col justify-between items-center">
        <div className="flex justify-center items-center">
          <Image className="h-32 w-60" src={logo} alt={"alt"} />
        </div>
        <form className="lg:w-1/3 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter URL"
            className="p-2 mr-2 border border-gray-300 text-black"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          {!loading && (
            <button
              type="submit"
              className="p-2 rounded-full text-white text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            >
              Shorten
            </button>
          )}
          {loading && (
            <HashLoader
              color="#000000"
              loading={loading}
              className="mx-auto"
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
          {shortUrl && (
            <div className="flex flex-col gap-1 justify-center items-center">
              <div className="py-4 px-2 w-full flex flex-wrap justify-evenly bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <label className="flex gap-1">
                  <Image className="h-6 w-6" src={url} alt={"alt"} />
                  Short URL :{" "}
                </label>
                <a
                  href={getValidURL(shortUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-sm lg:text-lg underline underline-offset-1 text-blue-500">
                    {getValidURL(shortUrl)}
                  </span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleCopyToClipboard}
                className="flex justify-evenly items-center gap-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-xs p-3 m-1 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                {" "}
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M5 9V4.13a2.96 2.96 0 0 0-1.293.749L.879 7.707A2.96 2.96 0 0 0 .13 9H5Zm11.066-9H9.829a2.98 2.98 0 0 0-2.122.879L7 1.584A.987.987 0 0 0 6.766 2h4.3A3.972 3.972 0 0 1 15 6v10h1.066A1.97 1.97 0 0 0 18 14V2a1.97 1.97 0 0 0-1.934-2Z" />
                  <path d="M11.066 4H7v5a2 2 0 0 1-2 2H0v7a1.969 1.969 0 0 0 1.933 2h9.133A1.97 1.97 0 0 0 13 18V6a1.97 1.97 0 0 0-1.934-2Z" />
                </svg>
                <div>Copy To Clipboard</div>
              </button>
            </div>
          )}
        </form>

        <div className="border-t-2 border-black w-full p-4 flex justify-center items-center">
          Made with ❤ by Ashutosh Tripathi
        </div>
      </div>
      {/* <div class="prompt" onClick={copyToClipboard}>Your prompt text goes here</div>       */}
      <ToastContainer />
    </div>
  );
}

// Developed a highly impactful and functional URL shortener using Next.js and Supabase, showcasing proficiency in React, JavaScript, and backend database management.
// Implemented API routes to efficiently handle URL creation and redirection, demonstrating strong problem-solving and software development skills.
// Utilized Tailwind CSS to create a sleek and responsive user interface, ensuring an excellent user experience and leaving a positive impression on recruiters and HR teams.
// Successfully deployed the application on Vercel, showcasing the ability to take a project from development to production and making it accessible to users worldwide.

// Developed a highly impactful URL shortener using Next.js and Supabase, showcasing strong software development skills and proficiency in React, JavaScript, and backend database management.
// Created a user-friendly frontend interface with Next.js and Tailwind CSS, ensuring a crisp and responsive user experience.
// Implemented API routes to efficiently handle URL creation and redirection, utilizing Supabase for seamless data storage and retrieval.
// Demonstrated in-depth knowledge of database management and SQL by setting up the urls table and handling backend functionality.
// Successfully deployed the application on Vercel, showcasing the ability to take a project from development to production and making it accessible to users worldwide.
