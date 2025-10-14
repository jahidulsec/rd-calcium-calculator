const blogs = [
  async () => JSON.stringify((await import("../../public/blogs/blog1.md")).default),
  async () => JSON.stringify((await import("../../public/blogs/blog2.md")).default),
];

export { blogs };
