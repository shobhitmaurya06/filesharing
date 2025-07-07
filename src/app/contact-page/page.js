"use client";
import { useRef, useState } from "react";
import emailjs from "emailjs-com";
import Link from "next/link";
import Image from "next/image";

export default function Contact() {
  const form = useRef();
  const [sendMail, setSendMail] = useState("Submit");

  const sendEmail = (e) => {
    e.preventDefault();
    setSendMail("Sending");

    emailjs
      .sendForm(
        "service_hfp9cst", // EmailJS service ID
        "template_7wb18sd", // Template ID
        form.current,
        "qqw0SUWax9RCNHFLy" // Public key
      )
      .then(
        () => {
          form.current.reset();
          setSendMail("Submit");
        },
        (error) => {
          console.error(error.text);
          alert("Failed to send message. Please try again.");
          setSendMail("Submit");
        }
      );
  };

  return (
    <section id="contact" className="snap-start mb-5 w-[100vw]">
      <div className="overflow-x-hidden sm:overflow-visible h-[65vh] flex relative flex-col text-center md:text-left md:flex-row max-w-7xl px-10 justify-evenly mx-auto items-center">
        <div className="flex flex-col space-y-4 md:space-y-5 lg:space-y-6 xl:space-y-6 2xl:space-y-10">
          <h3 className="uppercase tracking-[20px] text-gray-500 text-xl md:text-2xl mb-7 text-center">
            Contact
          </h3>

          <div className="flex flex-col lg:flex-row justify-evenly items-center gap-5">
            <div className="flex flex-col gap-6 lg:pl-20">
              <div className="space-y-3 2xl:space-y-5 hidden md:block">
                {/* Email #1 */}
                <div className="flex items-center space-x-5">
                  <Link href="mailto:shobhitmaurya9346@gmail.com">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-[#2b5f6a] h-7 w-7 animate-pulse"
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>
                  </Link>
                  <p className="text-lg text-gray-600">shobhitmaurya9346@gmail.com</p>
                </div>

                {/* Email #2 */}
                <div className="flex items-center space-x-5">
                  <Link href="mailto:yugraj767@gmail.com">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-[#2b5f6a] h-7 w-7 animate-pulse"
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>
                  </Link>
                  <p className="text-lg text-gray-600">yugraj767@gmail.com</p>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-5">
                  <Link
                    href="https://www.google.com/maps/search/?api=1&query=28.653933,77.445244"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-[#2b5f6a] h-7 w-7 animate-pulse"
                    >
                      <path
                        fillRule="evenodd"
                        d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                  <p className="text-lg text-gray-600">
                    Ghaziabad, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              {/* Email Form */}
              <form
                ref={form}
                onSubmit={sendEmail}
                className="flex flex-col space-y-2 w-80 md:w-fit mx-auto"
              >
                <div className="md:flex md:space-x-2 space-y-2 md:space-y-0">
                  <input
                    name="name"
                    placeholder="Name"
                    className="contactInput w-80 md:w-auto"
                    type="text"
                    required
                  />
                  <input
                    name="email"
                    placeholder="Email"
                    className="contactInput w-80 md:w-auto"
                    type="email"
                    required
                  />
                </div>
                <input
                  name="subject"
                  placeholder="Subject"
                  className="contactInput"
                  type="text"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  className="contactInput"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="bg-[#2b5f6a] py-3 md:py-5 px-10 rounded-lg text-white font-bold text-lg"
                >
                  {sendMail}
                </button>
              </form>
            </div>

            {/* Responsive Image using Next.js */}
            <div className="relative w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] hidden lg:flex">
              <Image
                src="/contactmewebp.jpg"
                alt="Contact Illustration"
                fill
                sizes="(max-width: 1024px) 300px, 400px"
                className="object-contain rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
