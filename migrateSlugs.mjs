import fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf-8');
const envVars = Object.fromEntries(envFile.split('\n').filter(line => line.includes('=')).map(line => line.split('=')));

const SUPABASE_URL = envVars.VITE_SUPABASE_URL?.trim();
const SUPABASE_KEY = envVars.VITE_SUPABASE_ANON_KEY?.trim();

async function migrate() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.error("Missing env vars");
    process.exit(1);
  }

  // Fetch all properties
  const res = await fetch(`${SUPABASE_URL}/rest/v1/properties?select=id,title,slug`, {
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`
    }
  });

  if (!res.ok) {
    console.error("Failed to fetch", await res.text());
    process.exit(1);
  }

  const properties = await res.json();
  console.log(`Found ${properties.length} properties.`);

  for (const prop of properties) {
    const expectedSlug = prop.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    if (!prop.slug || prop.slug !== expectedSlug) {
      console.log(`Updating ${prop.id} -> ${expectedSlug}`);
      
      const updateRes = await fetch(`${SUPABASE_URL}/rest/v1/properties?id=eq.${prop.id}`, {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({ slug: expectedSlug })
      });
      
      if (!updateRes.ok) {
        console.error(`Failed to update ${prop.id}:`, await updateRes.text());
      } else {
        console.log(`Successfully updated ${prop.id}`);
      }
    } else {
      console.log(`Property ${prop.id} already has correct slug: ${prop.slug}`);
    }
  }
}

migrate().catch(console.error);
