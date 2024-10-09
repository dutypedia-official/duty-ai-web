import Pm2 from "./_components/pm2";
import SendNoti from "./_components/send-noti";

const page = () => {
  return (
    <>
      <SendNoti />
      <Pm2 />
    </>
  );
};

export default page;
