"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css'; // AOS CSS

export default function Home() {
  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, once: true });

    // GSAP Animations
    gsap.fromTo('.navbar h1', { opacity: 0, x: -100 }, { opacity: 1, x: 0, duration: 1 });
    gsap.fromTo('.hero h1', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 });
    gsap.fromTo('.hero p', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.7 });
    gsap.fromTo('.cta-btn', { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1, delay: 1 });

    gsap.fromTo('.feature-card', { opacity: 0, y: 100 }, { opacity: 1, y: 0, stagger: 0.3, duration: 1, delay: 1.2 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-blue-600">
      {/* Navbar */}
      <nav className="bg-white shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <motion.h1
            className="text-4xl font-extrabold text-gray-900 hover:text-indigo-800 transition duration-300"
            data-aos="fade-up"
          >
            ExamPrepPro
          </motion.h1>
          <div className="space-x-6">
            <motion.a
              href="/login"
              className="text-gray-700 hover:text-indigo-800 transition duration-300"
              data-aos="fade-left"
            >
              Login
            </motion.a>
            <motion.a
              href="/signup"
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-indigo-700 transition duration-300"
              data-aos="fade-right"
            >
              Signup
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-32 text-center hero">
        <motion.h1
          className="text-6xl font-extrabold text-white mb-6"
          data-aos="fade-up"
        >
          Prepare Smarter, Not Harder
        </motion.h1>
        <motion.p
          className="text-2xl text-white mb-8"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Unlock your potential with Mock Tests, Notes, and Reports.
        </motion.p>
        <motion.div
          className="space-x-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <a
            href="/signup"
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-indigo-700 transition duration-300 cta-btn"
          >
            Start Learning Now
          </a>
        </motion.div>
      </div>

      {/* CTA Banner */}
      <div className="bg-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl font-semibold mb-6"
            data-aos="fade-up"
          >
            Get Started Today for Free!
          </motion.h2>
          <p className="text-lg mb-8">
            Experience all premium features for 30 days, no credit card required.
          </p>
          <motion.a
            href="/signup"
            className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg hover:bg-indigo-700 transition duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Claim Your Free Trial
          </motion.a>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.h2
          className="text-4xl font-semibold text-gray-900 text-center mb-10"
          data-aos="fade-up"
        >
          Core Features of ExamPrepPro
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-10">
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 feature-card"
            data-aos="fade-up"
          >
            <h3 className="text-3xl font-semibold text-indigo-600 mb-4">📝 Mock Tests</h3>
            <p className="text-gray-700">
              Practice with timed mock exams, track your progress, and analyze your performance.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 feature-card"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <h3 className="text-3xl font-semibold text-indigo-600 mb-4">📚 Study Notes</h3>
            <p className="text-gray-700">
              Subject-wise organized study material and notes at your fingertips.
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 feature-card"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-3xl font-semibold text-indigo-600 mb-4">📈 Performance Reports</h3>
            <p className="text-gray-700">
              Track your learning journey, performance metrics, and improvements over time.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Video Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.h2
          className="text-4xl font-semibold text-indigo-600 mb-10"
          data-aos="fade-up"
        >
          Watch How It Works
        </motion.h2>
        <div className="flex justify-center">
          <motion.iframe
            width="800"
            height="450"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="How ExamPrepPro Works"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl shadow-lg"
            data-aos="fade-up"
            data-aos-delay="200"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-4xl font-semibold text-gray-900 text-center mb-10"
            data-aos="fade-up"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="space-y-6">
            <motion.div
              className="text-lg text-gray-700"
              data-aos="fade-up"
            >
              <h4 className="font-semibold">How do I get started?</h4>
              <p>Sign up for a free trial, explore the features, and start practicing with mock tests.</p>
            </motion.div>
            <motion.div
              className="text-lg text-gray-700"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h4 className="font-semibold">Is there a mobile app?</h4>
              <p>Yes, we offer a mobile app available on both iOS and Android devices.</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-semibold text-indigo-600 mb-10"
            data-aos="fade-up"
          >
            Trusted by Thousands of Students
          </motion.h2>
          <div className="flex justify-center space-x-8">
            <motion.div className="w-1/4" data-aos="fade-up" data-aos-delay="100">
              <img src="/path/to/brand-logo1.png" alt=" ChatGPT said:Brand 1" className="h-12" />
</motion.div>
<motion.div className="w-1/4" data-aos="fade-up" data-aos-delay="200">
<img src="/path/to/brand-logo2.png" alt="Brand 2" className="h-12" />
</motion.div>
<motion.div className="w-1/4" data-aos="fade-up" data-aos-delay="300">
<img src="/path/to/brand-logo3.png" alt="Brand 3" className="h-12" />
</motion.div>
</div>
</div>
</div>
{/* Footer Section */}
<div className="bg-gray-900 text-white py-8">
  <div className="max-w-7xl mx-auto px-4 text-center">
    <motion.h2
      className="text-3xl font-semibold mb-4"
      data-aos="fade-up"
    >
      Stay Connected
    </motion.h2>
    <p className="text-lg mb-4">
      Follow us on our social channels for the latest updates and tips.
    </p>
    <div className="space-x-8 mb-6">
      <motion.a
        href="https://facebook.com"
        className="text-white hover:text-indigo-500 transition duration-300"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Facebook
      </motion.a>
      <motion.a
        href="https://twitter.com"
        className="text-white hover:text-indigo-500 transition duration-300"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Twitter
      </motion.a>
      <motion.a
        href="https://instagram.com"
        className="text-white hover:text-indigo-500 transition duration-300"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        Instagram
      </motion.a>
    </div>
    <p className="text-sm text-gray-400">
      &copy; 2025 ExamPrepPro. All rights reserved.
    </p>
  </div>
</div>

</div>
);
}