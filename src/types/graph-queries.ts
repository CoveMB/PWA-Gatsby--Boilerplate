import { FluidObject } from 'gatsby-image';

export type ImageQuerySharp = {
  placeholderImage: {
    childImageSharp: {
      fluid: FluidObject | FluidObject[]
    }
  }
};

export type Meta = {
  title: string,
  description: string
};

export type SiteData<M = Meta> = {
  site: {
    siteMetadata: M
  }
};
