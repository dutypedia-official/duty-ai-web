import { ChatMessageProps } from "@/components/chat/chatMessage";
import axios from "axios";
import { getCookie } from "cookies-next";
import { frameData } from "framer-motion";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const CHAT_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LLM_API_URL,
  withCredentials: true,
});

// API.interceptors.request.use((req: any) => {
//   req.headers.Authorization = `Bearer ${getCookie("token")}`;
//   return req;
// });

// CHAT_API.interceptors.request.use((req: any) => {
//   req.headers.Authorization = `Bearer ${getCookie("token")}`;
//   return req;
// });

//Auth
export const signOut = () => API.post("/auth/logout");

//Chat
export const chatCompletion = (formData: {
  query: string;
  model?: string;
  history?: {
    input: string;
    output: string;
  }[];
}) => CHAT_API.post("/chat/completion", formData);
export const createConversation = (formData: {
  name: string;
  messages?: ChatMessageProps[];
}) => API.post("/chat/conversation/create", formData);
export const deleteConversation = (conversationId: string) =>
  API.delete(`/chat/conversation/delete/${conversationId}`);
export const createMessage = (formData: {
  id?: string;
  conversationId: string;
  answer?: string;
  query?: string;
  role: string;
  fake?: boolean;
  model?: string;
}) => API.post("/chat/message/create", formData);
export const giveFeedback = (formData: {
  messageId: string;
  react: "like" | "dislike";
  feedback?: string;
}) => API.post("/chat/message/feedback", formData);
export const updateFeedback = (formData: {
  messageId: string;
  react?: "like" | "dislike";
  feedback?: string;
}) => API.put("/chat/message/feedback/update", formData);
export const getConversations = (q = "", limit = 10, skip = 0) =>
  API.get(`/messages/conv/get-all?q=${q}&limit=${limit}&skip=${skip}`);
export const getMessages = (conversationId: string) =>
  API.get(`/chat/message/get-all/${conversationId}`);

//Contact
export const newContact = (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
}) => API.post("/contact/new", formData);

//Subs
export const getActivePlan = () => API.get(`/subs/get-active-plan`);
export const getUsages = () => API.get(`/subs/get-usages`);
export const getThisMonthsDailyUsages = () =>
  API.get(`/subs/get-monthly-usages`);
export const getInvoices = () => API.get(`/subs/get-invoices`);
export const subscribe = (formData: { plan: string }) =>
  API.post(`/subs/subscribe`, formData);
export const onetime = (formData: { quantity: number }) =>
  API.post(`/subs/onetime`, formData);

export const apiClient = () => {
  const addBaseUrl = (url: string) =>
    `${process.env.NEXT_PUBLIC_API_URL}${url}`;

  return {
    get: (url: string, token: any = null, options = {}) =>
      axios.get(addBaseUrl(url), {
        ...{
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
        ...options,
      }),
    post: (url: string, data: any, token: any = null, options = {}) =>
      axios.post(addBaseUrl(url), data, {
        ...{
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
        ...options,
      }),
    put: (url: string, data: any, token: any = null, options = {}) =>
      axios.put(addBaseUrl(url), data, {
        ...{
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
        ...options,
      }),
    delete: (url: string, token: any = null, options = {}) =>
      axios.delete(addBaseUrl(url), {
        ...{
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
        ...options,
      }),
  };
};

//Noti
export const sendPushNotifications = (formData: any) =>
  API.post(`/noti/send-push-noti`, formData);
export const sendAnalysis = (formData: any) =>
  API.post(`/noti/send-analysis`, formData);
