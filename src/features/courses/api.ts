import type { Course } from "./types";

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Master React",
    description: "A practice-heavy approach to master React by building polished apps, backed up by diagrams, theory, and looks under the hood of React.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg",
    price: 59,
  },
  {
    id: "2",
    title: "Learn TypeScript skills & concepts",
    description: "This course is great preparation for any TypeScript programming interviews that you may have coming up.",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    price: 39,
  },
  {
    id: "3",
    title: "The Ultimate Redux Course 2025",
    description: "Modern way to write Redux code using Redux-toolkit",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    price: 119,
  },
    {
    id: "4",
    title: "React Query / TanStack Query: React Server State Management",
    description: "Mastering queries, mutations, integration with auth, testing and more!",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    price: 49,
  },
    {
    id: "5",
    title: "Atomic CSS: Tailwind Course",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg",
    price: 29,
  },
    {
    id: "6",
    title: "The modern JavaScript course for everyone!",
    description: "JavaScript is the most popular programming language in the world. It powers the entire modern web. It provides millions of high-paying jobs all over the world.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    price: 69,
  },
    {
    id: "7",
    title: "Node.js, Express, MongoDB & More: The Complete Bootcamp",
    description: "Do you want to build fast and powerful back-end applications with JavaScript? Would you like to become a more complete and in-demand developer? Then Node.js is the hot technology for you to learn right now, and you came to the right place to do it!",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    price: 69,
  },
    {
    id: "8",
    title: "Master Typescript by learning popular design patterns and building complex projects. Includes React and Express!",
    description: "Composition vs Inheritance? You'll understand it.  Build your own web framework? You'll do it.  Typescript with React/Redux?  It's here!",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/WhatCarCanYouGetForAGrand.jpg",
    price: 59,
  },
    {
    id: "9",
    title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
    description: "Tons of modern CSS techniques to create stunning designs and effects",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg",
    price: 29,
  },
    {
    id: "10",
    title: "100 Hours Web Development Bootcamp - Build 23 React Projects",
    description: "The only project based course you will ever need. Get access to all kinds React.js projects that you can think of.",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg",
    price: 89,
  },
];

export function fetchCourses(): Promise<Course[]> {
  return new Promise((resolve) => setTimeout(() => resolve(mockCourses), 600));
}