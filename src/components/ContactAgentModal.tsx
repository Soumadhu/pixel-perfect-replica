import { useState, type FormEvent } from "react";
import { Mail, Phone, X, Send, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { AgentInfo, Rental } from "@/lib/rental-data";

interface ContactAgentModalProps {
  agent: AgentInfo;
  property?: Rental;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactAgentModal({ agent, property, isOpen, onClose }: ContactAgentModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [topic, setTopic] = useState("Leasing Inquiry");
  const [message, setMessage] = useState(
    property ? `Hello ${agent.name}, I would like to inquire about the rental terms for ${property.title}.` : ""
  );
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("Please fill in required fields.");
      return;
    }
    setSubmitted(true);
    toast.success(`Message sent directly to ${agent.name}`);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-xl shadow-2xl border border-[#E4E0D6] max-w-md w-full overflow-hidden flex flex-col">
        {/* Agent Profile Header */}
        <div className="bg-[#142B40] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-[#C6A56B]"
            />
            <div>
              <h3 className="font-editorial text-lg text-white font-medium">{agent.name}</h3>
              <p className="text-xs text-[#C6A56B]">{agent.role}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {submitted ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-editorial text-xl text-[#142B40]">Message Received</h4>
              <p className="text-xs text-[#57616C] leading-relaxed max-w-xs mx-auto">
                Thank you, {name}. {agent.name} has received your direct inquiry and will respond within 4 business hours.
              </p>
              <div className="pt-2">
                <Button onClick={onClose} className="bg-[#142B40] text-white text-xs px-6">
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              {/* Direct Contact info pill */}
              <div className="bg-[#F7F6F2] p-2.5 rounded-md border border-[#E4E0D6] flex justify-between items-center text-[#57616C]">
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#C6A56B]" />
                  {agent.phone}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C6A56B]" />
                  Direct Agent
                </span>
              </div>

              <div>
                <label className="font-semibold text-[#252B32] block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#F7F6F2] text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-[#252B32] block mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#F7F6F2] text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#252B32] block mb-1">Phone</label>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#F7F6F2] text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#252B32] block mb-1">Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-[#F7F6F2] text-[#252B32] px-3 py-2 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden"
                >
                  <option value="Leasing Inquiry">General Leasing Inquiry</option>
                  <option value="Application Requirements">Application Requirements</option>
                  <option value="Pet Policy Clarification">Pet Policy Clarification</option>
                  <option value="Lease Term Flexibility">Lease Term Flexibility</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#252B32] block mb-1">Your Message *</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#F7F6F2] text-[#252B32] p-2.5 rounded-md border border-[#E4E0D6] focus:border-[#142B40] outline-hidden resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#142B40] hover:bg-[#1D3A55] text-white py-2 font-semibold text-xs flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span>Send Direct Inquiry</span>
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

