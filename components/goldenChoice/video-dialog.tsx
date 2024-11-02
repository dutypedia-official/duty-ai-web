import { Dialog, DialogContent } from "@/components/ui/dialog";

export const VideoDialog = ({ open, setOpen }: any) => {
  const videoUrl = "https://www.youtube.com/embed/A4L792q0q9Q?autoplay=1";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-full w-full p-10">
        <iframe
          width="100%"
          height="100%"
          src={videoUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg"></iframe>
      </DialogContent>
    </Dialog>
  );
};
