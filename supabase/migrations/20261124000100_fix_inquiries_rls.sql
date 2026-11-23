GRANT ALL ON TABLE public.inquiries TO postgres, service_role, authenticated;
GRANT INSERT ON TABLE public.inquiries TO anon;

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "staff_full_access_inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow public inquiry submission" ON public.inquiries;
DROP POLICY IF EXISTS "Allow admin full access to inquiries" ON public.inquiries;

CREATE POLICY "public_insert_inquiries" 
ON public.inquiries FOR INSERT 
TO public
WITH CHECK (true);

CREATE POLICY "staff_full_access_inquiries" 
ON public.inquiries FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);
