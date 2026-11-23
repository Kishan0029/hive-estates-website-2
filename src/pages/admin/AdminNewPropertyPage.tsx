import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNextListingNumber,
  createAdminProperty,
} from "../../lib/api";

const optionalNumber = z.preprocess(
  (v) => (v === "" || v === undefined || v === null || Number.isNaN(Number(v)) ? null : Number(v)),
  z.number().nullable()
);

const schema = z.object({
  listing_number: z.string(),
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(3, "Slug is required"),
  property_type: z.enum(["apartment", "villa", "plot", "farmland", "commercial"]),
  listing_type: z.enum(["sale", "rent"]),
  price: optionalNumber,
  area_sqft: optionalNumber,
  city: z.string().min(2, "City is required"),
  status: z.enum(["draft", "active", "sold", "rented"]),
  price_on_request: z.boolean(),
  description: z.string().optional().nullable(),
  bhk: optionalNumber,
  bathrooms: optionalNumber,
  parking: optionalNumber,
  facing_direction: z.string().optional().nullable(),
  furnishing: z.string().optional(),
  property_age: z.string().optional(),
  dimensions: z.string().optional(),
  layout_name: z.string().optional(),
  na_status: z.string().optional(),
  rera_approved: z.boolean().optional(),
  premium: z.boolean().optional(),
  featured: z.boolean().optional(),
  amenities: z.string().optional(),
  electricity: z.boolean().optional(),
  drainage: z.boolean().optional(),
  water_connection: z.boolean().optional(),
  vastu_compliant: z.boolean().optional(),
  approvals: z.string().optional(),
  survey_number: z.string().optional(),
  nearby_landmarks: z.string().optional(),
  schools: z.string().optional(),
  hospitals: z.string().optional(),
  shopping: z.string().optional(),
  connectivity: z.string().optional(),
  road_width: optionalNumber,
  address_line: z.string().optional().nullable(),
  latitude: optionalNumber,
  longitude: optionalNumber,
  approved_banks: z.string().optional().nullable(),
}).superRefine((data, ctx) => {
  if (!data.price_on_request && (!data.price || data.price <= 0)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Price must be > 0 when not 'on request'", path: ["price"] });
  }
});

// Shared field/section components
const Label = ({ children }: { children: React.ReactNode }) => (
  <label className="block text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">{children}</label>
);
const inputCls = "w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-hive-ink transition";
const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-[24px] border border-neutral-200 shadow-sm overflow-hidden">
    <div className="px-8 py-5 border-b border-neutral-100 bg-neutral-50">
      <h2 className="font-bold text-hive-ink">{title}</h2>
    </div>
    <div className="p-8">{children}</div>
  </div>
);

export function AdminNewPropertyPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { data: nextListingNumber = "#0101" } = useQuery({
    queryKey: ["admin", "nextListingNumber"],
    queryFn: getNextListingNumber,
  });

  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      listing_number: nextListingNumber,
      listing_type: "sale",
      property_type: "plot",
      status: "draft",
      price_on_request: false,
      city: "Belagavi",
      rera_approved: false,
      premium: false,
      featured: false,
      electricity: false,
      drainage: false,
      water_connection: false,
      vastu_compliant: false,
    },
  });

  useEffect(() => {
    if (nextListingNumber) setValue("listing_number", nextListingNumber);
  }, [nextListingNumber, setValue]);

  const propertyType = watch("property_type");
  const title = watch("title");
  const priceOnRequest = watch("price_on_request");

  useEffect(() => {
    if (title) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      setValue("slug", slug, { shouldValidate: true });
    }
  }, [title, setValue]);

  const onSubmit = async (data: any) => {
    setSubmitError(null);
    setUploading(true);
    try {
      await createAdminProperty(data, images);
      queryClient.invalidateQueries({ queryKey: ["admin", "properties"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      navigate("/admin/properties");
    } catch (err: any) {
      setSubmitError(err.message || "An error occurred.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <button onClick={() => navigate("/admin/properties")} className="text-xs font-bold text-neutral-500 hover:text-hive-ink transition mb-4 inline-flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
          Back to Properties
        </button>
        <h1 className="text-2xl font-extrabold tracking-tight text-hive-ink">Add New Property</h1>
        <p className="text-sm text-neutral-500 mt-1">Fill out the complete details below to create a new listing.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Validation errors */}
        {Object.keys(errors).length > 0 && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm font-semibold">
            Please fix the errors below:
            <ul className="list-disc ml-5 mt-2 font-normal text-sm">
              {Object.entries(errors).map(([key, err]) => (
                <li key={key}>{err?.message as string || `${key} is invalid`}</li>
              ))}
            </ul>
          </div>
        )}
        {submitError && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm font-semibold">{submitError}</div>
        )}

        {/* Basic Details */}
        <SectionCard title="Basic Details">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Listing Number</Label>
              <input {...register("listing_number")} readOnly className={`${inputCls} bg-neutral-50 cursor-not-allowed font-mono font-bold`} />
            </div>
            <div className="md:col-span-2">
              <Label>Title *</Label>
              <input {...register("title")} className={inputCls} placeholder="e.g. 3 BHK Luxury Villa" />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
              <Label>Slug (URL)</Label>
              <input {...register("slug")} className={inputCls} placeholder="auto-generated" />
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
            </div>
            <div>
              <Label>Property Type *</Label>
              <select {...register("property_type")} className={inputCls}>
                <option value="apartment">Apartment</option>
                <option value="villa">Bungalow / Villa</option>
                <option value="plot">Plot</option>
                <option value="farmland">Farm Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <textarea {...register("description")} rows={4} className={inputCls} placeholder="Write a compelling description..." />
            </div>
            <div>
              <Label>City *</Label>
              <input {...register("city")} className={inputCls} />
            </div>
            <div>
              <Label>Address Line / Locality</Label>
              <input {...register("address_line")} className={inputCls} placeholder="e.g. Sambra Road or Pant Balekundri" />
            </div>
            <div>
              <Label>Approved Banks (comma-separated)</Label>
              <input {...register("approved_banks")} className={inputCls} placeholder="e.g. SBI, HDFC, LIC HFL, Kotak" />
            </div>
            <div>
              <Label>Price (INR)</Label>
              <input type="number" {...register("price", { valueAsNumber: true })} disabled={priceOnRequest}
                className={`${inputCls} ${priceOnRequest ? "opacity-50 cursor-not-allowed bg-neutral-50" : ""}`}
                placeholder={priceOnRequest ? "Price on Request" : "0"} />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <Label>Area (SqFt)</Label>
              <input type="number" {...register("area_sqft", { valueAsNumber: true })} className={inputCls} placeholder="1200" />
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="price_on_request" {...register("price_on_request")} className="w-4 h-4 accent-hive-ink rounded" />
              <label htmlFor="price_on_request" className="text-sm font-semibold text-hive-ink cursor-pointer">Price on Request</label>
            </div>
          </div>
        </SectionCard>

        {/* Specifications */}
        <SectionCard title="Property Specifications">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Plot-specific */}
            {(propertyType === "plot" || propertyType === "farmland") && (
              <>
                <div>
                  <Label>NA Status</Label>
                  <select {...register("na_status")} className={inputCls}>
                    <option value="">Select...</option>
                    <option value="NA Approved">NA Approved</option>
                    <option value="Non-NA">Non-NA</option>
                  </select>
                </div>
                <div>
                  <Label>Dimensions</Label>
                  <input {...register("dimensions")} className={inputCls} placeholder="e.g. 40x60" />
                </div>
                <div>
                  <Label>Layout Name</Label>
                  <input {...register("layout_name")} className={inputCls} placeholder="e.g. Green Valley" />
                </div>
                <div>
                  <Label>Survey Number</Label>
                  <input {...register("survey_number")} className={inputCls} placeholder="e.g. 142/A" />
                </div>
                <div>
                  <Label>Approvals</Label>
                  <input {...register("approvals")} className={inputCls} placeholder="e.g. BUDA, BDA" />
                </div>
                <div>
                  <Label>Road Width (ft)</Label>
                  <input type="number" {...register("road_width", { valueAsNumber: true })} className={inputCls} placeholder="e.g. 30" />
                </div>
                <div className="md:col-span-3 flex flex-wrap gap-6">
                  {[["electricity", "Electricity Available"], ["drainage", "Drainage / Gutters"], ["water_connection", "Water Connection"]].map(([name, label]) => (
                    <div key={name} className="flex items-center gap-2">
                      <input type="checkbox" id={name} {...register(name as any)} className="w-4 h-4 accent-hive-ink rounded" />
                      <label htmlFor={name} className="text-sm font-semibold text-hive-ink cursor-pointer">{label}</label>
                    </div>
                  ))}
                </div>
              </>
            )}
            {/* Home-specific */}
            {(propertyType === "apartment" || propertyType === "villa") && (
              <>
                <div><Label>BHK</Label><input type="number" {...register("bhk", { valueAsNumber: true })} className={inputCls} placeholder="3" /></div>
                <div><Label>Bathrooms</Label><input type="number" {...register("bathrooms", { valueAsNumber: true })} className={inputCls} placeholder="3" /></div>
                <div><Label>Parking</Label><input type="number" {...register("parking", { valueAsNumber: true })} className={inputCls} placeholder="1" /></div>
                <div>
                  <Label>Furnishing</Label>
                  <select {...register("furnishing")} className={inputCls}>
                    <option value="">Select...</option>
                    <option value="Fully Furnished">Fully Furnished</option>
                    <option value="Semi Furnished">Semi Furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
                <div>
                  <Label>Property Age</Label>
                  <select {...register("property_age")} className={inputCls}>
                    <option value="">Select...</option>
                    <option value="New">New / Under Construction</option>
                    <option value="0-5 Years">0-5 Years</option>
                    <option value="5-10 Years">5-10 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>
              </>
            )}
            {/* Shared */}
            <div>
              <Label>Facing Direction</Label>
              <select {...register("facing_direction")} className={inputCls}>
                <option value="">Select...</option>
                <option value="East">East (Vastu)</option>
                <option value="North">North (Vastu)</option>
                <option value="North-East">North-East</option>
                <option value="West">West</option>
                <option value="South">South</option>
              </select>
            </div>
            <div className="flex items-end pb-1">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="vastu_compliant" {...register("vastu_compliant")} className="w-4 h-4 accent-hive-ink rounded" />
                <label htmlFor="vastu_compliant" className="text-sm font-semibold text-hive-ink cursor-pointer">Vastu Compliant</label>
              </div>
            </div>
            <div className="md:col-span-3">
              <Label>Amenities (comma-separated)</Label>
              <input {...register("amenities")} className={inputCls} placeholder="e.g. Swimming Pool, Gym, 24x7 Security" />
            </div>
          </div>
        </SectionCard>

        {/* Nearby */}
        <SectionCard title="Nearby Hotspots & Connectivity">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              ["nearby_landmarks", "Nearby Landmarks", "e.g. Near Big Bazaar"],
              ["schools", "Schools", "e.g. KLE School (0.8 km)"],
              ["hospitals", "Hospitals", "e.g. KLES Hospital (2 km)"],
              ["shopping", "Shopping / Malls", "e.g. City Market (0.9 km)"],
            ].map(([name, label, placeholder]) => (
              <div key={name}>
                <Label>{label}</Label>
                <input {...register(name as any)} className={inputCls} placeholder={placeholder} />
              </div>
            ))}
            <div className="md:col-span-2">
              <Label>Connectivity / Transit</Label>
              <input {...register("connectivity")} className={inputCls} placeholder="e.g. Railway Station (3 km), Bus Stand (2 km)" />
            </div>
            <div>
              <Label>Approx Latitude</Label>
              <input type="number" step="any" {...register("latitude", { valueAsNumber: true })} className={inputCls} placeholder="e.g. 15.8612" />
            </div>
            <div>
              <Label>Approx Longitude</Label>
              <input type="number" step="any" {...register("longitude", { valueAsNumber: true })} className={inputCls} placeholder="e.g. 74.6085" />
            </div>
          </div>
        </SectionCard>

        {/* Publishing */}
        <SectionCard title="Publishing Options">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label>Listing Status</Label>
              <select {...register("status")} className={inputCls}>
                <option value="draft">Draft (Hidden)</option>
                <option value="active">Active (Public)</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>
            <div className="flex flex-col gap-3 pt-5">
              {[["rera_approved", "RERA Approved"], ["premium", "Premium Listing"], ["featured", "Featured on Home Page"]].map(([name, label]) => (
                <div key={name} className="flex items-center gap-2">
                  <input type="checkbox" id={name} {...register(name as any)} className="w-4 h-4 accent-hive-ink rounded" />
                  <label htmlFor={name} className="text-sm font-semibold text-hive-ink cursor-pointer">{label}</label>
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Media */}
        <SectionCard title="Media (Images)">
          <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-10 text-center hover:bg-neutral-50 transition cursor-pointer relative">
            <input type="file" multiple accept="image/*" onChange={(e) => e.target.files && setImages(Array.from(e.target.files))}
              className="absolute inset-0 opacity-0 cursor-pointer" />
            <div className="w-14 h-14 rounded-full bg-hive-ink/10 flex items-center justify-center mx-auto mb-4">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#171717" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <p className="font-bold text-hive-ink">Click or drag images here</p>
            <p className="text-sm text-neutral-500 mt-1">High-resolution JPEGs or PNGs</p>
          </div>
          {images.length > 0 && (
            <div className="mt-5 flex gap-3 overflow-x-auto py-2">
              {images.map((img, i) => (
                <div key={i} className="shrink-0 w-24 h-24 rounded-xl border border-neutral-200 overflow-hidden relative group">
                  <img src={URL.createObjectURL(img)} alt="preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="text-white">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Actions */}
        <div className="flex justify-end gap-4 pb-8">
          <button type="button" onClick={() => navigate("/admin/properties")}
            className="px-6 py-3 rounded-full border border-neutral-200 font-bold text-sm text-hive-ink hover:bg-neutral-50 transition">
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting || uploading}
            className="px-8 py-3 rounded-full bg-hive-ink text-white font-bold text-sm shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all disabled:opacity-50">
            {uploading || isSubmitting ? "Saving & Uploading..." : "Publish Property"}
          </button>
        </div>
      </form>
    </div>
  );
}
