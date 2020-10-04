declare namespace Firebase {
  // Unix timstamp in ms
  type TimestampMS = number;
  // Unix timstamp in s
  type TimestampS = number;
  type EmptyableArray<T> = Array<T> | Record<string, T>;

  interface Root {
    // Who is considered an admin for distributor portal + mutations
    projects: {
      [projectKey: string]: Project;
    };
  }

  interface Project {
    name: string;
    number: number;
  }
}
