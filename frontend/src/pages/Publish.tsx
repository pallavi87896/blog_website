
import { AppBar } from "../components/AppBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import type { ChangeEvent } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">
      <AppBar />

      <main className="max-w-4xl mx-auto px-4 pt-24 pb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 focus-within:shadow-md transition">

          {/* Heading */}
          <h1 className="text-sm text-gray-400 mb-4">
            Create a new story
          </h1>

          {/* Title */}
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="w-full text-4xl font-bold placeholder-gray-300 focus:outline-none mb-6"
          />

          {/* Editor */}
          <TextEditor
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Publish Button */}
          <div className="flex justify-end">
            <button
              onClick={async () => {
                try {
                  const response = await axios.post(
                    `${BACKEND_URL}/api/v1/blogs`,
                    {
                      title,
                      content: description,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  );
                  navigate(`/blogs/${response.data.post.id}`);
                } catch (e) {
                  alert("Failed to publish post");
                }
              }}
              className="mt-6 bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
            >
              Publish
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <textarea
        onChange={onChange}
        rows={10}
        placeholder="Tell your story..."
        className="w-full text-lg text-gray-700 placeholder-gray-400 focus:outline-none resize-none leading-relaxed"
      />
    </div>
  );
}

