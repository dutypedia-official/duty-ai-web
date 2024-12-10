import { create } from "zustand";
interface Store {
  refreash: boolean;
  setRefreash: (refreash: boolean) => void;
  refreashFav: boolean;
  setRefreashFav: (refreashFav: boolean) => void;
  screenRefresh: boolean;
  setScreenRefresh: (screenRefresh: boolean) => void;
  mainServerAvailable: boolean;
  setMainServerAvailable: (mainServerAvailable: boolean) => void;
  selectedStock: any;
  setSelectedStock: (selectedStock: any) => void;
  activeTab: any;
  setActiveTab: (activeTab: any) => void;
  activeF: string;
  setActiveF: (activeF: any) => void;
  selectedAlarmShit: any;
  setSelectedAlarmShit: (selectedAlarmShit: any) => void;
  openAuthModal: boolean;
  setOpenAuthModal: (openAuthModal: boolean) => void;
  alarmSheet: boolean;
  setAlarmSheet: (alarmSheet: boolean) => void;
  stepper: string;
  setStepper: (step: string) => void;
  otpMail: string;
  setOtpMail: (otpMail: string) => void;
}

const useUi = create<Store>((set, get) => ({
  refreash: false,
  setRefreash: (refreash: boolean) => set({ refreash }),
  screenRefresh: false,
  setScreenRefresh: (screenRefresh: boolean) => set({ screenRefresh }),
  refreashFav: false,
  setRefreashFav: (refreashFav: boolean) => set({ refreashFav }),
  mainServerAvailable: false,
  setMainServerAvailable: (mainServerAvailable: boolean) =>
    set({ mainServerAvailable }),
  selectedStock: null,
  setSelectedStock: (selectedStock: any) => set({ selectedStock }),
  activeTab: "index",
  setActiveTab: (activeTab: string) => set({ activeTab }),
  activeF: "",
  setActiveF: (activeF: string) => set({ activeF }),
  selectedAlarmShit: null,
  setSelectedAlarmShit: (selectedAlarmShit: any) => set({ selectedAlarmShit }),
  openAuthModal: false,
  setOpenAuthModal: (openAuthModal: boolean) => set({ openAuthModal }),
  alarmSheet: false,
  setAlarmSheet: (alarmSheet: boolean) => set({ alarmSheet }),
  stepper: "login",
  setStepper: (step: string) => set({ stepper: step }),
  otpMail: "",
  setOtpMail: (otpMail: string) => set({ otpMail }),
}));

export default useUi;
