
import { prisma } from "./src/lib/prisma";

async function test() {
  console.log("Newsletter on prisma proxy:", (prisma as any).newsletter ? "Exists" : "Missing");
  try {
    const count = await (prisma as any).newsletter.count();
    console.log("Newsletter count via proxy:", count);
  } catch (e: any) {
    console.error("Error accessing newsletter via proxy:", e.message);
  }
}

test();
