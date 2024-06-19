import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { updateFeedback } from "@/lib/api";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";

const FeedbackModal = ({ messageId }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const [feedback, setFeedback] = useState("");
  const handelSubmit = async () => {
    if (!feedback) {
      toast({
        title: "Error",
        description: "Please provide feedback",
        variant: "destructive",
      });
      return;
    }
    try {
      setIsLoading(true);
      await updateFeedback({
        messageId: messageId,
        feedback: feedback,
      });
      toast({
        title: "Success",
        description: "Thanks for your feedback!",
      });
      setOpen(false);
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.msg ||
          "Can't give feedback! Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog defaultOpen={true} open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="max-w-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Provide additional feedback</AlertDialogTitle>
          <AlertDialogDescription>
            <Textarea
              value={feedback}
              rows={10}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="What was the issue with the answer? How could we improve it?"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handelSubmit}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FeedbackModal;
