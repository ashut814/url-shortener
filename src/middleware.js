import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);


export default async function middleware(req) {


  if (req.method == "GET") {

    let pathname = req.nextUrl.pathname;
    let parts = pathname.split("/");
    let id = parts[parts.length - 1];

    try {
      const { data, error } = await supabase
        .from("urls")
        .select("original_url")
        .eq("id", id)
        .single();


      if (!error) {
        const shortUrl = data.original_url;
        console.log("SHORT URL", shortUrl);
        return NextResponse.redirect((shortUrl));
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}
