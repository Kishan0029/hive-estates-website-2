-- Remove confidential CAD/KJP sheets and configure proper marketing brochures and approved layout

-- 1. Clear old property images for these 3 properties
DELETE FROM public.property_images
WHERE property_id IN (
  '2bdc30db-ee60-44a5-b489-28df035e778a', -- Seven Acres
  'fc9416c9-1883-4dd1-90b1-30bf78bdbde8', -- Yashwant Enclave
  'd463b81e-fe84-4b16-a821-2523055bec33'  -- Shivneri Enclave
);

-- 2. Seven Acres: Customer Marketing Brochure
INSERT INTO public.property_images (property_id, r2_key, is_cover, sort_order, alt_text)
VALUES
  ('2bdc30db-ee60-44a5-b489-28df035e778a', '/properties/layouts/seven-acres-brochure.jpg', true, 0, 'Seven Acres Residential Plots Brochure & Master Plan');

-- 3. Yashwant Enclave: Marketing Brochure + Approved Layout Plan
INSERT INTO public.property_images (property_id, r2_key, is_cover, sort_order, alt_text)
VALUES
  ('fc9416c9-1883-4dd1-90b1-30bf78bdbde8', '/properties/layouts/yashwant-enclave-brochure.jpg', true, 0, 'Yashwant Enclave NA Plots Brochure (Pant Balekundri B.K.)'),
  ('fc9416c9-1883-4dd1-90b1-30bf78bdbde8', '/properties/layouts/yashwant-enclave-layout.jpg', false, 1, 'Yashwant Enclave Approved Plot Layout Plan');

-- 4. Shivneri Enclave: Customer Marketing Brochure
INSERT INTO public.property_images (property_id, r2_key, is_cover, sort_order, alt_text)
VALUES
  ('d463b81e-fe84-4b16-a821-2523055bec33', '/properties/layouts/shivneri-enclave-brochure.jpg', true, 0, 'Shivneri Enclave NA Plots Brochure (Sulage, Rakaskop Road)');

-- 5. Verification query
SELECT pi.id, p.title, pi.r2_key, pi.is_cover, pi.sort_order, pi.alt_text
FROM public.property_images pi
JOIN public.properties p ON pi.property_id = p.id
WHERE p.slug IN (
  'seven-acres-premium-residential-na-plots',
  'yashwant-enclave-na-plots-near-belagavi-airport',
  'shivneri-enclave-na-plots-on-rakaskop-road'
)
ORDER BY p.title, pi.sort_order;
