"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "../../../public/styles/page.module.scss";
import GalleryImg from "../../../public/images/Bag-Loader-1.jpg";
import Link from "next/link";

const galleryImages = [
  { src: "/images/APRON-CONVEYOR.jpg", alt: "Apron Conveyors", title: "Apron Conveyors" },
  { src: "/images/Belt-Conveyor-Manufacturers-in-India-1.jpg", alt: "Belt conveyors", title: "Belt conveyors" },
  { src: "/images/Horizontal-Belt-Conveyor.jpg", alt: "Horizontal belt conveyor", title: "Horizontal belt conveyor" },
  { src: "/images/img10.jpg", alt: "Incline belt conveyor", title: "Incline belt conveyor" },
  { src: "/images/Inspection-Conveyor.png", alt: "Inspection Conveyor", title: "Inspection Conveyor" },
  { src: "/images/Assembly-Line-Belt-Conveyors.jpg", alt: "Assembly line conveyor", title: "Assembly line conveyor" },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {/* Banner Section */}
      <div className="banner w-100">
        <Image src={GalleryImg} alt="Banner" className="w-100" />
        <div className="banner-content">
          <h1>Gallery Neo Conveyors</h1>
        </div>
      </div>

      {/* Page Content */}
      <div className="page-content py-3 mb-lg-3 py-lg-4">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">Gallery</li>
                </ol>
              </nav>
            </div>

            {/* Gallery Images */}
            <div className="col-lg-12">
              {/* <div className="row">
                {galleryImages.map((item, index) => (
                  <div key={index} className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
                    <div className={styles.homegalleryCard} onClick={() => setSelectedImage(item.src)}>
                      <img src={item.src} className="img-fluid" alt={item.alt} />
                      <div className={styles.homegalleryTitle}>
                        <h4 aria-hidden="true">{item.title}</h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className="ratio ratio-16x9">
                <iframe width="1408" height="663" src="https://www.youtube.com/embed/qG5WSeL2_tg" 
                  title="50kg Bag Stacker for Warehouse &amp; Truck Loading - The Ultimate Labor-Saving Solution | Neo Conveyors" 
                  frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>     
                </iframe>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className="ratio ratio-16x9">
                <iframe width="1408" height="663" src="https://www.youtube.com/embed/YVo-KMrGlho" title="Telescopic Belt Conveyor: Boost Efficiency &amp; Save Space | Ultimate Loading/Unloading Solution" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className="ratio ratio-16x9">
                <iframe width="1408" height="663" src="https://www.youtube.com/embed/eJ79nHwvSug" title="Inclined Belt conveyor | Inclined belt conveyor systems | Inclined cleated belt conveyor | Conveyors" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className="ratio ratio-16x9">
                <iframe width="1408" height="663" src="https://www.youtube.com/embed/J-i49fQK2Qc" title="Trough Belt conveyors for Cattle Feed Handling Delhi NCR India | Trough Belt conveyor manufacturer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className="ratio ratio-16x9">
                <iframe width="1408" height="663" src="https://www.youtube.com/embed/DWQlRzJkKRo" title="Conveyor for food and beverage manufacturing industry | Beverage Industry Conveyors | Neo Conveyors" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-12 mb-3 mb-lg-4">
              <div className="ratio ratio-16x9">
                <iframe width="1408" height="663" src="https://www.youtube.com/embed/FIdRY6jSiJc" title="Bag Filling To Loading Through Conveyor | Loading Conveyors manufacturer India | Neo Conveyors" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Zoomed Image */}
      {selectedImage && (
        <div className={styles.modal} onClick={() => setSelectedImage(null)}>
          <span className={styles.close}>&times;</span>
          <img src={selectedImage} className={styles.modalContent} alt="Zoomed Image" />
        </div>
      )}
    </>
  );
};

export default Gallery;
