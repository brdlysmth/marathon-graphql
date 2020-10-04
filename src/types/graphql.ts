/* THIS IS A GENERATED FILE, DO NOT EDIT DIRECTLY */
/* eslint-disable */
import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X];
} &
  { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Smart Submittals Queries */
export type Query = {
  /** Get all projects */
  AllProjects: Array<Project>;
  /** Get a single project */
  Project: Project;
};

/** Smart Submittals Queries */
export type QueryProjectArgs = {
  input: GetProjectInput;
};

/** Smart Submittals Queries */
export type Mutation = {
  /** Get all projects */
  AddProject: Maybe<AddProjectResponse>;
};

/** Smart Submittals Queries */
export type MutationAddProjectArgs = {
  input: AddProjectInput;
};

export type AddProjectInput = {
  /** The id of the customer to add the address to */
  name: Scalars["String"];
  number: Scalars["Int"];
};

export type AddProjectResponse = {
  name: Maybe<Scalars["String"]>;
};

export type GetProjectInput = {
  id: Scalars["String"];
};

export type Project = {
  name: Scalars["String"];
  number: Scalars["Int"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type Resolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<undefined>;
  Mutation: ResolverTypeWrapper<undefined>;
  AddProjectInput: AddProjectInput;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  AddProjectResponse: ResolverTypeWrapper<AddProjectResponse>;
  GetProjectInput: GetProjectInput;
  Project: ResolverTypeWrapper<Project>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: undefined;
  Mutation: undefined;
  AddProjectInput: AddProjectInput;
  String: Scalars["String"];
  Int: Scalars["Int"];
  AddProjectResponse: AddProjectResponse;
  GetProjectInput: GetProjectInput;
  Project: Project;
  Boolean: Scalars["Boolean"];
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  AllProjects: Resolver<
    Array<ResolversTypes["Project"]>,
    ParentType,
    ContextType
  >;
  Project: Resolver<
    ResolversTypes["Project"],
    ParentType,
    ContextType,
    RequireFields<QueryProjectArgs, "input">
  >;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  AddProject: Resolver<
    Maybe<ResolversTypes["AddProjectResponse"]>,
    ParentType,
    ContextType,
    RequireFields<MutationAddProjectArgs, "input">
  >;
};

export type AddProjectResponseResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["AddProjectResponse"] = ResolversParentTypes["AddProjectResponse"]
> = {
  name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Project"] = ResolversParentTypes["Project"]
> = {
  name: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  number: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query: QueryResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  AddProjectResponse: AddProjectResponseResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
