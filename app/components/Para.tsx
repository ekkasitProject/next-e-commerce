import React, { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextEditor from "./TextEditor";
interface Para {
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  description: string;
}

const Para: React.FC<Para> = ({ setDescription, description }) => {
  const [focus, setFocus] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose w-full focus:outline-none leading-5 prose-a:text-pink-600 prose-a:font-semibold prose-a:no-underline",
      },
    },
    content: description,
  });
  const html: any = editor?.getHTML();

  useEffect(() => {
    setDescription(html);
    console.log(html);
  }, [html]);
  useEffect(() => {
    const handler = (e: any) => {
      if (!menuRef.current?.contains(e.target)) {
        setFocus(false);
      } else {
        setFocus(true);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);
  const menuRef = useRef<HTMLDivElement>(null);
  return (
    <div
      className={`mx-aut border-[1px] mt-4 rounded-xl ${
        focus ? "border-pink-500 border-[2px] ml-0" : ""
      }`}
      ref={menuRef}
    >
      <TextEditor editor={editor} />
      <EditorContent
        editor={editor}
        style={{ padding: "10px" }}
        onClick={() => setFocus(true)}
      />
    </div>
  );
};

export default Para;
