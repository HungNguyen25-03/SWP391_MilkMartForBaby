import React from "react";
import "./FooterPage.scss";

export default function FooterPage() {
  return (
    <div className="footer mt-auto">
      <div className="footer-content  text-white text-center py-3 mt-auto">
        <p>&copy; 2024 Milk Mart For Baby. All rights reserved.</p>
        <div className="social-links">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}

// rel="noopener noreferrer" bảo vệ người dừng không bị tấn công qua tab
// cửa sổ mới không thể truy cập vào window.opener
