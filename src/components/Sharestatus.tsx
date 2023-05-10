import React, { useRef, useState } from "react";
import tw from "twin.macro";
import NullAvatar from "../assets/nullavatar.png";
import { FcFlashOn } from "react-icons/fc";
import { BsImages, BsCameraVideo, BsHash, BsX } from "react-icons/bs";
import { v4 } from "uuid";
import { Editor } from "react-editor";
import {
  BorderRadius,
  Button,
  ButtonSize,
  ButtonVariant,
} from "./Button/Button";
import { createPost } from "../services/post";
import { useFluffyAuth } from "../providers/fluffyAuthProvider";
import { toast } from "react-hot-toast";
import { getImageWithFallback } from "../utils";

type FileType = "image" | "video" | "unknown";

const photoFileExtensions = ["jpg", "jpeg", "png", "webp", "gif"];
const videoExtensions = ["mp4", "webm"];

const isTypeOfFile = (extensionArray: string[]) => (fileName: string) =>
  extensionArray.includes(fileName.slice(fileName.lastIndexOf(".") + 1));

const isPhoto = isTypeOfFile(photoFileExtensions);
const isVideo = isTypeOfFile(videoExtensions);

const resolveFileType = (fileName: string): FileType =>
  isPhoto(fileName) ? "image" : isVideo(fileName) ? "video" : "unknown";

type Content = {
  file: File;
  blobURL: string;
  type: FileType;
  id: string;
};

function ContentPreviewList({
  contentList,
  onClickClose,
}: {
  contentList: Content[];
  onClickClose: (content: Content) => void;
}) {
  const gridCols = contentList.length == 1 ? tw`grid-cols-1` : tw`grid-cols-2`;
  const gridRows = contentList.length > 2 ? tw`grid-rows-2` : tw`grid-rows-1`;

  if (!contentList.length) return <div></div>;

  return (
    <div css={[gridCols, gridRows, tw`grid gap-4`]}>
      {contentList.map((content) =>
        content.type == "image" ? (
          <div tw="relative">
            <button
              onClick={() => onClickClose(content)}
              tw="w-8 h-8 rounded-full absolute top-2 left-2 bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition"
            >
              <BsX tw="w-7 h-7" />
            </button>
            <img
              tw="w-full h-full object-cover object-center rounded-lg max-h-[32rem]"
              src={content.blobURL}
            />
          </div>
        ) : content.type == "video" ? (
          <div tw="relative">
            <div tw="relative">
              <button
                onClick={() => onClickClose(content)}
                tw="w-8 h-8 rounded-full absolute top-2 left-2 bg-black/50 text-white flex items-center justify-center hover:bg-black/75 transition"
              >
                <BsX tw="w-7 h-7" />
              </button>
            </div>
            <video
              tw="w-full rounded-lg max-h-[32rem]"
              controls
              src={content.blobURL}
            />
          </div>
        ) : (
          <div> ahlan</div>
        )
      )}
    </div>
  );
}
const Sharestatus = ({ onShareStatus }: any) => {
  const { token, user } = useFluffyAuth();
  const [text, setText] = useState("");
  const [content, setContent] = useState<Content[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const onInput = async (e: any) => {
    const previews = Array.from(e.target.files).map((file: any) => {
      let blobURL = URL.createObjectURL(file);

      return { file, blobURL, type: resolveFileType(file.name), id: v4() };
    });

    if (previews.some((preview) => preview.type == "unknown")) return;

    // Fail if we try to add new file when we have video on content
    if (content.some((someContent) => someContent.type == "video")) return;

    setContent((prev) => [...prev, ...previews]);
  };

  const selectFieldByType = (types: string, multiple: boolean = false) => {
    if (inputRef.current) {
      inputRef.current.accept = types;
      inputRef.current.multiple = multiple && content.length < 3;
      inputRef.current.click();
    }
  };

  const onClickClose = (clickedContent: Content) => {
    setContent((prev) =>
      prev.filter((prevContent) => prevContent.id != clickedContent.id)
    );
  };

  const onClickSubmit = async () => {
    setLoading(true);
    const formData = new FormData();

    if (text) formData.set("desc", text);
    content.forEach((x) => {
      if (isPhoto(x.file.name)) {
        formData.append("images", x.file);
      } else if (isVideo(x.file.name)) {
        formData.append("video", x.file);
      }
    });
    try {
      const resp = await createPost(token as string, formData);
      toast.success("Gönderi paylaşıldı!");
      setLoading(false);

      onShareStatus(text, content);
      setText("");
      setContent([]);
    } catch (err) {
      console.error(err);
    }
  };

  const canSubmit = content.length > 0 || text.length > 0;
  return (
    <div tw="px-8 py-8 bg-white rounded-lg flex flex-col gap-4 items-center">
      <div tw="w-full flex flex-col gap-2">
        <div tw="flex gap-2 w-full">
          <div tw="flex-shrink-0">
            <div tw="flex w-full justify-between items-center">
              <img
                tw="w-12 rounded-full h-12 object-cover"
                src={getImageWithFallback(user.profileImage)}
              />
            </div>
          </div>
          <div tw="flex-1">
            <div tw="relative w-full">
              {text.length == 0 && (
                <div tw="absolute pointer-events-none top-1/2 -translate-y-1/2 left-2 text-black/60">
                  Bir şey paylaş
                </div>
              )}
              <Editor
                value={text}
                onChange={(e: any) => setText(e)}
                tw="min-h-[2.5rem] block w-full p-2 text-gray-900  border-gray-300 rounded-md outline-none max-h-96 overflow-auto"
              />
            </div>
          </div>
        </div>

        <div tw="pl-12">
          <ContentPreviewList
            onClickClose={onClickClose}
            contentList={content}
          />
        </div>
      </div>
      <hr tw="h-0.5 w-full bg-gray-200 border-0"></hr>
      <div tw="flex w-full items-center justify-between">
        <input onInput={onInput} ref={inputRef} type="file" tw="hidden" />
        <div tw=" justify-around lg:flex">
          <Button
            variant={ButtonVariant.GHOST}
            size={ButtonSize.MEDIUM}
            onClick={() =>
              selectFieldByType(
                photoFileExtensions.map((x) => `.${x}`).join(", "),
                true
              )
            }
            tw="space-x-2"
          >
            <BsImages size={20} color="#36628F" />
            <span>Image</span>
          </Button>

          <Button
            variant={ButtonVariant.GHOST}
            size={ButtonSize.MEDIUM}
            onClick={() =>
              selectFieldByType(videoExtensions.map((x) => `.${x}`).join(", "))
            }
            tw="space-x-2"
          >
            <BsCameraVideo size={20} color="#36628F" />
            <span>Video</span>
          </Button>
        </div>
        <Button
          borderRadius={BorderRadius.SMALL}
          disabled={!canSubmit || loading}
          size={ButtonSize.MEDIUM}
          tw="px-6"
          onClick={onClickSubmit}
        >
          Paylaş
        </Button>
      </div>
    </div>
  );
};

export default Sharestatus;
