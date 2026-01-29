import type { User } from "@/types/Types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { User as UserIcon } from "lucide-react";

type ReparationDetailUserProps = {
  user: User | null;
  loading?: boolean;
};

const ReparationDetailUser = ({
  user,
  loading = false,
}: ReparationDetailUserProps) => {
  if (loading || !user) {
    return (
      <Card className="border rounded-xl shadow-none">
        <CardHeader className="px-4">
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="h-5 w-5" />
            Client
          </CardTitle>
          <CardDescription>Informations du client</CardDescription>
        </CardHeader>
        <CardContent className="px-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border rounded-xl shadow-none">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          Client
        </CardTitle>
        <CardDescription>Informations du client</CardDescription>
      </CardHeader>
      <CardContent className="px-4">
        <div className="flex items-center gap-4">
          <Avatar size="lg" className="h-12 w-12">
            {user.photoURL ? (
              <AvatarImage src={user.photoURL} alt={user.displayName ?? "Client"} />
            ) : null}
            <AvatarFallback>
              {(user.displayName ?? user.email ?? "?")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="font-medium">{user.displayName ?? "—"}</p>
            <p className="text-sm text-muted-foreground">{user.email ?? "—"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReparationDetailUser;
