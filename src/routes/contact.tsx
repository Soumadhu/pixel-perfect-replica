import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Field & Form | Leasing Inquiries" },
      {
        name: "description",
        content:
          "Connect with Field & Form's leasing teams in San Francisco, California and Ohio. Inquire about available residences or schedule a private tour.",
      },
    ],
  }),
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("San Francisco");
  const [topic, setTopic] = useState("General Inquiry");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you for your inquiry. A leasing specialist will contact you shortly.");
  };

  return (
    <SiteLayout>
      {/* Header Banner */}
      <div className="bg-[#142B40] text-white py-14 sm:py-20 border-b border-[#1D3A55]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
            We Are Here to Assist
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-white font-normal mt-2">
            Let's Start a Conversation.
          </h1>
          <p className="mt-3 text-sm text-[#F7F6F2]/80 font-light leading-relaxed">
            Whether you have questions regarding a specific property, lease terms, or would like to schedule an accompanied showing, our leasing partners are at your service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Regional Offices (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                Direct Contacts
              </span>
              <h2 className="font-editorial text-2xl text-[#142B40]">
                Regional Studio Offices
              </h2>
              <p className="text-xs text-[#57616C] leading-relaxed">
                Field & Form operates dedicated leasing and management teams physically based in both core metropolitan areas.
              </p>
            </div>

            {/* Office 1: San Francisco */}
            <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E0D6]">
                <h3 className="font-editorial text-lg text-[#142B40] font-medium">
                  San Francisco Studio
                </h3>
                <span className="text-[11px] font-semibold text-[#C6A56B] bg-[#142B40]/5 px-2 py-0.5 rounded">
                  California
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-[#57616C]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
                  <span>2190 Fillmore Street, Suite 400<br />San Francisco, CA 94115</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C6A56B] shrink-0" />
                  <span className="font-semibold text-[#142B40]">(415) 890-4210</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C6A56B] shrink-0" />
                  <span>sf@fieldandform.com</span>
                </div>
              </div>
            </div>

            {/* Office 2: Ohio */}
            <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E4E0D6]">
                <h3 className="font-editorial text-lg text-[#142B40] font-medium">
                  Midwest / Ohio Studio
                </h3>
                <span className="text-[11px] font-semibold text-[#C6A56B] bg-[#142B40]/5 px-2 py-0.5 rounded">
                  Ohio
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-[#57616C]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
                  <span>3455 High Street, Suite 210<br />Columbus, OH 43214</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#C6A56B] shrink-0" />
                  <span className="font-semibold text-[#142B40]">(614) 732-9014</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C6A56B] shrink-0" />
                  <span>ohio@fieldandform.com</span>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-4 rounded-lg bg-[#EFECE4] border border-[#E4E0D6] flex items-start gap-3 text-xs text-[#57616C]">
              <Clock className="w-4 h-4 text-[#C6A56B] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[#142B40]">Operating Hours</p>
                <p>Monday – Friday: 8:30 AM – 6:00 PM (Local Time)</p>
                <p>Saturday: 10:00 AM – 4:00 PM (Accompanied Showings by Appt)</p>
              </div>
            </div>
          </div>

          {/* Contact Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl p-8 sm:p-10 border border-[#E4E0D6] shadow-sm">
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                  Send a Message
                </span>
                <h3 className="font-editorial text-2xl text-[#142B40] mt-1">
                  How may our team help you?
                </h3>
                <p className="text-xs text-[#57616C] mt-1">
                  Inquiries are routed directly to licensed regional directors Eleanor Vance or Marcus Thorne.
                </p>
              </div>

              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-editorial text-2xl text-[#142B40]">
                    Inquiry Received
                  </h4>
                  <p className="text-xs text-[#57616C] max-w-sm mx-auto leading-relaxed">
                    Thank you, {name}. We have logged your message regarding our {location} portfolio and will respond to {email} within 4 business hours.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="text-xs border-[#142B40] text-[#142B40]"
                    >
                      Send Another Message
                    </Button>
                    <Button asChild className="bg-[#142B40] text-white text-xs">
                      <Link to="/rentals">Browse Available Residences</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#252B32]">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. David Miller"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs bg-[#F7F6F2] text-[#252B32] px-3.5 py-2.5 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#252B32]">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs bg-[#F7F6F2] text-[#252B32] px-3.5 py-2.5 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#252B32]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs bg-[#F7F6F2] text-[#252B32] px-3.5 py-2.5 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-[#252B32]">
                        Region of Interest
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full text-xs bg-[#F7F6F2] text-[#252B32] px-3.5 py-2.5 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden cursor-pointer"
                      >
                        <option value="San Francisco">San Francisco, California</option>
                        <option value="Ohio">Columbus / Cleveland, Ohio</option>
                        <option value="Both">Both Regions</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#252B32]">
                      Topic of Inquiry
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full text-xs bg-[#F7F6F2] text-[#252B32] px-3.5 py-2.5 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Private Tour Request">Schedule Accompanied Tour</option>
                      <option value="Lease Term Details">Lease Terms & Application Requirements</option>
                      <option value="Pet Policy Clarification">Pet Policy Clarification</option>
                      <option value="Current Resident Service">Current Resident Service</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#252B32]">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please share any preferences regarding move-in timeframe, bedrooms, or questions you may have..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full text-xs bg-[#F7F6F2] text-[#252B32] p-3 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#142B40] hover:bg-[#1D3A55] text-white py-3 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>Send Message to Leasing Team</span>
                  </Button>

                  <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-[#57616C]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>Your contact details are strictly kept confidential</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

