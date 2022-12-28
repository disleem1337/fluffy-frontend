import React from "react";
import ReactLoading from "react-loading";
import tw from "twin.macro";

const Loading = () => {
  return (
    <div tw="h-screen bg-[#F4F4F4] w-full flex items-center justify-center">
      <ReactLoading type="balls" color="#000" width={150} height={150} />
    </div>
  );
};

export default Loading;
