import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/api/api.client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthUser } from "@/store/auth.store";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

const FavouriteSkeletonGrid = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 4 }).map((_, index) => (
      <Card key={index} className="h-full border-border">
        <CardHeader>
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-5 w-24" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-9 w-40" />
        </CardFooter>
      </Card>
    ))}
  </div>
);

export const FavouritesPage = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  const userId = user?.id ?? null;
  const favouritesQuery = useQuery({
    queryKey: ["favourites", userId],
    queryFn: apiClient.getFavourites,
    enabled: Boolean(userId),
  });

  const removeFavouriteMutation = useMutation({
    mutationFn: apiClient.toggleFavourite,
    onSuccess: () => {
      toast.success("Property removed from favourites");
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["favourites", userId] });
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  if (!userId) {
    return (
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">My Favourites</h2>
          <p className="text-sm text-muted-foreground">Loading account...</p>
        </div>
        <FavouriteSkeletonGrid />
      </section>
    );
  }

  if (favouritesQuery.isPending) {
    return (
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">My Favourites</h2>
          <p className="text-sm text-muted-foreground">Loading favourites...</p>
        </div>
        <FavouriteSkeletonGrid />
      </section>
    );
  }

  if (favouritesQuery.isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Could not load favourites</CardTitle>
          <CardDescription>{getErrorMessage(favouritesQuery.error)}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button type="button" onClick={() => void favouritesQuery.refetch()}>
            Retry
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const favourites = favouritesQuery.data ?? [];

  if (favourites.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>No favourites yet</CardTitle>
          <CardDescription>
            You have not favourited any property yet. Start exploring properties and
            add the ones you like.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link to="/">Browse properties</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-foreground">My Favourites</h2>
        <p className="text-sm text-muted-foreground">
          Showing only properties you have marked as favourite.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {favourites.map((property) => {
          const isLoading =
            removeFavouriteMutation.isPending &&
            removeFavouriteMutation.variables === property.id;

          return (
            <Card key={property.id} className="h-full border-border">
              <CardHeader>
                <CardTitle className="text-base">{property.title}</CardTitle>
                <CardDescription>
                  {property.description || "No description provided"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-medium text-foreground">
                  {currency.format(property.price)}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  type="button"
                  variant="secondary"
                  disabled={isLoading}
                  onClick={() => removeFavouriteMutation.mutate(property.id)}
                >
                  <Heart className="mr-2 h-4 w-4 fill-current" aria-hidden />
                  {isLoading ? "Removing..." : "Remove Favourite"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
