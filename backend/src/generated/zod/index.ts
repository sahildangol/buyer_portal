import { z } from 'zod';
import type { Prisma } from '../../../node_modules/.prisma/client/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','name','role','createdAt','updatedAt']);

export const PropertyScalarFieldEnumSchema = z.enum(['id','title','description','price','imageUrl','createdAt','updatedAt']);

export const FavouriteScalarFieldEnumSchema = z.enum(['id','userId','propertyId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// PROPERTY SCHEMA
/////////////////////////////////////////

export const PropertySchema = z.object({
  id: z.uuid(),
  title: z.string(),
  description: z.string().nullable(),
  price: z.number(),
  imageUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Property = z.infer<typeof PropertySchema>

/////////////////////////////////////////
// FAVOURITE SCHEMA
/////////////////////////////////////////

export const FavouriteSchema = z.object({
  id: z.uuid(),
  userId: z.string(),
  propertyId: z.string(),
})

export type Favourite = z.infer<typeof FavouriteSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  favourites: z.union([z.boolean(),z.lazy(() => FavouriteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  favourites: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  name: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  favourites: z.union([z.boolean(),z.lazy(() => FavouriteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PROPERTY
//------------------------------------------------------

export const PropertyIncludeSchema: z.ZodType<Prisma.PropertyInclude> = z.object({
  favouritedBy: z.union([z.boolean(),z.lazy(() => FavouriteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PropertyCountOutputTypeArgsSchema)]).optional(),
}).strict();

export const PropertyArgsSchema: z.ZodType<Prisma.PropertyDefaultArgs> = z.object({
  select: z.lazy(() => PropertySelectSchema).optional(),
  include: z.lazy(() => PropertyIncludeSchema).optional(),
}).strict();

export const PropertyCountOutputTypeArgsSchema: z.ZodType<Prisma.PropertyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PropertyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PropertyCountOutputTypeSelectSchema: z.ZodType<Prisma.PropertyCountOutputTypeSelect> = z.object({
  favouritedBy: z.boolean().optional(),
}).strict();

export const PropertySelectSchema: z.ZodType<Prisma.PropertySelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  description: z.boolean().optional(),
  price: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  favouritedBy: z.union([z.boolean(),z.lazy(() => FavouriteFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PropertyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FAVOURITE
//------------------------------------------------------

export const FavouriteIncludeSchema: z.ZodType<Prisma.FavouriteInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  property: z.union([z.boolean(),z.lazy(() => PropertyArgsSchema)]).optional(),
}).strict();

export const FavouriteArgsSchema: z.ZodType<Prisma.FavouriteDefaultArgs> = z.object({
  select: z.lazy(() => FavouriteSelectSchema).optional(),
  include: z.lazy(() => FavouriteIncludeSchema).optional(),
}).strict();

export const FavouriteSelectSchema: z.ZodType<Prisma.FavouriteSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  propertyId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  property: z.union([z.boolean(),z.lazy(() => PropertyArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  favourites: z.lazy(() => FavouriteListRelationFilterSchema).optional(),
});

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  favourites: z.lazy(() => FavouriteOrderByRelationAggregateInputSchema).optional(),
});

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    email: z.string(),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  favourites: z.lazy(() => FavouriteListRelationFilterSchema).optional(),
}));

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
});

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const PropertyWhereInputSchema: z.ZodType<Prisma.PropertyWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PropertyWhereInputSchema), z.lazy(() => PropertyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PropertyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PropertyWhereInputSchema), z.lazy(() => PropertyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  favouritedBy: z.lazy(() => FavouriteListRelationFilterSchema).optional(),
});

export const PropertyOrderByWithRelationInputSchema: z.ZodType<Prisma.PropertyOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  favouritedBy: z.lazy(() => FavouriteOrderByRelationAggregateInputSchema).optional(),
});

export const PropertyWhereUniqueInputSchema: z.ZodType<Prisma.PropertyWhereUniqueInput> = z.object({
  id: z.uuid(),
})
.and(z.strictObject({
  id: z.uuid().optional(),
  AND: z.union([ z.lazy(() => PropertyWhereInputSchema), z.lazy(() => PropertyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PropertyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PropertyWhereInputSchema), z.lazy(() => PropertyWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatFilterSchema), z.number() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema), z.coerce.date() ]).optional(),
  favouritedBy: z.lazy(() => FavouriteListRelationFilterSchema).optional(),
}));

export const PropertyOrderByWithAggregationInputSchema: z.ZodType<Prisma.PropertyOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PropertyCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PropertyAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PropertyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PropertyMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PropertySumOrderByAggregateInputSchema).optional(),
});

export const PropertyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PropertyScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => PropertyScalarWhereWithAggregatesInputSchema), z.lazy(() => PropertyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PropertyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PropertyScalarWhereWithAggregatesInputSchema), z.lazy(() => PropertyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema), z.number() ]).optional(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date() ]).optional(),
});

export const FavouriteWhereInputSchema: z.ZodType<Prisma.FavouriteWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => FavouriteWhereInputSchema), z.lazy(() => FavouriteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FavouriteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FavouriteWhereInputSchema), z.lazy(() => FavouriteWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  propertyId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  property: z.union([ z.lazy(() => PropertyScalarRelationFilterSchema), z.lazy(() => PropertyWhereInputSchema) ]).optional(),
});

export const FavouriteOrderByWithRelationInputSchema: z.ZodType<Prisma.FavouriteOrderByWithRelationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  propertyId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  property: z.lazy(() => PropertyOrderByWithRelationInputSchema).optional(),
});

export const FavouriteWhereUniqueInputSchema: z.ZodType<Prisma.FavouriteWhereUniqueInput> = z.union([
  z.object({
    id: z.uuid(),
    userId_propertyId: z.lazy(() => FavouriteUserIdPropertyIdCompoundUniqueInputSchema),
  }),
  z.object({
    id: z.uuid(),
  }),
  z.object({
    userId_propertyId: z.lazy(() => FavouriteUserIdPropertyIdCompoundUniqueInputSchema),
  }),
])
.and(z.strictObject({
  id: z.uuid().optional(),
  userId_propertyId: z.lazy(() => FavouriteUserIdPropertyIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => FavouriteWhereInputSchema), z.lazy(() => FavouriteWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FavouriteWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FavouriteWhereInputSchema), z.lazy(() => FavouriteWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  propertyId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema), z.lazy(() => UserWhereInputSchema) ]).optional(),
  property: z.union([ z.lazy(() => PropertyScalarRelationFilterSchema), z.lazy(() => PropertyWhereInputSchema) ]).optional(),
}));

export const FavouriteOrderByWithAggregationInputSchema: z.ZodType<Prisma.FavouriteOrderByWithAggregationInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  propertyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FavouriteCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FavouriteMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FavouriteMinOrderByAggregateInputSchema).optional(),
});

export const FavouriteScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FavouriteScalarWhereWithAggregatesInput> = z.strictObject({
  AND: z.union([ z.lazy(() => FavouriteScalarWhereWithAggregatesInputSchema), z.lazy(() => FavouriteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FavouriteScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FavouriteScalarWhereWithAggregatesInputSchema), z.lazy(() => FavouriteScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
  propertyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema), z.string() ]).optional(),
});

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  favourites: z.lazy(() => FavouriteCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  favourites: z.lazy(() => FavouriteUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
});

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  favourites: z.lazy(() => FavouriteUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  favourites: z.lazy(() => FavouriteUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
});

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PropertyCreateInputSchema: z.ZodType<Prisma.PropertyCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  favouritedBy: z.lazy(() => FavouriteCreateNestedManyWithoutPropertyInputSchema).optional(),
});

export const PropertyUncheckedCreateInputSchema: z.ZodType<Prisma.PropertyUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  favouritedBy: z.lazy(() => FavouriteUncheckedCreateNestedManyWithoutPropertyInputSchema).optional(),
});

export const PropertyUpdateInputSchema: z.ZodType<Prisma.PropertyUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  favouritedBy: z.lazy(() => FavouriteUpdateManyWithoutPropertyNestedInputSchema).optional(),
});

export const PropertyUncheckedUpdateInputSchema: z.ZodType<Prisma.PropertyUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  favouritedBy: z.lazy(() => FavouriteUncheckedUpdateManyWithoutPropertyNestedInputSchema).optional(),
});

export const PropertyCreateManyInputSchema: z.ZodType<Prisma.PropertyCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const PropertyUpdateManyMutationInputSchema: z.ZodType<Prisma.PropertyUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PropertyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PropertyUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavouriteCreateInputSchema: z.ZodType<Prisma.FavouriteCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFavouritesInputSchema),
  property: z.lazy(() => PropertyCreateNestedOneWithoutFavouritedByInputSchema),
});

export const FavouriteUncheckedCreateInputSchema: z.ZodType<Prisma.FavouriteUncheckedCreateInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  propertyId: z.string(),
});

export const FavouriteUpdateInputSchema: z.ZodType<Prisma.FavouriteUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFavouritesNestedInputSchema).optional(),
  property: z.lazy(() => PropertyUpdateOneRequiredWithoutFavouritedByNestedInputSchema).optional(),
});

export const FavouriteUncheckedUpdateInputSchema: z.ZodType<Prisma.FavouriteUncheckedUpdateInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  propertyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavouriteCreateManyInputSchema: z.ZodType<Prisma.FavouriteCreateManyInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
  propertyId: z.string(),
});

export const FavouriteUpdateManyMutationInputSchema: z.ZodType<Prisma.FavouriteUpdateManyMutationInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavouriteUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FavouriteUncheckedUpdateManyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  propertyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const FavouriteListRelationFilterSchema: z.ZodType<Prisma.FavouriteListRelationFilter> = z.strictObject({
  every: z.lazy(() => FavouriteWhereInputSchema).optional(),
  some: z.lazy(() => FavouriteWhereInputSchema).optional(),
  none: z.lazy(() => FavouriteWhereInputSchema).optional(),
});

export const FavouriteOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FavouriteOrderByRelationAggregateInput> = z.strictObject({
  _count: z.lazy(() => SortOrderSchema).optional(),
});

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.strictObject({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional(),
});

export const PropertyCountOrderByAggregateInputSchema: z.ZodType<Prisma.PropertyCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const PropertyAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PropertyAvgOrderByAggregateInput> = z.strictObject({
  price: z.lazy(() => SortOrderSchema).optional(),
});

export const PropertyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PropertyMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const PropertyMinOrderByAggregateInputSchema: z.ZodType<Prisma.PropertyMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
});

export const PropertySumOrderByAggregateInputSchema: z.ZodType<Prisma.PropertySumOrderByAggregateInput> = z.strictObject({
  price: z.lazy(() => SortOrderSchema).optional(),
});

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
});

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
});

export const PropertyScalarRelationFilterSchema: z.ZodType<Prisma.PropertyScalarRelationFilter> = z.strictObject({
  is: z.lazy(() => PropertyWhereInputSchema).optional(),
  isNot: z.lazy(() => PropertyWhereInputSchema).optional(),
});

export const FavouriteUserIdPropertyIdCompoundUniqueInputSchema: z.ZodType<Prisma.FavouriteUserIdPropertyIdCompoundUniqueInput> = z.strictObject({
  userId: z.string(),
  propertyId: z.string(),
});

export const FavouriteCountOrderByAggregateInputSchema: z.ZodType<Prisma.FavouriteCountOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  propertyId: z.lazy(() => SortOrderSchema).optional(),
});

export const FavouriteMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FavouriteMaxOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  propertyId: z.lazy(() => SortOrderSchema).optional(),
});

export const FavouriteMinOrderByAggregateInputSchema: z.ZodType<Prisma.FavouriteMinOrderByAggregateInput> = z.strictObject({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  propertyId: z.lazy(() => SortOrderSchema).optional(),
});

export const FavouriteCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FavouriteCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavouriteCreateWithoutUserInputSchema), z.lazy(() => FavouriteCreateWithoutUserInputSchema).array(), z.lazy(() => FavouriteUncheckedCreateWithoutUserInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavouriteCreateOrConnectWithoutUserInputSchema), z.lazy(() => FavouriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavouriteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
});

export const FavouriteUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FavouriteUncheckedCreateNestedManyWithoutUserInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavouriteCreateWithoutUserInputSchema), z.lazy(() => FavouriteCreateWithoutUserInputSchema).array(), z.lazy(() => FavouriteUncheckedCreateWithoutUserInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavouriteCreateOrConnectWithoutUserInputSchema), z.lazy(() => FavouriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavouriteCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
});

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional(),
});

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.strictObject({
  set: z.coerce.date().optional(),
});

export const FavouriteUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FavouriteUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavouriteCreateWithoutUserInputSchema), z.lazy(() => FavouriteCreateWithoutUserInputSchema).array(), z.lazy(() => FavouriteUncheckedCreateWithoutUserInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavouriteCreateOrConnectWithoutUserInputSchema), z.lazy(() => FavouriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavouriteUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => FavouriteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavouriteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavouriteUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => FavouriteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavouriteUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => FavouriteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavouriteScalarWhereInputSchema), z.lazy(() => FavouriteScalarWhereInputSchema).array() ]).optional(),
});

export const FavouriteUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FavouriteUncheckedUpdateManyWithoutUserNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavouriteCreateWithoutUserInputSchema), z.lazy(() => FavouriteCreateWithoutUserInputSchema).array(), z.lazy(() => FavouriteUncheckedCreateWithoutUserInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavouriteCreateOrConnectWithoutUserInputSchema), z.lazy(() => FavouriteCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavouriteUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => FavouriteUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavouriteCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavouriteUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => FavouriteUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavouriteUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => FavouriteUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavouriteScalarWhereInputSchema), z.lazy(() => FavouriteScalarWhereInputSchema).array() ]).optional(),
});

export const FavouriteCreateNestedManyWithoutPropertyInputSchema: z.ZodType<Prisma.FavouriteCreateNestedManyWithoutPropertyInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavouriteCreateWithoutPropertyInputSchema), z.lazy(() => FavouriteCreateWithoutPropertyInputSchema).array(), z.lazy(() => FavouriteUncheckedCreateWithoutPropertyInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutPropertyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavouriteCreateOrConnectWithoutPropertyInputSchema), z.lazy(() => FavouriteCreateOrConnectWithoutPropertyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavouriteCreateManyPropertyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
});

export const FavouriteUncheckedCreateNestedManyWithoutPropertyInputSchema: z.ZodType<Prisma.FavouriteUncheckedCreateNestedManyWithoutPropertyInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavouriteCreateWithoutPropertyInputSchema), z.lazy(() => FavouriteCreateWithoutPropertyInputSchema).array(), z.lazy(() => FavouriteUncheckedCreateWithoutPropertyInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutPropertyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavouriteCreateOrConnectWithoutPropertyInputSchema), z.lazy(() => FavouriteCreateOrConnectWithoutPropertyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavouriteCreateManyPropertyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
});

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.strictObject({
  set: z.string().optional().nullable(),
});

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.strictObject({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
});

export const FavouriteUpdateManyWithoutPropertyNestedInputSchema: z.ZodType<Prisma.FavouriteUpdateManyWithoutPropertyNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavouriteCreateWithoutPropertyInputSchema), z.lazy(() => FavouriteCreateWithoutPropertyInputSchema).array(), z.lazy(() => FavouriteUncheckedCreateWithoutPropertyInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutPropertyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavouriteCreateOrConnectWithoutPropertyInputSchema), z.lazy(() => FavouriteCreateOrConnectWithoutPropertyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavouriteUpsertWithWhereUniqueWithoutPropertyInputSchema), z.lazy(() => FavouriteUpsertWithWhereUniqueWithoutPropertyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavouriteCreateManyPropertyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavouriteUpdateWithWhereUniqueWithoutPropertyInputSchema), z.lazy(() => FavouriteUpdateWithWhereUniqueWithoutPropertyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavouriteUpdateManyWithWhereWithoutPropertyInputSchema), z.lazy(() => FavouriteUpdateManyWithWhereWithoutPropertyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavouriteScalarWhereInputSchema), z.lazy(() => FavouriteScalarWhereInputSchema).array() ]).optional(),
});

export const FavouriteUncheckedUpdateManyWithoutPropertyNestedInputSchema: z.ZodType<Prisma.FavouriteUncheckedUpdateManyWithoutPropertyNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => FavouriteCreateWithoutPropertyInputSchema), z.lazy(() => FavouriteCreateWithoutPropertyInputSchema).array(), z.lazy(() => FavouriteUncheckedCreateWithoutPropertyInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutPropertyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FavouriteCreateOrConnectWithoutPropertyInputSchema), z.lazy(() => FavouriteCreateOrConnectWithoutPropertyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FavouriteUpsertWithWhereUniqueWithoutPropertyInputSchema), z.lazy(() => FavouriteUpsertWithWhereUniqueWithoutPropertyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FavouriteCreateManyPropertyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FavouriteWhereUniqueInputSchema), z.lazy(() => FavouriteWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FavouriteUpdateWithWhereUniqueWithoutPropertyInputSchema), z.lazy(() => FavouriteUpdateWithWhereUniqueWithoutPropertyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FavouriteUpdateManyWithWhereWithoutPropertyInputSchema), z.lazy(() => FavouriteUpdateManyWithWhereWithoutPropertyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FavouriteScalarWhereInputSchema), z.lazy(() => FavouriteScalarWhereInputSchema).array() ]).optional(),
});

export const UserCreateNestedOneWithoutFavouritesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFavouritesInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutFavouritesInputSchema), z.lazy(() => UserUncheckedCreateWithoutFavouritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFavouritesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
});

export const PropertyCreateNestedOneWithoutFavouritedByInputSchema: z.ZodType<Prisma.PropertyCreateNestedOneWithoutFavouritedByInput> = z.strictObject({
  create: z.union([ z.lazy(() => PropertyCreateWithoutFavouritedByInputSchema), z.lazy(() => PropertyUncheckedCreateWithoutFavouritedByInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PropertyCreateOrConnectWithoutFavouritedByInputSchema).optional(),
  connect: z.lazy(() => PropertyWhereUniqueInputSchema).optional(),
});

export const UserUpdateOneRequiredWithoutFavouritesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFavouritesNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => UserCreateWithoutFavouritesInputSchema), z.lazy(() => UserUncheckedCreateWithoutFavouritesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFavouritesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFavouritesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutFavouritesInputSchema), z.lazy(() => UserUpdateWithoutFavouritesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutFavouritesInputSchema) ]).optional(),
});

export const PropertyUpdateOneRequiredWithoutFavouritedByNestedInputSchema: z.ZodType<Prisma.PropertyUpdateOneRequiredWithoutFavouritedByNestedInput> = z.strictObject({
  create: z.union([ z.lazy(() => PropertyCreateWithoutFavouritedByInputSchema), z.lazy(() => PropertyUncheckedCreateWithoutFavouritedByInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PropertyCreateOrConnectWithoutFavouritedByInputSchema).optional(),
  upsert: z.lazy(() => PropertyUpsertWithoutFavouritedByInputSchema).optional(),
  connect: z.lazy(() => PropertyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PropertyUpdateToOneWithWhereWithoutFavouritedByInputSchema), z.lazy(() => PropertyUpdateWithoutFavouritedByInputSchema), z.lazy(() => PropertyUncheckedUpdateWithoutFavouritedByInputSchema) ]).optional(),
});

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
});

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
});

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
});

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
});

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.strictObject({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
});

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
});

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
});

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.strictObject({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
});

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.strictObject({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
});

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.strictObject({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional(),
});

export const FavouriteCreateWithoutUserInputSchema: z.ZodType<Prisma.FavouriteCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  property: z.lazy(() => PropertyCreateNestedOneWithoutFavouritedByInputSchema),
});

export const FavouriteUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FavouriteUncheckedCreateWithoutUserInput> = z.strictObject({
  id: z.uuid().optional(),
  propertyId: z.string(),
});

export const FavouriteCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FavouriteCreateOrConnectWithoutUserInput> = z.strictObject({
  where: z.lazy(() => FavouriteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FavouriteCreateWithoutUserInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutUserInputSchema) ]),
});

export const FavouriteCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FavouriteCreateManyUserInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => FavouriteCreateManyUserInputSchema), z.lazy(() => FavouriteCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const FavouriteUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FavouriteUpsertWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => FavouriteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FavouriteUpdateWithoutUserInputSchema), z.lazy(() => FavouriteUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FavouriteCreateWithoutUserInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutUserInputSchema) ]),
});

export const FavouriteUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FavouriteUpdateWithWhereUniqueWithoutUserInput> = z.strictObject({
  where: z.lazy(() => FavouriteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FavouriteUpdateWithoutUserInputSchema), z.lazy(() => FavouriteUncheckedUpdateWithoutUserInputSchema) ]),
});

export const FavouriteUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FavouriteUpdateManyWithWhereWithoutUserInput> = z.strictObject({
  where: z.lazy(() => FavouriteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FavouriteUpdateManyMutationInputSchema), z.lazy(() => FavouriteUncheckedUpdateManyWithoutUserInputSchema) ]),
});

export const FavouriteScalarWhereInputSchema: z.ZodType<Prisma.FavouriteScalarWhereInput> = z.strictObject({
  AND: z.union([ z.lazy(() => FavouriteScalarWhereInputSchema), z.lazy(() => FavouriteScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FavouriteScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FavouriteScalarWhereInputSchema), z.lazy(() => FavouriteScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
  propertyId: z.union([ z.lazy(() => StringFilterSchema), z.string() ]).optional(),
});

export const FavouriteCreateWithoutPropertyInputSchema: z.ZodType<Prisma.FavouriteCreateWithoutPropertyInput> = z.strictObject({
  id: z.uuid().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutFavouritesInputSchema),
});

export const FavouriteUncheckedCreateWithoutPropertyInputSchema: z.ZodType<Prisma.FavouriteUncheckedCreateWithoutPropertyInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
});

export const FavouriteCreateOrConnectWithoutPropertyInputSchema: z.ZodType<Prisma.FavouriteCreateOrConnectWithoutPropertyInput> = z.strictObject({
  where: z.lazy(() => FavouriteWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FavouriteCreateWithoutPropertyInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutPropertyInputSchema) ]),
});

export const FavouriteCreateManyPropertyInputEnvelopeSchema: z.ZodType<Prisma.FavouriteCreateManyPropertyInputEnvelope> = z.strictObject({
  data: z.union([ z.lazy(() => FavouriteCreateManyPropertyInputSchema), z.lazy(() => FavouriteCreateManyPropertyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional(),
});

export const FavouriteUpsertWithWhereUniqueWithoutPropertyInputSchema: z.ZodType<Prisma.FavouriteUpsertWithWhereUniqueWithoutPropertyInput> = z.strictObject({
  where: z.lazy(() => FavouriteWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FavouriteUpdateWithoutPropertyInputSchema), z.lazy(() => FavouriteUncheckedUpdateWithoutPropertyInputSchema) ]),
  create: z.union([ z.lazy(() => FavouriteCreateWithoutPropertyInputSchema), z.lazy(() => FavouriteUncheckedCreateWithoutPropertyInputSchema) ]),
});

export const FavouriteUpdateWithWhereUniqueWithoutPropertyInputSchema: z.ZodType<Prisma.FavouriteUpdateWithWhereUniqueWithoutPropertyInput> = z.strictObject({
  where: z.lazy(() => FavouriteWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FavouriteUpdateWithoutPropertyInputSchema), z.lazy(() => FavouriteUncheckedUpdateWithoutPropertyInputSchema) ]),
});

export const FavouriteUpdateManyWithWhereWithoutPropertyInputSchema: z.ZodType<Prisma.FavouriteUpdateManyWithWhereWithoutPropertyInput> = z.strictObject({
  where: z.lazy(() => FavouriteScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FavouriteUpdateManyMutationInputSchema), z.lazy(() => FavouriteUncheckedUpdateManyWithoutPropertyInputSchema) ]),
});

export const UserCreateWithoutFavouritesInputSchema: z.ZodType<Prisma.UserCreateWithoutFavouritesInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const UserUncheckedCreateWithoutFavouritesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutFavouritesInput> = z.strictObject({
  id: z.uuid().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  role: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const UserCreateOrConnectWithoutFavouritesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFavouritesInput> = z.strictObject({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutFavouritesInputSchema), z.lazy(() => UserUncheckedCreateWithoutFavouritesInputSchema) ]),
});

export const PropertyCreateWithoutFavouritedByInputSchema: z.ZodType<Prisma.PropertyCreateWithoutFavouritedByInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const PropertyUncheckedCreateWithoutFavouritedByInputSchema: z.ZodType<Prisma.PropertyUncheckedCreateWithoutFavouritedByInput> = z.strictObject({
  id: z.uuid().optional(),
  title: z.string(),
  description: z.string().optional().nullable(),
  price: z.number(),
  imageUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export const PropertyCreateOrConnectWithoutFavouritedByInputSchema: z.ZodType<Prisma.PropertyCreateOrConnectWithoutFavouritedByInput> = z.strictObject({
  where: z.lazy(() => PropertyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PropertyCreateWithoutFavouritedByInputSchema), z.lazy(() => PropertyUncheckedCreateWithoutFavouritedByInputSchema) ]),
});

export const UserUpsertWithoutFavouritesInputSchema: z.ZodType<Prisma.UserUpsertWithoutFavouritesInput> = z.strictObject({
  update: z.union([ z.lazy(() => UserUpdateWithoutFavouritesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutFavouritesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutFavouritesInputSchema), z.lazy(() => UserUncheckedCreateWithoutFavouritesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional(),
});

export const UserUpdateToOneWithWhereWithoutFavouritesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFavouritesInput> = z.strictObject({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutFavouritesInputSchema), z.lazy(() => UserUncheckedUpdateWithoutFavouritesInputSchema) ]),
});

export const UserUpdateWithoutFavouritesInputSchema: z.ZodType<Prisma.UserUpdateWithoutFavouritesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const UserUncheckedUpdateWithoutFavouritesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutFavouritesInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PropertyUpsertWithoutFavouritedByInputSchema: z.ZodType<Prisma.PropertyUpsertWithoutFavouritedByInput> = z.strictObject({
  update: z.union([ z.lazy(() => PropertyUpdateWithoutFavouritedByInputSchema), z.lazy(() => PropertyUncheckedUpdateWithoutFavouritedByInputSchema) ]),
  create: z.union([ z.lazy(() => PropertyCreateWithoutFavouritedByInputSchema), z.lazy(() => PropertyUncheckedCreateWithoutFavouritedByInputSchema) ]),
  where: z.lazy(() => PropertyWhereInputSchema).optional(),
});

export const PropertyUpdateToOneWithWhereWithoutFavouritedByInputSchema: z.ZodType<Prisma.PropertyUpdateToOneWithWhereWithoutFavouritedByInput> = z.strictObject({
  where: z.lazy(() => PropertyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PropertyUpdateWithoutFavouritedByInputSchema), z.lazy(() => PropertyUncheckedUpdateWithoutFavouritedByInputSchema) ]),
});

export const PropertyUpdateWithoutFavouritedByInputSchema: z.ZodType<Prisma.PropertyUpdateWithoutFavouritedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const PropertyUncheckedUpdateWithoutFavouritedByInputSchema: z.ZodType<Prisma.PropertyUncheckedUpdateWithoutFavouritedByInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavouriteCreateManyUserInputSchema: z.ZodType<Prisma.FavouriteCreateManyUserInput> = z.strictObject({
  id: z.uuid().optional(),
  propertyId: z.string(),
});

export const FavouriteUpdateWithoutUserInputSchema: z.ZodType<Prisma.FavouriteUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  property: z.lazy(() => PropertyUpdateOneRequiredWithoutFavouritedByNestedInputSchema).optional(),
});

export const FavouriteUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FavouriteUncheckedUpdateWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  propertyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavouriteUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.FavouriteUncheckedUpdateManyWithoutUserInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  propertyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavouriteCreateManyPropertyInputSchema: z.ZodType<Prisma.FavouriteCreateManyPropertyInput> = z.strictObject({
  id: z.uuid().optional(),
  userId: z.string(),
});

export const FavouriteUpdateWithoutPropertyInputSchema: z.ZodType<Prisma.FavouriteUpdateWithoutPropertyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutFavouritesNestedInputSchema).optional(),
});

export const FavouriteUncheckedUpdateWithoutPropertyInputSchema: z.ZodType<Prisma.FavouriteUncheckedUpdateWithoutPropertyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

export const FavouriteUncheckedUpdateManyWithoutPropertyInputSchema: z.ZodType<Prisma.FavouriteUncheckedUpdateManyWithoutPropertyInput> = z.strictObject({
  id: z.union([ z.uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
});

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(), 
  having: UserScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const PropertyFindFirstArgsSchema: z.ZodType<Prisma.PropertyFindFirstArgs> = z.object({
  select: PropertySelectSchema.optional(),
  include: PropertyIncludeSchema.optional(),
  where: PropertyWhereInputSchema.optional(), 
  orderBy: z.union([ PropertyOrderByWithRelationInputSchema.array(), PropertyOrderByWithRelationInputSchema ]).optional(),
  cursor: PropertyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PropertyScalarFieldEnumSchema, PropertyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PropertyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PropertyFindFirstOrThrowArgs> = z.object({
  select: PropertySelectSchema.optional(),
  include: PropertyIncludeSchema.optional(),
  where: PropertyWhereInputSchema.optional(), 
  orderBy: z.union([ PropertyOrderByWithRelationInputSchema.array(), PropertyOrderByWithRelationInputSchema ]).optional(),
  cursor: PropertyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PropertyScalarFieldEnumSchema, PropertyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PropertyFindManyArgsSchema: z.ZodType<Prisma.PropertyFindManyArgs> = z.object({
  select: PropertySelectSchema.optional(),
  include: PropertyIncludeSchema.optional(),
  where: PropertyWhereInputSchema.optional(), 
  orderBy: z.union([ PropertyOrderByWithRelationInputSchema.array(), PropertyOrderByWithRelationInputSchema ]).optional(),
  cursor: PropertyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PropertyScalarFieldEnumSchema, PropertyScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const PropertyAggregateArgsSchema: z.ZodType<Prisma.PropertyAggregateArgs> = z.object({
  where: PropertyWhereInputSchema.optional(), 
  orderBy: z.union([ PropertyOrderByWithRelationInputSchema.array(), PropertyOrderByWithRelationInputSchema ]).optional(),
  cursor: PropertyWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PropertyGroupByArgsSchema: z.ZodType<Prisma.PropertyGroupByArgs> = z.object({
  where: PropertyWhereInputSchema.optional(), 
  orderBy: z.union([ PropertyOrderByWithAggregationInputSchema.array(), PropertyOrderByWithAggregationInputSchema ]).optional(),
  by: PropertyScalarFieldEnumSchema.array(), 
  having: PropertyScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const PropertyFindUniqueArgsSchema: z.ZodType<Prisma.PropertyFindUniqueArgs> = z.object({
  select: PropertySelectSchema.optional(),
  include: PropertyIncludeSchema.optional(),
  where: PropertyWhereUniqueInputSchema, 
}).strict();

export const PropertyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PropertyFindUniqueOrThrowArgs> = z.object({
  select: PropertySelectSchema.optional(),
  include: PropertyIncludeSchema.optional(),
  where: PropertyWhereUniqueInputSchema, 
}).strict();

export const FavouriteFindFirstArgsSchema: z.ZodType<Prisma.FavouriteFindFirstArgs> = z.object({
  select: FavouriteSelectSchema.optional(),
  include: FavouriteIncludeSchema.optional(),
  where: FavouriteWhereInputSchema.optional(), 
  orderBy: z.union([ FavouriteOrderByWithRelationInputSchema.array(), FavouriteOrderByWithRelationInputSchema ]).optional(),
  cursor: FavouriteWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FavouriteScalarFieldEnumSchema, FavouriteScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const FavouriteFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FavouriteFindFirstOrThrowArgs> = z.object({
  select: FavouriteSelectSchema.optional(),
  include: FavouriteIncludeSchema.optional(),
  where: FavouriteWhereInputSchema.optional(), 
  orderBy: z.union([ FavouriteOrderByWithRelationInputSchema.array(), FavouriteOrderByWithRelationInputSchema ]).optional(),
  cursor: FavouriteWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FavouriteScalarFieldEnumSchema, FavouriteScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const FavouriteFindManyArgsSchema: z.ZodType<Prisma.FavouriteFindManyArgs> = z.object({
  select: FavouriteSelectSchema.optional(),
  include: FavouriteIncludeSchema.optional(),
  where: FavouriteWhereInputSchema.optional(), 
  orderBy: z.union([ FavouriteOrderByWithRelationInputSchema.array(), FavouriteOrderByWithRelationInputSchema ]).optional(),
  cursor: FavouriteWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FavouriteScalarFieldEnumSchema, FavouriteScalarFieldEnumSchema.array() ]).optional(),
}).strict();

export const FavouriteAggregateArgsSchema: z.ZodType<Prisma.FavouriteAggregateArgs> = z.object({
  where: FavouriteWhereInputSchema.optional(), 
  orderBy: z.union([ FavouriteOrderByWithRelationInputSchema.array(), FavouriteOrderByWithRelationInputSchema ]).optional(),
  cursor: FavouriteWhereUniqueInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const FavouriteGroupByArgsSchema: z.ZodType<Prisma.FavouriteGroupByArgs> = z.object({
  where: FavouriteWhereInputSchema.optional(), 
  orderBy: z.union([ FavouriteOrderByWithAggregationInputSchema.array(), FavouriteOrderByWithAggregationInputSchema ]).optional(),
  by: FavouriteScalarFieldEnumSchema.array(), 
  having: FavouriteScalarWhereWithAggregatesInputSchema.optional(), 
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict();

export const FavouriteFindUniqueArgsSchema: z.ZodType<Prisma.FavouriteFindUniqueArgs> = z.object({
  select: FavouriteSelectSchema.optional(),
  include: FavouriteIncludeSchema.optional(),
  where: FavouriteWhereUniqueInputSchema, 
}).strict();

export const FavouriteFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FavouriteFindUniqueOrThrowArgs> = z.object({
  select: FavouriteSelectSchema.optional(),
  include: FavouriteIncludeSchema.optional(),
  where: FavouriteWhereUniqueInputSchema, 
}).strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
}).strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
  create: z.union([ UserCreateInputSchema, UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
}).strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema, UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema, UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema, 
}).strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PropertyCreateArgsSchema: z.ZodType<Prisma.PropertyCreateArgs> = z.object({
  select: PropertySelectSchema.optional(),
  include: PropertyIncludeSchema.optional(),
  data: z.union([ PropertyCreateInputSchema, PropertyUncheckedCreateInputSchema ]),
}).strict();

export const PropertyUpsertArgsSchema: z.ZodType<Prisma.PropertyUpsertArgs> = z.object({
  select: PropertySelectSchema.optional(),
  include: PropertyIncludeSchema.optional(),
  where: PropertyWhereUniqueInputSchema, 
  create: z.union([ PropertyCreateInputSchema, PropertyUncheckedCreateInputSchema ]),
  update: z.union([ PropertyUpdateInputSchema, PropertyUncheckedUpdateInputSchema ]),
}).strict();

export const PropertyCreateManyArgsSchema: z.ZodType<Prisma.PropertyCreateManyArgs> = z.object({
  data: z.union([ PropertyCreateManyInputSchema, PropertyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PropertyCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PropertyCreateManyAndReturnArgs> = z.object({
  data: z.union([ PropertyCreateManyInputSchema, PropertyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const PropertyDeleteArgsSchema: z.ZodType<Prisma.PropertyDeleteArgs> = z.object({
  select: PropertySelectSchema.optional(),
  include: PropertyIncludeSchema.optional(),
  where: PropertyWhereUniqueInputSchema, 
}).strict();

export const PropertyUpdateArgsSchema: z.ZodType<Prisma.PropertyUpdateArgs> = z.object({
  select: PropertySelectSchema.optional(),
  include: PropertyIncludeSchema.optional(),
  data: z.union([ PropertyUpdateInputSchema, PropertyUncheckedUpdateInputSchema ]),
  where: PropertyWhereUniqueInputSchema, 
}).strict();

export const PropertyUpdateManyArgsSchema: z.ZodType<Prisma.PropertyUpdateManyArgs> = z.object({
  data: z.union([ PropertyUpdateManyMutationInputSchema, PropertyUncheckedUpdateManyInputSchema ]),
  where: PropertyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PropertyUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PropertyUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PropertyUpdateManyMutationInputSchema, PropertyUncheckedUpdateManyInputSchema ]),
  where: PropertyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const PropertyDeleteManyArgsSchema: z.ZodType<Prisma.PropertyDeleteManyArgs> = z.object({
  where: PropertyWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const FavouriteCreateArgsSchema: z.ZodType<Prisma.FavouriteCreateArgs> = z.object({
  select: FavouriteSelectSchema.optional(),
  include: FavouriteIncludeSchema.optional(),
  data: z.union([ FavouriteCreateInputSchema, FavouriteUncheckedCreateInputSchema ]),
}).strict();

export const FavouriteUpsertArgsSchema: z.ZodType<Prisma.FavouriteUpsertArgs> = z.object({
  select: FavouriteSelectSchema.optional(),
  include: FavouriteIncludeSchema.optional(),
  where: FavouriteWhereUniqueInputSchema, 
  create: z.union([ FavouriteCreateInputSchema, FavouriteUncheckedCreateInputSchema ]),
  update: z.union([ FavouriteUpdateInputSchema, FavouriteUncheckedUpdateInputSchema ]),
}).strict();

export const FavouriteCreateManyArgsSchema: z.ZodType<Prisma.FavouriteCreateManyArgs> = z.object({
  data: z.union([ FavouriteCreateManyInputSchema, FavouriteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const FavouriteCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FavouriteCreateManyAndReturnArgs> = z.object({
  data: z.union([ FavouriteCreateManyInputSchema, FavouriteCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const FavouriteDeleteArgsSchema: z.ZodType<Prisma.FavouriteDeleteArgs> = z.object({
  select: FavouriteSelectSchema.optional(),
  include: FavouriteIncludeSchema.optional(),
  where: FavouriteWhereUniqueInputSchema, 
}).strict();

export const FavouriteUpdateArgsSchema: z.ZodType<Prisma.FavouriteUpdateArgs> = z.object({
  select: FavouriteSelectSchema.optional(),
  include: FavouriteIncludeSchema.optional(),
  data: z.union([ FavouriteUpdateInputSchema, FavouriteUncheckedUpdateInputSchema ]),
  where: FavouriteWhereUniqueInputSchema, 
}).strict();

export const FavouriteUpdateManyArgsSchema: z.ZodType<Prisma.FavouriteUpdateManyArgs> = z.object({
  data: z.union([ FavouriteUpdateManyMutationInputSchema, FavouriteUncheckedUpdateManyInputSchema ]),
  where: FavouriteWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const FavouriteUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FavouriteUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FavouriteUpdateManyMutationInputSchema, FavouriteUncheckedUpdateManyInputSchema ]),
  where: FavouriteWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();

export const FavouriteDeleteManyArgsSchema: z.ZodType<Prisma.FavouriteDeleteManyArgs> = z.object({
  where: FavouriteWhereInputSchema.optional(), 
  limit: z.number().optional(),
}).strict();