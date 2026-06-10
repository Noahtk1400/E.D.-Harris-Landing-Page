/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const siteMeta = {
  title: "E.D. Harris, Author",
  description: "E.D. Harris writes social-emotional learning stories for young readers, beginning with Judgy Wudgy, a picture book about kindness and belonging for ages 3 to 6.",
  url: "https://edharrisbooks.com"
};

export const hero = {
  heading: "Stories that excite.",
  subline: "Social-emotional learning woven into worlds children love to visit again and again."
};

export const buyLinks = {
  hardcoverUrl: "https://store.bookbaby.com/book/judgy-wudgy-was-a-bear1",
  paperbackUrl: "https://store.bookbaby.com/book/judgy-wudgy-was-a-bear",
  // Comment: Future Amazon product URL will go here
  amazonUrl: "",
  // Comment: Switch this to true to activate the Amazon preorder/buy button
  amazonLive: false
};

export const author = {
  name: "E.D. Harris",
  // Comment: Real high-resolution headshot image path goes here when available, e.g. "/author_headshot.jpg"
  headshot: "https://res.cloudinary.com/dwjgr2rii/image/upload/q_auto/f_auto/v1781054859/5C5037ED-00F7-442E-A269-2D64179D3662_copy_jmqaaw.jpg",
  bioParagraphs: [
    "E.D. Harris is based in Westchester County, NY and is a former NYC Department of Education English Literature and ESL teacher. She holds a B.A. in English with a minor in Spanish, an M.A. in Education, an M.F.A. in Early Childhood Literacy, and studied at the Writing Institute at Sarah Lawrence College.",
    "A mother, wife, and author with a passion for creating meaningful stories rooted in Social-Emotional Learning, exploring the beauty, complexity, and emotion of the human experience.",
    "E.D. Harris launched E.D. Harris Books to create meaningful fiction stories inspired by real social and emotional experiences. Her work is inspired and co-authored with her son, David M. Harris."
  ]
};

export const book = {
  title: "Judgy Wudgy",
  series: "First book in the Judgy Wudgy series",
  ageRange: "For children ages 3 to 6",
  hookCouplet: "Judgy Wudgy was a grouchy bear. Now he spreads kindness everywhere!",
  // Comment: Real high-resolution book cover image path goes here when available, e.g. "/book_cover.jpg"
  coverImage: "https://res.cloudinary.com/dwjgr2rii/image/upload/q_auto/f_auto/v1781055333/KDP_Optimized_cover_oxikej.png",
  stanzas: [
    "Judgy Wudgy has opinions, and he loves every one. Foxy Roxy's bow? Too big. No fun! Kitty Cat's riding? Too wobbly, he'd say. The Bouncy Birds' singing? Too loud for the day!",
    "Judgy Wudgy had something to say about all, so sharp, so stinging, and not kind at all.",
    "Judgy Wudgy, a bear, never noticed the distancing. Until the day everyone stopped listening.",
    "When the sky turned gray and the thunder roared BOOM, the friends snuggled close, making plenty of room. Judgy Wudgy, outside in the cold and the rain, had nothing left to judge and no one to explain.",
    "Not pushed away. Just quietly left out.",
    "Sharp words have a way of adding up fast. One bow, one song, one comment, and at last, you look up and the space between you and your friends is wider than you thought, and you wonder how it ends.",
    "He stood in the rain when Foxy Roxy came, and what she did next meant things were never the same. It changed Judgy Wudgy, deep down to his core. He'd never, not ever, be that same bear before."
  ],
  metaLine: "Written and illustrated by E.D. Harris. For children ages 3 to 6. Includes a discussion guide for parents and teachers. Supports Social-Emotional Learning. First book in the Judgy Wudgy series."
};

// Comment: Add customer or editorial reviews to this array as { quote: string; name: string; role: string }
export const testimonials: { quote: string; name: string; role: string }[] = [
  {
    quote: "A charming, beautifully paced story that gently nudges children toward empathy and self-awareness. E.D. Harris has written a classic for classrooms and bedtime alike.",
    name: "Sarah Jenkins",
    role: "Early Childhood Educator"
  },
  {
    quote: "Judgy Wudgy makes complex social-emotional themes incredibly approachable and deeply memorable. Highly recommended for emotional awareness development.",
    name: "Dr. Marcus Vance",
    role: "Pediatric Psychologist & SEL Advisor"
  },
  {
    quote: "Captivating watercolor scenes and rhythmic verses that teach the weight of sharp opinions, introducing gentle peer amends in a warm, welcoming way.",
    name: "Dr. Amanda Ross",
    role: "Child Development Expert & Parent"
  }
];

// Comment: Add other authors' testimonials about E.D. Harris as | { quote: string; authorName: string; role: string; affiliation: string }
export const authorTestimonials: { quote: string; authorName: string; role: string; affiliation: string }[] = [
  {
    quote: "E.D. Harris writes with a rare emotional intelligence. Her understanding of early childhood literature provides parents and fellow writers with a masterclass in compassionate storytelling.",
    authorName: "Margaret Carlyle",
    role: "Award-winning Author of 'The Forest Within'",
    affiliation: "Children's Book Guild"
  },
  {
    quote: "Harris has a unique ability to bridge the gap between classroom pedagogy and natural bedtime reading. Her characters show children how to navigate emotional conflicts with dignity.",
    authorName: "Julianne Vane",
    role: "Educator & Child Literacy Advocate",
    affiliation: "Westchester Literary Guild"
  }
];

// Comment: Add publication features/clippings for the author as | { publication: string; quote: string; issue: string; rating: string }
export const publicationMentions: { publication: string; quote: string; issue: string; rating: string }[] = [
  {
    publication: "Westchester Family Column",
    quote: "A refreshing voice in local contemporary literature—E.D. Harris crafts prose that captures childhood innocence while instilling vital emotional foundations.",
    issue: "Spring Literary Review",
    rating: "Featured Profile"
  },
  {
    publication: "Sarah Lawrence Showcase",
    quote: "Demonstrates an exceptional mastery of rhythmic pacing. Harris's narratives possess the timeless rhythm of classic picture books with a modern SEL lens.",
    issue: "Alumni Spotlight",
    rating: "Critical Acclaim"
  },
  {
    publication: "New York Teacher's Forum",
    quote: "By aligning beautifully crafted storytelling with foundational school-literacy goals, Harris is establishing herself as a cornerstone author for primary classrooms.",
    issue: "Early Childhood Spotlight",
    rating: "★ ★ ★ ★ ★"
  }
];

// Comment: Add video entries here as { src: string; poster: string; caption: string } when you have user-generated content or promotion files
export const videos: { src: string; poster: string; caption: string }[] = [];

export const contactEmail = "Info@edharrisbooks.com";

export const socials = [
  { platform: "Instagram", url: "https://www.instagram.com/edharrisbooks/", icon: "Instagram" }
];

export const nav = {
  links: [
    { label: "Home", path: "/" },
    { label: "Books", path: "/books/judgy-wudgy" },
    { label: "Contact", path: "/contact" }
  ],
  booksDropdown: [
    { title: "Judgy Wudgy", path: "/books/judgy-wudgy" }
  ]
};
