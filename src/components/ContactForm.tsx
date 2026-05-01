"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-black/10">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-500 mb-4">Contact</h2>
            <h3 className="heading-lg font-outfit">Let's start a <br /><span className="text-primary-500">Conversation</span></h3>
            <p className="text-xl text-muted mt-8 max-w-md leading-relaxed">
              Have a project in mind or just want to say hi? I'm always open to discussing 
              new opportunities and creative ideas.
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/5">
                  <CheckCircle2 className="text-primary-500" size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Fast Response</h4>
                  <p className="text-sm text-muted">Usually within 24 hours</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/5">
                  <AlertCircle className="text-primary-500" size={24} />
                </div>
                <div>
                  <h4 className="font-bold">Project Guidance</h4>
                  <p className="text-sm text-muted">Free consultation on your idea</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-3xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Name</label>
                  <input
                    {...register("name")}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Email</label>
                  <input
                    {...register("email")}
                    placeholder="john@example.com"
                    className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email.message}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Subject</label>
                <input
                  {...register("subject")}
                  placeholder="Project Inquiry"
                  className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-2">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold mb-2 uppercase tracking-wide">Message</label>
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell me about your project..."
                  className="w-full px-5 py-4 rounded-xl bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 focus:border-primary-500 outline-none transition-all resize-none"
                />
                {errors.message && <p className="text-red-500 text-xs mt-2">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-5 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary-500/30 disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 text-green-500 justify-center font-bold">
                  <CheckCircle2 size={20} />
                  Message sent successfully!
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-2 text-red-500 justify-center font-bold">
                  <AlertCircle size={20} />
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
