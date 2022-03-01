import React from "react";
import SitemapData from "../../sitemap.xml";

const Sitemap = () => {
  return (
    <div className="terms">
      <h1>
        <strong>Sitemap</strong>
      </h1>
      {SitemapData}
    </div>
  );
};

export default Sitemap;
