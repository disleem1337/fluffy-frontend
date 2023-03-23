import Post from "../components/Post";
import PrivacyTerms from "../components/privacy";
import { SummaryCard } from "../components/Summarycard";
import { BaseLayout } from "../layout/baselayout";
import tw from "twin.macro";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost } from "../services/post";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";

const PostPage = () => {
  const { id: postId } = useParams();
  const { token } = useFluffyAuth();
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await getPost(token as any, postId as string);
        setPost(data[0]);
      } catch (err) {}
    })();
  }, []);

  const onSubmitComment = async () => {
    try {
      const { data } = await getPost(token as any, postId as string);
      setPost(data[0]);
    } catch (err) {}
  };
  return (
    <BaseLayout>
      <div tw="grid grid-cols-4 gap-3">
        <div tw="col-span-1 hidden md:flex flex-col gap-2 sticky top-8 h-[fit-content]">
          <SummaryCard />
          <PrivacyTerms />
        </div>
        <div tw="col-span-4 md:col-span-2 flex flex-col gap-4">
          {post && (
            <Post
              onSubmitComment={onSubmitComment}
              showComments
              writeComment
              postData={post}
            />
          )}
        </div>
        <div tw="hidden md:flex flex-col sticky h-[fit-content] top-8"></div>
      </div>
    </BaseLayout>
  );
};

export default PostPage;
