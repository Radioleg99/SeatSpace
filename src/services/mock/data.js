const svgPlaceholder = (text, color = '#6B7A4F') => {
  const safeText = text.length > 18 ? `${text.slice(0, 15)}...` : text
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900">
    <rect width="100%" height="100%" fill="${color}" />
    <text x="50%" y="55%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="48" fill="#ffffff">${safeText}</text>
  </svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

// 👉 Update the theater cards here to change what the FrontPage and Search views render.
export const mockTheaters = [
  {
    id: 'theater-aurora',
    name: 'Aurora Playhouse',
    description: 'Immersive indie productions with dynamic lighting and surround audio.',
    address: '12 Harbor Street, Seatown',
    imgUrl:
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'theater-lumen',
    name: 'Lumen Arts Center',
    description: 'Versatile studio hosting chamber concerts and contemporary drama.',
    address: '88 Lantern Ave, Seatown',
    imgUrl:
      'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'theater-meridian',
    name: 'Meridian Grand Hall',
    description: 'Flagship venue with 1,200 seats and a rotating proscenium stage.',
    address: '301 Orion Blvd, Seatown',
    imgUrl:
      'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'theater-nova',
    name: 'Nova Stage Works',
    description: 'Experimental theatre with modular seating blocks and interactive sets.',
    address: '45 Crescent Loop, Seatown',
    imgUrl:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'theater-pavilion',
    name: 'Harbor Pavilion',
    description: 'Open-air pavilion overlooking the bay, ideal for dance and music.',
    address: '210 Seabreeze Promenade, Seatown',
    imgUrl:
      'https://images.unsplash.com/photo-1477847616630-cf9cf8815fda?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'theater-orbit',
    name: 'Orbit Amphitheatre',
    description: 'Circular amphitheatre with 360° projections and tiered seating.',
    address: '777 Zenith Parkway, Seatown',
    imgUrl:
      'https://images.unsplash.com/photo-1523816278493-7b56673dc5f4?auto=format&fit=crop&w=900&q=80',
  },
]

// 👉 Shows drive the show detail page, search results, and recent cards. Add more entries to extend coverage.
export const mockShows = [
  {
    id: 'show-celestial-echoes',
    showName: 'Celestial Echoes',
    theaterId: 'theater-aurora',
    theater: 'Aurora Playhouse',
    hall: 'Main Hall',
    startTime: '2024-07-20 19:30',
    rating: 4.7,
    imgUrl:
      'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?auto=format&fit=crop&w=900&q=80',
    tags: ['musical', 'immersive'],
  },
  {
    id: 'show-midnight-overture',
    showName: 'Midnight Overture',
    theaterId: 'theater-aurora',
    theater: 'Aurora Playhouse',
    hall: 'Studio B',
    startTime: '2024-07-22 21:00',
    rating: 4.3,
    imgUrl:
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d4?auto=format&fit=crop&w=900&q=80',
    tags: ['drama'],
  },
  {
    id: 'show-sunrise-sonata',
    showName: 'Sunrise Sonata',
    theaterId: 'theater-lumen',
    theater: 'Lumen Arts Center',
    hall: 'Sound Lab',
    startTime: '2024-07-18 18:30',
    rating: 4.9,
    imgUrl:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
    tags: ['concert'],
  },
  {
    id: 'show-harbor-lights',
    showName: 'Harbor Lights',
    theaterId: 'theater-lumen',
    theater: 'Lumen Arts Center',
    hall: 'Black Box',
    startTime: '2024-07-25 20:00',
    rating: 4.5,
    imgUrl:
      'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=900&q=80',
    tags: ['play'],
  },
  {
    id: 'show-veiled-chronicles',
    showName: 'Veiled Chronicles',
    theaterId: 'theater-meridian',
    theater: 'Meridian Grand Hall',
    hall: 'Orchestra Bowl',
    startTime: '2024-08-02 19:00',
    rating: 4.6,
    imgUrl:
      'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=900&q=80',
    tags: ['opera'],
  },
  {
    id: 'show-echoes-of-silk',
    showName: 'Echoes of Silk',
    theaterId: 'theater-meridian',
    theater: 'Meridian Grand Hall',
    hall: 'Gallery Wing',
    startTime: '2024-08-04 17:00',
    rating: 4.2,
    imgUrl:
      'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=900&q=80',
    tags: ['exhibition'],
  },
  {
    id: 'show-aurora-chronicles',
    showName: 'Aurora Chronicles',
    theaterId: 'theater-nova',
    theater: 'Nova Stage Works',
    hall: 'Hypercube',
    startTime: '2024-08-08 19:30',
    rating: 4.4,
    imgUrl:
      'https://images.unsplash.com/photo-1533237264985-ee87f973457c?auto=format&fit=crop&w=900&q=80',
    tags: ['immersive'],
  },
  {
    id: 'show-tidal-rhapsody',
    showName: 'Tidal Rhapsody',
    theaterId: 'theater-pavilion',
    theater: 'Harbor Pavilion',
    hall: 'Seabreeze Terrace',
    startTime: '2024-07-28 18:00',
    rating: 4.1,
    imgUrl:
      'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80',
    tags: ['concert'],
  },
  {
    id: 'show-orbiting-tales',
    showName: 'Orbiting Tales',
    theaterId: 'theater-orbit',
    theater: 'Orbit Amphitheatre',
    hall: 'Ring Gallery',
    startTime: '2024-08-12 20:30',
    rating: 4.0,
    imgUrl:
      'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=900&q=80',
    tags: ['storytelling'],
  },
]

const seatMetaMap = new Map()

const baseZoneTemplates = [
  {
    zoneId: 'orch-left',
    zoneOffsetX: -230,
    zoneOffsetY: 0,
    rotation: 60,
    seats: [
      { row: 1, col: 1, rating: 3.6 },
      { row: 1, col: 2, rating: 3.3 },
      { row: 1, col: 3, rating: 3.0 },
      { row: 1, col: 4, rating: 2.7 },
      { row: 1, col: 5, rating: 2.4 },
      { row: 2, col: 1, rating: 3.4 },
      { row: 2, col: 2, rating: 3.1 },
      { row: 2, col: 3, rating: 2.8 },
      { row: 2, col: 4, rating: 2.5 },
      { row: 2, col: 5, rating: 2.2 },
      { row: 3, col: 1, rating: 3.2 },
      { row: 3, col: 2, rating: 2.9 },
      { row: 3, col: 3, rating: 2.6 },
      { row: 3, col: 4, rating: 2.3 },
      { row: 3, col: 5, rating: 2.0 },
    ],
  },
  {
    zoneId: 'orch-center',
    zoneOffsetX: -170,
    zoneOffsetY: 240,
    rotation: 0,
    seats: [
      { row: 1, col: 1, rating: 4.9 },
      { row: 1, col: 2, rating: 4.7 },
      { row: 1, col: 3, rating: 4.5 },
      { row: 1, col: 4, rating: 4.3 },
      { row: 1, col: 5, rating: 4.1 },
      { row: 1, col: 6, rating: 3.9 },
      { row: 1, col: 7, rating: 3.7 },
      { row: 2, col: 1, rating: 4.6 },
      { row: 2, col: 2, rating: 4.4 },
      { row: 2, col: 3, rating: 4.2 },
      { row: 2, col: 4, rating: 4.0 },
      { row: 2, col: 5, rating: 3.8 },
      { row: 2, col: 6, rating: 3.6 },
      { row: 2, col: 7, rating: 3.4 },
      { row: 3, col: 1, rating: 4.3 },
      { row: 3, col: 2, rating: 4.1 },
      { row: 3, col: 3, rating: 3.9 },
      { row: 3, col: 4, rating: 3.7 },
      { row: 3, col: 5, rating: 3.5 },
      { row: 3, col: 6, rating: 3.3 },
      { row: 3, col: 7, rating: 3.1 },
    ],
  },
  {
    zoneId: 'orch-right',
    zoneOffsetX: 120,
    zoneOffsetY: 220,
    rotation: -60,
    seats: [
      { row: 1, col: 1, rating: 2.6 },
      { row: 1, col: 2, rating: 2.3 },
      { row: 1, col: 3, rating: 2.1 },
      { row: 1, col: 4, rating: 1.8 },
      { row: 1, col: 5, rating: 1.5 },
      { row: 2, col: 1, rating: 2.4 },
      { row: 2, col: 2, rating: 2.1 },
      { row: 2, col: 3, rating: 1.8 },
      { row: 2, col: 4, rating: 1.5 },
      { row: 2, col: 5, rating: 1.2 },
      { row: 3, col: 1, rating: 2.2 },
      { row: 3, col: 2, rating: 1.9 },
      { row: 3, col: 3, rating: 1.6 },
      { row: 3, col: 4, rating: 1.3 },
      { row: 3, col: 5, rating: 1.0 },
    ],
  },
  {
    zoneId: 'mezzanine',
    zoneOffsetX: -200,
    zoneOffsetY: 400,
    rotation: 0,
    seats: [
      { row: 1, col: 1, rating: 1.8 },
      { row: 1, col: 2, rating: 1.6 },
      { row: 1, col: 3, rating: 1.4 },
      { row: 1, col: 4, rating: 1.2 },
      { row: 1, col: 5, rating: 1.0 },
      { row: 1, col: 6, rating: 0.8 },
      { row: 1, col: 7, rating: 0.6 },
      { row: 1, col: 8, rating: 0.4 },
      { row: 2, col: 1, rating: 1.7 },
      { row: 2, col: 2, rating: 1.5 },
      { row: 2, col: 3, rating: 1.3 },
      { row: 2, col: 4, rating: 1.1 },
      { row: 2, col: 5, rating: 0.9 },
      { row: 2, col: 6, rating: 0.7 },
      { row: 2, col: 7, rating: 0.5 },
      { row: 2, col: 8, rating: 0.3 },
    ],
  },
]

const clampRating = (value) => Math.max(0, Math.min(5, Math.round(value * 10) / 10))

const zoneSwatches = {
  'orch-left': '#556B2F',
  'orch-center': '#274060',
  'orch-right': '#A05E3B',
  mezzanine: '#6E66DA',
}

const seatInteriorGallery = [
  'https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1549898999-51ebc2084fb0?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518895949257-7621c3c786d4?auto=format&fit=crop&w=900&q=80',
]

const generateLayout = (seatBase, options = {}, layoutKey = 'defaultLayout') => {
  const { ratingOffset = 0, zoneOverrides = {} } = options
  let seq = 1
  return baseZoneTemplates.map((template) => {
    const override = zoneOverrides[template.zoneId] || {}
    return {
      zoneId: template.zoneId,
      zoneOffsetX: override.zoneOffsetX ?? template.zoneOffsetX,
      zoneOffsetY: override.zoneOffsetY ?? template.zoneOffsetY,
      rotation: override.rotation ?? template.rotation,
      seats: template.seats.map((seat) => {
        const seatId = seatBase + seq
        const adjustedRating = clampRating(seat.rating + (override.ratingOffset ?? ratingOffset))
        seatMetaMap.set(seatId, {
          showId: layoutKey,
          zoneId: template.zoneId,
          row: seat.row,
          col: seat.col,
          rating: adjustedRating,
        })
        seq += 1
        return [seatId, adjustedRating, seat.row, seat.col]
      }),
    }
  })
}

const layoutByShow = {
  'show-celestial-echoes': generateLayout(1000, { ratingOffset: 0.3 }, 'show-celestial-echoes'),
  'show-midnight-overture': generateLayout(2000, { ratingOffset: -0.2 }, 'show-midnight-overture'),
  'show-sunrise-sonata': generateLayout(3000, { ratingOffset: 0.5 }, 'show-sunrise-sonata'),
  'show-harbor-lights': generateLayout(4000, { ratingOffset: 0.1 }, 'show-harbor-lights'),
  'show-veiled-chronicles': generateLayout(5000, { ratingOffset: 0.2 }, 'show-veiled-chronicles'),
  'show-echoes-of-silk': generateLayout(6000, { ratingOffset: 0.05 }, 'show-echoes-of-silk'),
  'show-aurora-chronicles': generateLayout(7000, { ratingOffset: 0.15 }, 'show-aurora-chronicles'),
  'show-tidal-rhapsody': generateLayout(8000, { ratingOffset: 0.1 }, 'show-tidal-rhapsody'),
  'show-orbiting-tales': generateLayout(8500, { ratingOffset: -0.1 }, 'show-orbiting-tales'),
}

layoutByShow.defaultLayout = generateLayout(9000, {}, 'defaultLayout')

// 👉 Seat layout: tweak offsets, rotations, or seat rating buckets to reshape the Konva canvas.
export const mockShowLayouts = layoutByShow

// 👉 Show detail comments: add or trim entries to control infinite scroll volume.
export const mockShowComments = {
  'show-celestial-echoes': [
    {
      commentId: 'sce-01',
      comment: 'Mesmerizing lighting cues that made every scene shimmer.',
      rating: 4.8,
      date: '2024-06-30',
      imgUrl: [
        'https://images.unsplash.com/photo-1515169067865-5387ec356754?auto=format&fit=crop&w=900&q=80',
        'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80',
      ],
    },
    {
      commentId: 'sce-02',
      comment: 'Live orchestra was perfectly balanced with the vocals.',
      rating: 4.6,
      date: '2024-06-28',
      imgUrl: ['https://images.unsplash.com/photo-1464375117522-1311d6a5b81b?auto=format&fit=crop&w=900&q=80'],
    },
    {
      commentId: 'sce-03',
      comment: 'Act II pacing drags slightly but the finale is worth it.',
      rating: 4.2,
      date: '2024-06-22',
      imgUrl: ['https://images.unsplash.com/photo-1445985543470-41fba5c3144a?auto=format&fit=crop&w=900&q=80'],
    },
    {
      commentId: 'sce-04',
      comment: 'Comfortable seating with generous leg room in row 2.',
      rating: 4.5,
      date: '2024-06-18',
      imgUrl: ['https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&w=900&q=80'],
    },
    {
      commentId: 'sce-05',
      comment: 'Projection mapping adds a dreamy layer to the storytelling.',
      rating: 4.9,
      date: '2024-06-15',
      imgUrl: ['https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80'],
    },
  ],
  'show-midnight-overture': [
    {
      commentId: 'smo-01',
      comment: 'Moody jazz band sets a perfect tone for the mystery arc.',
      rating: 4.4,
      date: '2024-06-27',
      imgUrl: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'],
    },
    {
      commentId: 'smo-02',
      comment: 'Tiered seating keeps sightlines clear even at the back.',
      rating: 4.1,
      date: '2024-06-20',
      imgUrl: ['https://images.unsplash.com/photo-1519764622345-23439dd774f3?auto=format&fit=crop&w=900&q=80'],
    },
  ],
  'show-sunrise-sonata': [
    {
      commentId: 'sss-01',
      comment: 'Acoustic treatment makes every piano whisper sparkle.',
      rating: 5.0,
      date: '2024-06-26',
      imgUrl: ['https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80'],
    },
  ],
  'show-harbor-lights': [
    {
      commentId: 'shl-01',
      comment: 'Immersive surround sound with gentle sea breeze effects.',
      rating: 4.7,
      date: '2024-06-29',
      imgUrl: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80'],
    },
  ],
  'show-veiled-chronicles': [
    {
      commentId: 'svc-01',
      comment: 'The rotating stage keeps every tableau engaging.',
      rating: 4.6,
      date: '2024-07-01',
      imgUrl: ['https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80'],
    },
    {
      commentId: 'svc-02',
      comment: 'Surtitles are easy to read from the mezzanine level.',
      rating: 4.3,
      date: '2024-06-24',
      imgUrl: ['https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80'],
    },
  ],
  'show-echoes-of-silk': [
    {
      commentId: 'ses-01',
      comment: 'Gallery layout lets you roam between miniature performance pods.',
      rating: 4.1,
      date: '2024-07-03',
      imgUrl: ['https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=900&q=80'],
    },
  ],
  'show-aurora-chronicles': [
    {
      commentId: 'sac-01',
      comment: 'Projection cube lets the performers sketch constellations in mid-air.',
      rating: 4.4,
      date: '2024-07-06',
      imgUrl: ['https://images.unsplash.com/photo-1533237264985-ee87f973457c?auto=format&fit=crop&w=900&q=80'],
    },
  ],
  'show-tidal-rhapsody': [
    {
      commentId: 'str-01',
      comment: 'Sea breeze pairs with live harps to create a floating soundscape.',
      rating: 4.1,
      date: '2024-07-05',
      imgUrl: ['https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80'],
    },
  ],
  'show-orbiting-tales': [
    {
      commentId: 'sot-01',
      comment: 'Narrators circle the audience so every section gets a spotlight moment.',
      rating: 4.0,
      date: '2024-07-04',
      imgUrl: ['https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80'],
    },
  ],
}

// 👉 Seat-level gallery: populate entries per seatId to illustrate the snapshot carousel.
const seatId = (base, sequence) => base + sequence

export const mockSeatComments = {
  [seatId(1000, 19)]: [
    {
      commentId: 'seat-1000-19-01',
      rating: 4.9,
      imgUrl: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81b?auto=format&fit=crop&w=900&q=80',
    },
    {
      commentId: 'seat-1000-19-02',
      rating: 4.7,
      imgUrl: 'https://images.unsplash.com/photo-1519764622345-23439dd774f3?auto=format&fit=crop&w=900&q=80',
    },
  ],
  [seatId(1000, 26)]: [
    {
      commentId: 'seat-1000-26-01',
      rating: 4.6,
      imgUrl: 'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?auto=format&fit=crop&w=900&q=80',
    },
  ],
  [seatId(2000, 18)]: [
    {
      commentId: 'seat-2000-18-01',
      rating: 4.2,
      imgUrl: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=900&q=80',
    },
  ],
  [seatId(3000, 33)]: [
    {
      commentId: 'seat-3000-33-01',
      rating: 4.8,
      imgUrl: 'https://images.unsplash.com/photo-1519762235429-5dc0d2294ef9?auto=format&fit=crop&w=900&q=80',
    },
  ],
  [seatId(4000, 12)]: [
    {
      commentId: 'seat-4000-12-01',
      rating: 4.5,
      imgUrl: 'https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=900&q=80',
    },
  ],
  [seatId(5000, 38)]: [
    {
      commentId: 'seat-5000-38-01',
      rating: 4.4,
      imgUrl: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=900&q=80',
    },
  ],
  [seatId(6000, 55)]: [
    {
      commentId: 'seat-6000-55-01',
      rating: 3.9,
      imgUrl: 'https://images.unsplash.com/photo-1549898999-51ebc2084fb0?auto=format&fit=crop&w=900&q=80',
    },
  ],
  [seatId(7000, 20)]: [
    {
      commentId: 'seat-7000-20-01',
      rating: 4.5,
      imgUrl: 'https://images.unsplash.com/photo-1533237264985-ee87f973457c?auto=format&fit=crop&w=900&q=80',
    },
  ],
  [seatId(8500, 60)]: [
    {
      commentId: 'seat-8500-60-01',
      rating: 3.7,
      imgUrl: 'https://images.unsplash.com/photo-1523816278493-7b56673dc5f4?auto=format&fit=crop&w=900&q=80',
    },
  ],
}

export const MOCK_PAGE_SIZES = {
  theaterShows: 3,
  showComments: 3,
  searchResults: 5,
}

export const MOCK_DELAY_MS = 260

export const DEFAULT_LAYOUT_KEY = 'defaultLayout'

export function listNearbyTheaters() {
  return mockTheaters
}

export function listRecentShows() {
  return mockShows
    .slice()
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
    .slice(0, 12)
    .map((show) => ({
      id: show.id,
      name: show.showName,
      theater: show.theater,
      hall: show.hall,
      imgUrl: show.imgUrl,
      startTime: show.startTime,
      rating: show.rating,
    }))
}

export function findTheater(theaterId) {
  return mockTheaters.find((theater) => theater.id === theaterId)
}

export function findShow(showId) {
  return mockShows.find((show) => show.id === showId)
}

export function listTheaterShows(theaterId, page = 1) {
  const pageSize = MOCK_PAGE_SIZES.theaterShows
  const shows = mockShows.filter((show) => show.theaterId === theaterId)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return shows.slice(start, end).map((show) => ({
    showId: show.id,
    showName: show.showName,
    hall: show.hall,
    startTime: show.startTime,
    rating: show.rating,
    imgUrl: show.imgUrl,
  }))
}

export function getShowBasic(showId) {
  const show = findShow(showId)
  if (!show) return null
  return {
    showName: show.showName,
    theater: show.theater,
    hall: show.hall,
    startTime: show.startTime,
    rating: show.rating,
    imgUrl: show.imgUrl,
  }
}

export function getShowLayout(showId) {
  const showSpecific = mockShowLayouts[showId]
  return showSpecific || mockShowLayouts[DEFAULT_LAYOUT_KEY]
}

export function listShowComments(showId, page = 1) {
  const comments = mockShowComments[showId] || []
  const pageSize = MOCK_PAGE_SIZES.showComments
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return comments.slice(start, end)
}

export function listSeatComments(seatId) {
  const preBaked = mockSeatComments[seatId]
  if (preBaked) return preBaked

  const meta = seatMetaMap.get(seatId)
  if (!meta) return []

  const seatLabel = `${meta.zoneId.replace(/^[a-z]/, (c) => c.toUpperCase())} R${meta.row}C${meta.col}`
  const photoIndex = Math.abs(seatId) % seatInteriorGallery.length
  const fallbackImage = seatInteriorGallery[photoIndex]
  return [
    {
      commentId: `auto-${seatId}`,
      rating: meta.rating,
      imgUrl: fallbackImage,
      note: seatLabel,
    },
  ]
}

export function searchCatalog(keyword, page = 1) {
  if (!keyword) return []
  const lower = keyword.toLowerCase()

  const theaterMatches = mockTheaters
    .filter((theater) => [theater.name, theater.description, theater.address].some((field) => field.toLowerCase().includes(lower)))
    .map((theater) => ({
      itemType: 'theater',
      data: {
        theaterId: theater.id,
        name: theater.name,
        description: theater.description,
        imgUrl: theater.imgUrl,
      },
    }))

  const showMatches = mockShows
    .filter((show) => [show.showName, show.theater, show.hall, ...(show.tags || [])].some((field) => field.toLowerCase().includes(lower)))
    .map((show) => ({
      itemType: 'show',
      data: {
        showId: show.id,
        showName: show.showName,
        hall: show.hall,
        startTime: show.startTime,
        rating: show.rating,
        imgUrl: show.imgUrl,
      },
    }))

  const combined = [...theaterMatches, ...showMatches]
  const pageSize = MOCK_PAGE_SIZES.searchResults
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return combined.slice(start, end)
}
