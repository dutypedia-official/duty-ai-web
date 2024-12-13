"use client"; // This is necessary to enable client-side rendering

import { sendAnalysis, sendPushNotifications, updateIndex } from "@/lib/api";
import { uploadFiles } from "@/lib/utils";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  CreateLink,
  headingsPlugin,
  imagePlugin,
  InsertTable,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  type MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { motion } from "framer-motion";
import { BarChart2, Bell, Hash, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import InitializedMDXEditor from "./initializedMDXEditor";

export default function SendNoti() {
  const [activeForm, setActiveForm] = useState<
    "notification" | "analysis" | "index" | "maintenance"
  >("notification"); // default form

  return (
    <div className=" bg-gray-200 dark:bg-gray-900 flex flex-col">
      {/* Main Content Area with Responsive Padding */}
      <div className="flex-grow p-6 md:p-14">
        {/* Top Padding to simulate space below the nav bar */}
        <div className="bg-white dark:bg-gray-800 shadow-md p-6 mx-auto max-w-full md:max-w-4xl rounded-lg">
          {/* Button Container */}
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <button
              className={`flex items-center  space-x-2 py-2 px-4 rounded ${
                activeForm === "notification"
                  ? "bg-cyan-400"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              }`}
              onClick={() => setActiveForm("notification")}>
              <Bell className="text-xl" />
              <span>Send Notification to All</span>
            </button>
            <button
              className={`flex items-center space-x-2 py-2 px-4 rounded ${
                activeForm === "analysis"
                  ? "bg-cyan-400"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              }`}
              onClick={() => setActiveForm("analysis")}>
              <BarChart2 className="text-xl" />
              <span>Daily Analysis</span>
            </button>
            <button
              className={`flex items-center space-x-2 py-2 px-4 rounded ${
                activeForm === "index"
                  ? "bg-cyan-400"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              }`}
              onClick={() => setActiveForm("index")}>
              <Hash className="text-xl" />
              <span>Dsebd Index</span>
            </button>
            <button
              className={`flex items-center space-x-2 py-2 px-4 rounded ${
                activeForm === "maintenance"
                  ? "bg-cyan-400"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              }`}
              onClick={() => setActiveForm("maintenance")}>
              <Wrench className="text-xl" />
              <span>Maintenance</span>
            </button>
          </div>

          {/* Form with Animation */}
          <motion.div
            key={activeForm} // Using key to ensure animations trigger when form changes
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}>
            {activeForm === "notification" && <NotificationForm />}
            {activeForm === "analysis" && <DailyAnalysisForm />}
            {activeForm === "index" && <IndexForm />}
            {activeForm === "maintenance" && <MaintenanceForm />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function NotificationForm() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isFormComplete = title.trim() !== "" && message.trim() !== "";

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await sendPushNotifications({
        title,
        body: message,
      });
      toast.success("Notification sent successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <button
        onClick={handleSubmit}
        className={`w-full py-2 rounded-lg ${
          isFormComplete ? "bg-cyan-400" : "bg-gray-400 cursor-not-allowed"
        } text-white`}
        // disabled={!isFormComplete}
      >
        {isLoading ? "Please wait" : "Send"}
      </button>
    </div>
  );
}

function DailyAnalysisForm() {
  const [analysisType, setAnalysisType] = useState("All");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [price, setPrice] = useState("");
  const [percentage, setPercentage] = useState("");
  const [lightFile, setLightFile] = useState<File | null>(null);
  const [darkFile, setDarkFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const editorRef = useRef<MDXEditorMethods | null>(null);
  const [content, setContent] = useState(""); // State to store the editor's content

  // Set the initial value of the editor
  useEffect(() => {
    if (editorRef.current && content) {
      editorRef.current.setMarkdown(content); // Set the markdown content in the editor
    }
  }, [content]);

  // Function to handle saving the content
  const handleSave = () => {
    if (editorRef.current) {
      // Get the content from the editor instance
      const markdown = editorRef.current.getMarkdown();
      setContent(markdown); // Save it to the state
      console.log(markdown);
    }
  };

  // Call handleSave every time the content changes
  const handleEditorChange = () => {
    handleSave();
  };

  const isFormComplete =
    title.trim() !== "" &&
    message.trim() !== "" &&
    companyName.trim() !== "" &&
    (analysisType === "All"
      ? price.trim() !== "" &&
        percentage.trim() !== "" &&
        lightFile !== null &&
        darkFile !== null
      : analysisType === "Content + Image"
      ? lightFile !== null && darkFile !== null
      : analysisType === "Content");
  content.trim() !== "";

  // class AnalysisNotiModel(BaseModel):
  // title: str
  // message: str
  // companyName: str
  // price: str
  // changePer: str
  // photoLight: Optional[str]=""
  // photoDark: Optional[str]=""
  // content: str
  const handleSubmit = async () => {
    console.log({
      title,
      message,
      companyName,
      price,
      percentage,
      lightFile,
      darkFile,
      content,
    });
    try {
      setIsLoading(true);

      // If the analysis type is "All" or "Content + Image", we need to upload the files
      let urls = [null, null];
      if (analysisType === "All" || analysisType === "Content + Image") {
        urls = await uploadFiles([lightFile, darkFile]);
      }

      await sendAnalysis({
        title,
        message,
        companyName,
        price,
        changePer: percentage,
        photoLight: urls[0],
        photoDark: urls[1],
        content: content,
      });
      toast.success("Notification sent successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <select
        value={analysisType}
        onChange={(e) => setAnalysisType(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400">
        <option value="All">All</option>
        <option value="Content + Image">Content + Image</option>
        <option value="Content">Content</option>
      </select>
      <input
        type="text"
        placeholder="Notification Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      {analysisType === "All" && (
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      )}
      {analysisType === "All" && (
        <input
          type="text"
          placeholder="%"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      )}
      {(analysisType === "All" || analysisType === "Content + Image") && (
        <div className="flex flex-col md:flex-row md:space-x-4">
          <label className="w-full md:w-1/2">
            <span className="block mb-2 text-gray-700 dark:text-gray-300">
              Choose file for light ☀️
            </span>
            <input
              type="file"
              onChange={(e) => setLightFile(e.target.files?.[0] ?? null)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm"
            />
          </label>
          <label className="w-full md:w-1/2">
            <span className="block mb-2 text-gray-700 dark:text-gray-300">
              Choose file for dark 🌙
            </span>
            <input
              type="file"
              onChange={(e) => setDarkFile(e.target.files?.[0] ?? null)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm"
            />
          </label>
        </div>
      )}
      <div className="space-y-4">
        <span className="block mb-2 text-gray-700 dark:text-gray-300 text-lg font-semibold">
          Daily Analysis Content
        </span>

        {/* Adjust min height here */}
        <InitializedMDXEditor
          onChange={handleEditorChange}
          editorRef={editorRef}
          placeholder="Write something..."
          markdown={content}
          plugins={[
            headingsPlugin(),
            codeBlockPlugin(),
            listsPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            imagePlugin(),
            tablePlugin(),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <BlockTypeSelect />
                  <UndoRedo />
                  <BoldItalicUnderlineToggles />
                  <ListsToggle />
                  <CreateLink />
                  {/* <InsertImage /> */}
                  <InsertTable />
                </>
              ),
            }),
          ]}
        />
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        className={`w-full py-2 rounded-lg ${
          isFormComplete ? "bg-cyan-400" : "bg-gray-400 cursor-not-allowed"
        } text-white`}
        disabled={!isFormComplete || isLoading}>
        {isLoading ? "Please wait" : "Send"}
      </button>
    </div>
  );
}

function IndexForm() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isFormComplete = message.trim() !== "";

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await updateIndex({
        summary: message,
      });
      alert("Index updated successfully!");
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 h-64"
      />
      <button
        onClick={handleSubmit}
        className={`w-full py-2 rounded-lg ${
          isFormComplete ? "bg-cyan-400" : "bg-gray-400 cursor-not-allowed"
        } text-white`}
        // disabled={!isFormComplete}
      >
        {isLoading ? "Please wait" : "Update"}
      </button>
    </div>
  );
}

function MaintenanceForm() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="space-y-4">
      <textarea
        placeholder="Maintenance Notice"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 h-64"
      />
      <div className="flex flex-row max-w-52 mx-auto">
        <button
          onClick={() => {
            setIsRunning(false);
            // setIsLoading("start");
          }}
          className={`px-3 py-2 rounded-l-lg w-full ${
            !isRunning ? "bg-cyan-400" : "bg-[#5B5B5B]"
          } text-white`}>
          {isLoading === "start" ? "Please wait" : "Start"}
        </button>
        <button
          onClick={() => {
            setIsRunning(true);
            // setIsLoading("stop");
          }}
          className={`px-3 py-2 rounded-r-lg w-full ${
            isRunning ? "bg-cyan-400" : "bg-[#5B5B5B]"
          } text-white`}>
          {isLoading === "stop" ? "Please wait" : "Stop"}
        </button>
      </div>
    </div>
  );
}
