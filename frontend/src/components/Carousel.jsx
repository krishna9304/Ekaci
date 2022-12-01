// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import { Autoplay } from "swiper";

// const Carousel = () => {
//   const [active, setActive] = useState(null);
//   const text = [
//     { name: "Kisan Rath App", color: "hue-rotate-[240deg]" },
//     { name: "Awareness Guidelines", color: "hue-rotate-[20deg]" },
//     { name: "State Report", color: "hue-rotate-[340deg]" },
//     { name: "Farmer App", color: "hue-rotate-[58deg]" },
//     { name: "New Policies", color: "hue-rotate-[224deg]" },
//     { name: "Insurance Reports", color: "hue-rotate-[120deg]" },
//   ];
//   return (
//     <div className="h-scren flex  items-center justify-center">
//       <div className="max-w-5xl">
//         <Swiper
//           spacebetween={50}
//           slidesPerView={3}
//           onSlideChange={(cur) => setActive(cur.realIndex)}
//           loop={true}
//           centeredSlides={true}
//           speed={800}
//           autoplay={{ delay: 3000 }}
//           modules={[Autoplay]}
//         >
//           {text.map((text, i) => (
//             <SwiperSlide key={i}>
//               <div className="h-80 flex">
//                 <div
//                   className={`card ${
//                     active === i && "card-active"
//                   } to-green-900/40 ${text.color} border-green-600`}
//                 >
//                   <h2 className="text-3xl mt-2 font-semibold ">{text.name}</h2>
//                   <p className="para text-sm">
//                     Lorem Ipsum is simply dummy text of the printing and
//                     typesetting industry.
//                   </p>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default Carousel;
