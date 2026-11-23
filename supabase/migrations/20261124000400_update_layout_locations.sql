-- Update approximate locations and address lines for the new properties
UPDATE public.properties
SET 
  address_line = 'Sambra Road',
  nearby_landmarks = 'Belagavi Airport (IXG), Sambra, Belagavi Ring Road',
  latitude = 15.8675,
  longitude = 74.5580
WHERE slug = 'seven-acres-premium-residential-na-plots';

UPDATE public.properties
SET 
  address_line = 'Pant Balekundri B.K.',
  nearby_landmarks = 'Belagavi Airport (5 Mins), Sambra Main Road, Airport Approach Road',
  latitude = 15.8612,
  longitude = 74.6085
WHERE slug = 'yashwant-enclave-na-plots-near-belagavi-airport';

UPDATE public.properties
SET 
  address_line = 'Sulaga Village, Rakaskop Road',
  nearby_landmarks = 'Rakaskop Reservoir Road, Sulaga Gram Panchayat, Belagavi West Scenic Corridor',
  latitude = 15.8785,
  longitude = 74.4520
WHERE slug = 'shivneri-enclave-na-plots-on-rakaskop-road';
