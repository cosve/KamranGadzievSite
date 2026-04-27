import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Кямран Гаджиев",
    short_name: "Кямран Гаджиев",
    description: "Профессиональный ведущий мероприятий",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1521",
    theme_color: "#0D1D31",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
