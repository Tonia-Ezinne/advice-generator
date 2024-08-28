import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

function App() {
  const [adviceData, setAdviceData] = useState({});
  const [isSpinning, setIsSpinning] = useState(false);
  const [loading, setLoading] = useState(true); // Start with loading as true

  // Fetch data from an API endpoint
  const fetchData = async () => {
    setIsSpinning(true); // Start spinning animation
    setLoading(true); // Set loading to true while fetching data
    try {
      const res = await axios.get("https://api.adviceslip.com/advice");
      if (res.status === 200) {
        setAdviceData(res.data.slip);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setIsSpinning(false); // Stop spinning animation after 0.6s
      }, 600); // Match this duration with the animation duration
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch advice data on component mount
  }, []);

  return (
    <div className="card w-11/12 mx-auto lg:w-5/12 py-6 rounded-lg my-32 flex flex-col justify-center items-center relative gap-4 px-12">
      {loading ? (
        <p className="text-white text-center mt-3 text-[28px] font-semibold">
          Loading...
        </p>
      ) : (
        <>
          <h1 className="text-[#52ffa8] mt-5 text-center">
            Advice #{adviceData.id}
          </h1>
          <p className="text-white text-center font-semibold mt-3 text-[28px]">{`"${adviceData.advice}"`}</p>

          <div className="mt-2">
            <Image
              src="/pattern-divider-desktop.svg"
              width={600}
              height={200}
              className="hidden lg:block pb-5"
              alt="Pattern Divider Desktop"
            />
          </div>

          <div>
            <Image
              src="/pattern-divider-mobile.svg"
              width={600}
              height={200}
              className="lg:hidden block pb-5"
              alt="Pattern Divider Mobile"
            />
          </div>

          <div
            onClick={fetchData}
            className={`bg-[#52ffa8] w-14 mt-5 h-14 flex justify-center cursor-pointer items-center rounded-full  absolute -bottom-6  hover:bg-[#4e8b6d] ${
              isSpinning ? "spin" : ""
            }`}
          >
            <Image src="/icon-dice.svg" alt="Dice" width={25} height={25} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
