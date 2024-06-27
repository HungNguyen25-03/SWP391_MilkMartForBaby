import React from "react";
import "./FooterPage.scss";

function FooterPage() {
  return (
    <div className="Footer">
      <div className="footer container">
        <div className="content__footer">
          <div className="text">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/swp391-milkmartsystem.appspot.com/o/images%2Flogo.png?alt=media&token=608fc814-b3d6-463b-845b-3c64b92cc563"
              alt="Logo"
            />
            <div className="logo">Milk Mart For baby</div>
          </div>
          <div className="info">
            <div className="info__address">
              <i className="bi bi-geo-alt-fill"></i>
              Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức
            </div>
            <div className="info__address">
              <i className="bi bi-geo-alt-fill"></i>
              Lưu Hữu Phước, Đông Hoà, Dĩ An, Bình Dương
            </div>
            <div className="info__phone">
              <i className="bi bi-telephone-fill"></i>
              0794423345 (anh Hưng)
            </div>
            <div className="info__phone">
              <i className="bi bi-telephone-fill"></i>
              0794423345 (anh Hưng 2)
            </div>
            <div className="info__email">
              <i className="bi bi-envelope-fill"></i>
              abc@gmail.com
            </div>
          </div>
        </div>
        {/* <div className="mission">
          <div className="mission__title">Sứ mệnh của chúng tôi</div>
          <div className="mission__content">
            Tại Milk Mart For baby, chúng tôi cam kết mang đến cho khách hàng những sản phẩm sữa tinh khiết, bổ dưỡng và chất lượng cao. Sứ mệnh của chúng tôi là:
          </div>
          <div className="mission__content__1">
            - Chất Lượng Hàng Đầu: Sử dụng nguyên liệu sạch và quy trình sản xuất hiện đại để đảm bảo mỗi sản phẩm đều đạt chuẩn mực cao nhất về chất lượng và an toàn thực phẩm.
          </div>
          <div className="mission__content__2">
            - Dinh Dưỡng Cho Mọi Người: Cung cấp các sản phẩm sữa giàu dinh dưỡng để hỗ trợ sức khỏe và sự phát triển toàn diện cho mọi lứa tuổi.
          </div>
          <div className="mission__content__3">
            - Khách Hàng Là Trên Hết: Đặt sự hài lòng của khách hàng lên hàng đầu bằng cách cung cấp dịch vụ chăm sóc khách hàng tuyệt vời và trải nghiệm mua sắm đáng nhớ.
          </div>
          <div className="mission__content__4">
            - Bảo Vệ Môi Trường: Cam kết thực hiện các hoạt động kinh doanh có trách nhiệm, bảo vệ môi trường và đóng góp vào sự phát triển của cộng đồng.
          </div>
        </div>*/}
      </div>
      <div className="copyright">© {new Date().getFullYear()} Milk Mart For baby. Tất cả các quyền được bảo lưu.</div>
    </div>
  );
}

export default FooterPage;
