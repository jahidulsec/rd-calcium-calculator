import { prisma } from "../src/db/client";
import { hashPassword } from "../src/utils/password";
import inquier from "inquirer";

async function main() {
  const answer = await inquier.prompt([
    {
      type: "input",
      name: "full_name",
      message: "Enter name: ",
    },
    {
      type: "input",
      name: "username",
      message: "Enter username: ",
    },
    {
      type: "password",
      name: "password",
      message: "Enter password: ",
      mask: "*"
    },
    {
      type: "list",
      name: "role",
      message: "Select your role:",
      choices: ["admin", "superadmin"],
    },
  ]);

  // create admin
  await prisma.admin.create({
    data: {
      username: answer.username,
      full_name: answer.full_name,
      password: await hashPassword(answer.password),
      role: answer.role,
    },
  });

  console.log(
    `Welcome, ${answer.username}! You are signed up as ${answer.role}.`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
