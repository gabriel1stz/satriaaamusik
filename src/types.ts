export interface GalleryItem {
  id: string;
  title: string;
  category: 'studio' | 'box_speaker';
  imageUrl: string;
  caption: string;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  roleOrBand?: string;
  category: 'studio' | 'box_speaker';
  rating: number; // 1 to 5
  date: string;
  comment: string;
  isVerified?: boolean;
}

export interface FacilityItem {
  id: string;
  title: string;
  desc: string;
}

export interface BoxTypeItem {
  id: string;
  name: string;
  desc: string;
}

export interface SiteContent {
  business: {
    brandName: string;
    tagline: string;
    ownerName: string;
    whatsappNumber: string;
    whatsappRaw: string;
    studioAddress: string;
    workshopAddress: string;
    studioMapsUrl: string;
    workshopMapsUrl: string;
    openHoursStudio: string;
    openHoursWorkshop: string;
  };
  hero: {
    title: string;
    description: string;
    badgeText: string;
  };
  studio: {
    title: string;
    description: string;
    facilities: FacilityItem[];
  };
  boxSpeaker: {
    title: string;
    description: string;
    features: {
      title: string;
      desc: string;
    }[];
    models: BoxTypeItem[];
  };
  about: {
    title: string;
    p1: string;
    p2: string;
    ownerImageUrl?: string;
  };
  gallery: GalleryItem[];
  reviews: ReviewItem[];
}

