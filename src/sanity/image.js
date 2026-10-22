import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from './client';

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function urlForImage(source, { width, height, quality = 85 } = {}) {
  if (!builder || !source) return '';

  let image = builder.image(source).auto('format').quality(quality);
  if (width) image = image.width(width);
  if (height) image = image.height(height);
  return image.url();
}
