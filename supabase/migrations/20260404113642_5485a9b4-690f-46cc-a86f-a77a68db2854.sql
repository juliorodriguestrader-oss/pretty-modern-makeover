CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  curso TEXT NOT NULL,
  assunto TEXT NOT NULL,
  mensagem TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert enrollments" ON public.course_enrollments FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admins can view enrollments" ON public.course_enrollments FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete enrollments" ON public.course_enrollments FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));