import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

// 🖼️ صور من فولدر assets
import shop from "../assets/shop.jpg";
import clothes from "../assets/clothes.jpg";
import elec from "../assets/elec.jpg";

function Hero() {
  return (
    // 🔥 marginTop عشان الـ navbar fixed وميلزقش فيه
    <div style={{ marginTop: "70px" }}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 2500, // ⏱️ كل 2.5 ثانية
          disableOnInteraction: false,
        }}
        loop={true} // 🔁 يلف باستمرار
      >
        {/* 🖼️ Slide 1 */}
        <SwiperSlide>
          <div
            style={{
              height: "40vh", // 🔥 ارتفاع مناسب
              backgroundImage: `url(${shop})`,
              backgroundSize: "contain", // يغطي المساحة
              backgroundPosition: "center", // تمركز الصورة
              position: "relative", // مهم للـ overlay
            }}
          >
            {/* 🌑 overlay عشان النص يبقى واضح */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
             
            </div>
          </div>
        </SwiperSlide>

        {/* 🖼️ Slide 2 */}
        <SwiperSlide>
          <div
            style={{
              height: "40vh",
              backgroundImage: `url(${clothes})`,
              backgroundSize: "contain",
              backgroundPosition: "center", // 🔥 بدل top عشان تبان أحسن
              position: "relative",
            }}
          >
            {/* 🌑 overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              Fashion Collection 👕
            </div>
          </div>
        </SwiperSlide>

        {/* 🖼️ Slide 3 */}
        <SwiperSlide>
          <div
            style={{
              height: "40vh",
              backgroundImage: `url(${elec})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            {/* 🌑 overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              Electronics Deals 🔥
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Hero;