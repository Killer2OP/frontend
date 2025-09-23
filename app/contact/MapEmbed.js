"use client";
import React from "react";
import styles from "./Contact.module.css";

const MapEmbed = () => {
    return (
       

        <iframe
  src="https://www.google.com/maps?q=Verma+Hall,+Devshree+Talkies+Complex,+Loha+Mandi+Road,+Indore+452012&output=embed" 
   className={styles.map}
             allowFullScreen
  loading="lazy"> 
</iframe>

    );
};

export default MapEmbed;
