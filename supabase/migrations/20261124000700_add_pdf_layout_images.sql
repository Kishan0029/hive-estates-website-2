-- Add PDF layout plans as gallery images for Seven Acres and Shivneri Enclave

-- 1. Reset images for Seven Acres and Shivneri Enclave
DELETE FROM public.property_images
WHERE property_id IN (
  '2bdc30db-ee60-44a5-b489-28df035e778a', -- Seven Acres
  'd463b81e-fe84-4b16-a821-2523055bec33'  -- Shivneri Enclave
);

-- 2. Seven Acres: Brochure + PDF Layout Plan
INSERT INTO public.property_images (property_id, r2_key, is_cover, sort_order, alt_text)
VALUES
  ('2bdc30db-ee60-44a5-b489-28df035e778a', '/properties/layouts/seven-acres-brochure.jpg', true, 0, 'Seven Acres Residential Plots Brochure & Master Plan'),
  ('2bdc30db-ee60-44a5-b489-28df035e778a', '/properties/layouts/seven-acres-layout-plan.jpg', false, 1, 'Seven Acres Residential Layout Plan (Sy No. 779 & 763 Sambra Road)');

-- 3. Shivneri Enclave: Brochure + PDF Layout Plan
INSERT INTO public.property_images (property_id, r2_key, is_cover, sort_order, alt_text)
VALUES
  ('d463b81e-fe84-4b16-a821-2523055bec33', '/properties/layouts/shivneri-enclave-brochure.jpg', true, 0, 'Shivneri Enclave NA Plots Brochure (Sulage, Rakaskop Road)'),
  ('d463b81e-fe84-4b16-a821-2523055bec33', '/properties/layouts/shivneri-layout-plan.jpg', false, 1, 'Shivneri Enclave Architectural Layout Plan (Sulage Sy No. 91A/4)');

-- 4. Verification query
SELECT pi.id, p.title, pi.r2_key, pi.is_cover, pi.sort_order, pi.alt_text
FROM public.property_images pi
JOIN public.properties p ON pi.property_id = p.id
WHERE p.slug IN (
  'seven-acres-premium-residential-na-plots',
  'yashwant-enclave-na-plots-near-belagavi-airport',
  'shivneri-enclave-na-plots-on-rakaskop-road'
)
ORDER BY p.title, pi.sort_order;
