"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="contact"
      style={{
        background: "#2c1b0d",
        color: "#fdf5e9",
        padding: "80px 40px 40px",
        borderRadius: "36px 36px 0 0",
      }}
    >
      <div className="footer-grid">
        <div>
          <div style={{ fontFamily: "var(--font-body)", fontSize: 24, fontWeight: 800, color: "#ffffff" }}>
            ChaiCo.
          </div>
          <p style={{ marginTop: 14, fontSize: 13.5, opacity: 0.85, lineHeight: 1.7, maxWidth: 260 }}>
            Freshly brewed spice teas and organic loose blends sourced straight from certified tea farms. Delivered hot and fresh.
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: 13, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em", color: "#ffffff" }}>
            HQ Address
          </h4>
          <p style={{ fontSize: 13.5, opacity: 0.85, lineHeight: 1.8 }}>
            102 Tea Estate lane, Assam Garden,
            <br />
            India 781001
            <br />
            +91 98765 43210
            <br />
            hello@chaico.com
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: 13, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em", color: "#ffffff" }}>
            Quick Links
          </h4>
          <p style={{ fontSize: 13.5, opacity: 0.85, lineHeight: 2 }}>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>Home</Link>
            <br />
            <Link href="/shop" style={{ color: "inherit", textDecoration: "none" }}>Shop</Link>
            <br />
            <Link href="/orders" style={{ color: "inherit", textDecoration: "none" }}>My Orders</Link>
            <br />
            <Link href="/chaimaker" style={{ color: "inherit", textDecoration: "none", fontWeight: "bold", color: "#f1c40f" }}>⚡ Brewmaster Panel</Link>
            <br />
            <Link href="/admin" style={{ color: "inherit", textDecoration: "none", fontWeight: "bold", color: "#e74c3c" }}>🛡️ Admin Panel</Link>
          </p>
        </div>

        <div>
          <h4 style={{ fontSize: 13, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em", color: "#ffffff" }}>
            Newsletter
          </h4>
          <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 14 }}>
            Subscribe to receive brewing tips &amp; special discounts.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              type="email"
              placeholder="Your Email"
              style={{
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "999px",
                padding: "8px 16px",
                color: "#ffffff",
                fontSize: "12.5px",
                outline: "none",
                width: "100%",
              }}
            />
            <button
              style={{
                background: "#ffffff",
                color: "#2c1b0d",
                border: "none",
                borderRadius: "999px",
                padding: "8px 18px",
                fontWeight: 700,
                fontSize: "12.5px",
                cursor: "pointer",
              }}
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 60,
          paddingTop: 20,
          borderTop: "1px solid rgba(253,245,233,0.1)",
          textAlign: "center",
          fontSize: 12,
          opacity: 0.65,
        }}
      >
        © 2026 ChaiCo. All rights reserved. Built with love for tea.
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr 1fr;
          gap: 40px;
        }

        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
}
