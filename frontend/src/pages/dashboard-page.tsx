import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import apiClient from "@/api/api.client";
import { Badge } from "@/components/ui/badge";
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
import type { Property } from "@/types/api.types";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong";

const PropertyGrid = ({
  properties,
  favouriteIds,
  loadingPropertyId,
  onToggleFavourite,
}: {
  properties: Property[];
  favouriteIds: Set<string>;
  loadingPropertyId: string | null;
  onToggleFavourite: (propertyId: string) => void;
}) => {
  if (properties.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle>No properties found</CardTitle>
          <CardDescription>
            Seed the backend properties or check your API connection.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => {
        const isFavourite = favouriteIds.has(property.id);
        const isLoading = loadingPropertyId === property.id;

        return (
          <Card key={property.id} className="h-full border-border">
            <CardHeader>
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base">{property.title}</CardTitle>
                {isFavourite ? <Badge>Favourite</Badge> : <Badge variant="outline">New</Badge>}
              </div>
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
                variant={isFavourite ? "secondary" : "default"}
                disabled={isLoading}
                onClick={() => onToggleFavourite(property.id)}
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${isFavourite ? "fill-current" : ""}`}
                  aria-hidden
                />
                {isLoading
                  ? "Updating..."
                  : isFavourite
                    ? "Remove Favourite"
                    : "Add Favourite"}
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

const PropertySkeletonGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
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
            <Skeleton className="h-9 w-36" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export const DashboardPage = () => {
  const queryClient = useQueryClient();
  const user = useAuthUser();
  const userId = user?.id ?? null;

  const propertiesQuery = useQuery({
    queryKey: ["properties"],
    queryFn: apiClient.getProperties,
  });

  const favouritesQuery = useQuery({
    queryKey: ["favourites", userId],
    queryFn: apiClient.getFavourites,
    enabled: Boolean(userId),
  });

  const toggleMutation = useMutation({
    mutationFn: apiClient.toggleFavourite,
    onSuccess: (result) => {
      toast.success(
        result.action === "added"
          ? "Property added to favourites"
          : "Property removed from favourites",
      );
      if (userId) {
        queryClient.invalidateQueries({ queryKey: ["favourites", userId] });
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const favouriteIds = useMemo(
    () => new Set((favouritesQuery.data ?? []).map((property) => property.id)),
    [favouritesQuery.data],
  );

  const isInitialLoading =
    propertiesQuery.isPending || (Boolean(userId) && favouritesQuery.isPending);
  const hasError = propertiesQuery.isError || (Boolean(userId) && favouritesQuery.isError);
  const errorMessage = getErrorMessage(propertiesQuery.error ?? favouritesQuery.error);

  if (isInitialLoading) {
    return (
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Properties</h2>
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
        <PropertySkeletonGrid />
      </section>
    );
  }

  if (hasError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Could not load dashboard</CardTitle>
          <CardDescription>{errorMessage}</CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            type="button"
            onClick={() => {
              void propertiesQuery.refetch();
              void favouritesQuery.refetch();
            }}
          >
            Retry
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-foreground">All Properties</h2>
        <p className="text-sm text-muted-foreground">
          Browse available properties and manage your favourites.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Total Properties</CardTitle>
            <CardDescription>
              {propertiesQuery.data?.length ?? 0} available in your portal.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">My Favourites</CardTitle>
            <CardDescription>
              {favouritesQuery.data?.length ?? 0} properties marked as favourite.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild size="sm" variant="outline">
              <Link to="/favourites">View My Favourites</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <PropertyGrid
        properties={propertiesQuery.data ?? []}
        favouriteIds={favouriteIds}
        loadingPropertyId={
          toggleMutation.isPending ? (toggleMutation.variables ?? null) : null
        }
        onToggleFavourite={(propertyId) => toggleMutation.mutate(propertyId)}
      />
    </section>
  );
};
