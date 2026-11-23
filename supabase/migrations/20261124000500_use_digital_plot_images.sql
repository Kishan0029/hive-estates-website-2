-- Replace paper photos with pure digital plot images, CAD layouts, and digital brochures

-- 1. Remove old paper images for the 3 properties
DELETE FROM public.property_images
WHERE property_id IN (
  '2bdc30db-ee60-44a5-b489-28df035e778a',
  'fc9416c9-1883-4dd1-90b1-30bf78bdbde8',
  'd463b81e-fe84-4b16-a821-2523055bec33'
);

-- 2. Insert pure digital plot images for Seven Acres
INSERT INTO public.property_images (property_id, r2_key, is_cover, sort_order, alt_text)
VALUES
  ('2bdc30db-ee60-44a5-b489-28df035e778a', '/properties/layouts/7acres-digital-brochure.jpg', true, 0, 'Seven Acres Digital Master Plan Brochure'),
  ('2bdc30db-ee60-44a5-b489-28df035e778a', '/properties/layouts/7acres-digital-layout-52.jpg', false, 1, 'Seven Acres 52 Plot CAD Layout Plan'),
  ('2bdc30db-ee60-44a5-b489-28df035e778a', '/properties/layouts/7acres-kjp-sheet.jpg', false, 2, 'Seven Acres KJP Sheet with Plot Dimensions');

-- 3. Insert pure digital plot layout for Yashwant Enclave
INSERT INTO public.property_images (property_id, r2_key, is_cover, sort_order, alt_text)
VALUES
  ('fc9416c9-1883-4dd1-90b1-30bf78bdbde8', '/properties/layouts/yashwant-enclave-digital-layout.jpg', true, 0, 'Yashwant Enclave Digital Plot Layout Plan');

-- 4. Insert pure digital architectural CAD layout for Shivneri Enclave
INSERT INTO public.property_images (property_id, r2_key, is_cover, sort_order, alt_text)
VALUES
  ('d463b81e-fe84-4b16-a821-2523055bec33', '/properties/layouts/shivneri-digital-layout.jpg', true, 0, 'Shivneri Enclave Sulage Sy No 91 Architectural CAD Layout Plan');
