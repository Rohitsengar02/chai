"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pin, setPin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState("overview"); // overview, buildings, vendors, subscriptions, offers, disputes, users, restock, leaves, settings
  const [toastMsg, setToastMsg] = useState("");
  const [isSystemFrozen, setIsSystemFrozen] = useState(false);

  // Datasets matching specifications & new expanded sections
  const [buildings, setBuildings] = useState([
    { id: "b1", name: "Tech Park Block A", offices: 120, activeUsers: 620, vendor: "Jaipur HQ Main Hub", revenueMonth: 480000, progress: 45 },
    { id: "b2", name: "Capital Towers", offices: 95, activeUsers: 480, vendor: "Floor 2 Kitchenette", revenueMonth: 320000, progress: 30 },
    { id: "b3", name: "Innovate Square", offices: 75, activeUsers: 382, vendor: "Floor 5 Express Counter", revenueMonth: 160000, progress: 15 },
    { id: "b4", name: "Alpha Labs", offices: 62, activeUsers: 360, vendor: "Unassigned", revenueMonth: 110000, progress: 10 }
  ]);

  const [vendors, setVendors] = useState([
    { id: "v1", name: "Jaipur HQ Main Hub", building: "Tech Park Block A", acceptRate: 98, avgPrepTime: "7.5m", rating: 4.8, status: "active" },
    { id: "v2", name: "Floor 2 Kitchenette", building: "Capital Towers", acceptRate: 95, avgPrepTime: "9.2m", rating: 4.5, status: "active" },
    { id: "v3", name: "Floor 5 Express Counter", building: "Innovate Square", acceptRate: 91, avgPrepTime: "11.0m", rating: 4.1, status: "on-leave" }
  ]);

  const [subscriptionPlans, setSubscriptionPlans] = useState([
    { id: "plan-daily", name: "Daily Kadak", tagline: "1 hot cup of signature Masala Chai delivered daily.", price: 1499, period: "mo", subscribers: 284, growth: 12 },
    { id: "plan-twice", name: "Twice a Day", tagline: "Morning energizer + evening stress-buster cups.", price: 2699, period: "mo", subscribers: 412, growth: 18 },
    { id: "plan-combo", name: "Chai + Snacks", tagline: "Daily tea paired with a fresh snack platter.", price: 3499, period: "mo", subscribers: 197, growth: 8 },
    { id: "plan-team", name: "Team Plan", tagline: "Up to 10 daily brews for small corporate pods.", price: 9999, period: "mo", subscribers: 63, growth: 5 }
  ]);

  const [offersList, setOffersList] = useState([
    { code: "FIRST50", desc: "50% off on first order", used: 312, share: 45, active: true },
    { code: "MONSOON20", desc: "20% off Kulhad Chai this week", used: 148, share: 22, active: true },
    { code: "REFER25", desc: "₹25 wallet credit for referrals", used: 601, share: 28, active: true },
    { code: "DIWALI10", desc: "10% off festive combo", used: 89, share: 5, active: false }
  ]);

  const [disputesList, setDisputesList] = useState([
    { id: "TCK-201", order: "ORD-8836", issue: "Order rejected without reason", status: "Open", user: "Sneha R.", time: "2 hrs ago" },
    { id: "TCK-200", order: "ORD-8790", issue: "Wrong item delivered", status: "Resolved", user: "Devansh P.", time: "1 day ago" },
    { id: "TCK-199", order: "ORD-8765", issue: "Subscription charged after pause", status: "Investigating", user: "Karan V.", time: "3 hrs ago" }
  ]);

  const [liveOrders, setLiveOrders] = useState([
    { id: "ORD-8839", office: "Office 402, Block A", items: "2x Masala Chai, 1x Cookie", time: "10 min ago", status: "Dispatched" },
    { id: "ORD-8838", office: "Office 512, Towers", items: "1x Saffron Royal Chai", time: "12 min ago", status: "Brewing" },
    { id: "ORD-8837", office: "Office 301, Square", items: "3x Ginger Chai, 3x Biscuit", time: "18 min ago", status: "Served" },
    { id: "ORD-8836", office: "Office 508, Alpha", items: "2x Kashmiri Kahwa", time: "25 min ago", status: "Served" },
    { id: "ORD-8835", office: "Office 212, Block A", items: "1x Classic Masala Chai", time: "30 min ago", status: "Served" }
  ]);

  // Expanded Datasets for Sections 7, 8, 9, 10
  const [usersList, setUsersList] = useState([
    { name: "Kunal Shah", email: "kunal@cred.club", office: "Tech Park, Room 402", sub: "Daily Kadak", wallet: 1250, status: "Active" },
    { name: "Vijay Shekhar", email: "vijay@paytm.com", office: "Capital Towers, Room 901", sub: "Twice a Day", wallet: 340, status: "Active" },
    { name: "Ritesh Agarwal", email: "ritesh@oyo.com", office: "Innovate Square, Room 205", sub: "None", wallet: 0, status: "Blocked" }
  ]);

  const [restockRequests, setRestockRequests] = useState([
    { id: "REQ-01", item: "Organic Kashmiri Saffron", qty: "20g", station: "Jaipur HQ Main Hub", date: "09/12/2026", status: "Pending", urgency: 85 },
    { id: "REQ-02", item: "Fresh Cardamom Seeds", qty: "500g", station: "Floor 2 Kitchenette", date: "09/12/2026", status: "Dispatched", urgency: 40 }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: "LR-101", operator: "Chef Kanti Lal", start: "2026-07-10", end: "2026-07-12", reason: "Family Event", status: "Pending Approval" }
  ]);

  const [broadcastMsg, setBroadcastMsg] = useState("");
  const [systemHours, setSystemHours] = useState("8:00 AM - 6:00 PM");

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === "9999" && password === "admin123") {
      setIsLoggedIn(true);
      setErrorMsg("");
      localStorage.setItem("admin_logged", "true");
    } else {
      setErrorMsg("Invalid Admin Secure Credentials!");
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("admin_logged");
    if (saved === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const totalRevenue = buildings.reduce((s, b) => s + b.revenueMonth, 0);
  const totalUsers = buildings.reduce((s, b) => s + b.activeUsers, 0);
  const totalOffices = buildings.reduce((s, b) => s + b.offices, 0);
  const openDisputesCount = disputesList.filter(d => d.status !== "Resolved").length;
  const pendingRestockCount = restockRequests.filter(r => r.status === "Pending").length;
  const pendingLeavesCount = leaveRequests.filter(l => l.status === "Pending Approval").length;

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: "100vh", background: "#fdf5e9", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif" }}>
        <form onSubmit={handlePinSubmit} style={{ background: "#ffffff", padding: "40px", borderRadius: "28px", boxShadow: "0 20px 50px rgba(44,27,13,0.1)", width: "360px", border: "1px solid rgba(44,27,13,0.08)" }}>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "48px", display: "block", marginBottom: "12px" }}>🛡️</span>
            <h2 style={{ fontSize: "20px", color: "#2c1b0d", margin: "0 0 8px", fontWeight: "800" }}>CHAI HEROES ADMIN</h2>
            <p style={{ fontSize: "12px", color: "#666", margin: "0" }}>Enter secure credentials to configure outlets.</p>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "#555", display: "block", marginBottom: "6px" }}>Secure PIN</label>
            <input
              type="password"
              placeholder="••••"
              maxLength={4}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
              style={{ width: "100%", padding: "12px", border: "1px solid rgba(44,27,13,0.15)", borderRadius: "10px", fontSize: "20px", letterSpacing: "8px", textAlign: "center", outline: "none", color: "#2c1b0d", background: "#fcfaf7" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "#555", display: "block", marginBottom: "6px" }}>Admin Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "12px", border: "1px solid rgba(44,27,13,0.15)", borderRadius: "10px", fontSize: "14px", outline: "none", color: "#2c1b0d", background: "#fcfaf7" }}
            />
          </div>

          {errorMsg && <span style={{ color: "#e74c3c", fontSize: "12px", display: "block", marginBottom: "16px", fontWeight: "bold", textAlign: "center" }}>{errorMsg}</span>}

          <button type="submit" style={{ width: "100%", background: "#2c1b0d", color: "#ffffff", border: "none", padding: "14px", borderRadius: "12px", fontWeight: "800", fontSize: "14px", cursor: "pointer", letterSpacing: "0.5px" }}>
            AUTHENTICATE TERMINAL
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fb", color: "#2c1b0d", display: "flex", fontFamily: "system-ui, sans-serif" }}>

      {/* Toast Notification */}
      {toastMsg && (
        <div style={{ position: "fixed", top: "24px", right: "24px", background: "#2c1b0d", color: "#fdf5e9", padding: "16px 24px", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.15)", zIndex: 9999, fontWeight: "bold", borderLeft: "4px solid #e74c3c" }}>
          🛡️ {toastMsg}
        </div>
      )}

      {/* WEALTHIO STYLE SIDEBAR (10 SECTIONS) */}
      <aside style={{ width: "270px", background: "#ffffff", padding: "24px 14px", display: "flex", flexDirection: "column", borderRight: "1.5px solid #edf1f6", overflowY: "auto", flexShrink: 0 }}>

        {/* Brand logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingLeft: "8px", marginBottom: "24px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#2c1b0d", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold", fontSize: "18px" }}>
            🍵
          </div>
          <strong style={{ fontSize: "18px", color: "#2c1b0d", fontWeight: "800", letterSpacing: "-0.5px" }}>ChaiCo Admin</strong>
        </div>

        {/* Navigation links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px", flex: 1 }}>

          <div>
            <span style={{ fontSize: "9px", color: "#a0aec0", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "10px", display: "block", marginBottom: "6px", letterSpacing: "0.5px" }}>CORE LEDGERS</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <button
                type="button"
                onClick={() => setActiveTab("overview")}
                style={{ display: "flex", alignItems: "center", gap: "10px", border: "none", background: activeTab === "overview" ? "rgba(44,27,13,0.06)" : "transparent", color: activeTab === "overview" ? "#2c1b0d" : "#718096", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12.5px", fontWeight: "700", width: "100%", textAlign: "left" }}
              >
                📊 1. Overview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("buildings")}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "none", background: activeTab === "buildings" ? "rgba(44,27,13,0.06)" : "transparent", color: activeTab === "buildings" ? "#2c1b0d" : "#718096", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12.5px", fontWeight: "700", width: "100%" }}
              >
                <span style={{ textAlign: "left" }}>🏢 2. Buildings</span>
                <span style={{ fontSize: "10px", background: "rgba(44,27,13,0.08)", color: "#2c1b0d", padding: "1px 5px", borderRadius: "5px", fontWeight: "bold" }}>{buildings.length}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("vendors")}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "none", background: activeTab === "vendors" ? "rgba(44,27,13,0.06)" : "transparent", color: activeTab === "vendors" ? "#2c1b0d" : "#718096", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12.5px", fontWeight: "700", width: "100%" }}
              >
                <span style={{ textAlign: "left" }}>👨‍🍳 3. Vendors</span>
                <span style={{ fontSize: "10px", background: "rgba(44,27,13,0.08)", color: "#2c1b0d", padding: "1px 5px", borderRadius: "5px", fontWeight: "bold" }}>{vendors.length}</span>
              </button>
            </div>
          </div>

          <div>
            <span style={{ fontSize: "9px", color: "#a0aec0", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "10px", display: "block", marginBottom: "6px", letterSpacing: "0.5px" }}>OFFERS & REVENUE</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <button
                type="button"
                onClick={() => setActiveTab("subscriptions")}
                style={{ display: "flex", alignItems: "center", gap: "10px", border: "none", background: activeTab === "subscriptions" ? "rgba(44,27,13,0.06)" : "transparent", color: activeTab === "subscriptions" ? "#2c1b0d" : "#718096", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12.5px", fontWeight: "700", width: "100%", textAlign: "left" }}
              >
                🔁 4. Subscriptions
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("offers")}
                style={{ display: "flex", alignItems: "center", gap: "10px", border: "none", background: activeTab === "offers" ? "rgba(44,27,13,0.06)" : "transparent", color: activeTab === "offers" ? "#2c1b0d" : "#718096", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12.5px", fontWeight: "700", width: "100%", textAlign: "left" }}
              >
                🏷️ 5. Offers
              </button>
            </div>
          </div>

          <div>
            <span style={{ fontSize: "9px", color: "#a0aec0", fontWeight: "bold", textTransform: "uppercase", paddingLeft: "10px", display: "block", marginBottom: "6px", letterSpacing: "0.5px" }}>AUDITING & SUPPORT</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
              <button
                type="button"
                onClick={() => setActiveTab("disputes")}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "none", background: activeTab === "disputes" ? "rgba(44,27,13,0.06)" : "transparent", color: activeTab === "disputes" ? "#2c1b0d" : "#718096", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12.5px", fontWeight: "700", width: "100%" }}
              >
                <span style={{ textAlign: "left" }}>⚠️ 6. Disputes</span>
                <span style={{ fontSize: "10px", background: "rgba(231,76,60,0.1)", color: "#e74c3c", padding: "1px 5px", borderRadius: "5px", fontWeight: "bold" }}>{openDisputesCount}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("users")}
                style={{ display: "flex", alignItems: "center", gap: "10px", border: "none", background: activeTab === "users" ? "rgba(44,27,13,0.06)" : "transparent", color: activeTab === "users" ? "#2c1b0d" : "#718096", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12.5px", fontWeight: "700", width: "100%", textAlign: "left" }}
              >
                👥 7. Users & Wallets
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("restock")}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "none", background: activeTab === "restock" ? "rgba(44,27,13,0.06)" : "transparent", color: activeTab === "restock" ? "#2c1b0d" : "#718096", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12.5px", fontWeight: "700", width: "100%" }}
              >
                <span style={{ textAlign: "left" }}>⚙️ 8. Restock Alerts</span>
                <span style={{ fontSize: "10px", background: "rgba(241,196,15,0.15)", color: "#d35400", padding: "1px 5px", borderRadius: "5px", fontWeight: "bold" }}>{pendingRestockCount}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("leaves")}
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", border: "none", background: activeTab === "leaves" ? "rgba(44,27,13,0.06)" : "transparent", color: activeTab === "leaves" ? "#2c1b0d" : "#718096", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12.5px", fontWeight: "700", width: "100%" }}
              >
                <span style={{ textAlign: "left" }}>📅 9. Leaves Roster</span>
                <span style={{ fontSize: "10px", background: "rgba(231,76,60,0.1)", color: "#e74c3c", padding: "1px 5px", borderRadius: "5px", fontWeight: "bold" }}>{pendingLeavesCount}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("settings")}
                style={{ display: "flex", alignItems: "center", gap: "10px", border: "none", background: activeTab === "settings" ? "rgba(44,27,13,0.06)" : "transparent", color: activeTab === "settings" ? "#2c1b0d" : "#718096", padding: "9px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12.5px", fontWeight: "700", width: "100%", textAlign: "left" }}
              >
                🔧 10. Global Settings
              </button>
            </div>
          </div>

          <div style={{ borderTop: "1.5px solid #edf1f6", paddingTop: "12px", marginTop: "auto" }}>
            <Link
              href="/"
              style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#718096", padding: "8px 10px", borderRadius: "8px", fontSize: "12.5px", fontWeight: "700" }}
            >
              <span>←</span> Back to Pyala
            </Link>
            <button
              type="button"
              onClick={() => {
                localStorage.removeItem("admin_logged");
                setIsLoggedIn(false);
              }}
              style={{ display: "flex", alignItems: "center", gap: "10px", border: "none", background: "transparent", color: "#e74c3c", padding: "8px 10px", borderRadius: "8px", cursor: "pointer", fontSize: "12.5px", fontWeight: "700", width: "100%", textAlign: "left" }}
            >
              🚪 Sign out
            </button>
          </div>

        </div>

      </aside>

      {/* CONTENT AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>

        {/* TOP BAR */}
        <header style={{ height: "70px", background: "#ffffff", borderBottom: "1.5px solid #edf1f6", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <strong style={{ fontSize: "18px", color: "#2c1b0d", fontWeight: "700" }}>
              {activeTab === "overview" && "Dashboard Overview"}
              {activeTab === "buildings" && "Buildings Ledger"}
              {activeTab === "vendors" && "Chai Vendors"}
              {activeTab === "subscriptions" && "Subscriptions Config"}
              {activeTab === "offers" && "Offers & Coupons"}
              {activeTab === "disputes" && "Disputes Tickets"}
              {activeTab === "users" && "User Wallet Ledger"}
              {activeTab === "restock" && "Material Restocks"}
              {activeTab === "leaves" && "Leaves Roster Audit"}
              {activeTab === "settings" && "Global Config Panel"}
            </strong>
            <span style={{ fontSize: "12.5px", color: "#a0aec0" }}>|</span>
            <span style={{ fontSize: "12.5px", color: "#718096", fontWeight: "bold" }}>4 buildings · 350+ offices under management</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>

            {/* Live indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(39,174,96,0.08)", padding: "6px 12px", borderRadius: "20px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#27ae60", display: "inline-block", boxShadow: "0 0 8px #27ae60" }}></span>
              <span style={{ fontSize: "11px", fontWeight: "bold", color: "#27ae60" }}>All systems live</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#2c1b0d", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "bold" }}>
                🛡️
              </div>
              <div>
                <strong style={{ fontSize: "12.5px", display: "block", color: "#2c1b0d" }}>Dripio Admin</strong>
                <span style={{ fontSize: "10px", color: "#a0aec0", display: "block" }}>Super User</span>
              </div>
            </div>
          </div>
        </header>

        {/* PAGES WRAPPER */}
        <div style={{ padding: "40px" }}>

          {/* STAT CARDS - COMMON AT TOP */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "28px" }}>
            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: "11.5px", color: "#718096", display: "block", marginBottom: "6px" }}>Revenue (month)</span>
              <strong style={{ fontSize: "22px", color: "#2c1b0d" }}>₹{(totalRevenue / 100000).toFixed(1)} Lakhs</strong>
            </div>
            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: "11.5px", color: "#718096", display: "block", marginBottom: "6px" }}>Buildings Live</span>
              <strong style={{ fontSize: "22px", color: "#2c1b0d" }}>{buildings.length} Buildings</strong>
            </div>
            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: "11.5px", color: "#718096", display: "block", marginBottom: "6px" }}>Active Users</span>
              <strong style={{ fontSize: "22px", color: "#2c1b0d" }}>{totalUsers.toLocaleString("en-IN")} Users</strong>
            </div>
            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)" }}>
              <span style={{ fontSize: "11.5px", color: "#718096", display: "block", marginBottom: "6px" }}>Offices Covered</span>
              <strong style={{ fontSize: "22px", color: "#2c1b0d" }}>{totalOffices} Offices</strong>
            </div>
          </div>

          {/* PAGE CONTENTS (EACH HAS CARDS + GRAPH + LIST) */}

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

              {/* HEADER TOOLBAR */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", background: "#ffffff", padding: "20px 24px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>🍵</span>
                  <input type="text" placeholder="Global Search..." style={{ padding: "8px 16px", borderRadius: "8px", border: "1.5px solid #edf1f6", fontSize: "13px", width: "240px", outline: "none" }} />
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                  <select style={{ padding: "8px 12px", borderRadius: "8px", border: "1.5px solid #edf1f6", fontSize: "12.5px", fontWeight: "bold" }}>
                    <option>Last 30 Days (Jul 2026)</option>
                    <option>Today</option>
                    <option>This Week</option>
                  </select>
                  <select style={{ padding: "8px 12px", borderRadius: "8px", border: "1.5px solid #edf1f6", fontSize: "12.5px", fontWeight: "bold" }}>
                    <option>All Buildings</option>
                    {buildings.map(b => <option key={b.id}>{b.name}</option>)}
                  </select>
                  <select style={{ padding: "8px 12px", borderRadius: "8px", border: "1.5px solid #edf1f6", fontSize: "12.5px", fontWeight: "bold" }}>
                    <option>All Vendors</option>
                    {vendors.map(v => <option key={v.id}>{v.name}</option>)}
                  </select>
                  <button type="button" onClick={() => { setToastMsg("CSV report exported successfully!"); setTimeout(() => setToastMsg(""), 3000); }} style={{ background: "#2c1b0d", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontSize: "12.5px", fontWeight: "bold", cursor: "pointer" }}>
                    📥 Export Report
                  </button>
                  <button type="button" onClick={() => { setToastMsg("AI insights updated with latest data."); setTimeout(() => setToastMsg(""), 3000); }} style={{ background: "#fbf9f6", border: "1px solid rgba(0,0,0,0.1)", color: "#8a583c", padding: "8px 16px", borderRadius: "8px", fontSize: "12.5px", fontWeight: "bold", cursor: "pointer" }}>
                    ✨ AI Insights
                  </button>
                </div>
              </div>

              {/* SECTION 1 — EXECUTIVE KPI CARDS (8 Cards) */}
              <div>
                <h3 style={{ fontSize: "14px", color: "#718096", textTransform: "uppercase", fontWeight: "800", letterSpacing: "0.5px", marginBottom: "16px" }}>Section 1 — Executive KPI Cards</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}>
                  {[
                    { title: "Total Revenue", val: "₹1,24,567.00", sub: "Animated counter active", color: "linear-gradient(135deg, #2c1b0d, #4d3320)", txt: "#ffffff" },
                    { title: "Net Profit", val: "₹86,034.00", sub: "+12.4% Growth vs last month", color: "#ffffff", txt: "#2c1b0d" },
                    { title: "Today's Orders", val: "182 Orders", sub: "Live processing counters", color: "#ffffff", txt: "#2c1b0d" },
                    { title: "Active Subscriptions", val: "956 Active", sub: "Recurring members", color: "#ffffff", txt: "#2c1b0d" },
                    { title: "Active Buildings", val: "4 Buildings", sub: "Operational outlets", color: "#ffffff", txt: "#2c1b0d" },
                    { title: "Total Users", val: "1,842 Members", sub: "Across all clients", color: "#ffffff", txt: "#2c1b0d" },
                    { title: "Wallet Balance", val: "₹14,500.00", sub: "Prepaid deposits", color: "#ffffff", txt: "#2c1b0d" }
                  ].map((card, idx) => (
                    <div key={idx} style={{ background: card.color, color: card.txt, padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)" }}>
                      <span style={{ fontSize: "11.5px", opacity: 0.75, display: "block", marginBottom: "8px" }}>{card.title}</span>
                      <strong style={{ fontSize: "22px", display: "block" }}>{card.val}</strong>
                      <span style={{ fontSize: "10px", opacity: 0.6, display: "block", marginTop: "8px" }}>{card.sub}</span>
                    </div>
                  ))}
                  {/* Customer Satisfaction Circular Progress Card */}
                  <div style={{ background: "#ffffff", color: "#2c1b0d", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "11.5px", color: "#718096", display: "block", marginBottom: "8px" }}>Customer Satisfaction</span>
                      <strong style={{ fontSize: "22px", display: "block" }}>4.8 / 5.0</strong>
                    </div>
                    <div style={{ width: "45px", height: "45px", borderRadius: "50%", background: "conic-gradient(#2c1b0d 96%, #edf1f6 0)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "11px", fontWeight: "bold" }}>
                      <div style={{ width: "37px", height: "37px", borderRadius: "50%", background: "#fff", display: "flex", justifyContent: "center", alignItems: "center" }}>96%</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2 — REVENUE ANALYTICS */}
              <div>
                <h3 style={{ fontSize: "14px", color: "#718096", textTransform: "uppercase", fontWeight: "800", letterSpacing: "0.5px", marginBottom: "16px" }}>Section 2 — Revenue Analytics</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "24px" }}>
                  {/* Left: Revenue Trend */}
                  <div style={{ background: "#ffffff", padding: "24px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.03)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                      <strong>Revenue Trend</strong>
                      <div style={{ display: "flex", gap: "6px", fontSize: "11px" }}>
                        <button type="button" style={{ background: "#2c1b0d", color: "#fff", border: "none", padding: "3px 8px", borderRadius: "4px" }}>Daily</button>
                        <button type="button" style={{ background: "transparent", border: "1px solid #edf1f6", padding: "3px 8px", borderRadius: "4px" }}>Weekly</button>
                        <button type="button" style={{ background: "transparent", border: "1px solid #edf1f6", padding: "3px 8px", borderRadius: "4px" }}>Monthly</button>
                        <button type="button" style={{ background: "transparent", border: "1px solid #edf1f6", padding: "3px 8px", borderRadius: "4px" }}>Yearly</button>
                      </div>
                    </div>
                    {/* Simulated chart */}
                    <div style={{ height: "120px", background: "#fbf9f6", borderRadius: "12px", position: "relative", display: "flex", alignItems: "flex-end", padding: "10px", gap: "10px" }}>
                      {[40, 60, 50, 75, 90, 80, 110, 95].map((val, idx) => (
                        <div key={idx} style={{ flex: 1, background: "#2c1b0d", height: `${val}%`, borderRadius: "4px", position: "relative" }}>
                          <span style={{ position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)", fontSize: "9px", color: "#8a583c" }}>W{idx + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Right: Today's Target */}
                  <div style={{ background: "#ffffff", padding: "24px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <strong style={{ fontSize: "13px", color: "#718096", marginBottom: "16px" }}>Today's Goal Target</strong>
                    <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: "conic-gradient(#2c1b0d 72%, #edf1f6 0)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
                      <div style={{ width: "74px", height: "74px", borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <span style={{ fontSize: "16px" }}>72%</span>
                      </div>
                    </div>
                    <strong style={{ fontSize: "15px" }}>₹72,500 / ₹1,00,000</strong>
                  </div>
                </div>
              </div>

              {/* SECTION 5 — BUILDING ANALYTICS */}
              <div>
                <h3 style={{ fontSize: "14px", color: "#718096", textTransform: "uppercase", fontWeight: "800", letterSpacing: "0.5px", marginBottom: "16px" }}>Section 5 — Building Performance</h3>
                <div style={{ background: "#ffffff", padding: "24px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.03)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px" }}>
                    <thead>
                      <tr style={{ borderBottom: "1.5px solid #edf1f6", color: "#718096", textAlign: "left" }}>
                        <th style={{ padding: "10px 0" }}>Building</th>
                        <th>Revenue</th>
                        <th>Orders</th>
                        <th>Employees</th>
                        <th>Subscriptions</th>
                        <th>Occupancy vs Order Ratio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {buildings.map((b, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid #edf1f6" }}>
                          <td style={{ padding: "14px 0", fontWeight: "bold" }}>{b.name}</td>
                          <td>₹{(b.revenueMonth / 100000).toFixed(1)}L</td>
                          <td>{(b.revenueMonth / 150).toFixed(0)}</td>
                          <td>{b.activeUsers}</td>
                          <td>{(b.activeUsers * 0.6).toFixed(0)}</td>
                          <td>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <div style={{ flex: 1, background: "rgba(0,0,0,0.05)", height: "6px", borderRadius: "3px", overflow: "hidden" }}>
                                <div style={{ background: "#2c1b0d", width: `${b.progress}%`, height: "100%" }} />
                              </div>
                              <span>{b.progress}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 12 — INVENTORY OVERVIEW */}
              <div>
                <h3 style={{ fontSize: "14px", color: "#718096", textTransform: "uppercase", fontWeight: "800", letterSpacing: "0.5px", marginBottom: "16px" }}>Section 12 — Inventory Overview</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
                  {[
                    { name: "Milk", qty: "42L", left: "2 Days left", fill: 35 },
                    { name: "Tea Leaves", qty: "18kg", left: "14 Days left", fill: 75 },
                    { name: "Sugar", qty: "22kg", left: "20 Days left", fill: 80 },
                    { name: "Ginger", qty: "4.5kg", left: "3 Days left", fill: 40 },
                    { name: "Cardamom", qty: "1.2kg", left: "8 Days left", fill: 60 },
                    { name: "Honey", qty: "3L", left: "30 Days left", fill: 90 },
                    { name: "Saffron", qty: "45g", left: "12 Days left", fill: 50 },
                    { name: "Paper Cups", qty: "1,200 pcs", left: "5 Days left", fill: 45 },
                    { name: "Lids", qty: "950 pcs", left: "4 Days left", fill: 40 },
                    { name: "Packaging Box", qty: "300 pcs", left: "9 Days left", fill: 65 }
                  ].map((inv, idx) => (
                    <div key={idx} style={{ background: "#ffffff", padding: "16px", borderRadius: "12px", border: "1px solid rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyStyle: "space-between" }}>
                      <div>
                        <strong style={{ fontSize: "12.5px", color: "#2c1b0d", display: "block", marginBottom: "4px" }}>{inv.name}</strong>
                        <span style={{ fontSize: "16px", fontWeight: "bold" }}>{inv.qty}</span>
                        <div style={{ background: "rgba(0,0,0,0.05)", height: "5px", borderRadius: "3px", margin: "8px 0" }}>
                          <div style={{ background: inv.fill < 40 ? "#e74c3c" : "#2c1b0d", width: `${inv.fill}%`, height: "100%" }} />
                        </div>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                        <span style={{ fontSize: "9.5px", color: "#777" }}>{inv.left}</span>
                        <button type="button" onClick={() => { setToastMsg(`Restock alert triggered for ${inv.name}`); setTimeout(() => setToastMsg(""), 3000); }} style={{ padding: "3px 6px", background: "#fbf9f6", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "4px", fontSize: "9.5px", fontWeight: "bold", cursor: "pointer" }}>Restock</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: BUILDINGS */}
          {activeTab === "buildings" && (
            <div>
              {/* Tab Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Total Corporate Desks</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>4,500 Desks</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Average Occupancy</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>82.4%</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Total Vendors Dispatched</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>3 Kitchens</strong>
                </div>
              </div>

              {/* Graphic Occupancy representation */}
              <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: "#718096", display: "block", marginBottom: "8px" }}>Occupancy Distribution Bar</span>
                <div style={{ display: "flex", gap: "6px", background: "#f4f6f8", height: "12px", borderRadius: "6px", overflow: "hidden" }}>
                  <div style={{ background: "#2c1b0d", width: "45%" }} />
                  <div style={{ background: "#8a583c", width: "30%" }} />
                  <div style={{ background: "#a0aec0", width: "15%" }} />
                  <div style={{ background: "#edf1f6", width: "10%" }} />
                </div>
              </div>

              {/* Buildings List grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
                {buildings.map((b, idx) => (
                  <div key={idx} style={{ background: "#ffffff", padding: "24px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.03)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #edf1f6", paddingBottom: "12px", marginBottom: "16px" }}>
                      <strong style={{ fontSize: "16px", color: "#2c1b0d" }}>🏢 {b.name}</strong>
                      <span style={{ fontSize: "12.5px", fontWeight: "bold", color: "#8a583c" }}>₹{(b.revenueMonth / 100000).toFixed(1)} Lakhs</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", fontSize: "12.5px", color: "#555" }}>
                      <span>Offices count: <strong>{b.offices}</strong></span>
                      <span>Active Users: <strong>{b.activeUsers}</strong></span>
                      <span style={{ gridColumn: "span 2", marginTop: "8px", borderTop: "1px dashed #f2eee9", paddingTop: "8px" }}>
                        Assigned Kitchen: <strong>{b.vendor}</strong>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: VENDORS */}
          {activeTab === "vendors" && (
            <div>
              {/* Tab Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Best Accept Rate</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>98.2% (Jaipur HQ)</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Average Prep Time</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>8.5 minutes</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Kitchen Overall Rating</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>4.6 ★ Rating</strong>
                </div>
              </div>

              {/* Graphic Prep Time Comparison Bars */}
              <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: "#718096", display: "block", marginBottom: "12px" }}>Average Prep Time Benchmark (Min is better)</span>
                {vendors.map((v, i) => {
                  const val = parseFloat(v.avgPrepTime);
                  const widthPct = Math.min((val / 15) * 100, 100);
                  return (
                    <div key={i} style={{ marginBottom: "10px", fontSize: "12px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <span>{v.name}</span>
                        <strong>{v.avgPrepTime}</strong>
                      </div>
                      <div style={{ background: "#f4f6f8", height: "6px", borderRadius: "3px" }}>
                        <div style={{ background: "#2c1b0d", width: `${widthPct}%`, height: "100%", borderRadius: "3px" }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Vendors List Ledger */}
              <div style={{ background: "#ffffff", padding: "28px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.03)" }}>
                <h3 style={{ fontSize: "15px", margin: "0 0 20px", color: "#2c1b0d", fontWeight: "800" }}>Chai Vendors Ledger</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1.5px solid #edf1f6", color: "#718096", textAlign: "left" }}>
                      <th style={{ padding: "12px 0" }}>Vendor Room Station</th>
                      <th>Building Location</th>
                      <th>Accept Rate %</th>
                      <th>Rating Score</th>
                      <th>Roster Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendors.map((v, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #edf1f6" }}>
                        <td style={{ padding: "14px 0", fontWeight: "bold" }}>{v.name}</td>
                        <td>{v.building}</td>
                        <td>{v.acceptRate}%</td>
                        <td style={{ color: "#f1c40f", fontWeight: "bold" }}>{v.rating}★</td>
                        <td>
                          <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold", background: v.status === "active" ? "rgba(39,174,96,0.1)" : "rgba(231,76,60,0.1)", color: v.status === "active" ? "#27ae60" : "#e74c3c" }}>
                            {v.status === "active" ? "Active" : "On leave"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SUBSCRIPTIONS */}
          {activeTab === "subscriptions" && (
            <div>
              {/* Tab Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Monthly Recurring Revenue</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>₹4.82 Lakhs</strong>
                </div>
                <div style={{ display: "flex", background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: "11px", color: "#777" }}>Total Active Subscribers</span>
                    <strong style={{ display: "block", fontSize: "16px" }}>956 Members</strong>
                  </div>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Average Churn Rate</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>1.8% / mo</strong>
                </div>
              </div>

              {/* Graphic Subscriber Growth Chart */}
              <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: "#718096", display: "block", marginBottom: "12px" }}>Active Subscribers Share breakdown</span>
                <div style={{ display: "flex", height: "30px", borderRadius: "8px", overflow: "hidden" }}>
                  {subscriptionPlans.map((p, idx) => (
                    <div key={idx} style={{
                      background: idx === 0 ? "#2c1b0d" : idx === 1 ? "#8a583c" : idx === 2 ? "#a0aec0" : "#cbd5e0",
                      width: `${(p.subscribers / 956) * 100}%`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: "bold"
                    }}>
                      {p.name.split(" ")[0]}
                    </div>
                  ))}
                </div>
              </div>

              {/* Plan editing list */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }}>
                {subscriptionPlans.map((sub, idx) => (
                  <div key={idx} style={{ background: "#ffffff", padding: "24px", borderRadius: "20px", border: "1px solid rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", justifyStyle: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <strong style={{ fontSize: "16px", color: "#2c1b0d" }}>🍵 {sub.name}</strong>
                        <strong style={{ fontSize: "16px", color: "#8a583c" }}>₹{sub.price}</strong>
                      </div>
                      <span style={{ fontSize: "12px", color: "#666", display: "block", marginBottom: "16px" }}>{sub.tagline}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #edf1f6", paddingTop: "12px" }}>
                      <span style={{ fontSize: "12px", color: "#718096" }}>Active Subscribers: <strong>{sub.subscribers}</strong></span>
                      <button
                        type="button"
                        onClick={() => {
                          const nextPrice = prompt("Enter new price tag for " + sub.name, sub.price);
                          if (nextPrice) {
                            setSubscriptionPlans(prev => prev.map((item, i) => i === idx ? { ...item, price: parseFloat(nextPrice) || item.price } : item));
                            setToastMsg(`Updated price for ${sub.name}`);
                            setTimeout(() => setToastMsg(""), 3000);
                          }
                        }}
                        style={{ background: "#2c1b0d", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", cursor: "pointer", fontWeight: "bold" }}
                      >
                        Edit plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: OFFERS */}
          {activeTab === "offers" && (
            <div>
              {/* Tab Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Total Discount Disbursed</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>₹42,500</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Highest Used Code</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>REFER25 (601 times)</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Active Campaigns</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>3 Campaigns</strong>
                </div>
              </div>

              {/* Graphic coupon share distribution chart */}
              <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: "#718096", display: "block", marginBottom: "12px" }}>Coupon usage share percentage split</span>
                <div style={{ display: "flex", gap: "6px", background: "#f4f6f8", height: "12px", borderRadius: "6px", overflow: "hidden" }}>
                  {offersList.map((off, idx) => (
                    <div key={idx} style={{ background: idx === 0 ? "#2c1b0d" : idx === 1 ? "#8a583c" : "#cbd5e0", width: `${off.share}%` }} />
                  ))}
                </div>
              </div>

              {/* Offers Coupon list */}
              <div style={{ background: "#ffffff", padding: "28px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.03)" }}>
                <h3 style={{ fontSize: "15px", margin: "0 0 20px", color: "#2c1b0d", fontWeight: "800" }}>Active Offers & Coupons</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1.5px solid #edf1f6", color: "#718096", textAlign: "left" }}>
                      <th style={{ padding: "12px 0" }}>Coupon Code</th>
                      <th>Discount Description</th>
                      <th>Redeemed Times</th>
                      <th>Campaign Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offersList.map((off, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #edf1f6" }}>
                        <td style={{ padding: "14px 0", fontWeight: "bold", color: "#8a583c" }}>{off.code}</td>
                        <td>{off.desc}</td>
                        <td>{off.used} times</td>
                        <td>
                          <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold", background: off.active ? "rgba(39,174,96,0.1)" : "rgba(0,0,0,0.05)", color: off.active ? "#27ae60" : "#777" }}>
                            {off.active ? "Active" : "Ended"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: DISPUTES */}
          {activeTab === "disputes" && (
            <div>
              {/* Tab Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Unresolved Disputes</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>{openDisputesCount} Tickets</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Average Resolution Time</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>45 minutes</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Resolution Rating</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>4.8 / 5 Rating</strong>
                </div>
              </div>

              {/* Graphic dispute status meter */}
              <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: "#718096", display: "block", marginBottom: "6px" }}>Resolution Rate status (85% solved)</span>
                <div style={{ background: "rgba(0,0,0,0.05)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ background: "#2c1b0d", width: "85%", height: "100%" }} />
                </div>
              </div>

              {/* Disputes List */}
              <div style={{ background: "#ffffff", padding: "28px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.03)" }}>
                <h3 style={{ fontSize: "15px", margin: "0 0 20px", color: "#2c1b0d", fontWeight: "800" }}>Open Disputes Log</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {disputesList.map((disp, idx) => (
                    <div key={idx} style={{ background: "#fbf9f6", padding: "20px", borderRadius: "16px", border: "1px solid rgba(44, 27, 13, 0.03)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #edf1f6", paddingBottom: "8px", marginBottom: "12px" }}>
                        <strong>{disp.id} (Order: {disp.order})</strong>
                        <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold", background: disp.status === "Resolved" ? "rgba(39,174,96,0.1)" : disp.status === "Open" ? "rgba(231,76,60,0.1)" : "rgba(241,196,15,0.12)", color: disp.status === "Resolved" ? "#27ae60" : disp.status === "Open" ? "#e74c3c" : "#d35400" }}>
                          {disp.status}
                        </span>
                      </div>
                      <p style={{ fontSize: "13px", color: "#333", margin: "0 0 12px" }}>{disp.issue}</p>
                      <span style={{ fontSize: "11px", color: "#666" }}>Reported by: <strong>{disp.user}</strong></span>
                      {disp.status !== "Resolved" && (
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "10px" }}>
                          <button
                            type="button"
                            onClick={() => {
                              setDisputesList(prev => prev.map((item, i) => i === idx ? { ...item, status: "Resolved" } : item));
                              setToastMsg(`Dispute ticket ${disp.id} marked as resolved!`);
                              setTimeout(() => setToastMsg(""), 3000);
                            }}
                            style={{ background: "#2c1b0d", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", cursor: "pointer", fontWeight: "bold" }}
                          >
                            Resolve Dispute
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: USERS & WALLETS */}
          {activeTab === "users" && (
            <div>
              {/* Tab Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Total Users Wallet Capital</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>₹14,500</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Average Wallet Balance</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>₹420</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Blocked Profiles</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>1 Member</strong>
                </div>
              </div>

              {/* Graphic wallet range distribution cylinders */}
              <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: "#718096", display: "block", marginBottom: "12px" }}>Wallet Distribution Range share</span>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-end", height: "40px", paddingLeft: "10px" }}>
                  <div style={{ width: "30px", background: "#2c1b0d", height: "35px", borderRadius: "4px" }} />
                  <div style={{ width: "30px", background: "#8a583c", height: "20px", borderRadius: "4px" }} />
                  <div style={{ width: "30px", background: "#edf1f6", height: "10px", borderRadius: "4px" }} />
                </div>
              </div>

              {/* Users List table */}
              <div style={{ background: "#ffffff", padding: "28px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.03)" }}>
                <h3 style={{ fontSize: "15px", margin: "0 0 20px", color: "#2c1b0d", fontWeight: "800" }}>Corporate Members & Wallet Ledger</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1.5px solid #edf1f6", color: "#718096", textAlign: "left" }}>
                      <th style={{ padding: "12px 0" }}>User Profile Name</th>
                      <th>Email Address</th>
                      <th>Workspace Location</th>
                      <th>Subscription Plan</th>
                      <th>Wallet Balance</th>
                      <th style={{ textAlign: "right" }}>Account Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map((usr, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #edf1f6" }}>
                        <td style={{ padding: "14px 0", fontWeight: "bold" }}>{usr.name}</td>
                        <td>{usr.email}</td>
                        <td>{usr.office}</td>
                        <td style={{ fontWeight: "bold", color: "#8a583c" }}>{usr.sub}</td>
                        <td style={{ fontWeight: "bold" }}>₹{usr.wallet}</td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            type="button"
                            onClick={() => {
                              setUsersList(prev => prev.map((item, i) => i === idx ? { ...item, status: usr.status === "Active" ? "Blocked" : "Active" } : item));
                              setToastMsg(`Status for ${usr.name} changed to ${usr.status === "Active" ? "Blocked" : "Active"}`);
                              setTimeout(() => setToastMsg(""), 3000);
                            }}
                            style={{ fontSize: "11px", padding: "4px 10px", borderRadius: "6px", fontWeight: "bold", border: "none", cursor: "pointer", background: usr.status === "Active" ? "rgba(39,174,96,0.1)" : "rgba(231,76,60,0.1)", color: usr.status === "Active" ? "#27ae60" : "#e74c3c" }}
                          >
                            {usr.status === "Active" ? "🟢 Active (Block)" : "🔴 Blocked (Unblock)"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: RESTOCK LEDGER */}
          {activeTab === "restock" && (
            <div>
              {/* Tab Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Pending Restocks</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>{pendingRestockCount} Items</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Supply Chain Health</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>94% Robust</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Avg Restock Preparation</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>4 hrs Dispatch</strong>
                </div>
              </div>

              {/* Graphic Urgency Thermometers */}
              <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: "#718096", display: "block", marginBottom: "12px" }}>Restock urgencies</span>
                {restockRequests.map((r, i) => (
                  <div key={i} style={{ marginBottom: "10px", fontSize: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span>{r.item}</span>
                      <strong>{r.urgency}% Priority</strong>
                    </div>
                    <div style={{ background: "#f4f6f8", height: "6px", borderRadius: "3px" }}>
                      <div style={{ background: r.urgency > 70 ? "#e74c3c" : "#2c1b0d", width: `${r.urgency}%`, height: "100%", borderRadius: "3px" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Restock table */}
              <div style={{ background: "#ffffff", padding: "28px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.03)" }}>
                <h3 style={{ fontSize: "15px", margin: "0 0 20px", color: "#2c1b0d", fontWeight: "800" }}>Ingredient Restock Pipelines</h3>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1.5px solid #edf1f6", color: "#718096", textAlign: "left" }}>
                      <th style={{ padding: "12px 0" }}>Material Requested</th>
                      <th>Qty Spec</th>
                      <th>Origin Station</th>
                      <th>Timestamp</th>
                      <th>Status</th>
                      <th style={{ textAlign: "right" }}>Logistics Dispatch</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restockRequests.map((r, idx) => (
                      <tr key={idx} style={{ borderBottom: "1px solid #edf1f6" }}>
                        <td style={{ padding: "14px 0", fontWeight: "bold" }}>{r.item}</td>
                        <td>{r.qty}</td>
                        <td>{r.station}</td>
                        <td>{r.date}</td>
                        <td>
                          <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold", background: r.status === "Pending" ? "rgba(241,196,15,0.12)" : "rgba(39,174,96,0.1)", color: r.status === "Pending" ? "#d35400" : "#27ae60" }}>
                            {r.status}
                          </span>
                        </td>
                        <td style={{ textAlign: "right" }}>
                          {r.status === "Pending" ? (
                            <button
                              type="button"
                              onClick={() => {
                                setRestockRequests(prev => prev.map((item, i) => i === idx ? { ...item, status: "Dispatched" } : item));
                                setToastMsg(`Material shipment dispatched to ${r.station}!`);
                                setTimeout(() => setToastMsg(""), 3000);
                              }}
                              style={{ background: "#2c1b0d", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", cursor: "pointer", fontWeight: "bold" }}
                            >
                              Dispatch Material
                            </button>
                          ) : (
                            <span style={{ fontSize: "11.5px", color: "#777" }}>Processed ✓</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 9: STAFF LEAVES */}
          {activeTab === "leaves" && (
            <div>
              {/* Tab Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Active Duty Operators</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>5 Operators</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Pending Leave Forms</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>{pendingLeavesCount} Forms</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Kitchen Service Roster</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>100% Coverage</strong>
                </div>
              </div>

              {/* Graphic shift coverage bar */}
              <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: "#718096", display: "block", marginBottom: "6px" }}>Shift Coverage Roster (96% active duty)</span>
                <div style={{ background: "rgba(0,0,0,0.05)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ background: "#2c1b0d", width: "96%", height: "100%" }} />
                </div>
              </div>

              {/* Leave cards list */}
              <div style={{ background: "#ffffff", padding: "28px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.03)" }}>
                <h3 style={{ fontSize: "15px", margin: "0 0 20px", color: "#2c1b0d", fontWeight: "800" }}>Leaves & Shift Approval Ledger</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {leaveRequests.map((l, idx) => (
                    <div key={idx} style={{ background: "#fbf9f6", padding: "20px", borderRadius: "16px", border: "1px solid rgba(44, 27, 13, 0.03)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #edf1f6", paddingBottom: "8px", marginBottom: "12px" }}>
                        <strong>👤 {l.operator}</strong>
                        <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", fontWeight: "bold", background: l.status === "Approved" ? "rgba(39,174,96,0.1)" : l.status === "Rejected" ? "rgba(231,76,60,0.1)" : "rgba(241,196,15,0.12)", color: l.status === "Approved" ? "#27ae60" : l.status === "Rejected" ? "#e74c3c" : "#d35400" }}>
                          {l.status}
                        </span>
                      </div>
                      <p style={{ fontSize: "13px", color: "#333", margin: "0 0 8px" }}>Reason: "{l.reason}"</p>
                      <span style={{ fontSize: "11.5px", color: "#666" }}>Schedule: <strong>{l.start} to {l.end}</strong></span>
                      {l.status === "Pending Approval" && (
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "10px" }}>
                          <button
                            type="button"
                            onClick={() => {
                              setLeaveRequests(prev => prev.map((item, i) => i === idx ? { ...item, status: "Rejected" } : item));
                              setToastMsg(`Leave request for ${l.operator} rejected.`);
                              setTimeout(() => setToastMsg(""), 3000);
                            }}
                            style={{ background: "transparent", border: "1px solid #e74c3c", color: "#e74c3c", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", cursor: "pointer", fontWeight: "bold" }}
                          >
                            Reject Request
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setLeaveRequests(prev => prev.map((item, i) => i === idx ? { ...item, status: "Approved" } : item));
                              setToastMsg(`Approved leave for ${l.operator}!`);
                              setTimeout(() => setToastMsg(""), 3000);
                            }}
                            style={{ background: "#2c1b0d", color: "#fff", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", cursor: "pointer", fontWeight: "bold" }}
                          >
                            Approve Leave
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: GLOBAL CONFIG & ANNOUNCEMENTS */}
          {activeTab === "settings" && (
            <div>
              {/* Tab Metric Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "20px" }}>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Broadcaster Channels</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>3 Terminals</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Roster Safety Clearance</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>Level 4 (High)</strong>
                </div>
                <div style={{ background: "#ffffff", padding: "14px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                  <span style={{ fontSize: "11px", color: "#777" }}>Admin Logged Session</span>
                  <strong style={{ display: "block", fontSize: "16px" }}>1 Session Active</strong>
                </div>
              </div>

              {/* Graphic Config values */}
              <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid rgba(0,0,0,0.03)", marginBottom: "24px" }}>
                <span style={{ fontSize: "12px", color: "#718096", display: "block", marginBottom: "6px" }}>System operational metrics (98% optimized)</span>
                <div style={{ background: "rgba(0,0,0,0.05)", height: "8px", borderRadius: "4px", overflow: "hidden" }}>
                  <div style={{ background: "#2c1b0d", width: "98%", height: "100%" }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "28px" }}>
                {/* Broadcast Announcements */}
                <div style={{ background: "#ffffff", padding: "28px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.03)" }}>
                  <h3 style={{ fontSize: "15px", margin: "0 0 8px", color: "#2c1b0d", fontWeight: "800" }}>📣 Broadcast Notification to Kitchens</h3>
                  <p style={{ fontSize: "12px", color: "#666", marginBottom: "20px" }}>Send a live system alert header to all active brewmaster outlets.</p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!broadcastMsg) return;
                      setToastMsg(`Broadcasted alert message: "${broadcastMsg}"!`);
                      setBroadcastMsg("");
                      setTimeout(() => setToastMsg(""), 3500);
                    }}
                  >
                    <textarea
                      rows="3"
                      placeholder="e.g. Saffron supply is delayed. Please conserve inventory."
                      value={broadcastMsg}
                      onChange={(e) => setBroadcastMsg(e.target.value)}
                      required
                      style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1.5px solid #edf1f6", fontSize: "13px", resize: "none", outline: "none", marginBottom: "16px" }}
                    />
                    <button type="submit" style={{ background: "#2c1b0d", color: "#ffffff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "800", fontSize: "12px", cursor: "pointer" }}>
                      TRANSMIT ANNOUNCEMENT
                    </button>
                  </form>
                </div>

                {/* Operations limit */}
                <div style={{ background: "#ffffff", padding: "28px", borderRadius: "24px", border: "1px solid rgba(0,0,0,0.03)" }}>
                  <h3 style={{ fontSize: "15px", margin: "0 0 20px", color: "#2c1b0d", fontWeight: "800" }}>⚙️ Shift Parameters</h3>
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", color: "#555", display: "block", marginBottom: "6px" }}>Standard Working Hours Window</label>
                    <input
                      type="text"
                      value={systemHours}
                      onChange={(e) => setSystemHours(e.target.value)}
                      style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid #edf1f6", fontSize: "13px" }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setToastMsg("Saved global operation hours!");
                      setTimeout(() => setToastMsg(""), 3000);
                    }}
                    style={{ width: "100%", background: "#2c1b0d", color: "#ffffff", border: "none", padding: "10px", borderRadius: "8px", fontWeight: "800", fontSize: "11.5px", cursor: "pointer" }}
                  >
                    Save Global Roster Window
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* RIGHT SIDEBAR: ACTIVE ORDERS, REVENUE, NOTIFICATIONS */}
      <aside style={{ width: "300px", background: "#ffffff", borderLeft: "1.5px solid #edf1f6", padding: "28px 20px", display: "flex", flexDirection: "column", gap: "24px", flexShrink: 0, overflowY: "auto" }}>

        {/* Section 1: Today's Revenue */}
        <div>
          <h3 style={{ fontSize: "14px", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#718096", fontWeight: "800" }}>Live Revenue Today</h3>
          <div style={{ background: "#fbf9f6", padding: "16px", borderRadius: "16px", border: "1px solid rgba(44, 27, 13, 0.04)" }}>
            <strong style={{ fontSize: "24px", color: "#2c1b0d", display: "block" }}>₹48,250.00</strong>
            <span style={{ fontSize: "11px", color: "#27ae60", fontWeight: "bold" }}>● Target: ₹60,000 (80% achieved)</span>

            {/* Daily Target Progress Bar */}
            <div style={{ background: "rgba(0,0,0,0.05)", height: "6px", borderRadius: "3px", overflow: "hidden", marginTop: "12px" }}>
              <div style={{ background: "#2c1b0d", width: "80%", height: "100%" }} />
            </div>
          </div>
        </div>

        {/* Section 2: Active Orders */}
        <div>
          <h3 style={{ fontSize: "14px", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#718096", fontWeight: "800" }}>Active Orders</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {liveOrders.slice(0, 3).map((ord, idx) => (
              <div key={idx} style={{ background: "#ffffff", padding: "12px", borderRadius: "12px", border: "1.5px solid #edf1f6" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "bold" }}>{ord.id}</span>
                  <span style={{ fontSize: "10px", color: ord.status === "Served" ? "#27ae60" : "#d35400", fontWeight: "bold" }}>{ord.status}</span>
                </div>
                <span style={{ fontSize: "11px", color: "#555", display: "block" }}>🏢 {ord.office}</span>
                <span style={{ fontSize: "11.5px", color: "#8a583c", fontWeight: "bold", display: "block", marginTop: "4px" }}>{ord.items}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Live Notifications */}
        <div>
          <h3 style={{ fontSize: "14px", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.5px", color: "#718096", fontWeight: "800" }}>Live System Notifications</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ fontSize: "12px", borderBottom: "1px solid #edf1f6", paddingBottom: "10px", display: "flex", gap: "10px" }}>
              <span>🚨</span>
              <div>
                <strong>Restock Alert:</strong> Cardamom stock low at Jaipur HQ Hub.
                <span style={{ display: "block", fontSize: "10px", color: "#999", marginTop: "2px" }}>5 mins ago</span>
              </div>
            </div>
            <div style={{ fontSize: "12px", borderBottom: "1px solid #edf1f6", paddingBottom: "10px", display: "flex", gap: "10px" }}>
              <span>📅</span>
              <div>
                <strong>Leave request:</strong> Ramesh Kumar applied for 3 days leave.
                <span style={{ display: "block", fontSize: "10px", color: "#999", marginTop: "2px" }}>1 hr ago</span>
              </div>
            </div>
            <div style={{ fontSize: "12px", display: "flex", gap: "10px" }}>
              <span>⚠️</span>
              <div>
                <strong>Dispute raised:</strong> Ticket DSP-1021 remains open.
                <span style={{ display: "block", fontSize: "10px", color: "#999", marginTop: "2px" }}>2 hrs ago</span>
              </div>
            </div>
          </div>
        </div>

      </aside>
    </div>
  );
}
