import React, { useState, useRef, useEffect } from "react";
import tw, { TwStyle } from "twin.macro";
import { RiHeartFill, RiHeartLine } from "react-icons/ri";
import { VscComment } from "react-icons/vsc";
import { FiShare } from "react-icons/fi";
import { BsShare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";
import { Button, ButtonVariant } from "./Button/Button";
import { likePost, submitComment, unlikePost } from "../services/post";
import { Editor } from "react-editor";
import { toast } from "react-hot-toast";

type PostProps = {
  postData: any;
  redirectOnClick?: boolean;
  showComments?: boolean;
  writeComment?: boolean;
  onSubmitComment?: (...args: any[]) => any;
};

function ConditionalLink({
  active = true,
  to = "#",
  children,
  ...props
}: {
  active?: boolean;
  to?: string;
  children?: any;
}) {
  return active ? (
    <Link to={to} {...props}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
}
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
      {contentList.map((content, index) =>
        content.type == "image" ? (
          <div key={index} tw="relative overflow-hidden rounded-lg ">
            <img
              tw="w-full h-full object-cover object-center max-h-[32rem] hover:scale-125 transition duration-300"
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

const Post = ({
  postData,
  redirectOnClick = false,
  showComments = false,
  writeComment = false,
  onSubmitComment: commentSubmitCallback,
}: PostProps) => {
  const { user, token } = useFluffyAuth();
  const [isLiked, setLiked] = useState(postData.liked || false);
  const [likeCount, setLikeCount] = useState<number>(postData.likeCount || 0);
  const [currentComment, setCurrentComment] = useState("");
  const [userid, setUserId] = useState(postData.userid || "");

  // useEffect(() => {
  //   if (lottieRef.current)
  //     (lottieRef.current as any).goToAndStop(isLiked ? 100 : 0);
  // }, [lottieRef]);

  const onClickLikeButton = async (e: any) => {
    e.preventDefault();
    const isLiking = !isLiked;

    try {
      setLiked(isLiking);

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

  const onSubmitComment = async () => {
    try {
      const res = await submitComment(
        token as any,
        postData._id,
        currentComment
      );
      setCurrentComment("");
      if (commentSubmitCallback) commentSubmitCallback();
    } catch (err) {}
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.host}/post/${postData._id}`
    );
    toast.success("Paylaşım linki panoya kopyalandı!");
  };

  return (
    <ConditionalLink
      active={redirectOnClick}
      to={redirectOnClick ? `/post/${postData._id}` : `#`}
    >
      <div
        css={[
          tw`flex flex-col px-4 py-4 bg-white rounded-lg items-start transition`,
          redirectOnClick && tw`hover:bg-gray-50`,
        ]}
      >
        <div tw="flex items-center gap-2 text-sm">
          <img
            tw="w-10 h-10 rounded-full"
            src={
              postData?.user ? postData.user[0].profileImage : user.profileImage
            }
          />
          {/* {postData?.user ? (
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
          )} */}
          <Link to={`/profile/${userid}`}>
            <span>{postData.user?.[0].name || user.name}</span>
          </Link>
        </div>
        <div>
          {postData.desc && (
            <p tw=" max-w-xl mt-4 leading-5">{postData.desc}</p>
          )}
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
            <Button
              variant={ButtonVariant.GHOST}
              tw="flex gap-2 items-center p-2 hover:bg-bgcolor rounded-lg w-16"
            >
              <VscComment size={20} />
              <p tw="text-sm">{postData.commentCount || 0}</p>
            </Button>
          </div>
          <div tw="flex gap-8 items-center">
            <div tw="flex gap-2 items-center p-2  hover:bg-bgcolor rounded-lg">
              <button onClick={copyShareLink}>
                <BsShare size={20} />
              </button>
            </div>
          </div>
        </div>
        {writeComment && (
          <div tw="flex p-2 w-full">
            <img
              tw="w-12 h-12 object-center object-cover rounded-full"
              src={user.profileImage}
            />
            <div tw="w-full relative">
              {currentComment.length == 0 && (
                <div tw="absolute pointer-events-none top-1/2 -translate-y-1/2 left-2 text-black/60">
                  Bir yorum yap
                </div>
              )}
              <div tw="flex">
                <Editor
                  value={currentComment}
                  onChange={(e: any) => setCurrentComment(e)}
                  tw="min-h-[2.5rem] block w-full p-2 text-gray-900  border-gray-300 rounded-md outline-none max-h-96 overflow-auto break-all"
                />
                <div tw="mt-2 flex-shrink-0">
                  <Button
                    onClick={onSubmitComment}
                    disabled={currentComment.length == 0}
                  >
                    Gönder
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div tw="flex flex-col gap-2">
          {showComments &&
            postData.comments &&
            postData.comments
              .slice()
              .reverse()
              .map((comment: any, i: number) => {
                const commentUser = postData.commentUsers?.find(
                  (user: any) => user._id == comment.userid
                );

                if (!commentUser) return null;

                const commentData = {
                  ...comment,
                  user: commentUser,
                };
                return <Comment data={commentData}></Comment>;
              })}
        </div>
      </div>
    </ConditionalLink>
  );
};

function Comment({ data }: { data: any }) {
  return (
    <div tw="flex p-2">
      <div tw="flex gap-4">
        <img
          tw="w-12 h-12 object-cover object-center rounded-full"
          src={data.user.profileImage}
        ></img>
        <div>
          <p tw="font-medium">{data.user.name}</p>
          <p>{data.comment}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
