import Post from "../components/Post";
import PrivacyTerms from "../components/privacy";
import { SummaryCard } from "../components/Summarycard";
import { BaseLayout } from "../layout/baselayout";
import tw from "twin.macro";

const PostPage = () => {
  return (
    <BaseLayout>
      <div tw="grid grid-cols-4 gap-3">
        <div tw="col-span-1 hidden md:flex flex-col gap-2 sticky top-8 h-[fit-content]">
          <SummaryCard />
          <PrivacyTerms />
        </div>
        <div tw="col-span-4 md:col-span-2 flex flex-col gap-4">
          <Post
            postData={{
              _id: "641aa77b1a2cf467cbec725f",
              userid: "641aa6fe1a2cf467cbec7250",
              desc: "AŞKIN OLAYIM ",
              content: [
                {
                  type: "image",
                  url: "https://fluffy-a1.s3.eu-central-1.amazonaws.com/post/5f8343d5-928d-4099-94a1-9e97f9ffb1dc.jpg",
                },
              ],
              createdAt: "2023-03-22T07:00:11.064Z",
              updatedAt: "2023-03-22T07:00:11.064Z",
              __v: 0,
              user: [
                {
                  _id: "641aa6fe1a2cf467cbec7250",
                  walletAddress: "0x628d5c3e3492e098a576f4b18fdd3d4aef6740c5",
                  profileImage:
                    "https://fluffy-a1.s3.eu-central-1.amazonaws.com/profile/8317a7fa-0564-4904-8f67-c89d37c6d1e0.jpg",
                  setup: true,
                  createdAt: "2023-03-22T06:58:06.932Z",
                  updatedAt: "2023-03-22T06:58:22.580Z",
                  __v: 0,
                  email: "gokdenizcetins@gmail.com",
                  name: "gokdeniz",
                  username: "gokdeniz",
                },
              ],
              comments: [
                {
                  _id: "641b52ea8c86fd1b1cb30764",
                  postid: "641aa77b1a2cf467cbec725f",
                  userid: "6419f21cc49cdf6bfc86b381",
                  comment: "AYneeeeen",
                  createdAt: "2023-03-22T19:11:38.397Z",
                  updatedAt: "2023-03-22T19:11:38.397Z",
                  __v: 0,
                },
              ],
              likeCount: 1,
              commentCount: 1,
              liked: false,
            }}
          />
        </div>
        <div tw="hidden md:flex flex-col sticky h-[fit-content] top-8"></div>
      </div>
    </BaseLayout>
  );
};

export default PostPage;
