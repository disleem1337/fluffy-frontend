import React, { useState, useRef, useEffect } from "react";
import tw, { TwStyle } from "twin.macro";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { VscComment } from "react-icons/vsc";
import { FiShare } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";
import { Button, ButtonVariant } from "./Button/Button";
import { likePost, unlikePost } from "../services/post";

type PostProps = {
  postData: any;
};

function LikeButton({
  onClick,
  isLiked = false,
}: {
  onClick?: () => any;
  isLiked?: boolean;
}) {
  return (
    <svg
      css={[
        tw`fill-current text-black transition w-6 h-6`,
        isLiked && tw`text-red-500`,
      ]}
      viewBox="0 0 24 24"
    >
      <g>
        {isLiked ? (
          <path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
        ) : (
          <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
        )}
      </g>
    </svg>
  );
}
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
  const { user, token } = useFluffyAuth();
  const [isLiked, setLiked] = useState(postData.liked || false);
  const [likeCount, setLikeCount] = useState<number>(postData.likeCount || 0);
  const [isStopped, setIsStopped] = useState(true);

  // useEffect(() => {
  //   if (lottieRef.current)
  //     (lottieRef.current as any).goToAndStop(isLiked ? 100 : 0);
  // }, [lottieRef]);

  const onClickLikeButton = async () => {
    const isLiking = !isLiked;

    try {
      setLiked(isLiking);
      setIsStopped(false);

      if (isLiking) {
        setLikeCount((count) => count + 1);
        await likePost(token as string, postData._id);
      } else {
        setLikeCount((count) => count - 1);
        await unlikePost(token as string, postData._id);
      }
    } catch (err) {
      if (isLiking) setLikeCount((count) => count - 1);
      else setLikeCount((count) => count + 1);
      setLiked(!isLiking);
    }
  };

  console.log(postData);
  return (
    <div tw="flex flex-col px-4 py-4 bg-white rounded-lg items-start ">
      <div tw="flex items-center gap-2 text-sm">
        <img
          tw="w-10 h-10 rounded-full"
          src={
            postData?.user ? postData.user[0].profileImage : user.profileImage
          }
        />
        {postData?.user ? (
          <span>
            {postData.user[0].walletAddress.slice(0, 8) +
              "..." +
              postData.user[0].walletAddress.slice(-8)}
          </span>
        ) : (
          <span>
            {user.walletAddress.slice(0, 8) +
              "..." +
              user.walletAddress.slice(-8)}
          </span>
        )}
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
          <Button
            variant={ButtonVariant.GHOST}
            onClick={onClickLikeButton}
            tw="flex gap-2 items-center p-2 hover:bg-bgcolor rounded-lg w-16"
          >
            <LikeButton isLiked={isLiked} />
            <p tw="text-sm">{likeCount}</p>
          </Button>
          <div tw="flex gap-2 items-center p-2  hover:bg-bgcolor rounded-lg">
            <VscComment size={20} />
            <p tw="text-sm">{postData.commentCount || 0}</p>
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
