"use client";

import Image from "next/image";


export default function WhatsAppButton({ phoneNumber }) {
    const handleClick = () => {
        window.open(`https://wa.me/+91${phoneNumber}`, "_blank");
    };

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-6 animate-bounce left-6 z-50 cursor-pointer"
            aria-label="Chat on WhatsApp"
        >
            <Image
                src="/whatsapp.svg"
                alt="WhatsApp Icon"
                width={40}
                height={40}
                className="transition-transform duration-300 group-hover:scale-110"
            />
        </button>
    );
}