export default async (request) => {
  try {
    const url = new URL(request.url);
    const domain = url.searchParams.get("domain");

    if (!domain) {
      return Response.json(
        { error: "Domain is required" },
        { status: 400 }
      );
    }

    const cleanDomain = domain.trim().toLowerCase();

    const pat = process.env.GODADDY_PAT;

    if (!pat) {
      return Response.json(
        { error: "GoDaddy PAT is not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.godaddy.com/v3/domains/check-availability?domain=${encodeURIComponent(
        cleanDomain
      )}&optimizeFor=ACCURACY`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${pat}`,
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    return Response.json(data, {
      status: response.status,
    });
  } catch (error) {
    console.error("Domain check error:", error);

    return Response.json(
      {
        error: "Unable to check domain availability",
      },
      { status: 500 }
    );
  }
};