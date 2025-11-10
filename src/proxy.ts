import { proxy } from "next/server";

export default proxy(async (request) => {
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE === "true";
  const maintenancePaths = ["/maintenance"];

  // Redirect everything to /maintenance if flag is true
  if (isMaintenance && !maintenancePaths.includes(new URL(request.url).pathname)) {
    return Response.redirect(new URL("/maintenance", request.url));
  }

  // Continue as normal
  return Response.next();
});
