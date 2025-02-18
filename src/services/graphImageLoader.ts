import { ImageLoaderProps } from 'next/image';

export const graphCMSImageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    const params = [`w=${width}`];
    if (quality) {
        params.push(`q=${quality}`);
    }
    return `${src}?${params.join('&')}`;
};
