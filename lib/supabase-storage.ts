import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error("Missing Supabase env vars for storage");
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function uploadImage(file: File, folder: string = "profiles"): Promise<{ url: string; path: string }> {
  const ext = file.name.split(".").pop();
  const filename = `${crypto.randomUUID()}.${ext}`;
  const path = `${folder}/${filename}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabase.storage
    .from("uploads")
    .upload(path, buffer, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data } = supabase.storage.from("uploads").getPublicUrl(path);
  return { url: data.publicUrl, path };
}

export async function deleteImage(path: string): Promise<void> {
  await supabase.storage.from("uploads").remove([path]);
}