import { MdEmail, MdPhone, MdLanguage, MdLocationOn } from "react-icons/md";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const ContactUs = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex gap-16 flex-col md:flex-row my-20 items-start">
        <motion.div
          className="flex-1 w-full text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="my-14">
            <h1 className=" text-4xl md:text-7xl font-extrabold text-[#3d5f9e]">
              Get in touch.
            </h1>
            <p className=" text-gray-600  mt-5">
              Whether you have questions about our services, need support, or
              want to share your feedback, our dedicated team is here to assist
              you every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: MdEmail, title: "Email", text: "8H2wW@example.com" },
              { icon: MdPhone, title: "Phone", text: "+91 9876543210" },
              {
                icon: MdLanguage,
                title: "Website",
                text: "reallygreatsite.com",
              },
              {
                icon: MdLocationOn,
                title: "Address",
                text: "123 Main Street, City, Country",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm"
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                >
                  <Icon className="text-white bg-[#3d5f9e] p-2 rounded-full text-4xl" />
                  <div>
                    <h1 className="text-md font-semibold text-gray-800">
                      {item.title}
                    </h1>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.div
          className="flex-1 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={2}
        >
          <form className="space-y-5">
            <div className="flex flex-col gap-2">
              <label className="text-gray-700 ">Your Name</label>
              <input
                type="text"
                placeholder="Name"
                className="border-2 border-gray-300 p-3 rounded-xl bg-[#f0f4fc] "
              />
            </div>

            {/* Your Email */}
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Your Email</label>
              <input
                type="email"
                placeholder="Email"
                className="border-2 border-gray-300 p-3 rounded-xl bg-[#f0f4fc] "
              />
            </div>

            {/* Your Phone */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Your Phone</label>
              <input
                type="text"
                placeholder="Phone"
                className="border-2 border-gray-300 p-3 rounded-xl bg-[#f0f4fc] "
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-700">Message</label>
              <textarea
                placeholder="Your message"
                className="border-2 border-gray-300 p-2 rounded-xl h-32 bg-[#f0f4fc]"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#3d5f9e] text-white p-3 rounded-xl mt-2 w-28 hover:bg-[#0058ab] transition-all duration-300"
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactUs;
