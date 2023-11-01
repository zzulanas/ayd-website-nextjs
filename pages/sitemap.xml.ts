import { NextApiRequest, NextApiResponse } from "next";
import { getAllProjectsByTag } from "../lib/api";

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, function (c) {
    switch (c) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
    }
  });
}

async function fetchDynamicPaths() {
  // Fetch projects by tags
  const commercialProjects = await getAllProjectsByTag("categoryCommercial");
  const residentialProjects = await getAllProjectsByTag("categoryResidential");
  const culturalProjects = await getAllProjectsByTag("categoryCultural");
  const previousWorkProjects = await getAllProjectsByTag(
    "categoryPreviousWork"
  );

  // Extract the paths from the projects
  const commercialPaths = commercialProjects.map(
    (project) => `/projects/${escapeXml(project.slug)}`
  );
  const residentialPaths = residentialProjects.map(
    (project) => `/projects/${escapeXml(project.slug)}`
  );
  const culturalPaths = culturalProjects.map(
    (project) => `/projects/${escapeXml(project.slug)}`
  );
  const previousWorkPaths = previousWorkProjects.map(
    (project) => `/projects/${escapeXml(project.slug)}`
  );

  // Combine all the paths
  return [
    ...commercialPaths,
    ...residentialPaths,
    ...culturalPaths,
    ...previousWorkPaths,
  ];
}

async function generateSitemap() {
  // Fetch dynamic routes
  const dynamicPaths = await fetchDynamicPaths();

  // Define static routes with their priorities
  const staticRoutesWithPriorities = [
    { path: "/", priority: 1.0 },
    { path: "/about", priority: 0.8 },
    { path: "/commercial", priority: 0.8 },
    { path: "/cultural", priority: 0.8 },
    { path: "/previous-work", priority: 0.8 },
    { path: "/residential", priority: 0.8 },
  ];

  // Generate XML for static routes
  const staticPathsXml = staticRoutesWithPriorities
    .map(
      (route) => `
      <url>
        <loc>https://arq-y-di.com${route.path}</loc>
        <changefreq>daily</changefreq>
        <priority>${route.priority}</priority>
      </url>`
    )
    .join("");

  // Generate XML for dynamic routes
  const dynamicPathsXml = dynamicPaths
    .map(
      (path) => `
      <url>
        <loc>https://arq-y-di.com${path}</loc>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>`
    )
    .join("");

  // Combine both XMLs
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPathsXml}
      ${dynamicPathsXml}
    </urlset>
  `;
  return xml;
}

export async function getServerSideProps({ res }) {
  // Generate the XML sitemap with the blog data
  const sitemap = await generateSitemap();

  // Send the XML to the browser
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
