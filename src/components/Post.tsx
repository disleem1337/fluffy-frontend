import React from "react";
import tw from "twin.macro";
import { Profiletab } from "./Profiletab";
import Postimage from "../assets/post.png";
import { FcLike } from "react-icons/fc";
import { VscComment } from "react-icons/vsc";
import { FiShare } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import { Link } from "react-router-dom";

type PostProps = {
  postData: any;
};

function ContentPreviewList({ contentList }: { contentList: any[] }) {
  const gridCols = contentList.length == 1 ? tw`grid-cols-1` : tw`grid-cols-2`;
  const gridRows = contentList.length > 2 ? tw`grid-rows-2` : tw`grid-rows-1`;

  if (!contentList.length) return <div></div>;

  return (
    <div css={[gridCols, gridRows, tw`grid gap-4`]}>
      {contentList.map((content) =>
        content.type == "image" ? (
          <div tw="relative">
            <img
              tw="w-full h-full object-cover object-center rounded-lg max-h-[32rem]"
              src={content.url || content.blobURL}
            />
          </div>
        ) : content.type == "video" ? (
          <div tw="relative">
            <div tw="relative">
              <video
                tw="w-full rounded-lg max-h-[32rem]"
                controls
                src={content.url || content.blobURL}
              />
            </div>
          </div>
        ) : (
          <div> ahlan</div>
        )
      )}
    </div>
  );
}

const Post = ({ postData }: PostProps) => {
  return (
    <div tw="flex flex-col px-4 py-4 bg-white rounded-lg items-start ">
      <div tw="flex items-center gap-2 text-sm">
        <img tw="w-10 h-10 rounded-full" src={postData.user[0].profileImage} />
        <span>
          {postData.user[0].walletAddress.slice(0, 8) +
            "..." +
            postData.user[0].walletAddress.slice(-8)}
        </span>
      </div>
      <div>
        {postData.desc && <p tw=" max-w-xl mt-4 leading-5">{postData.desc}</p>}
        {/* <img src={postImage} tw="w-full mt-4 " /> */}
      </div>
      {postData.content.length > 0 && (
        <div tw="w-full mt-3">
          <ContentPreviewList contentList={postData.content} />
        </div>
      )}
      <div tw="flex mt-2 items-center justify-between w-full cursor-pointer">
        <div tw="flex gap-8 items-center">
          <div tw="flex gap-2 items-center p-2 hover:bg-bgcolor rounded-lg">
            <FcLike size={24} />
            <p tw="text-sm">45</p>
          </div>
          <div tw="flex gap-2 items-center p-2  hover:bg-bgcolor rounded-lg">
            <VscComment size={20} />
            <p tw="text-sm">45</p>
          </div>
          <div tw="flex gap-2 items-center p-2  hover:bg-bgcolor rounded-lg">
            <FiShare size={20} />
          </div>
        </div>
        <div tw="flex gap-8 items-center">
          <div tw="flex gap-2 items-center p-2  hover:bg-bgcolor rounded-lg">
            <BsShare size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
