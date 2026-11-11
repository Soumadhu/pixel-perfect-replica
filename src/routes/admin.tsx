import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { rentals, formatRent, type Rental, type PropertyStatus } from "@/lib/rental-data";
import {
  ShieldCheck,
  Building2,
  Calendar,
  Mail,
  Image as ImageIcon,
  MapPin,
  Settings,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  LogOut,
  ExternalLink,
  Edit,
  Trash2,
  Check,
  AlertCircle,
  Eye,
  Filter,
  Download,
  Share2,
  Sparkles,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminDashboardPage,
  head: () => ({
    meta: [
      { title: "Admin Portal | Field & Form Property Management" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

// Mock Enquiries
interface MockEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  region: string;
  date: string;
  status: "New" | "Contacted" | "Tour Booked";
  message: string;
}

const initialEnquiries: MockEnquiry[] = [
  {
    id: "ENQ-1042",
    name: "Jessica Hayes",
    email: "jessica.h@example.com",
    phone: "(415) 320-8912",
    property: "Light-filled Pacific Heights Residence",
    region: "San Francisco",
    date: "2026-11-11",
    status: "New",
    message: "Interested in a 12-month lease starting January 1st. Are small dogs under 25 lbs approved?",
  },
  {
    id: "ENQ-1041",
    name: "David Chen",
    email: "d.chen@outlook.com",
    phone: "(614) 490-1123",
    property: "Restored Historic Brick Craftsman",
    region: "Ohio",
    date: "2026-11-10",
    status: "Contacted",
    message: "Looking for family home in Clintonville school district. Would love an in-person showing.",
  },
  {
    id: "ENQ-1040",
    name: "Amara Robinson",
    email: "amara.robinson@gmail.com",
    phone: "(415) 902-7711",
    property: "Sunny Corner Flat near Marina Green",
    region: "San Francisco",
    date: "2026-11-09",
    status: "Tour Booked",
    message: "Moving from Seattle for tech role. Requesting virtual tour walkthrough.",
  },
];

// Mock Tour Requests
interface MockTour {
  id: string;
  applicant: string;
  email: string;
  property: string;
  type: "In-Person" | "Live Virtual";
  date: string;
  time: string;
  agent: string;
  status: "Confirmed" | "Pending Review";
}

const initialTours: MockTour[] = [
  {
    id: "TR-894",
    applicant: "Amara Robinson",
    email: "amara.robinson@gmail.com",
    property: "Sunny Corner Flat near Marina Green",
    type: "Live Virtual",
    date: "2026-11-14",
    time: "2:00 PM",
    agent: "Eleanor Vance",
    status: "Confirmed",
  },
  {
    id: "TR-893",
    applicant: "Michael Keller",
    email: "keller.m@corp.org",
    property: "Light Modern Townhome near Dublin Greenway",
    type: "In-Person",
    date: "2026-11-15",
    time: "10:30 AM",
    agent: "Marcus Thorne",
    status: "Pending Review",
  },
  {
    id: "TR-892",
    applicant: "Elena Vasquez",
    email: "elena.v@tech.io",
    property: "Designer Mission Dolores Loft",
    type: "In-Person",
    date: "2026-11-16",
    time: "4:00 PM",
    agent: "Eleanor Vance",
    status: "Confirmed",
  },
];

function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "properties" | "enquiries" | "tours" | "media" | "locations" | "seo"
  >("overview");

  const [propertiesList, setPropertiesList] = useState<Rental[]>(rentals);
  const [enquiriesList, setEnquiriesList] = useState<MockEnquiry[]>(initialEnquiries);
  const [toursList, setToursList] = useState<MockTour[]>(initialTours);
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<MockEnquiry | null>(null);

  // New property modal state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCity, setNewCity] = useState<"San Francisco" | "Ohio">("San Francisco");
  const [newNeighborhood, setNewNeighborhood] = useState("");
  const [newPrice, setNewPrice] = useState("3500");
  const [newBeds, setNewBeds] = useState("2");
  const [newBaths, setNewBaths] = useState("1");
  const [newSqft, setNewSqft] = useState("1000");

  const handleToggleStatus = (slug: string, currentStatus: PropertyStatus) => {
    const nextStatus: PropertyStatus =
      currentStatus === "Available"
        ? "Coming soon"
        : currentStatus === "Coming soon"
        ? "Pending"
        : "Available";

    setPropertiesList((prev) =>
      prev.map((item) => (item.slug === slug ? { ...item, status: nextStatus } : item))
    );
    toast.success(`Updated status to "${nextStatus}"`);
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newNeighborhood) {
      toast.error("Please fill in required fields");
      return;
    }

    const slug = newTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const newProperty: Rental = {
      slug,
      title: newTitle,
      tagline: "Recently authorized residence in single-client portfolio.",
      city: newCity,
      region: newCity === "San Francisco" ? "Bay Area" : "Columbus Metro",
      neighborhood: newNeighborhood,
      address: `${newNeighborhood}, ${newCity === "San Francisco" ? "San Francisco, CA" : "OH"}`,
      zip: newCity === "San Francisco" ? "94115" : "43214",
      price: Number(newPrice),
      beds: Number(newBeds),
      baths: Number(newBaths),
      sqft: Number(newSqft),
      type: "Apartment",
      status: "Available",
      available: "Available now",
      deposit: Number(newPrice),
      applicationFee: 45,
      description: "An authorized addition to the Field & Form managed portfolio.",
      longDescription: [
        "Curated for spacious living with premium finishes, excellent neighborhood positioning, and dedicated management stewardship."
      ],
      amenities: ["In-unit laundry", "Dishwasher", "Hardwood floors", "Natural light"],
      features: {
        petPolicy: "Pets welcome upon review",
        parking: "Dedicated space available",
        laundry: "In-unit washer and dryer",
        heatingCooling: "Central climate control",
        leaseTerm: "12-month lease",
      },
      scores: { walk: 90, transit: 85, bike: 80 },
      coordinates: { lat: 37.78, lng: -122.43 },
      photos: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=85",
      ],
      videoThumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
      videoDuration: "2:00",
      agent: newCity === "San Francisco" ? rentals[0].agent : rentals[5].agent,
      added: new Date().toISOString().split("T")[0],
      featured: false,
    };

    setPropertiesList([newProperty, ...propertiesList]);
    setAddModalOpen(false);
    setNewTitle("");
    setNewNeighborhood("");
    toast.success("New property published to portfolio!");
  };

  const handleUpdateEnquiryStatus = (id: string, newStatus: MockEnquiry["status"]) => {
    setEnquiriesList((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
    toast.success(`Enquiry marked as ${newStatus}`);
  };

  const handleApproveTour = (id: string) => {
    setToursList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "Confirmed" } : t))
    );
    toast.success("Tour request confirmed and calendar invite dispatched!");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#142B40] flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center space-y-5 shadow-2xl">
          <div className="w-12 h-12 bg-[#142B40] text-[#C6A56B] rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-editorial text-2xl text-[#142B40]">Management Portal</h2>
            <p className="text-xs text-[#57616C] mt-1">
              Field & Form Authorized Client Workspace
            </p>
          </div>
          <Button
            onClick={() => setIsAuthenticated(true)}
            className="w-full bg-[#142B40] text-white py-2.5 text-xs font-semibold"
          >
            Access Demo Workspace
          </Button>
          <Link to="/" className="text-xs text-[#57616C] hover:text-[#142B40] block pt-2">
            ← Return to public website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] flex flex-col md:flex-row">
      {/* Admin Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#142B40] text-white flex flex-col justify-between shrink-0 border-r border-[#1D3A55]">
        <div>
          {/* Brand */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xs bg-white text-[#142B40] flex items-center justify-center font-editorial font-bold text-sm">
                F&F
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm text-white leading-none">
                  FIELD & FORM
                </span>
                <span className="text-[9px] uppercase tracking-wider text-[#C6A56B] mt-0.5">
                  Admin Console
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors text-left ${
                activeTab === "overview"
                  ? "bg-[#C6A56B] text-[#142B40] font-semibold"
                  : "text-[#F7F6F2]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("properties")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors text-left ${
                activeTab === "properties"
                  ? "bg-[#C6A56B] text-[#142B40] font-semibold"
                  : "text-[#F7F6F2]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4" />
                <span>Properties</span>
              </div>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full">
                {propertiesList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("enquiries")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors text-left ${
                activeTab === "enquiries"
                  ? "bg-[#C6A56B] text-[#142B40] font-semibold"
                  : "text-[#F7F6F2]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Enquiries</span>
              </div>
              <span className="text-[10px] bg-amber-500/80 text-white px-1.5 py-0.5 rounded-full font-bold">
                {enquiriesList.filter((e) => e.status === "New").length} new
              </span>
            </button>

            <button
              onClick={() => setActiveTab("tours")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors text-left ${
                activeTab === "tours"
                  ? "bg-[#C6A56B] text-[#142B40] font-semibold"
                  : "text-[#F7F6F2]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Tour Requests</span>
              </div>
              <span className="text-[10px] bg-emerald-500/80 text-white px-1.5 py-0.5 rounded-full font-bold">
                {toursList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("media")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors text-left ${
                activeTab === "media"
                  ? "bg-[#C6A56B] text-[#142B40] font-semibold"
                  : "text-[#F7F6F2]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
            </button>

            <button
              onClick={() => setActiveTab("locations")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors text-left ${
                activeTab === "locations"
                  ? "bg-[#C6A56B] text-[#142B40] font-semibold"
                  : "text-[#F7F6F2]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Locations</span>
            </button>

            <button
              onClick={() => setActiveTab("seo")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-xs font-medium transition-colors text-left ${
                activeTab === "seo"
                  ? "bg-[#C6A56B] text-[#142B40] font-semibold"
                  : "text-[#F7F6F2]/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>SEO Settings</span>
            </button>
          </nav>
        </div>

        {/* User Footer info */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#C6A56B] text-[#142B40] font-bold text-xs flex items-center justify-center">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Administrator</p>
              <p className="text-[10px] text-[#C6A56B] truncate">Field & Form Client</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2">
            <Link
              to="/"
              className="text-[#F7F6F2]/70 hover:text-white flex items-center gap-1 text-[11px]"
            >
              <ExternalLink className="w-3 h-3" />
              <span>View Site</span>
            </Link>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="text-red-300 hover:text-red-200 flex items-center gap-1 text-[11px]"
            >
              <LogOut className="w-3 h-3" />
              <span>Lock</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E4E0D6] mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#57616C]">
              <span>Management</span>
              <span>/</span>
              <span className="capitalize font-semibold text-[#142B40]">{activeTab}</span>
            </div>
            <h1 className="font-editorial text-2xl sm:text-3xl text-[#142B40] mt-1 capitalize">
              {activeTab === "overview" ? "Executive Portfolio Overview" : `${activeTab} Management`}
            </h1>
          </div>

          {activeTab === "properties" && (
            <Button
              onClick={() => setAddModalOpen(true)}
              className="bg-[#142B40] hover:bg-[#1D3A55] text-white text-xs font-semibold px-4 py-2 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-4 h-4 text-[#C6A56B]" />
              <span>Add New Residence</span>
            </Button>
          )}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* 4 Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-xl border border-[#E4E0D6] shadow-xs space-y-2">
                <span className="text-[11px] font-semibold text-[#57616C] uppercase tracking-wider">
                  Active Residences
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-display text-[#142B40]">
                    {propertiesList.length}
                  </span>
                  <span className="text-xs text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded-full">
                    100% verified
                  </span>
                </div>
                <p className="text-[11px] text-[#57616C]">5 San Francisco · 5 Ohio</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E4E0D6] shadow-xs space-y-2">
                <span className="text-[11px] font-semibold text-[#57616C] uppercase tracking-wider">
                  Lease Inquiries
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-display text-[#142B40]">
                    28
                  </span>
                  <span className="text-xs text-[#C6A56B] bg-[#142B40] font-semibold px-2 py-0.5 rounded-full">
                    +14% this mo
                  </span>
                </div>
                <p className="text-[11px] text-[#57616C]">3 pending response</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E4E0D6] shadow-xs space-y-2">
                <span className="text-[11px] font-semibold text-[#57616C] uppercase tracking-wider">
                  Scheduled Tours
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-display text-[#142B40]">
                    {toursList.length}
                  </span>
                  <span className="text-xs text-emerald-800 bg-emerald-100 font-semibold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <p className="text-[11px] text-[#57616C]">Next tour: Amara R. (Virtual)</p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-[#E4E0D6] shadow-xs space-y-2">
                <span className="text-[11px] font-semibold text-[#57616C] uppercase tracking-wider">
                  Avg Days on Market
                </span>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold font-display text-[#142B40]">
                    14
                  </span>
                  <span className="text-xs text-[#57616C] font-normal">
                    days
                  </span>
                </div>
                <p className="text-[11px] text-[#57616C]">Fast tenant placement</p>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Inquiries Panel */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-[#E4E0D6] shadow-xs p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E4E0D6]">
                  <h3 className="font-editorial text-lg text-[#142B40] font-medium">
                    Recent Tenant Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab("enquiries")}
                    className="text-xs text-[#C6A56B] hover:text-[#142B40] font-semibold"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {enquiriesList.slice(0, 3).map((enq) => (
                    <div
                      key={enq.id}
                      className="p-3.5 rounded-lg bg-[#F7F6F2] border border-[#E4E0D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#142B40]">{enq.name}</span>
                          <span className="text-[10px] text-[#57616C]">({enq.region})</span>
                        </div>
                        <p className="text-[#57616C] truncate max-w-md">{enq.property}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            enq.status === "New"
                              ? "bg-amber-100 text-amber-800"
                              : enq.status === "Contacted"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {enq.status}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedEnquiry(enq);
                            setActiveTab("enquiries");
                          }}
                          className="text-xs h-7 px-2"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Management Shortcuts */}
              <div className="bg-white rounded-xl border border-[#E4E0D6] shadow-xs p-6 space-y-4">
                <h3 className="font-editorial text-lg text-[#142B40] font-medium pb-3 border-b border-[#E4E0D6]">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      setActiveTab("properties");
                      setAddModalOpen(true);
                    }}
                    className="w-full bg-[#142B40] hover:bg-[#1D3A55] text-white text-xs justify-start gap-2 h-10"
                  >
                    <Plus className="w-4 h-4 text-[#C6A56B]" />
                    <span>Publish New Residence</span>
                  </Button>

                  <Button
                    onClick={() => setActiveTab("tours")}
                    variant="outline"
                    className="w-full text-xs justify-start gap-2 h-10 border-[#E4E0D6]"
                  >
                    <Calendar className="w-4 h-4 text-[#C6A56B]" />
                    <span>Review Scheduled Walkthroughs</span>
                  </Button>

                  <Button
                    onClick={() => {
                      toast.info("Exporting CSV file of leads and applications...");
                    }}
                    variant="outline"
                    className="w-full text-xs justify-start gap-2 h-10 border-[#E4E0D6]"
                  >
                    <Download className="w-4 h-4 text-[#C6A56B]" />
                    <span>Export Tenant Leads (CSV)</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROPERTIES MANAGEMENT */}
        {activeTab === "properties" && (
          <div className="space-y-6">
            {/* Filter toolbar */}
            <div className="bg-white p-4 rounded-xl border border-[#E4E0D6] flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="Search properties by title, neighborhood..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-[#F7F6F2] text-xs pl-8 pr-3 py-2 rounded-md border border-[#E4E0D6] outline-hidden"
                />
                <Search className="w-3.5 h-3.5 text-[#57616C] absolute left-2.5 top-2.5" />
              </div>

              <span className="text-[#57616C]">
                Total: <b>{propertiesList.length}</b> residences
              </span>
            </div>

            {/* Properties Table */}
            <div className="bg-white rounded-xl border border-[#E4E0D6] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#142B40] text-white font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Property</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Specs</th>
                      <th className="p-4">Monthly Rent</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E0D6]">
                    {propertiesList
                      .filter(
                        (p) =>
                          !searchFilter ||
                          p.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          p.neighborhood.toLowerCase().includes(searchFilter.toLowerCase())
                      )
                      .map((property) => (
                        <tr key={property.slug} className="hover:bg-[#F7F6F2]/60 transition-colors">
                          <td className="p-4 flex items-center gap-3">
                            <img
                              src={property.photos[0]}
                              alt=""
                              className="w-12 h-10 rounded object-cover shrink-0 border border-[#E4E0D6]"
                            />
                            <div>
                              <Link
                                to="/property/$slug"
                                params={{ slug: property.slug }}
                                className="font-semibold text-[#142B40] hover:text-[#C6A56B] flex items-center gap-1"
                              >
                                <span>{property.title}</span>
                                <ExternalLink className="w-3 h-3 text-[#57616C]" />
                              </Link>
                              <span className="text-[10px] text-[#57616C]">{property.type}</span>
                            </div>
                          </td>

                          <td className="p-4 text-[#57616C]">
                            <p className="font-medium text-[#142B40]">{property.neighborhood}</p>
                            <p className="text-[10px]">{property.city}</p>
                          </td>

                          <td className="p-4 text-[#57616C]">
                            {property.beds} bd · {property.baths} ba · {property.sqft} sqft
                          </td>

                          <td className="p-4 font-bold text-[#142B40]">
                            {formatRent(property.price)}
                          </td>

                          <td className="p-4">
                            <button
                              onClick={() => handleToggleStatus(property.slug, property.status)}
                              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border transition-colors cursor-pointer ${
                                property.status === "Available"
                                  ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                  : property.status === "Coming soon"
                                  ? "bg-blue-100 text-blue-800 border-blue-300"
                                  : "bg-amber-100 text-amber-800 border-amber-300"
                              }`}
                              title="Click to toggle status"
                            >
                              {property.status} ↺
                            </button>
                          </td>

                          <td className="p-4 text-right space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toast.info(`Editing ${property.title}`)}
                              className="text-[11px] h-7 px-2"
                            >
                              <Edit className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ENQUIRIES MANAGEMENT */}
        {activeTab === "enquiries" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E4E0D6] overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#142B40] text-white font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Applicant</th>
                    <th className="p-4">Property</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E0D6]">
                  {enquiriesList.map((enq) => (
                    <tr key={enq.id} className="hover:bg-[#F7F6F2]/60">
                      <td className="p-4">
                        <p className="font-bold text-[#142B40]">{enq.name}</p>
                        <p className="text-[10px] text-[#57616C]">{enq.email} · {enq.phone}</p>
                      </td>
                      <td className="p-4 text-[#57616C]">
                        <p className="font-medium text-[#142B40]">{enq.property}</p>
                        <p className="text-[10px]">{enq.region}</p>
                      </td>
                      <td className="p-4 text-[#57616C]">{enq.date}</td>
                      <td className="p-4">
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            handleUpdateEnquiryStatus(enq.id, e.target.value as MockEnquiry["status"])
                          }
                          className="bg-[#F7F6F2] text-xs font-semibold px-2 py-1 rounded border border-[#E4E0D6]"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Tour Booked">Tour Booked</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedEnquiry(enq)}
                          className="text-xs h-7 px-2.5"
                        >
                          View Message
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Selected Enquiry Message Modal */}
            {selectedEnquiry && (
              <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E4E0D6]">
                  <div>
                    <h3 className="font-editorial text-lg text-[#142B40] font-medium">
                      Inquiry from {selectedEnquiry.name}
                    </h3>
                    <p className="text-xs text-[#57616C]">
                      Regarding {selectedEnquiry.property} ({selectedEnquiry.region})
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedEnquiry(null)}
                    className="text-xs"
                  >
                    Close
                  </Button>
                </div>
                <div className="p-4 rounded-lg bg-[#F7F6F2] text-xs text-[#252B32] space-y-2">
                  <p className="font-semibold text-[#142B40]">Message Transcript:</p>
                  <p className="italic">"{selectedEnquiry.message}"</p>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    onClick={() => {
                      toast.success(`Opening email draft to ${selectedEnquiry.email}`);
                    }}
                    className="bg-[#142B40] text-white text-xs"
                  >
                    Reply via Email
                  </Button>
                  <Button
                    onClick={() => handleUpdateEnquiryStatus(selectedEnquiry.id, "Contacted")}
                    variant="outline"
                    className="text-xs"
                  >
                    Mark as Contacted
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TOUR REQUESTS */}
        {activeTab === "tours" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-[#E4E0D6] overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#142B40] text-white font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Applicant</th>
                    <th className="p-4">Residence</th>
                    <th className="p-4">Format</th>
                    <th className="p-4">Scheduled Date & Time</th>
                    <th className="p-4">Assigned Agent</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E0D6]">
                  {toursList.map((tour) => (
                    <tr key={tour.id} className="hover:bg-[#F7F6F2]/60">
                      <td className="p-4">
                        <p className="font-bold text-[#142B40]">{tour.applicant}</p>
                        <p className="text-[10px] text-[#57616C]">{tour.email}</p>
                      </td>
                      <td className="p-4 font-medium text-[#142B40] max-w-xs truncate">
                        {tour.property}
                      </td>
                      <td className="p-4">
                        <span className="bg-[#142B40]/10 text-[#142B40] font-semibold px-2 py-0.5 rounded text-[10px]">
                          {tour.type}
                        </span>
                      </td>
                      <td className="p-4 text-[#57616C]">
                        {tour.date} at {tour.time}
                      </td>
                      <td className="p-4 text-[#142B40] font-medium">{tour.agent}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            tour.status === "Confirmed"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {tour.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {tour.status !== "Confirmed" && (
                          <Button
                            size="sm"
                            onClick={() => handleApproveTour(tour.id)}
                            className="bg-emerald-800 hover:bg-emerald-900 text-white text-[10px] h-7 px-2"
                          >
                            Approve
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: MEDIA MANAGEMENT */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#E4E0D6] shadow-xs flex items-center justify-between">
              <div>
                <h3 className="font-editorial text-lg text-[#142B40] font-medium">
                  High-Resolution Asset Vault
                </h3>
                <p className="text-xs text-[#57616C]">
                  Curated architectural photography and virtual walkthrough video clips.
                </p>
              </div>
              <Button
                onClick={() => toast.success("Asset upload simulator triggered.")}
                className="bg-[#142B40] text-white text-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5 text-[#C6A56B]" />
                <span>Upload New Media</span>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {propertiesList.flatMap((p) => p.photos).slice(0, 8).map((photo, i) => (
                <div
                  key={i}
                  className="group relative aspect-4/3 rounded-lg overflow-hidden border border-[#E4E0D6] bg-black/10"
                >
                  <img src={photo} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="text-white text-[10px] font-medium bg-black/60 px-2 py-1 rounded">
                      2400 × 1600 · JPG
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: LOCATIONS MANAGEMENT */}
        {activeTab === "locations" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-xl text-[#142B40]">San Francisco, California</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-semibold">
                    Active Regional Hub
                  </span>
                </div>
                <p className="text-xs text-[#57616C] leading-relaxed">
                  5 authorized residences across Pacific Heights, Marina District, Noe Valley, Mission Dolores, and Presidio Heights.
                </p>
                <div className="pt-2 text-xs text-[#142B40] font-semibold">
                  Assigned Director: Eleanor Vance (sf@fieldandform.com)
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-[#E4E0D6] shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-xl text-[#142B40]">Ohio (Columbus & Cleveland)</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded font-semibold">
                    Active Regional Hub
                  </span>
                </div>
                <p className="text-xs text-[#57616C] leading-relaxed">
                  5 authorized residences across Clintonville, Dublin, Grandview Heights, German Village, and Shaker Heights.
                </p>
                <div className="pt-2 text-xs text-[#142B40] font-semibold">
                  Assigned Director: Marcus Thorne (ohio@fieldandform.com)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SEO SETTINGS */}
        {activeTab === "seo" && (
          <div className="bg-white rounded-xl p-8 border border-[#E4E0D6] shadow-xs max-w-2xl space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[#C6A56B]">
                Metadata & Search Visibility
              </span>
              <h3 className="font-editorial text-xl text-[#142B40] mt-1">
                Global SEO & Social Preview Configuration
              </h3>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-[#252B32] block mb-1">
                  Meta Title Pattern
                </label>
                <input
                  type="text"
                  defaultValue="{Property Title} | Field & Form Residences"
                  className="w-full bg-[#F7F6F2] text-[#252B32] p-2 rounded border border-[#E4E0D6]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#252B32] block mb-1">
                  Default Meta Description
                </label>
                <textarea
                  rows={3}
                  defaultValue="Explore considered residential rental residences across San Francisco and Ohio. Transparent lease terms, authentic photography, and private accompanied tours."
                  className="w-full bg-[#F7F6F2] text-[#252B32] p-2 rounded border border-[#E4E0D6] resize-none"
                />
              </div>

              <div>
                <label className="font-semibold text-[#252B32] block mb-1">
                  Robots Indexing Status
                </label>
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Public listing index enabled. Admin routes configured with noindex.</span>
                </div>
              </div>

              <div className="pt-3">
                <Button
                  onClick={() => toast.success("SEO Settings successfully saved.")}
                  className="bg-[#142B40] text-white text-xs px-6 py-2"
                >
                  Save SEO Configuration
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Add Property */}
        {addModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          >
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-[#E4E0D6] space-y-4">
              <h3 className="font-editorial text-xl text-[#142B40]">Publish New Residence</h3>
              <form onSubmit={handleAddProperty} className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#252B32] block mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victorian Flat on Webster Street"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#F7F6F2] p-2 rounded border border-[#E4E0D6]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#252B32] block mb-1">Region *</label>
                    <select
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value as "San Francisco" | "Ohio")}
                      className="w-full bg-[#F7F6F2] p-2 rounded border border-[#E4E0D6]"
                    >
                      <option value="San Francisco">San Francisco</option>
                      <option value="Ohio">Ohio</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-[#252B32] block mb-1">Neighborhood *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pacific Heights"
                      value={newNeighborhood}
                      onChange={(e) => setNewNeighborhood(e.target.value)}
                      className="w-full bg-[#F7F6F2] p-2 rounded border border-[#E4E0D6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-semibold text-[#252B32] block mb-1">Rent $/mo</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full bg-[#F7F6F2] p-2 rounded border border-[#E4E0D6]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#252B32] block mb-1">Beds</label>
                    <input
                      type="number"
                      required
                      value={newBeds}
                      onChange={(e) => setNewBeds(e.target.value)}
                      className="w-full bg-[#F7F6F2] p-2 rounded border border-[#E4E0D6]"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#252B32] block mb-1">Baths</label>
                    <input
                      type="number"
                      required
                      value={newBaths}
                      onChange={(e) => setNewBaths(e.target.value)}
                      className="w-full bg-[#F7F6F2] p-2 rounded border border-[#E4E0D6]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAddModalOpen(false)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-[#142B40] text-white text-xs">
                    Authorize & Publish
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

