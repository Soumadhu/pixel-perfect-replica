import { useState, type FormEvent } from "react";
import { Calendar, Clock, User, Mail, Phone, Video, Building2, CheckCircle2, ShieldCheck, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { Rental } from "@/lib/rental-data";

interface TourModalProps {
  property: Rental;
  isOpen: boolean;
  onClose: () => void;
}

export function TourModal({ property, isOpen, onClose }: TourModalProps) {
  const [tourType, setTourType] = useState<"in-person" | "video">("in-person");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !date) {
      toast.error("Please fill in all required fields.");
      return;
    }
    const code = `FF-${Math.floor(1000 + Math.random() * 9000)}`;
    setReferenceCode(code);
    setSubmitted(true);
    toast.success("Private tour requested successfully!");
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  // Get tomorrow's date formatted as YYYY-MM-DD for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-xl shadow-2xl border border-[#E4E0D6] max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#142B40] text-white p-5 flex items-start justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#C6A56B] font-semibold">
              Private Tour Scheduling
            </span>
            <h3 className="font-editorial text-xl text-white mt-1">
              {property.title}
            </h3>
            <p className="text-xs text-[#F7F6F2]/80 mt-0.5">
              {property.neighborhood}, {property.city}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-editorial text-2xl text-[#142B40]">
                  Tour Request Confirmed
                </h4>
                <p className="text-xs text-[#57616C]">
                  Reference Code: <span className="font-mono font-bold text-[#142B40]">{referenceCode}</span>
                </p>
              </div>

              <div className="bg-[#F7F6F2] p-4 rounded-lg border border-[#E4E0D6] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#57616C]">Tour Format:</span>
                  <span className="font-semibold text-[#142B40] capitalize">{tourType} Tour</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#57616C]">Date & Time:</span>
                  <span className="font-semibold text-[#142B40]">{date} at {timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#57616C]">Assigned Agent:</span>
                  <span className="font-semibold text-[#142B40]">{property.agent.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#57616C]">Attendee:</span>
                  <span className="font-semibold text-[#142B40]">{name} ({email})</span>
                </div>
              </div>

              <p className="text-xs text-[#57616C] leading-relaxed">
                Our leasing team has reserved this window on our schedule. A calendar invitation and confirmation reminder will be coordinated with you.
              </p>

              <div className="pt-2">
                <Button
                  onClick={handleReset}
                  className="w-full bg-[#142B40] hover:bg-[#1D3A55] text-white"
                >
                  Close & Return to Listing
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tour Type Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#57616C]">
                  Select Tour Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTourType("in-person")}
                    className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-colors ${
                      tourType === "in-person"
                        ? "border-[#142B40] bg-[#142B40]/5 ring-1 ring-[#142B40]"
                        : "border-[#E4E0D6] hover:bg-[#F7F6F2]"
                    }`}
                  >
                    <Building2 className={`w-5 h-5 ${tourType === "in-person" ? "text-[#C6A56B]" : "text-[#57616C]"}`} />
                    <div>
                      <p className="text-xs font-semibold text-[#142B40]">In-Person</p>
                      <p className="text-[10px] text-[#57616C]">Accompanied walkthrough</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTourType("video")}
                    className={`p-3 rounded-lg border text-left flex items-center gap-3 transition-colors ${
                      tourType === "video"
                        ? "border-[#142B40] bg-[#142B40]/5 ring-1 ring-[#142B40]"
                        : "border-[#E4E0D6] hover:bg-[#F7F6F2]"
                    }`}
                  >
                    <Video className={`w-5 h-5 ${tourType === "video" ? "text-[#C6A56B]" : "text-[#57616C]"}`} />
                    <div>
                      <p className="text-xs font-semibold text-[#142B40]">Live Virtual</p>
                      <p className="text-[10px] text-[#57616C]">Interactive video call</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#252B32] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>Preferred Date *</span>
                  </label>
                  <input
                    type="date"
                    required
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full text-xs bg-[#F7F6F2] text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#252B32] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C6A56B]" />
                    <span>Preferred Time *</span>
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full text-xs bg-[#F7F6F2] text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                  >
                    <option value="10:00 AM">Morning · 10:00 AM</option>
                    <option value="11:30 AM">Morning · 11:30 AM</option>
                    <option value="2:00 PM">Afternoon · 2:00 PM</option>
                    <option value="4:00 PM">Late Afternoon · 4:00 PM</option>
                    <option value="5:30 PM">Evening · 5:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 pt-2 border-t border-[#E4E0D6]">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#252B32]">Your Full Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-xs bg-[#F7F6F2] text-[#252B32] pl-8 pr-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                    />
                    <User className="w-4 h-4 text-[#57616C] absolute left-2.5 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#252B32]">Email Address *</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs bg-[#F7F6F2] text-[#252B32] pl-8 pr-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                      />
                      <Mail className="w-4 h-4 text-[#57616C] absolute left-2.5 top-2.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#252B32]">Phone Number</label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs bg-[#F7F6F2] text-[#252B32] pl-8 pr-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                      />
                      <Phone className="w-4 h-4 text-[#57616C] absolute left-2.5 top-2.5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#252B32]">Notes or Special Requests</label>
                  <textarea
                    rows={2}
                    placeholder="Preferred move-in timeframe, pets, or questions..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full text-xs bg-[#F7F6F2] text-[#252B32] p-2.5 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden resize-none"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full bg-[#142B40] hover:bg-[#1D3A55] text-white py-2.5 font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <span>Confirm Tour Request</span>
                  <ArrowRight className="w-4 h-4 text-[#C6A56B]" />
                </Button>
                <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] text-[#57616C]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C6A56B]" />
                  <span>Verified Single-Client Platform · No unsolicited communications</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

