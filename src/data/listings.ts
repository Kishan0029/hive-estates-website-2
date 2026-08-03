export interface Listing {
  id: string;
  price: string;
  title: string;
  location: string;
  type: "Land" | "Apartment" | "Bungalow";
  verified: boolean;
  image: string;
  specs: string[];
}

export const landListings: Listing[] = [
  {
    id: "land-1",
    price: "₹42.5 L",
    title: "Corner Plot, Vadgaon Extension",
    location: "Vadgaon, Belagavi",
    type: "Land",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    specs: ["2400 sq.ft", "East Facing", "NA Plot"],
  },
  {
    id: "land-2",
    price: "₹68 L",
    title: "Residential Plot near Ring Road",
    location: "Hindwadi, Belagavi",
    type: "Land",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    specs: ["3600 sq.ft", "Gated", "Clear Title"],
  },
  {
    id: "land-3",
    price: "₹1.2 Cr",
    title: "Farm Land with Borewell",
    location: "Kanbargi, Belagavi",
    type: "Land",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1300&q=80",
    specs: ["1 Acre", "Road Touch", "Fenced"],
  },
  {
    id: "land-4",
    price: "₹35 L",
    title: "Approved Layout Plot",
    location: "Shahapur, Belagavi",
    type: "Land",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
    specs: ["1800 sq.ft", "BUDA Approved", "West"],
  },
];

export const homeListings: Listing[] = [
  {
    id: "home-1",
    price: "₹1.85 Cr",
    title: "4BHK Contemporary Bungalow",
    location: "Tilakwadi, Belagavi",
    type: "Bungalow",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    specs: ["4 Beds", "4 Baths", "3200 sq.ft"],
  },
  {
    id: "home-2",
    price: "₹78 L",
    title: "3BHK Premium Apartment",
    location: "Camp, Belagavi",
    type: "Apartment",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    specs: ["3 Beds", "2 Baths", "1650 sq.ft"],
  },
  {
    id: "home-3",
    price: "₹2.4 Cr",
    title: "Luxury Villa with Garden",
    location: "Nehru Nagar, Belagavi",
    type: "Bungalow",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    specs: ["5 Beds", "5 Baths", "4100 sq.ft"],
  },
  {
    id: "home-4",
    price: "₹62 L",
    title: "2BHK Garden-Facing Flat",
    location: "Shahapur, Belagavi",
    type: "Apartment",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    specs: ["2 Beds", "2 Baths", "1200 sq.ft"],
  },
];

export const justAddedListings: Listing[] = [
  {
    id: "new-1",
    price: "₹95 L",
    title: "3BHK Duplex with Terrace",
    location: "Vadgaon, Belagavi",
    type: "Bungalow",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
    specs: ["3 Beds", "3 Baths", "2100 sq.ft"],
  },
  {
    id: "new-2",
    price: "₹48 L",
    title: "2BHK Ready-to-Move Flat",
    location: "Hindwadi, Belagavi",
    type: "Apartment",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    specs: ["2 Beds", "2 Baths", "1050 sq.ft"],
  },
  {
    id: "new-3",
    price: "₹52 L",
    title: "Open Plot in Gated Layout",
    location: "Kanbargi, Belagavi",
    type: "Land",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1300&q=80",
    specs: ["2200 sq.ft", "Corner", "North"],
  },
  {
    id: "new-4",
    price: "₹1.35 Cr",
    title: "Independent House, Prime Locale",
    location: "Tilakwadi, Belagavi",
    type: "Bungalow",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    specs: ["4 Beds", "3 Baths", "2800 sq.ft"],
  },
  {
    id: "new-5",
    price: "₹71 L",
    title: "3BHK Semi-Furnished Flat",
    location: "Camp, Belagavi",
    type: "Apartment",
    verified: true,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    specs: ["3 Beds", "2 Baths", "1500 sq.ft"],
  },
  {
    id: "new-6",
    price: "₹88 L",
    title: "NA Plot with Compound Wall",
    location: "Nehru Nagar, Belagavi",
    type: "Land",
    verified: false,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1300&q=80",
    specs: ["3000 sq.ft", "Fenced", "East"],
  },
];
