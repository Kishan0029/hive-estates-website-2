CREATE OR REPLACE FUNCTION public.smart_property_search(search_term text)
RETURNS SETOF properties
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  RETURN QUERY
  SELECT *
  FROM properties
  WHERE 
    status = 'active' AND (
      search_term IS NULL
      OR search_term = ''
      OR title ILIKE '%' || search_term || '%'\n      OR city ILIKE '%' || search_term || '%'\n      OR address_line ILIKE '%' || search_term || '%'\n      OR (
        amenities IS NOT NULL 
        AND jsonb_typeof(amenities) = 'array' 
        AND EXISTS (
          SELECT 1 FROM jsonb_array_elements_text(amenities) AS amenity 
          WHERE amenity ILIKE '%' || search_term || '%'
        )
      )
      -- Fallback to fuzzy search if no exact substring match is found
      OR title % search_term
      OR city % search_term
      OR address_line % search_term
    )
  ORDER BY 
    CASE 
      WHEN search_term IS NOT NULL AND search_term != '' THEN
        greatest(
          similarity(title, search_term),
          similarity(city, search_term),
          similarity(address_line, search_term)
        )
      ELSE 0
    END DESC,
    created_at DESC;
END;
$function$;
