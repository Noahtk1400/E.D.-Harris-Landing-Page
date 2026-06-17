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
  heading: "Stories that inspire.",
  subline: "Social-Emotional Learning (SEL) woven into worlds children love to visit again and again."
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
    "E.D. Harris is based in Westchester County, NY and is a former NYC Department of Education English Literature and ESL teacher. She holds a B.A. in English with a minor in Spanish, M.A. in Teaching ESL (English as a Second Language), an M.A. in Teaching Early Childhood Literacy, and studied at The Writing Institute at Sarah Lawrence College.",
    "A mother, wife, and author with a passion for creating memorable stories rooted in Social-Emotional Learning, exploring the beauty, complexity, and emotion of the human experience.",
    "E.D. Harris launched E.D. Harris Books to create meaningful fiction stories inspired by real social and emotional experiences. The story-concept and thematic development co-authored by her son David M. Harris."
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

// Comment: Add customer or editorial reviews to this array as { quote: string | string[]; name: string; role: string }
export const testimonials: { quote: string | string[]; name: string; role: string }[] = [
  {
    quote: [
      "I enjoyed our circle reading time with Judgy Wudgy was a Bear with my class, and I would recommend it for all preschool and kindergarten students. The children agreed that kindness feels good.",
      "The discussion guide sparked great conversation, with students eager to share their thoughts and experiences.",
      "The children in my kindergarten class felt for Judgy Wudgy as he learned to be kinder. They were happy to see the other characters give him a second chance."
    ],
    name: "Ms Seton",
    role: "Kindergarten Teacher, Lower Westchester, NY"
  },
  {
    quote: "A big-hearted story, wonderful for opening up little minds to the possibility of behavior change. With a grumpy bear who needs an attitude adjustment and a cast of adorable forest animals who show him the way, Judgy Wudgy is an engaging story that should be a part of every parent and educator’s toolkit.",
    name: "Jacqueline Friedland",
    role: "USA Today bestselling author of Breathing Under Water"
  },
  {
    quote: "As a parent, I really appreciated how Judgy Wudgy Was a Bear tackles an important topic in a way young children can understand. It's warm, thoughtful, and opens the door to meaningful conversations about empathy, friendship, and accepting others.",
    name: "Faith Dallal",
    role: "Freelance writer, Substack publisher, mother"
  }
];

// Comment: Add other authors' testimonials about E.D. Harris as | { quote: string; authorName: string; role: string; affiliation: string }
export const authorTestimonials: { quote: string; authorName: string; role: string; affiliation: string }[] = [
  {
    quote: "A big-hearted story, wonderful for opening up little minds to the possibility of behavior change. With a grumpy bear who needs an attitude adjustment and a cast of adorable forest animals who show him the way, Judgy Wudgy is an engaging story that should be a part of every parent and educator’s toolkit.",
    authorName: "Jacqueline Friedland",
    role: "USA Today bestselling author of Breathing Under Water",
    affiliation: "Bestselling Novelist"
  }
];

// Comment: Add publication features/clippings for the author as | { publication: string; quote: string; issue: string; rating: string }
export const publicationMentions: { publication: string; quote: string; issue: string; rating: string }[] = [
  {
    publication: "Faith Dallal",
    quote: "As a parent, I really appreciated how Judgy Wudgy Was a Bear tackles an important topic in a way young children can understand. It's warm, thoughtful, and opens the door to meaningful conversations about empathy, friendship, and accepting others.",
    issue: "Parent Feature",
    rating: "Substack Publisher & Freelance Writer"
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
  booksDropdown: {
    available: [
      { title: "Judgy Wudgy was a Bear", subtitle: "Book 1 (Available Now)", path: "/books/judgy-wudgy" }
    ],
    comingSoon: [
      { title: "Judgy Wudgy was a Bear is Compassionate", release: "Coming Fall '2026" },
      { title: "Judgy Wudgy was a Bear has Empathy", release: "Coming Winter '2027" },
      { title: "Home is Perfect", release: "Release TBA" }
    ]
  }
};
