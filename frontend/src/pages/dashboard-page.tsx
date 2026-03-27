import { useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const DashboardPage = () => {
  const queryClient = useQueryClient();

  const propertiesQuery = useQuery({
    queryKey: ["properties"],
    queryFn: apiClient.getProperties,
  });

  const favouritesQuery = useQuery({
    queryKey: ["favourites"],
    queryFn: apiClient.getFavourites,
  });

  const toggleMutation = useMutation({
    mutationFn: apiClient.toggleFavourite,
    onSuccess: (result) => {
      toast.success(
        result.action === "added"
          ? "Property added to favourites"
          : "Property removed from favourites",
      );
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const favouriteIds = useMemo(
    () => new Set((favouritesQuery.data ?? []).map((property) => property.id)),
    [favouritesQuery.data],
  );

  const isInitialLoading = propertiesQuery.isPending || favouritesQuery.isPending;
  const hasError = propertiesQuery.isError || favouritesQuery.isError;
  const errorMessage = getErrorMessage(propertiesQuery.error ?? favouritesQuery.error);

  if (isInitialLoading) {
    return <p className="text-sm text-muted-foreground">Loading dashboard...</p>;
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
        <h2 className="text-xl font-semibold text-foreground">Properties</h2>
        <p className="text-sm text-muted-foreground">
          Browse available properties and manage your favourites.
        </p>
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
