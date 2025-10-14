import path from "path";
import fs from "fs";

const blogs = [
  async () => await getStaticProps("public/blogs/blog1.md"),
  async () => await getStaticProps("public/blogs/blog2.md"),
];

async function getStaticProps(filePath: string) {
  const currentFilePath = path.join(process.cwd(), filePath);
  const content = fs.readFileSync(currentFilePath, "utf-8");

  return { props: { content } };
}

export { blogs, getStaticProps };
