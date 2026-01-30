import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserIcon } from "lucide-react";
import type { User } from "@/types/Types";
import { useUserFirestoreDoc, useClientsFirestoreMutation } from "@/domain";

type DropMenuProfileProps = {
  client: User;
};

const DropMenuProfile = ({ client }: DropMenuProfileProps) => {
  const { data, loading } = useUserFirestoreDoc(client.uid);
  const { mutate, loading: saving } = useClientsFirestoreMutation();

  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (data?.displayName) {
      setDisplayName(data.displayName);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) return;
    if (displayName === data.displayName) return;

    await mutate({ displayName } as User, {
      type: "update",
      id: data.uid,
    });
  };

  if (loading || !data) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="icon-sm"
          variant="ghost"
          className="py-1 px-2! w-full flex gap-2 justify-start"
        >
          <UserIcon />
          Profile
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              This will change the username of the user :D
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Display name (editable) */}
            <div className="grid gap-2">
              <Label htmlFor="displayName">Display name</Label>
              <Input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            {/* Email (readonly) */}
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input value={data.email ?? ""} disabled />
            </div>

            {/* UID (readonly) */}
            <div className="grid gap-2">
              <Label>User ID</Label>
              <Input value={data.uid} disabled />
            </div>

            {/* UID (readonly) */}
            <div className="grid gap-2">
              <Label>fcm token</Label>
              <Input value={data.fcmToken ?? 'no token'} disabled />
            </div>

          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={saving || displayName === data.displayName}
            >
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DropMenuProfile;
