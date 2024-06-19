import { toast } from "@/components/ui/use-toast";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadFiles = async (files: any[]) => {
  if (!files) {
    return false;
  }
  const formData = new FormData();
  files.forEach((file: string | Blob) => {
    formData.append("files", file);
  });
  const requestOptions: any = {
    method: "POST",
    body: formData,
    redirect: "follow",
  };
  try {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upload`,
      requestOptions
    );
    const data = await resp.json();
    const { files } = data;
    return files;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export function generateRandomToken(length: number = 32) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }
  return token;
}

export function calculatePasswordStrength(password: string) {
  if (password.length < 8) {
    return 1; // Very Weak
  }

  if (!/[a-z]/.test(password)) {
    return 1; // Very Weak
  }

  if (!/[A-Z]/.test(password)) {
    return 1; // Very Weak
  }

  if (!/\d/.test(password)) {
    return 1; // Very Weak
  }

  if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
    return 2; // Weak
  }

  if (password.length >= 12) {
    return 4; // Strong
  }

  return 3; // Moderate
}

export const addHyphen = (value: string | undefined) => {
  if (value === undefined) {
    return "";
  }
  const cleanedString = value
    .replace(/,/g, "") // Remove commas
    .replace(/:/g, "") // Remove colons
    .replace(/%/g, "") // Remove percentage symbols
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .toLowerCase();

  return cleanedString;
};

export const removeHyphen = (value: string | undefined) => {
  if (value === undefined) {
    return "";
  }
  const decodedString = decodeURIComponent(value);
  return decodedString.replace(/-/g, " ").toLowerCase();
};

export async function fetchWithTimeout(url: string, options: any = {}) {
  const { timeout = 5000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(url, {
    ...options,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}

export const duckSearch = async (query: string) => {
  try {
    const apiUrl = "https://www.google.com/search";
    const params: any = {
      q: `${query}`,
    };

    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

    const urlWithParams = `${apiUrl}?${queryString}`;

    const headers = new Headers({
      mode: "no-cors",
      "Content-Type": "application/json",
    });

    const res = await fetchWithTimeout(urlWithParams, {
      method: "GET",
      mode: "no-cors",
      headers: headers,
    });
    const html = await res.text();

    return html;
  } catch (error) {
    console.log(error);
    toast({
      variant: "destructive",
      title: "Error",
      description: "Can't connect to the internet!",
    });
    return "";
  }
};

export async function fetchFnClient(url: string, options: any) {
  try {
    const customOptions = {
      ...options,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://node.dutyai.app/ai-node${url}`
        : `${process.env.NEXT_PUBLIC_ADMIN_URL}${url}`,
      customOptions
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
