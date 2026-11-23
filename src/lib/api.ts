import { supabase, supabaseUrl } from "./supabase";

export interface Listing {
  id: string;
  price: string;
  title: string;
  location: string;
  type: "Land" | "Apartment" | "Bungalow" | "Farm Land";
  verified: boolean;
  image: string;
  images?: string[];
  specs: string[];
  slug?: string;
  description?: string | null;
  raw?: any;
}

export const formatINR = (n: number) => {
  if (n >= 10000000) return `₹ ${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000) return `₹ ${(n / 100000).toFixed(2)} L`;
  if (n >= 1000) return `₹ ${(n / 1000).toFixed(1)} K`;
  return `₹ ${n}`;
};

function resolveImageUrl(key: string): string {
  if (!key) return "/land-placeholder-1.png";
  if (key.startsWith("http") || key.startsWith("/")) return key;
  const baseUrl = import.meta.env.VITE_R2_PUBLIC_BASE_URL;
  return baseUrl ? `${baseUrl}/${key}` : key;
}

function mapDbToFrontendProperty(row: any): Listing {
  const imageRows = row.property_images?.sort((a: any, b: any) => a.sort_order - b.sort_order) || [];
  const imageUrls = imageRows.map((img: any) => resolveImageUrl(img.r2_key)).filter(Boolean);
  const imageUrl = imageUrls.length > 0 ? imageUrls[0] : "/land-placeholder-1.png";

  const type = (row.property_type === "villa" ? "Bungalow" : row.property_type === "apartment" ? "Apartment" : row.property_type === "farmland" ? "Farm Land" : "Land") as any;

  const specs: string[] = [];
  if (type !== "Land" && type !== "Farm Land") {
    if (row.bhk) specs.push(`${row.bhk} Beds`);
    if (row.bathrooms) specs.push(`${row.bathrooms} Baths`);
    if (row.area_sqft) specs.push(`${row.area_sqft} sq.ft`);
    else if (row.dimensions) specs.push(row.dimensions);
  } else {
    if (row.area_sqft) specs.push(`${row.area_sqft} sq.ft`);
    else if (row.dimensions) specs.push(row.dimensions);
    if (row.facing_direction) specs.push(`${row.facing_direction} Facing`);
    if (row.na_status) specs.push(`${row.na_status} Plot`);
  }

  const location = row.address_line
    ? `${row.address_line}, ${row.city || "Belagavi"}`
    : `${row.city || "Belagavi"}, Karnataka`.replace(/^, /, "");

  return {
    id: row.id,
    price: row.price_on_request ? "Price on Request" : formatINR(row.price || 0),
    title: row.title,
    location,
    type,
    verified: row.verified ?? true,
    image: imageUrl,
    images: imageUrls.length > 0 ? imageUrls : [imageUrl],
    specs,
    slug: row.slug,
    description: row.description,
    raw: row,
  };
}

export async function getPublicProperties(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("properties")
    .select(`*, property_images(r2_key, is_cover, sort_order)`)
    .eq("status", "active")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(mapDbToFrontendProperty);
}

export async function getPropertiesByCategory(category: "home" | "land"): Promise<Listing[]> {
  let query = supabase
    .from("properties")
    .select(`*, property_images(r2_key, is_cover, sort_order)`)
    .eq("status", "active");

  if (category === "home") {
    query = query.in("property_type", ["villa", "apartment"]);
  } else if (category === "land") {
    query = query.in("property_type", ["plot", "farmland"]);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return (data || []).map(mapDbToFrontendProperty);
}

export async function getPublicPropertyById(id: string): Promise<Listing> {
  const { data, error } = await supabase
    .from("properties")
    .select(`*, property_images(r2_key, is_cover, sort_order)`)
    .eq("status", "active")
    .eq("id", id)
    .single();

  if (error) throw error;
  return mapDbToFrontendProperty(data);
}

export async function getPublicPropertyBySlug(slug: string): Promise<Listing> {
  const { data, error } = await supabase
    .from("properties")
    .select(`*, property_images(r2_key, is_cover, sort_order)`)
    .eq("status", "active")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return mapDbToFrontendProperty(data);
}

// ============================================================
// ADMIN API
// ============================================================

export interface AdminProperty {
  id: string;
  listing_number: string | null;
  title: string;
  property_type: string;
  listing_type: string;
  price: number;
  price_on_request: boolean;
  status: string;
  city: string;
  created_at: string;
  slug?: string;
}

export interface AdminInquiry {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  message: string;
  status: string;
  created_at: string;
  property?: { title: string };
}

export interface DashboardStats {
  activeListings: number;
  pendingApprovals: number;
  propertiesSold: number;
  totalInquiries: number;
}

export async function adminLogin(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function adminLogout() {
  await supabase.auth.signOut();
}

export async function getAdminSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [active, pending, sold, inquiries] = await Promise.all([
    supabase.from("properties").select("id", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("properties").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("properties").select("id", { count: "exact", head: true }).in("status", ["sold", "rented"]),
    supabase.from("inquiries").select("id", { count: "exact", head: true }),
  ]);
  return {
    activeListings: active.count ?? 0,
    pendingApprovals: pending.count ?? 0,
    propertiesSold: sold.count ?? 0,
    totalInquiries: inquiries.count ?? 0,
  };
}

export async function getAdminProperties(): Promise<AdminProperty[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("id, listing_number, title, property_type, listing_type, price, price_on_request, status, city, created_at, slug")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getAdminPropertyById(id: string) {
  const { data, error } = await supabase
    .from("properties")
    .select(`*, property_images(r2_key, is_cover, sort_order)`)
    .eq("id", id)
    .single();
  if (error) throw error;
  if (data?.property_images) {
    data.property_images = data.property_images
      .sort((a: any, b: any) => a.sort_order - b.sort_order)
      .map((img: any) => ({ ...img, url: resolveImageUrl(img.r2_key) }));
  }
  return data;
}

export async function deleteAdminProperty(id: string) {
  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) throw error;
}

export async function getNextListingNumber(): Promise<string> {
  const { data, error } = await supabase
    .from("properties")
    .select("listing_number")
    .not("listing_number", "is", null)
    .order("listing_number", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data?.listing_number) return "#0101";
  const numPart = data.listing_number.replace(/[^0-9]/g, "");
  const next = parseInt(numPart, 10) + 1;
  return `#${String(isNaN(next) ? 101 : next).padStart(4, "0")}`;
}

export async function uploadImageToR2(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error("Not authenticated for upload");

  const res = await fetch(`${supabaseUrl}/functions/v1/generate-r2-upload-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session.access_token}`
    },
    body: JSON.stringify({
      filename: file.name,
      contentType: file.type,
      base64,
    })
  });

  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(data.error || "R2 upload failed");
  }

  return data.r2Key;
}

function buildPropertyPayload(data: any) {
  return {
    listing_number: data.listing_number,
    title: data.title,
    slug: data.slug,
    property_type: data.property_type,
    listing_type: data.listing_type,
    price: data.price_on_request ? 0 : (data.price || 0),
    city: data.city,
    status: data.status,
    price_on_request: data.price_on_request,
    area_sqft: data.area_sqft ? Number(data.area_sqft) : null,
    currency: "INR",
    description: data.description || null,
    bhk: data.bhk ? Number(data.bhk) : null,
    bathrooms: data.bathrooms ? Number(data.bathrooms) : null,
    parking: data.parking ? Number(data.parking) : null,
    facing_direction: data.facing_direction || null,
    furnishing: data.furnishing || null,
    property_age: data.property_age || null,
    dimensions: data.dimensions || null,
    layout_name: data.layout_name || null,
    na_status: data.na_status || null,
    rera_approved: data.rera_approved || false,
    premium: data.premium || false,
    featured: data.featured || false,
    amenities: data.amenities ? data.amenities.split(",").map((a: string) => a.trim()).filter(Boolean) : [],
    electricity: data.electricity || false,
    drainage: data.drainage || false,
    water_connection: data.water_connection || false,
    vastu_compliant: data.vastu_compliant || false,
    approvals: data.approvals || null,
    survey_number: data.survey_number || null,
    nearby_landmarks: data.nearby_landmarks || null,
    schools: data.schools || null,
    hospitals: data.hospitals || null,
    shopping: data.shopping || null,
    connectivity: data.connectivity || null,
    road_width: data.road_width ? Number(data.road_width) : null,
    address_line: data.address_line || null,
    latitude: data.latitude ? Number(data.latitude) : null,
    longitude: data.longitude ? Number(data.longitude) : null,
    approved_banks: data.approved_banks || null,
  };
}

export async function createAdminProperty(data: any, imageFiles: File[]): Promise<string> {
  const payload = buildPropertyPayload(data);
  const { data: propData, error } = await supabase.from("properties").insert([payload]).select("id").single();
  if (error) throw new Error(error.message);
  const propertyId = propData.id;

  if (imageFiles.length > 0) {
    const imageRows = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const r2Key = await uploadImageToR2(imageFiles[i]);
      imageRows.push({ property_id: propertyId, r2_key: r2Key, sort_order: i, is_cover: i === 0 });
    }
    const { error: imgError } = await supabase.from("property_images").insert(imageRows);
    if (imgError) throw new Error("Property saved but images failed: " + imgError.message);
  }
  return propertyId;
}

export async function updateAdminProperty(id: string, data: any, imageFiles: File[], existingImageKeys: string[]) {
  const payload = buildPropertyPayload(data);
  const { error } = await supabase.from("properties").update(payload).eq("id", id);
  if (error) throw new Error(error.message);

  const newImageKeys: string[] = [];
  for (const file of imageFiles) {
    const key = await uploadImageToR2(file);
    newImageKeys.push(key);
  }

  const allKeys = [...existingImageKeys, ...newImageKeys];
  await supabase.from("property_images").delete().eq("property_id", id);
  if (allKeys.length > 0) {
    const imageRows = allKeys.map((key, i) => ({ property_id: id, r2_key: key, sort_order: i, is_cover: i === 0 }));
    await supabase.from("property_images").insert(imageRows);
  }
}

export async function getAdminInquiries(): Promise<AdminInquiry[]> {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*, property:property_id(title)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function markInquiryRead(id: string) {
  const { error } = await supabase.from("inquiries").update({ status: "read" }).eq("id", id);
  if (error) throw error;
}

export interface CreateInquiryInput {
  name: string;
  phone: string;
  email?: string | null;
  message: string;
  property_id?: string | null;
}

export async function createPublicInquiry(input: CreateInquiryInput): Promise<void> {
  const { error } = await supabase.from("inquiries").insert([{
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || null,
    message: input.message.trim(),
    property_id: input.property_id || null,
    status: "new",
  }]);
  if (error) throw error;
}
