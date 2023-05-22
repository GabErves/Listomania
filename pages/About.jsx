import Header from "@/components/Header";
import React from "react";
import '../app/globals.css';
import './pages.css';
import Image from "next/image";
import Monogram from '../images/GE.png'

const About = () => {
  return <div>
  <Header/>
  
<figure class="max-w-screen-md mx-auto text-center">
    <svg aria-hidden="true" class="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor"/></svg>
    <blockquote>
        <p class="text-2xl italic font-medium text-gray-900 dark:text-white">"Welcome to Listomania, your ultimate destination for creating and managing virtual lists! Whether you're organizing your favorite movies, planning your dream vacation itinerary, or compiling a list of must-read books, Listomania provides the perfect platform to bring your lists to life. With our user-friendly interface, you can easily create, edit, and share your lists with friends, family, or the entire online community. Unleash your creativity, stay organized, and discover new possibilities as you dive into the world of Listomania, where your lists are only limited by your imagination."</p>
    </blockquote>
    <figcaption class="flex items-center justify-center mt-6 space-x-3">
    <Image  class="w-14 h-14 rounded-full" src={Monogram} alt={'Monogram'} height="120" width="120" />
        <img class="w-14 h-14 rounded-full" src="https://cdn.shopify.com/s/files/1/0348/0017/3195/products/Monogram-Couture-G-S-2_7285d7fb-d41d-4341-8e9d-3a3118590811.png?v=1629922545" alt="profile picture"/>
        <div class="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
            <cite class="pr-3 font-medium text-gray-900 dark:text-white">Listomania Team</cite>
            <cite class="pl-3 text-sm text-gray-500 dark:text-gray-400">Future Web Devs</cite>
        </div>
    </figcaption>
</figure>

<div className='song' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <iframe style={{ borderRadius: '12px' }} src="https://open.spotify.com/embed/track/7fmJGzyvOcbh6UANsH8Cp6?utm_source=generator&theme=0" width="50%" height="352" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
</div>



  </div>;
};

export default About;
