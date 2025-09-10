import fs from "fs";
import crypto from "crypto";

console.log("🔧 Setting up database configuration...\n");

// Check if .env exists
if (!fs.existsSync(".env")) {
  console.log("❌ .env file not found!");
  console.log(
    "\n📝 Please create a .env file in your project root with the following content:"
  );
  console.log("");
  console.log("# Database");
  console.log(
    'DATABASE_URL="postgresql://username:password@localhost:5432/autoevents?schema=public"'
  );
  console.log("");
  console.log("# NextAuth");
  console.log(`NEXTAUTH_SECRET="${crypto.randomBytes(32).toString("hex")}"`);
  console.log('NEXTAUTH_URL="http://localhost:3000"');
  console.log("");
  console.log(
    "📋 Replace username, password, and database name with your actual PostgreSQL credentials."
  );
  console.log("");
  console.log("🐘 If you don't have PostgreSQL installed:");
  console.log("   Option 1: Install PostgreSQL locally");
  console.log(
    "   Option 2: Use a cloud service like Neon, Supabase, or Railway"
  );
  console.log(
    "   Option 3: Use Docker: docker run --name postgres -e POSTGRES_PASSWORD=mypassword -p 5432:5432 -d postgres"
  );
} else {
  console.log("✅ .env file found");

  // Read and check .env content
  const envContent = fs.readFileSync(".env", "utf8");

  if (envContent.includes("DATABASE_URL")) {
    console.log("✅ DATABASE_URL found in .env");
  } else {
    console.log("❌ DATABASE_URL not found in .env");
    console.log(
      'Please add: DATABASE_URL="postgresql://username:password@localhost:5432/autoevents?schema=public"'
    );
  }

  if (envContent.includes("NEXTAUTH_SECRET")) {
    console.log("✅ NEXTAUTH_SECRET found in .env");
  } else {
    console.log("❌ NEXTAUTH_SECRET not found in .env");
    console.log(
      `Please add: NEXTAUTH_SECRET="${crypto.randomBytes(32).toString("hex")}"`
    );
  }
}

console.log("\n🚀 After creating/updating .env file, run:");
console.log("1. npm run db:generate");
console.log("2. npm run db:push");
console.log("3. npm run dev");
