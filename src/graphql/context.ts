export type Context = RequestContext;

interface RequestContext {
  headers: {
    firebasetoken?: string;
    "X-Forwarded-For"?: string;
  };
}
